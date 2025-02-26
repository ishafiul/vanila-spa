/**
 * View component for displaying error pages
 */
export class ErrorView {
  /**
   * Render the error view
   */
  render() {
    this.renderErrorContent();
    this.updatePageTitle();
  }

  /**
   * Render the error content
   */
  renderErrorContent() {
    document.getElementById('info').innerHTML = `
      <div class="flex justify-center text-center">
        <div class="space-y-4">
          <h1 class="md:text-6xl text-4xl font-extrabold text-red-600">404</h1>
          <h2 class="md:text-2xl text-xl">Page Not Found</h2>
          <p class="md:text-xl text-lg">The page you are looking for doesn't exist or has been moved.</p>
          <div class="mt-6">
            <a href="/" data-link class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Go Home
            </a>
          </div>
        </div>
      </div>
    `;
    
    // Clear the content area
    document.getElementById('content').innerHTML = '';
  }

  /**
   * Update the page title
   */
  updatePageTitle() {
    document.title = '404 - Page Not Found';
  }
} 