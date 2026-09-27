/**
 * BITE — Editorial Story Definitions
 *
 * Three things vary from spread to spread, deliberately:
 *
 *   layout   where the picture and the copy sit
 *   plate    how many photographs, and in what arrangement
 *   density  how much text the reader is given
 *
 * DENSITY is the one that matters most. If every spread carries the
 * same word count, varying the layout only reads as one spread being
 * rearranged. So the run cycles:
 *
 *   dense    standfirst + pull quote + marginalia, set in columns
 *   standard a single caption-length line
 *   sparse   a name, a price, and air
 *
 * PLATES draw on the models/ shots, which are product-in-hand images.
 * They are matched to the shade they actually show — a coral tube
 * cannot illustrate Cherry. Reuse across distant spreads is allowed
 * (magazines re-crop), never between neighbours.
 */

import { ASSETS } from './assets.js';

/**
 * Plate types:
 *   'single'   one photograph
 *   'diptych'  two at unequal widths, sharing a baseline
 *   'triptych' three hung from a common top rule
 *   'contact'  a tight proof-sheet grid
 *   'inset'    a small plate floated into the text, copy wrapping it
 */

export const EDITORIAL_STORIES = [
  {
    id: 'cherry',
    productId: 'cherry',
    number: '01',
    kicker: 'THE OPENING SHOT',
    title: 'CHERRY',
    subtitle: 'First fruit of the season',
    category: 'HIGH SHINE\nCHERRY PIGMENT',
    price: 'R199',
    cta: 'Shop Cherry',
    swatch: '#8B1A2B',

    layout: 'center-offset',
    media: 'image',
    density: 'dense',
    dropCap: true,
    columns: 2,

    image: ASSETS.images.bitingCherry,
    alt: 'Model biting into a dark cherry, lips glossed in deep red',

    standfirst:
      'It starts, as these things do, with a fruit held up to the light. Cherry is the shade the whole issue is built around: a red with weight to it, glossed until it catches every lamp in the room. It is not a subtle colour and was never meant to be. Worn thin it reads as a stain; worn thick it reads as a decision.',

    pullQuote: 'A red with weight to it.',

    marginalia: 'Polybutene · Cannabis Sativa Seed Oil · Prunus Avium Fruit Extract · Tocopheryl Acetate',

    // Cherry-red tubes only.
    plate: {
      type: 'triptych',
      images: [
        { src: ASSETS.models.holdingTube2,   caption: 'Cherry, hand-held' },
        { src: ASSETS.models.holdingProduct, caption: 'The tube' },
        { src: ASSETS.models.handGloss2,     caption: 'Second coat' },
      ],
    },
  },

  {
    id: 'citrus',
    productId: 'citrus',
    number: '02',
    kicker: 'COLOUR STUDY',
    title: 'CITRUS',
    subtitle: 'Golden hour, bottled',
    category: 'WARM GLOW\nBLOOD ORANGE',
    price: 'R179',
    cta: 'Shop Citrus',
    swatch: '#D4652A',

    layout: 'right-heavy',
    media: 'frames',
    density: 'standard',

    image: ASSETS.images.holdingBloodOrange,
    alt: 'Model holding a blood orange slice beside a glossed mouth',
    frameSequence: 'bloodOrange',

    description:
      'Sun on skin, juice on lips — a blood orange gloss that catches light the way Cape Town catches golden hour.',

    // Coral-orange tubes, matching the shade.
    plate: {
      type: 'diptych',
      images: [
        { src: ASSETS.models.holdingLipstick1, caption: 'Blood orange' },
        { src: ASSETS.models.handLipProduct,   caption: 'Warm coral' },
      ],
    },
  },

  {
    id: 'plum',
    productId: 'plum-pout',
    number: '03',
    kicker: null,
    title: 'PLUM',
    subtitle: 'After midnight',
    category: 'DEEP PIGMENT',
    price: 'R189',
    cta: 'Shop Plum',
    swatch: '#5C1A3D',

    layout: 'full-bleed',
    media: 'video',
    // Nothing but the name and the price. The film does the talking.
    density: 'sparse',

    image: ASSETS.images.wearingPlumGloss,
    alt: 'Model wearing deep plum gloss against a dark ground',
    video: ASSETS.videos.slicedPlum,
    poster: ASSETS.images.wearingPlumGloss,

    plate: { type: 'single', images: [{ src: ASSETS.models.handUnderChin, caption: 'Plum, under the chin' }] },
  },

  {
    id: 'strawberry',
    productId: 'strawberry',
    number: '04',
    kicker: 'ON THE LIP',
    title: 'STRAWBERRY',
    subtitle: 'Sweet, and aware of it',
    category: 'HIGH SHINE\nBERRY CRUSH',
    price: 'R179',
    cta: 'Shop Strawberry',
    swatch: '#C42847',

    layout: 'minimal',
    media: 'image',
    density: 'standard',
    // Copy flows around the inset plate.
    wrap: true,

    image: ASSETS.images.pressingStrawberry,
    alt: 'Model pressing a strawberry against her lower lip',

    description:
      'Pink that means it. A gloss that tastes like summer and looks like you have just kissed something sweet — the exact colour of the fruit at the moment it gives.',

    plate: {
      type: 'inset',
      images: [{ src: ASSETS.models.holdingWatermelon, caption: 'Berry crush' }],
    },
  },
];

