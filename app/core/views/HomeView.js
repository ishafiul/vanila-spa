/**
 * View component for displaying the home page
 */
export class HomeView {
  /**
   * Render the home view
   */
  render() {
    // Clear any stored location to prevent unwanted redirects
    localStorage.removeItem('location');
    localStorage.removeItem('ayah');
    
    this.renderHomeContent();
    this.updatePageTitle();
    this.scrollToTop();
  }

  /**
   * Render the home content
   */
  renderHomeContent() {
    document.getElementById('info').innerHTML = `
      <div class="flex justify-center text-center">
        <div class="space-y-4">
          <h1 class="md:text-6xl text-4xl font-extrabold">Al-Quran</h1>
          <h2 class="md:text-2xl text-xl">The Holy Book of Islam</h2>
          <p class="md:text-xl text-lg">Select a surah from the list to begin reading</p>
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
    document.title = 'Al-Quran';
  }
  
  /**
   * Scroll to the top of the content
   */
  scrollToTop() {
    document.getElementById('contentholder').scrollTo(0, 0);
  }
} 