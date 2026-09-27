/**
 * BITE — Product Catalog
 * Centralized product data structure. All product info lives here.
 * Easy to extend with additional products later.
 */

import { ASSETS } from './assets.js';

const RAW_PRODUCTS = [
  {
    id: 'cherry',
    name: 'BITE Kush Lip Oil',
    shade: 'Cherry',
    shortName: 'Cherry',
    tagline: 'The red one.',
    description: 'A high-shine lip oil infused with cherry pigment and hemp-derived cannabis seed oil. Delivers juicy, buildable colour with a glossy, non-sticky finish that lasts.',
    price: 199,
    currency: 'R',
    category: 'Lip Oil',
    images: {
      product: ASSETS.products.cherry,
      editorial: ASSETS.images.bitingCherry,
      editorial2: ASSETS.images.holdingCherries,
      model: ASSETS.models.holdingLipstick1,
    },
    frameSequence: 'cherryGlitter',
    video: ASSETS.videos.cherryClosing,
    color: '#8B1A2B',
    ingredients: 'Polybutene, Octyldodecanol, Cannabis Sativa Seed Oil, Jojoba Esters, Prunus Avium (Cherry) Fruit Extract, Tocopheryl Acetate, Flavor, CI 15850, CI 77491.',
    usage: 'Apply directly to lips from the doe-foot applicator. Layer for more intense colour. Can be worn alone or over your favourite lip liner.',
    availability: 'In Stock',
    featured: true,
    editorialOrder: 1,
  },
  {
    id: 'dark-cherry',
    name: 'BITE Kush Lip Oil',
    shade: 'Dark Cherry',
    shortName: 'Dark Cherry',
    tagline: 'The deep one.',
    description: 'An ultra-rich, deeply pigmented lip oil that delivers intense burgundy colour. The same nourishing formula with a bolder, moodier finish.',
    price: 199,
    currency: 'R',
    category: 'Lip Oil',
    images: {
      product: ASSETS.products.darkCherry,
      editorial: ASSETS.images.bitingDarkCherry,
      editorial2: ASSETS.images.holdingCherry2,
      model: ASSETS.models.holdingLipstick3,
    },
    frameSequence: 'raspberry',
    video: ASSETS.videos.glossyLips1,
    color: '#4A0E1A',
    ingredients: 'Polybutene, Octyldodecanol, Cannabis Sativa Seed Oil, Jojoba Esters, Prunus Avium (Cherry) Fruit Extract, Tocopheryl Acetate, Flavor, CI 15850, CI 77491, CI 77499.',
    usage: 'Apply directly to lips from the doe-foot applicator. Build intensity as desired. Perfect for evening or editorial looks.',
    availability: 'In Stock',
    featured: true,
    editorialOrder: 2,
  },
  {
    id: 'citrus',
    name: 'BITE Citrus Gloss',
    shade: 'Blood Orange',
    shortName: 'Citrus',
    tagline: 'The bright one.',
    description: 'A vibrant citrus-infused lip gloss with suspended botanical zest particles. Delivers a warm, sun-kissed orange-pink glow with real citrus essence.',
    price: 179,
    currency: 'R',
    category: 'Lip Gloss',
    images: {
      product: ASSETS.products.citrus,
      editorial: ASSETS.images.holdingBloodOrange,
      editorial2: ASSETS.images.wearingRedGloss,
      model: ASSETS.models.handGloss1,
    },
    frameSequence: 'bloodOrange',
    video: ASSETS.videos.citrusMacro,
    color: '#D4652A',
    ingredients: 'Polybutene, Hydrogenated Polyisobutene, Citrus Sinensis (Blood Orange) Peel Oil, Citrus Aurantium Dulcis Peel Extract, Jojoba Esters, Tocopheryl Acetate, Flavor, CI 15850, CI 77491.',
    usage: 'Glide the doe-foot applicator across lips for a sheer wash of citrus colour. Layer for increased warmth and vibrancy.',
    availability: 'In Stock',
    featured: true,
    editorialOrder: 3,
  },
  {
    id: 'strawberry',
    name: 'BITE Strawberry Bite',
    shade: 'Strawberry',
    shortName: 'Strawberry',
    tagline: 'The juicy one.',
    description: 'A high-shine lip gloss with real strawberry extract. The perfect balance of pink and red, delivering the exact colour of biting into a ripe strawberry.',
    price: 179,
    currency: 'R',
    category: 'Lip Gloss',
    images: {
      product: ASSETS.products.strawberry,
      editorial: ASSETS.images.pressingStrawberry,
      editorial2: ASSETS.images.wearingPinkGloss,
      model: ASSETS.models.holdingGlossTube,
    },
    frameSequence: 'strawberry',
    video: ASSETS.videos.strawberryPout,
    color: '#C42847',
    ingredients: 'Polybutene, Octyldodecanol, Fragaria Ananassa (Strawberry) Fruit Extract, Jojoba Esters, Tocopheryl Acetate, Flavor, CI 15850, CI 77891.',
    usage: 'Sweep across lips for a sheer berry stain. Build layers for a bolder strawberry red. Tastes as good as it looks.',
    availability: 'In Stock',
    featured: true,
    editorialOrder: 4,
  },
  {
    id: 'raspberry',
    name: 'BITE Lip Stain',
    shade: 'Raspberry',
    shortName: 'Raspberry',
    tagline: 'The bold one.',
    description: 'A long-wearing lip stain in high-intensity fuchsia-raspberry. Delivers matte-to-satin colour that melts into lips and stays put for hours.',
    price: 189,
    currency: 'R',
    category: 'Lip Stain',
    images: {
      product: ASSETS.products.raspberry,
      editorial: ASSETS.images.pressingRaspberries,
      editorial2: ASSETS.images.wearingDarkGloss1,
      model: ASSETS.models.handLipStain,
    },
    frameSequence: 'raspberry',
    video: ASSETS.videos.raspberryMoving,
    color: '#A8235A',
    ingredients: 'Aqua, Propylene Glycol, Rubus Idaeus (Raspberry) Fruit Extract, PVP, CI 15850, CI 42090, CI 77891, Phenoxyethanol.',
    usage: 'Apply thin layers to clean, dry lips. Allow 30 seconds to set. The stain deepens and lasts up to 8 hours.',
    availability: 'In Stock',
    featured: false,
    editorialOrder: 5,
  },
  {
    id: 'glossed-peach',
    name: 'BITE Glossed Peach',
    shade: 'Peach',
    shortName: 'Peach',
    tagline: 'The soft one.',
    description: 'A nourishing lip gloss with a warm peachy-nude finish. Enriched with real peach kernel oil for soft, hydrated lips with a delicate sheen.',
    price: 179,
    currency: 'R',
    category: 'Lip Gloss',
    images: {
      product: ASSETS.products.glossedPeach,
      editorial: ASSETS.images.holdingPeach,
      editorial2: null,
      model: ASSETS.models.holdingPeach,
    },
    frameSequence: 'peach',
    video: ASSETS.videos.peachMoving,
    color: '#E8A87C',
    ingredients: 'Polybutene, Octyldodecanol, Prunus Persica (Peach) Kernel Oil, Jojoba Esters, Tocopheryl Acetate, Flavor, CI 77491, CI 77492.',
    usage: 'Smooth onto lips for a barely-there peachy glow. Perfect for everyday wear. Pairs beautifully with a warm lip liner.',
    availability: 'In Stock',
    featured: false,
    editorialOrder: 6,
  },
  {
    id: 'plum-pout',
    name: 'BITE Lip Gloss',
    shade: 'Plum Pout',
    shortName: 'Plum',
    tagline: 'The dark one.',
    description: 'A deeply pigmented lip gloss in rich plum. Delivers dramatic, editorial colour with high-shine finish. For when you want your lips to make a statement.',
    price: 189,
    currency: 'R',
    category: 'Lip Gloss',
    images: {
      product: ASSETS.products.plumPout,
      editorial: ASSETS.images.wearingPlumGloss,
      editorial2: ASSETS.images.wearingDarkGloss2,
      model: ASSETS.models.handUnderChin,
    },
    frameSequence: 'plum',
    video: ASSETS.videos.slicedPlum,
    color: '#5C1A3D',
    ingredients: 'Polybutene, Octyldodecanol, Prunus Domestica (Plum) Seed Oil, Jojoba Esters, Tocopheryl Acetate, Flavor, CI 15850, CI 77491, CI 77499.',
    usage: 'Apply in one bold swipe for instant drama. Layer for even deeper plum intensity. Best applied with confidence.',
    availability: 'In Stock',
    featured: false,
    editorialOrder: 7,
  },
  {
    id: 'red-grape',
    name: 'BITE Lip Oil',
    shade: 'Red Grape',
    shortName: 'Grape',
    tagline: 'The lush one.',
    description: 'A grape-infused lip oil with antioxidant-rich grapeseed extract. Delivers a sophisticated purple-red sheen that feels as luxurious as it looks.',
    price: 189,
    currency: 'R',
    category: 'Lip Oil',
    images: {
      product: ASSETS.products.redGrape,
      editorial: ASSETS.images.holdingGrapes1,
      editorial2: ASSETS.images.holdingGrapes2,
      model: ASSETS.models.handLipProduct,
    },
    frameSequence: 'grape',
    video: ASSETS.videos.grapeEditorial,
    color: '#6B2D5B',
    ingredients: 'Polybutene, Octyldodecanol, Vitis Vinifera (Grape) Seed Oil, Jojoba Esters, Resveratrol, Tocopheryl Acetate, Flavor, CI 15850, CI 77491, CI 77499.',
    usage: 'Glide across lips for a sheer grape wash. Build layers for a deeper, wine-stained effect. The perfect date-night shade.',
    availability: 'In Stock',
    featured: false,
    editorialOrder: 8,
  },
  {
    id: 'strawberry-flash',
    name: 'BITE Strawberry Flash',
    shade: 'Strawberry Flash',
    shortName: 'Flash',
    tagline: 'The vivid one.',
    description: 'An intense, high-pigment lip colour in electric strawberry. Bolder than the original Strawberry Bite — this is strawberry turned up.',
    price: 169,
    currency: 'R',
    category: 'Lip Colour',
    images: {
      product: ASSETS.products.strawberryFlash,
      editorial: ASSETS.images.holdingStrawberry,
      editorial2: null,
      model: ASSETS.models.holdingGloss1,
    },
    frameSequence: 'strawberryY2K',
    video: ASSETS.videos.strawberryCamera,
    color: '#E33B5A',
    ingredients: 'Isododecane, Dimethicone, Fragaria Ananassa (Strawberry) Fruit Extract, CI 15850, CI 77891, Tocopheryl Acetate, Flavor.',
    usage: 'One bold swipe delivers full, vivid strawberry colour. Can be blotted for a softer stain effect.',
    availability: 'In Stock',
    featured: false,
    editorialOrder: 9,
  },
];

