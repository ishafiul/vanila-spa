import { full } from "./db/arabic.js";
import { en } from "./db/english.js";
import { name } from "./db/name.js";
import { Router } from './router.js';
import { HomeView } from './views/HomeView.js';
import { ErrorView } from './views/ErrorView.js';
import { SurahView } from './views/SurahView.js';
import { NavigationService } from './services/NavigationService.js';
import { LocalStorageService } from './services/LocalStorageService.js';

// Initialize services and application
const router = new Router();
const navigationService = new NavigationService(router);
const localStorageService = new LocalStorageService();

// Set up routes
router.addRoute('/', HomeView);
router.addRoute('/error', ErrorView);

// Add surah routes dynamically
name.forEach(surah => {
  router.addRoute(`/${surah.englishName}`, () => new SurahView(surah, full, en).render());
});

// Setup event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Always clear localStorage on page load when accessing directly via URL
  // This prevents redirect loops
  if (document.referrer === '' || !document.referrer.includes(window.location.host)) {
    localStorage.removeItem('location');
    localStorage.removeItem('ayah');
  }
  
  // Only handle stored navigation if we're on the home page
  if (window.location.pathname === '/' || window.location.pathname === '') {
    // Handle stored navigation state on page load
    navigationService.handleStoredNavigation();
  }
  
  // Setup click handlers for navigation links
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      const href = e.target.href;
      
      // Clear localStorage if navigating to home
      if (href.endsWith('/') || href === window.location.origin) {
        localStorage.removeItem('location');
        localStorage.removeItem('ayah');
      }
      
      navigationService.navigateTo(e.target.href);
    }
  });
  
  // Initialize the router
  router.route();
  
  // Generate navigation menu
  renderNavigation();
});

// Handle browser back/forward navigation
window.addEventListener("popstate", () => router.route());

/**
 * Renders the navigation menu with all surahs
 */
function renderNavigation() {
  const navElement = document.getElementById('nav');
  const currentPath = window.location.pathname;
  // Remove the leading slash from the path to get the surah name
  const currentSurah = currentPath.substring(1);
  
  const navItems = name.map(surah => {
    // Check if this surah is the current one
    const isCurrentSurah = currentSurah === surah.englishName;
    // Add highlight classes when this is the current surah
    const highlightClass = isCurrentSurah 
      ? 'bg-green-100 border-green-500 shadow-lg animate-pulse' 
      : 'hover:shadow-lg focus:border-green-200 focus:bg-green-100';
    
    return `
      <a 
        href="/${surah.englishName}" 
        data-link 
        class="text-xl border-2 rounded-md p-4 ${highlightClass} flex items-center gap-4 font-semibold transition-all duration-300"
        ${isCurrentSurah ? 'id="currentSurah"' : ''}
      >
        <div class="bg-slate-500 rounded-full h-12 w-12 p-2 flex justify-center items-center text-white font-normal">${surah.number}</div> 
        ${surah.englishName}
      </a>
    `;
  }).join('');
  
  navElement.innerHTML = navItems;
  
  // Scroll to the currently selected surah in the navigation
  const currentSurahElement = document.getElementById('currentSurah');
  if (currentSurahElement) {
    setTimeout(() => {
      currentSurahElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
}

// Make renderNavigation globally accessible
window.renderNavigation = renderNavigation;




