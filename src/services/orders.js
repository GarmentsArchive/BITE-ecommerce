/**
 * BITE — Order assembly
 *
 * Turns the cart plus the checkout form into a single order payload.
 * This is the shape a backend or payment provider would receive, so
 * the boundary is already drawn even though nothing is wired to it.
 */

import { getProduct, formatPrice } from '../data/products.js';
import { getDeliveryOption, getDeliveryCost } from '../data/shipping.js';
import { activeProvider } from './payment.js';

export function buildOrder({ items, customer, deliveryOptionId }) {
  const lines = items.map(item => {
    const product = getProduct(item.productId);
    return {
      productId: item.productId,
      name: product?.name ?? 'Unknown product',
      shade: product?.shade ?? '',
      unitPrice: product?.price ?? 0,
      quantity: item.quantity,
      lineTotal: (product?.price ?? 0) * item.quantity,
    };
  });

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const delivery = getDeliveryOption(deliveryOptionId);
  const deliveryCost = getDeliveryCost(deliveryOptionId, subtotal);

  return {
    currency: 'ZAR',
    lines,
    subtotal,
    delivery: {
      id: delivery.id,
      label: delivery.label,
      cost: deliveryCost,
    },
    total: subtotal + deliveryCost,
    customer,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Hand the order to the configured provider.
 * Throws PaymentNotConfiguredError while none is set up.
 */
export async function placeOrder(order) {
  return activeProvider.createPayment(order);
}

export { formatPrice };
