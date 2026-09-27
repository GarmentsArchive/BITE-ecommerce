/**
 * BITE — Payment provider seam
 *
 * Checkout talks only to this module. Integrating a real provider
 * (Yoco, Peach, Paystack, Stripe) means implementing this interface
 * and swapping `activeProvider` — no checkout code changes.
 *
 * The default provider is deliberately NOT a simulator. It refuses,
 * loudly, so that nothing in this build can be mistaken for a
 * working payment path.
 */

export class PaymentNotConfiguredError extends Error {
  constructor() {
    super('No payment provider is configured for this BITE store.');
    this.name = 'PaymentNotConfiguredError';
    this.code = 'PROVIDER_NOT_CONFIGURED';
  }
}

/**
 * @typedef {Object} PaymentProvider
 * @property {string} id
 * @property {boolean} isConfigured
 * @property {(order: Object) => Promise<{status: string, reference: string}>} createPayment
 */

/** @type {PaymentProvider} */
export const unconfiguredProvider = {
  id: 'unconfigured',
  isConfigured: false,
  async createPayment() {
    throw new PaymentNotConfiguredError();
  },
};

/**
 * Swap this for a real adapter at integration time, e.g.
 *   export const activeProvider = createYocoProvider({ publicKey: … });
 */
export const activeProvider = unconfiguredProvider;

export function isPaymentConfigured() {
  return activeProvider.isConfigured === true;
}
