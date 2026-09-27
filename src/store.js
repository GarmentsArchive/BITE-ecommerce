import { getProduct } from './data/products.js';

const STORAGE_KEY = 'bite-cart';

export const cartStore = {
  items: [],
  subscribers: [],

  _load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.items = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    }
  },

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  },

  _notify() {
    this.subscribers.forEach(cb => cb(this.items));
  },

  getItems() {
    if (this.items.length === 0) this._load();
    return this.items;
  },

  addItem(productId, quantity = 1) {
    this.getItems();
    const existing = this.items.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ productId, quantity });
    }
    this._save();
    this._notify();
  },

  removeItem(productId) {
    this.getItems();
    this.items = this.items.filter(item => item.productId !== productId);
    this._save();
    this._notify();
  },

  updateQuantity(productId, quantity) {
    this.getItems();
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const existing = this.items.find(item => item.productId === productId);
    if (existing) {
      existing.quantity = quantity;
      this._save();
      this._notify();
    }
  },

  getCount() {
    this.getItems();
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getSubtotal() {
    this.getItems();
    return this.items.reduce((sum, item) => {
      const product = getProduct(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  clear() {
    this.items = [];
    this._save();
    this._notify();
  },

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }
};

cartStore._load();
