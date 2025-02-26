/**
 * Service for handling localStorage operations
 */
export class LocalStorageService {
  /**
   * Get an item from localStorage
   * @param {string} key - Key to retrieve
   * @returns {string|null} The stored value or null
   */
  getItem(key) {
    return localStorage.getItem(key);
  }

  /**
   * Set an item in localStorage
   * @param {string} key - Key to store
   * @param {string} value - Value to store
   */
  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  /**
   * Remove an item from localStorage
   * @param {string} key - Key to remove
   */
  removeItem(key) {
    localStorage.removeItem(key);
  }

  /**
   * Clear all items from localStorage
   */
  clear() {
    localStorage.clear();
  }
} 