export const EDITORIAL_EXTENDED = [
  ...EDITORIAL_STORIES,

  {
    id: 'grape',
    productId: 'red-grape',
    number: '05',
    kicker: 'THE LONG READ',
    title: 'GRAPE',
    subtitle: 'Wine-dark',
    category: 'ANTIOXIDANT OIL\nGRAPE SHEEN',
    price: 'R189',
    cta: 'Shop Grape',
    swatch: '#6B2D5B',

    layout: 'asymmetric',
    media: 'frames',
    density: 'dense',
    columns: 3,

    image: ASSETS.images.holdingGrapes1,
    alt: 'Model holding a bunch of dark grapes near her mouth',
    frameSequence: 'grape',

    standfirst:
      'Grapeseed oil has been pressed into cosmetics since long before anyone thought to put the word antioxidant on a carton. What it does for a lip oil is simple enough: it carries pigment without dulling it, and it leaves a sheen that sits somewhere between wet and polished. The colour it carries here is closer to wine than to fruit — a purple-red that goes almost brown in low light and turns properly violet in the sun.',

    pullQuote: 'Almost brown in low light. Violet in the sun.',

    marginalia: 'Vitis Vinifera Seed Oil · Resveratrol · Jojoba Esters · Tocopheryl Acetate',

    plate: {
      type: 'diptych',
      images: [
        { src: ASSETS.models.holdingTube1, caption: 'Wine-dark' },
        { src: ASSETS.models.handLipStain, caption: 'Depth test' },
      ],
    },
  },

  {
    id: 'peach',
    productId: 'glossed-peach',
    number: '06',
    kicker: null,
    title: 'PEACH',
    subtitle: 'Barely there',
    category: 'KERNEL OIL',
    price: 'R179',
    cta: 'Shop Peach',
    swatch: '#E8A87C',

    layout: 'type-behind',
    media: 'image',
    // A contact sheet and one line. Let the page breathe.
    density: 'sparse',

    image: ASSETS.images.holdingPeach,
    alt: 'Model holding a ripe peach beside softly glossed lips',

    // Nude and peach shots only.
    plate: {
      type: 'contact',
      images: [
        { src: ASSETS.models.holdingPeach,        caption: 'Peach' },
        { src: ASSETS.models.holdingGloss1,       caption: 'Nude wash' },
        { src: ASSETS.models.holdingAgainstChin,  caption: 'Warm skin' },
      ],
    },
  },

  {
    id: 'dark-cherry',
    productId: 'dark-cherry',
    number: '07',
    kicker: 'COLOUR STUDY',
    title: 'DARK CHERRY',
    subtitle: 'Cherry, older',
    category: 'RICH PIGMENT\nBURGUNDY OIL',
    price: 'R199',
    cta: 'Shop Dark Cherry',
    swatch: '#4A0E1A',

    layout: 'reverse',
    media: 'video',
    density: 'standard',

    image: ASSETS.images.bitingDarkCherry,
    alt: 'Model biting a dark cherry, burgundy pigment on the lip',
    video: ASSETS.videos.glossyLips2,
    poster: ASSETS.images.bitingDarkCherry,

    description:
      'The same formula, taken somewhere darker. Deeper, moodier, more considered — for mouths that have something to say and intend to say it slowly.',

    pullQuote: 'For mouths that have something to say.',

    plate: { type: 'single', images: [{ src: ASSETS.models.holdingLipstick3, caption: 'Burgundy' }] },
  },

  {
    id: 'raspberry-ed',
    productId: 'raspberry',
    number: '08',
    kicker: null,
    title: 'RASPBERRY',
    subtitle: 'It stains',
    category: 'LIP STAIN',
    price: 'R189',
    cta: 'Shop Raspberry',
    swatch: '#A8235A',

    layout: 'right-heavy',
    media: 'frames',
    // Two words of copy. The shortest spread in the issue.
    density: 'sparse',

    image: ASSETS.images.pressingRaspberries,
    alt: 'Model pressing raspberries to stained fuchsia lips',
    frameSequence: 'raspberry',

    plate: {
      type: 'diptych',
      images: [
        { src: ASSETS.models.holdingLipstick2, caption: 'Fuchsia' },
        { src: ASSETS.models.handLipstick,     caption: 'Blotted back' },
      ],
    },
  },

  {
    id: 'flash',
    productId: 'strawberry-flash',
    number: '09',
    kicker: 'THE CLOSER',
    title: 'FLASH',
    subtitle: 'Subtlety is not the point',
    category: 'HIGH COLOUR\nELECTRIC BERRY',
    price: 'R169',
    cta: 'Shop Flash',
    swatch: '#E33B5A',

    layout: 'full-bleed',
    media: 'image',
    density: 'dense',
    columns: 2,

    image: ASSETS.images.holdingStrawberry,
    alt: 'Model holding a strawberry to vivid red lips',

    standfirst:
      'Every issue needs something at the end that refuses to be reasonable. Flash is strawberry with the volume turned all the way up: full pigment, no sheerness to hide behind, a colour that announces itself from across a room. One swipe is the whole application. Blot it if you must, but the point of this shade is that you do not.',

    pullQuote: 'One swipe is the whole application.',

    plate: {
      type: 'single',
      images: [{ src: ASSETS.models.handLipProduct, caption: 'Full pigment' }],
    },
  },
];

/** Sequences held as full-viewport pinned moments on the Editorial page. */
export const PINNED_MOMENTS = [
  { after: 'citrus', sequence: 'watermelon',  caption: 'WATERMELON — ISSUE 01 — CAPE TOWN' },
  { after: 'peach',  sequence: 'pomegranate', caption: 'POMEGRANATE — ISSUE 01 — CAPE TOWN' },
];
