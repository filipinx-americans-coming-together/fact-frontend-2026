// Scopes live's page chrome (cream ground, violet frame, Fraunces/Jost type
// — see .live-page in globals.css) to just these routes, so it doesn't leak
// onto 2025's untouched admin/facilitator/my-fact/gallery/etc pages, which
// keep the plain `body` rule instead.
export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return <div className="live-page">{children}</div>;
}
