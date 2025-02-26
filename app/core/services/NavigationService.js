/**
 * Service for handling navigation in the application
 */
export class NavigationService {
  /**
   * @param {Object} router - The router instance
   */
  constructor(router) {
    this.router = router;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - URL to navigate to
   */
  navigateTo(url) {
    // Clear stored location if navigating to home
    if (url === '/' || url === '' || url.endsWith('/')) {
      localStorage.removeItem('location');
      localStorage.removeItem('ayah');
    }
    
    history.pushState(null, null, url);
    this.router.route();
  }

  /**
   * Handle navigation based on stored state on page load
   */
  handleStoredNavigation() {
    // Don't redirect if explicitly at home page
    if (location.pathname === '/' || location.pathname === '') {
      localStorage.removeItem('location');
      localStorage.removeItem('ayah');
      return;
    }
    
    // Check if we're on a surah page but using a direct URL (e.g., not from localStorage navigation)
    // If the path starts with a slash and has more characters, we're probably on a surah page
    if (location.pathname.startsWith('/') && location.pathname.length > 1) {
      // We're already on a specific surah page, don't redirect
      localStorage.removeItem('location');
      localStorage.removeItem('ayah');
      return;
    }
    
    // Only handle stored navigation if not already on a specific page
    const storedLocation = localStorage.getItem('location');
    
    if (storedLocation) {
      const storedAyah = localStorage.getItem('ayah');
      
      // Only redirect if we have both a location and ayah stored
      if (storedAyah && !location.pathname.includes(storedLocation)) {
        window.location.href = `/${storedLocation}#${storedAyah}`;
      }
      
      // Always clean up localStorage to prevent future redirects
      localStorage.removeItem('location');
      localStorage.removeItem('ayah');
    }
  }
} 