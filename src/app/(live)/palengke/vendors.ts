// FACT 2026 Palengke lineup, condensed from the vendors' own application
// answers ("What items will you be selling?"), with booth numbers from the
// committee's per-day floor maps (public/images/palengke). Market times and
// venues come from the agenda (schedule.ts), not from here.

export type MarketDay = 'fri' | 'sat';

export type MenuItem = {
  name: string;
  detail: string;
  /** Dietary notes, e.g. "Vegan". */
  tags?: string[];
  contains?: string;
};

export type Vendor = {
  name: string;
  /** Booth number on each day the vendor sells, from the committee's floor maps. */
  booths: Partial<Record<MarketDay, number>>;
  offering: string;
  menu?: {
    note: string;
    items: MenuItem[];
    combos: string[];
  };
};

export const VENDORS: Vendor[] = [
  {
    name: 'Buttons Bakehouse',
    booths: { fri: 7 },
    offering:
      'Cookies: chocolate chip, double chocolate, and sugar, plus possibly ube pandan, matcha, Thai tea, sesame, and other Asian flavors.',
  },
  {
    name: 'Asian American Association',
    booths: { fri: 3 },
    offering: 'Ube brownies.',
  },
  {
    name: 'Quin-Quin’s Pinoy StreetFood',
    booths: { sat: 8 },
    offering: 'Authentic Filipino street food.',
  },
  {
    name: 'Ligayang Lutuan',
    booths: { sat: 11 },
    offering: 'Siomai and leche flan.',
  },
  {
    name: 'Chicago Test Kitchen',
    booths: { sat: 9 },
    offering:
      'Filipino-inspired grab-and-go bites: chilled flavored taho, ube and guava cream cheese buns, garlic corned beef buns, pork floss ensaymada, longganisa pesto buns, chicken asado pao, mini ube/pandan brûlée cakes, and polvoron.',
  },
  {
    name: 'Boondock Grill and Gather',
    booths: { sat: 10 },
    offering: 'Adobo sliders, lumpia, pancit, and Filipino spaghetti. The whole menu is dairy-free.',
    menu: {
      note: 'Every item comes with a mini water bottle. Dairy-free across all items; soy only in the adobo and pancit.',
      items: [
        {
          name: 'Adobo Flake Sliders (2 pcs)',
          detail:
            'Chicken adobo flakes marinated in coconut milk, with caramelized onions on sweet Hawaiian bread. Choice of plain, BBQ, or salt and vinegar chips.',
          contains: 'Wheat, soy, coconut',
        },
        {
          name: 'Lumpia Shanghai (6 pcs)',
          detail: 'Crispy pork lumpia with seasoned ground pork and vegetables, and a light, soy-free dipping sauce.',
          contains: 'Wheat',
        },
        {
          name: 'Vegetarian Egg Rolls (6 pcs)',
          detail: 'Crispy vegetable egg rolls with a bright, soy-free ginger dipping sauce.',
          tags: ['Vegan'],
          contains: 'Wheat',
        },
        {
          name: 'Vegan Pancit Bihon (small bowl)',
          detail: 'Thin rice noodles stir-fried with mixed vegetables in a savory seasoning blend.',
          tags: ['Vegan'],
          contains: 'Soy',
        },
        {
          name: 'Filipino Spaghetti (small bowl)',
          detail: 'Sweet-savory Filipino-style spaghetti, made without dairy or soy.',
          contains: 'Wheat',
        },
      ],
      combos: ['A: Pancit + Lumpia', 'B: Spaghetti + Egg Roll', 'C: Slider + Lumpia'],
    },
  },
  {
    name: 'michypoo’s shop',
    booths: { fri: 8 },
    offering: 'Stickers, sticker sheets, and keychains.',
  },
  {
    name: 'Clownerina',
    booths: { fri: 1 },
    offering: 'Prints of original artwork, stickers, postcards, and possibly a few original pieces.',
  },
  {
    name: 'gracszz',
    booths: { fri: 4, sat: 5 },
    offering: 'Cute art: stickers, keychains, and prints, plus maybe some leftover Pokémon cards.',
  },
  {
    name: 'CrochetCama',
    booths: { sat: 13 },
    offering: 'Crochet stuffed animals, accessories, and keychains.',
  },
  {
    name: 'YPArtistry',
    booths: { sat: 14 },
    offering:
      'Animal and pop-culture stickers and earrings, plus crochet plushies, keychains, tote bags, and accessories.',
  },
  {
    name: 'Pamilya Press LLC',
    booths: { sat: 1 },
    offering: 'Copies of the picture book Time to Shine: A Filipino American Family Story.',
  },
  {
    name: 'Suki Jewels',
    booths: { fri: 2 },
    offering: 'Handmade necklaces, keychains, bracelets, and more.',
  },
  {
    name: 'Full Bloom Jewelry',
    booths: { sat: 6 },
    offering:
      'Handmade necklaces, bracelets, keychains, and earrings, mostly stainless steel with glass and gemstone beads.',
  },
  {
    name: 'Mutuc Clay',
    booths: { sat: 12 },
    offering: 'Handmade earrings.',
  },
  {
    name: 'CataggatanCloset',
    booths: { sat: 15 },
    offering: 'Secondhand clothing and accessories: vintage, Y2K, fem, streetwear, and more.',
  },
  {
    name: 'Abakada',
    booths: { sat: 16 },
    offering: 'Clothing.',
  },
  {
    name: 'Team FACT',
    booths: { fri: 6, sat: 7 },
    offering: 'Photo cards and food.',
  },
  {
    name: 'AZA Essentials',
    booths: { fri: 5, sat: 3 },
    offering: 'AZA-themed shirts, stickers, and tattoo stickers.',
  },
  {
    name: 'The PUSO Foundation',
    booths: { sat: 2 },
    offering: 'Logo merch from a new fall line, likely T-shirts and a hoodie or two.',
  },
  {
    name: 'Midwest Association of Filipino Americans (MAFA)',
    booths: { sat: 4 },
    offering: 'MAFA T-shirts, pins, and phone trinkets.',
  },
];
