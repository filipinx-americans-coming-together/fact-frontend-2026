// Ported near-verbatim from the static "live" site's js/main.js.
// Runs as a client-side effect after each route's DOM mounts; every block
// guards on the elements it needs, so pages missing a given feature are
// unaffected. init() returns a cleanup that undoes everything it attached,
// so it's safe to re-run on every route change.
export function initLiveSiteInteractions(): () => void {
  const cleanups: Array<() => void> = [];

  // ---------- Countdown ----------
  const TARGET = new Date('2026-10-16T00:00:00-05:00').getTime();
  const valueEl = document.getElementById('countdown-value');

  if (valueEl) {
    const pad = (n: number) => (n < 10 ? '0' + n : String(n));
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) {
        valueEl.textContent = "It's here";
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      valueEl.textContent = `${days}d ${pad(hours)}h ${pad(minutes)}m`;
    };
    tick();
    const timer = window.setInterval(tick, 1000 * 15);
    cleanups.push(() => window.clearInterval(timer));
  }

  // ---------- Nav drawer ----------
  const nav = document.querySelector('.hero__nav');
  const toggle = document.getElementById('nav-toggle');

  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    const onToggleClick = () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    };
    const onDocClick = (event: MouseEvent) => {
      if (nav.classList.contains('is-open') && !nav.contains(event.target as Node)) {
        closeMenu();
      }
    };
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    };

    toggle.addEventListener('click', onToggleClick);
    const links = nav.querySelectorAll('.hero__links a');
    links.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);

    cleanups.push(() => {
      toggle.removeEventListener('click', onToggleClick);
      links.forEach((link) => link.removeEventListener('click', closeMenu));
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });
  }

  // ---------- Disabled-control announcer + locked tooltip ----------
  let disabledAnnouncer: HTMLDivElement | null = null;
  const announceDisabled = (el: Element) => {
    if (!disabledAnnouncer) {
      disabledAnnouncer = document.createElement('div');
      disabledAnnouncer.setAttribute('aria-live', 'polite');
      disabledAnnouncer.className = 'sr-only';
      document.body.appendChild(disabledAnnouncer);
    }
    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('.sr-only').forEach((node) => node.remove());
    const label = (clone.textContent || '').trim();
    const reason = el.getAttribute('title') || 'Not available yet';
    disabledAnnouncer.textContent = '';
    window.setTimeout(() => {
      if (disabledAnnouncer) disabledAnnouncer.textContent = `${label}: ${reason}`;
    }, 50);
  };

  let lockedTip: HTMLDivElement | null = null;
  let lockedTipHideTimer: number | undefined;
  const showLockedTip = (el: Element, text: string) => {
    if (!lockedTip) {
      lockedTip = document.createElement('div');
      lockedTip.className = 'locked-tip';
      document.body.appendChild(lockedTip);
    }
    const rect = el.getBoundingClientRect();
    lockedTip.style.left = rect.left + rect.width / 2 + 'px';
    lockedTip.style.top = rect.bottom + 10 + 'px';
    lockedTip.textContent = text;
    lockedTip.classList.add('is-visible');
    window.clearTimeout(lockedTipHideTimer);
    lockedTipHideTimer = window.setTimeout(() => {
      lockedTip?.classList.remove('is-visible');
    }, 2200);
  };

  const onScrollHideTip = () => {
    lockedTip?.classList.remove('is-visible');
  };
  window.addEventListener('scroll', onScrollHideTip, { passive: true });
  cleanups.push(() => window.removeEventListener('scroll', onScrollHideTip));

  const disabledEls = document.querySelectorAll('[aria-disabled="true"]');
  const onDisabledClick = (event: Event) => {
    event.preventDefault();
    const el = event.currentTarget as Element;
    announceDisabled(el);
    const reason = el.getAttribute('title');
    if (reason) showLockedTip(el, reason);
  };
  disabledEls.forEach((el) => el.addEventListener('click', onDisabledClick));
  cleanups.push(() => disabledEls.forEach((el) => el.removeEventListener('click', onDisabledClick)));

  // ---------- Team jump nav (scroll spy) ----------
  const jumpnav = document.querySelector('.team__jumpnav');
  const jumpgroups = document.querySelectorAll('.team__groups > div[id]');

  if (jumpnav && jumpgroups.length && 'IntersectionObserver' in window) {
    const jumplinks: Record<string, Element> = {};
    jumpnav.querySelectorAll('.team__jumplink').forEach((link) => {
      const href = link.getAttribute('href');
      if (href) jumplinks[href.slice(1)] = link;
    });

    const jumpObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = jumplinks[(entry.target as HTMLElement).id];
          if (link) link.classList.toggle('is-active', entry.isIntersecting);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    jumpgroups.forEach((group) => jumpObserver.observe(group));
    cleanups.push(() => jumpObserver.disconnect());
  }

  // ---------- Seal icon scroll-stamp ----------
  const sealIcons = Array.from(document.querySelectorAll('.cta__icon, .mahiwagahan__icon'));
  if (sealIcons.length && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-seal-armed');
    const sealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-stamped');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    sealIcons.forEach((icon) => sealObserver.observe(icon));
    cleanups.push(() => sealObserver.disconnect());
  }

  // ---------- Quote reveal ----------
  const quoteReveal = document.querySelector('.quote-reveal');
  if (quoteReveal && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-quote-armed');
    const mark = quoteReveal.querySelector('.quote-reveal__mark');
    const segs = Array.from(quoteReveal.querySelectorAll('.quote-reveal__seg'));
    const cite = quoteReveal.querySelector('.quote-reveal__cite');
    const parts = [mark, ...segs, cite].filter(Boolean) as Element[];
    const delays = [0, 250, 330, 410, 520];

    const quoteObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            parts.forEach((part, i) => {
              window.setTimeout(
                () => part.classList.add('is-revealed'),
                delays[i] ?? delays[delays.length - 1] + (i - delays.length + 1) * 80
              );
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    quoteObserver.observe(quoteReveal);
    cleanups.push(() => quoteObserver.disconnect());
  }

  // ---------- Theme stage sparkle pointer-tracking (home) ----------
  const themeStage = document.querySelector<HTMLElement>('.theme__stage');
  const themeHeading = document.querySelector<HTMLElement>('.section__heading--theme');
  const sparkles = themeStage ? Array.from(themeStage.querySelectorAll<HTMLElement>('.theme__sparkle')) : [];
  const sparkleGlyphs = themeStage
    ? Array.from(themeStage.querySelectorAll<HTMLElement>('.theme__sparkle-glyph'))
    : [];

  if (themeStage && themeHeading && sparkles.length) {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const fineHover = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
    const interactive = !reduceMotion && fineHover;

    let themeVisible = false;
    let pointerActive = false;
    let pointerX = 0;
    let pointerY = 0;
    let rafId: number | null = null;
    const targets = sparkles.map(() => ({ x: 0, y: 0 }));

    const resetTheme = () => {
      themeStage.classList.remove('is-tracking');
      themeHeading.style.setProperty('--tilt-x', '0deg');
      themeHeading.style.setProperty('--tilt-y', '0deg');
      themeHeading.style.setProperty('--theme-glow', '0px');
      sparkles.forEach((sparkle, i) => {
        targets[i].x = 0;
        targets[i].y = 0;
        sparkle.style.transform = '';
      });
    };

    const stopLoop = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    function loop() {
      if (!pointerActive) {
        rafId = null;
        return;
      }
      const stageRect = themeStage!.getBoundingClientRect();
      const headRect = themeHeading!.getBoundingClientRect();
      const cx = headRect.left + headRect.width / 2;
      const cy = headRect.top + headRect.height / 2;
      const dx = Math.max(-1, Math.min(1, (pointerX - cx) / (headRect.width / 2)));
      const dy = Math.max(-1, Math.min(1, (pointerY - cy) / (headRect.height / 2)));

      themeHeading!.style.setProperty('--tilt-y', (dx * 3).toFixed(2) + 'deg');
      themeHeading!.style.setProperty('--tilt-x', (-dy * 3).toFixed(2) + 'deg');

      const dist = Math.hypot(pointerX - cx, pointerY - cy);
      themeHeading!.style.setProperty('--theme-glow', Math.max(0, 16 - dist / 20).toFixed(1) + 'px');

      sparkles.forEach((sparkle, i) => {
        const base = sparkle.getBoundingClientRect();
        const sx = base.left + base.width / 2 - stageRect.left - targets[i].x;
        const sy = base.top + base.height / 2 - stageRect.top - targets[i].y;
        const px = pointerX - stageRect.left;
        const py = pointerY - stageRect.top;
        const pdx = px - sx;
        const pdy = py - sy;
        const pdist = Math.hypot(pdx, pdy);
        const pull = pdist < 160 ? 1 - pdist / 160 : 0;
        const t = targets[i];
        t.x += (pdx * pull * 0.3 - t.x) * 0.12;
        t.y += (pdy * pull * 0.3 - t.y) * 0.12;
        sparkle.style.transform = `translate(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px)`;
      });

      rafId = window.requestAnimationFrame(loop);
    }

    const startLoop = () => {
      if (rafId === null) {
        themeStage.classList.add('is-tracking');
        rafId = window.requestAnimationFrame(loop);
      }
    };

    const setVisible = (visible: boolean) => {
      themeVisible = visible;
      sparkleGlyphs.forEach((glyph) => glyph.classList.toggle('is-visible', visible));
      if (!visible) {
        pointerActive = false;
        stopLoop();
        resetTheme();
      }
    };

    let themeObserver: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      themeObserver = new IntersectionObserver(
        (entries) => entries.forEach((entry) => setVisible(entry.isIntersecting)),
        { threshold: 0.2 }
      );
      themeObserver.observe(themeStage);
    } else {
      setVisible(true);
    }

    let onMouseMove: ((event: MouseEvent) => void) | undefined;
    if (interactive) {
      onMouseMove = (event: MouseEvent) => {
        if (!themeVisible) return;
        const rect = themeStage.getBoundingClientRect();
        const margin = 140;
        const inside =
          event.clientX > rect.left - margin &&
          event.clientX < rect.right + margin &&
          event.clientY > rect.top - margin &&
          event.clientY < rect.bottom + margin;
        pointerActive = inside;
        if (inside) {
          pointerX = event.clientX;
          pointerY = event.clientY;
          startLoop();
        } else {
          stopLoop();
          resetTheme();
        }
      };
      document.addEventListener('mousemove', onMouseMove);
    }

    cleanups.push(() => {
      stopLoop();
      themeObserver?.disconnect();
      if (onMouseMove) document.removeEventListener('mousemove', onMouseMove);
    });
  }

  // ---------- About-page photo carousel ----------
  const carouselTrack = document.getElementById('about-carousel-track');
  if (carouselTrack) {
    const carouselSlides = Array.from(carouselTrack.children) as HTMLElement[];
    const carouselPrev = document.querySelector('.photocarousel__nav--prev');
    const carouselNext = document.querySelector('.photocarousel__nav--next');
    const carouselDotsWrap = document.querySelector('.photocarousel__dots');
    const carouselDots = carouselDotsWrap ? (Array.from(carouselDotsWrap.children) as HTMLElement[]) : [];
    const carouselStatus = document.getElementById('about-carousel-status');
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let carouselAnnouncer: HTMLDivElement | null = null;

    const announce = (text: string) => {
      if (!carouselAnnouncer) {
        carouselAnnouncer = document.createElement('div');
        carouselAnnouncer.setAttribute('aria-live', 'polite');
        carouselAnnouncer.className = 'sr-only';
        document.body.appendChild(carouselAnnouncer);
      }
      carouselAnnouncer.textContent = '';
      window.setTimeout(() => {
        if (carouselAnnouncer) carouselAnnouncer.textContent = text;
      }, 50);
    };

    const activeIndex = () => {
      let idx = -1;
      carouselDots.forEach((dot, i) => {
        if (dot.classList.contains('is-active')) idx = i;
      });
      return idx === -1 ? 0 : idx;
    };

    const scrollToSlide = (index: number) => {
      const clamped = Math.max(0, Math.min(carouselSlides.length - 1, index));
      const target = carouselSlides[clamped].offsetLeft;
      if (reduceMotion) {
        carouselTrack.scrollLeft = target;
        return;
      }
      carouselTrack.style.scrollSnapType = 'none';
      carouselTrack.scrollTo({ left: target, behavior: 'smooth' });
      window.setTimeout(() => {
        carouselTrack.style.scrollSnapType = '';
        if (Math.abs(carouselTrack.scrollLeft - target) > 2) {
          carouselTrack.scrollLeft = target;
        }
      }, 450);
    };

    const onPrev = () => scrollToSlide(activeIndex() - 1);
    const onNext = () => scrollToSlide(activeIndex() + 1);
    carouselPrev?.addEventListener('click', onPrev);
    carouselNext?.addEventListener('click', onNext);

    const dotClickHandlers = carouselDots.map((dot, i) => {
      const handler = () => scrollToSlide(i);
      dot.addEventListener('click', handler);
      return handler;
    });

    const onDotsKeydown = (event: KeyboardEvent) => {
      let target: number | undefined;
      if (event.key === 'ArrowLeft') target = Math.max(0, activeIndex() - 1);
      else if (event.key === 'ArrowRight') target = Math.min(carouselDots.length - 1, activeIndex() + 1);
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = carouselDots.length - 1;
      else return;
      event.preventDefault();
      scrollToSlide(target);
      carouselDots[target].focus();
    };
    carouselDotsWrap?.addEventListener('keydown', onDotsKeydown as EventListener);

    const onTrackKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollToSlide(activeIndex() - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollToSlide(activeIndex() + 1);
      }
    };
    carouselTrack.addEventListener('keydown', onTrackKeydown as EventListener);

    let carouselObserver: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      let mounted = false;
      carouselObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const i = carouselSlides.indexOf(entry.target as HTMLElement);
            carouselDots.forEach((dot, di) => {
              const active = di === i;
              dot.classList.toggle('is-active', active);
              dot.setAttribute('aria-selected', active ? 'true' : 'false');
              dot.setAttribute('tabindex', active ? '0' : '-1');
            });
            if (carouselStatus) carouselStatus.textContent = String(i + 1);
            if (mounted) announce(`Photo ${i + 1} of ${carouselSlides.length}`);
          });
        },
        { root: carouselTrack, threshold: 0.6 }
      );
      carouselSlides.forEach((slide) => carouselObserver!.observe(slide));
      window.requestAnimationFrame(() => {
        mounted = true;
      });
    }

    cleanups.push(() => {
      carouselPrev?.removeEventListener('click', onPrev);
      carouselNext?.removeEventListener('click', onNext);
      carouselDots.forEach((dot, i) => dot.removeEventListener('click', dotClickHandlers[i]));
      carouselDotsWrap?.removeEventListener('keydown', onDotsKeydown as EventListener);
      carouselTrack.removeEventListener('keydown', onTrackKeydown as EventListener);
      carouselObserver?.disconnect();
    });
  }

  // ---------- Workshops search filter ----------
  const searchInput = document.getElementById('workshop-search') as HTMLInputElement | null;
  const sessionsRoot = document.getElementById('workshop-sessions');
  const emptyState = document.getElementById('workshop-empty');

  if (searchInput && sessionsRoot) {
    const groups = Array.from(sessionsRoot.children) as HTMLElement[];
    const onInput = () => {
      const query = searchInput.value.trim().toLowerCase();
      let totalVisible = 0;
      groups.forEach((group) => {
        const rows = Array.from(group.querySelectorAll<HTMLElement>('.workshop__row'));
        let visibleInGroup = 0;
        rows.forEach((row) => {
          const title = row.querySelector('.workshop__title')?.textContent?.toLowerCase() ?? '';
          const desc = row.querySelector('.workshop__desc')?.textContent?.toLowerCase() ?? '';
          const match = !query || title.includes(query) || desc.includes(query);
          row.hidden = !match;
          if (match) visibleInGroup++;
        });
        group.hidden = visibleInGroup === 0;
        totalVisible += visibleInGroup;
      });
      if (emptyState) emptyState.hidden = totalVisible !== 0;
    };
    searchInput.addEventListener('input', onInput);
    cleanups.push(() => searchInput.removeEventListener('input', onInput));
  }

  // ---------- Trailer poster fallback + modal ----------
  const trailerVideoId = 'Nbb1xQN95Ts';
  const trailerPoster = document.querySelector<HTMLImageElement>('.trailer__poster');
  if (trailerPoster) {
    const onError = () => {
      trailerPoster.src = `https://i.ytimg.com/vi/${trailerVideoId}/mqdefault.jpg`;
    };
    trailerPoster.addEventListener('error', onError, { once: true });
    cleanups.push(() => trailerPoster.removeEventListener('error', onError));
  }

  const trailerTrigger = document.getElementById('trailer-trigger');
  const trailerModal = document.getElementById('trailer-modal');
  const trailerFrame = document.getElementById('trailer-modal-frame');

  if (trailerTrigger && trailerModal && trailerFrame) {
    let trailerLastFocused: HTMLElement | null = null;
    const trailerInertTargets = Array.from(document.querySelectorAll<HTMLElement>('body > header, body > main'));

    const setTrailerInert = (isInert: boolean) => {
      trailerInertTargets.forEach((el) => {
        if (isInert) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
      });
    };

    const onTrailerKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeTrailer();
    };

    function openTrailer() {
      trailerLastFocused = document.activeElement as HTMLElement | null;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${trailerVideoId}?autoplay=1&mute=1&rel=0`;
      iframe.title = 'FACT 2026 teaser trailer';
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      trailerFrame!.appendChild(iframe);

      trailerModal!.hidden = false;
      document.documentElement.classList.add('has-trailer-open');
      document.addEventListener('keydown', onTrailerKeydown);
      setTrailerInert(true);

      const closeBtn = trailerModal!.querySelector<HTMLElement>('.trailer-modal__close');
      closeBtn?.focus();
    }

    function closeTrailer() {
      trailerModal!.hidden = true;
      trailerFrame!.innerHTML = '';
      document.documentElement.classList.remove('has-trailer-open');
      document.removeEventListener('keydown', onTrailerKeydown);
      setTrailerInert(false);
      trailerLastFocused?.focus();
    }

    trailerTrigger.addEventListener('click', openTrailer);
    const closeEls = Array.from(trailerModal.querySelectorAll('[data-trailer-close]'));
    closeEls.forEach((el) => el.addEventListener('click', closeTrailer));

    cleanups.push(() => {
      trailerTrigger.removeEventListener('click', openTrailer);
      closeEls.forEach((el) => el.removeEventListener('click', closeTrailer));
      document.removeEventListener('keydown', onTrailerKeydown);
    });
  }

  // ---------- Team member modal ----------
  const teamModal = document.getElementById('team-modal');
  const teamTriggers = Array.from(document.querySelectorAll<HTMLElement>('[data-team-open]'));

  if (teamModal && teamTriggers.length) {
    const teamPhoto = document.getElementById('team-modal-photo');
    const teamPhotoPlaceholder = teamPhoto?.firstElementChild ?? null;
    const teamName = document.getElementById('team-modal-name');
    const teamRole = teamModal.querySelector('.team-modal__role');
    const teamBio = teamModal.querySelector('.team-modal__bio');
    let teamLastFocused: HTMLElement | null = null;
    const teamInertTargets = Array.from(document.querySelectorAll<HTMLElement>('body > header, body > main'));

    const setTeamInert = (isInert: boolean) => {
      teamInertTargets.forEach((el) => {
        if (isInert) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
      });
    };

    const onTeamKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeTeam();
    };

    function openTeam(trigger: HTMLElement) {
      teamLastFocused = document.activeElement as HTMLElement | null;
      const name = trigger.getAttribute('data-team-name') || '';
      const role = trigger.getAttribute('data-team-role') || '';
      const photo = trigger.getAttribute('data-team-photo') || '';
      const bio = trigger.getAttribute('data-team-bio') || 'Bio coming soon.';

      if (teamName) teamName.textContent = name;
      if (teamRole) teamRole.textContent = role;
      if (teamBio) teamBio.textContent = bio;

      if (teamPhoto) {
        teamPhoto.replaceChildren();
        if (photo) {
          const img = document.createElement('img');
          img.src = `/_next/image?url=${encodeURIComponent(photo)}&w=640&q=80`;
          img.alt = '';
          teamPhoto.appendChild(img);
          teamPhoto.classList.add('has-photo');
        } else {
          if (teamPhotoPlaceholder) teamPhoto.appendChild(teamPhotoPlaceholder);
          teamPhoto.classList.remove('has-photo');
        }
      }

      teamModal!.hidden = false;
      document.documentElement.classList.add('has-team-open');
      document.addEventListener('keydown', onTeamKeydown);
      setTeamInert(true);

      const closeBtn = teamModal!.querySelector<HTMLElement>('.team-modal__close');
      closeBtn?.focus();
    }

    function closeTeam() {
      teamModal!.hidden = true;
      document.documentElement.classList.remove('has-team-open');
      document.removeEventListener('keydown', onTeamKeydown);
      setTeamInert(false);
      teamLastFocused?.focus();
    }

    const onTriggerClick = (event: Event) => openTeam(event.currentTarget as HTMLElement);
    teamTriggers.forEach((trigger) => trigger.addEventListener('click', onTriggerClick));
    const teamCloseEls = Array.from(teamModal.querySelectorAll('[data-team-close]'));
    teamCloseEls.forEach((el) => el.addEventListener('click', closeTeam));

    cleanups.push(() => {
      teamTriggers.forEach((trigger) => trigger.removeEventListener('click', onTriggerClick));
      teamCloseEls.forEach((el) => el.removeEventListener('click', closeTeam));
      document.removeEventListener('keydown', onTeamKeydown);
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