/**
 * Shipping and returns copy.
 *
 * Held here rather than repeated on every product so it can be
 * edited in one place. Individual products may override either
 * field. These are PLACEHOLDERS — swap them for the real policy
 * before launch rather than treating them as commitments.
 */
export const POLICY = {
  shipping:
    'Orders are packed within 1–2 business days. Standard delivery reaches most South African addresses in 3–5 business days; express in 1–2. Delivery is charged at checkout and is free on orders over R500. [PLACEHOLDER — confirm carrier, lead times and rates before launch.]',
  returns:
    'Unopened products may be returned within 14 days of delivery for a full refund. For hygiene reasons, opened lip products can only be returned if faulty. Return postage is covered by BITE where the item is faulty. [PLACEHOLDER — confirm the returns process and address before launch.]',
};

/**
 * Fill in everything the catalogue can derive, so each product
 * entry only has to state what is genuinely specific to it.
 */
function normalizeProduct(product) {
  return {
    editorialImages: [
      product.images.editorial,
      product.images.editorial2,
      product.images.model,
    ].filter(Boolean),
    editorialFrames: product.frameSequence || null,
    shipping: POLICY.shipping,
    returns: POLICY.returns,
    ...product,
  };
}

export const PRODUCTS = RAW_PRODUCTS.map(normalizeProduct);

/**
 * Get product by ID
 * @param {string} id
 * @returns {Object|undefined}
 */
export function getProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

/**
 * Get featured products
 * @returns {Array}
 */
export function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured).sort((a, b) => a.editorialOrder - b.editorialOrder);
}

/**
 * Format price with currency
 * @param {number} price
 * @param {string} currency
 * @returns {string}
 */
export function formatPrice(price, currency = 'R') {
  return `${currency}${price}`;
}
