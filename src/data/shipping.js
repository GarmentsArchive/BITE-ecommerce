/**
 * BITE — Delivery options
 *
 * Rates and lead times are PLACEHOLDERS. They are held here, in one
 * place, so they can be replaced with the real carrier's figures
 * (or fetched from a shipping provider) without touching checkout.
 */

export const FREE_DELIVERY_THRESHOLD = 500;

export const DELIVERY_OPTIONS = [
  {
    id: 'standard',
    label: 'Standard Delivery',
    detail: '3–5 business days',
    price: 60,
    isDefault: true,
  },
  {
    id: 'express',
    label: 'Express Delivery',
    detail: '1–2 business days',
    price: 120,
    isDefault: false,
  },
];

export function getDeliveryOption(id) {
  return DELIVERY_OPTIONS.find(o => o.id === id) || DELIVERY_OPTIONS[0];
}

/**
 * Delivery is free above the threshold — including on express, which
 * is a deliberate choice rather than an oversight. Change here.
 */
export function getDeliveryCost(optionId, subtotal) {
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
  return getDeliveryOption(optionId).price;
}
