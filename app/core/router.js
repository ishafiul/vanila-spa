/**
 * Simple client-side router for SPA
 */
export class Router {
  constructor() {
    this.routes = {};
  }

  /**
   * Add a route to the router
   * 
   * @param {string} path - Route path
   * @param {Function} view - View constructor or render function
   */
  addRoute(path, view) {
    this.routes[path] = view;
  }

  /**
   * Get the view for a specific path
   * 
   * @param {string} path - Route path
   * @returns {Function|null} View constructor or render function
   */
  getView(path) {
    return this.routes[path] || this.routes['/error'];
  }

  /**
   * Route to the current URL
   */
  route() {
    const path = window.location.pathname;
    const view = this.getView(path);

    if (typeof view === 'function') {
      // Handle view as a function that renders content
      if (view.prototype && view.prototype.render) {
        // It's a class, instantiate it and call render
        new view().render();
      } else {
        // It's a function, call it directly
        view();
      }
    }
  }
} 