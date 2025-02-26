/**
 * View component for displaying a Quran surah
 */
export class SurahView {
  /**
   * @param {Object} surah - The surah data
   * @param {Object} arabicText - The Arabic text data
   * @param {Object} englishText - The English translation data
   */
  constructor(surah, arabicText, englishText) {
    this.surah = surah;
    this.arabicText = arabicText;
    this.englishText = englishText;
    this.localStorageService = {
      setItem: (key, value) => localStorage.setItem(key, value)
    };
  }

  /**
   * Render the surah view
   */
  render() {
    try {
      // Clear any previous storage first to prevent redirect loops
      localStorage.removeItem('location');
      
      this.renderSurahInfo();
      this.renderAyahs();
      this.setupIntersectionObserver();
      this.scrollToTop();
      this.updatePageTitle();
      
      // Update the navigation menu to highlight the current surah
      if (typeof renderNavigation === 'function') {
        renderNavigation();
      }
      
      // Only save location after a delay to prevent immediate reloads
      setTimeout(() => {
        this.saveLocationToStorage();
      }, 500);
    } catch (error) {
      console.error("Error rendering surah view:", error);
      
      // Show a user-friendly error
      document.getElementById('info').innerHTML = `
        <div class="flex justify-center text-center">
          <div class="space-y-2">
            <h1 class="md:text-4xl text-2xl font-bold text-red-500">Error Loading Surah</h1>
            <p class="text-lg">There was a problem loading this surah</p>
            <a href="/" data-link class="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded">Return Home</a>
          </div>
        </div>
      `;
      document.getElementById('content').innerHTML = '';
    }
  }

  /**
   * Render the surah information
   */
  renderSurahInfo() {
    document.getElementById('info').innerHTML = `
      <div class="flex justify-center text-center">
        <div class="space-y-2">
          <h1 class="md:text-6xl text-4xl font-extrabold" dir="rtl">${this.surah.name}</h1>
          <h2 class="md:text-4xl text-2xl font-extrabold">${this.surah.englishName}</h2>
          <h3 class="md:text-2xl text-xl font-bold">${this.surah.englishNameTranslation}</h3>
          <h4 class="md:text-xl text-lg">(${this.surah.revelationType})</h4>
        </div>
      </div>
    `;
  }

  /**
   * Render the ayahs (verses) with translations
   */
  renderAyahs() {
    const surahIndex = this.surah.number - 1;
    const ayahs = this.arabicText.data.surahs[surahIndex].ayahs;
    const contentElement = document.getElementById('content');
    
    const ayahsHtml = ayahs.map((ayah, index) => {
      const englishTranslation = this.englishText.data.surahs[surahIndex].ayahs[index].text;
      
      return `
        <div class="md:flex block items-center gap-4 ayah" dir="rtl" id="${ayah.number}">
          <div class="bg-slate-500 h-12 w-12 md:h-14 md:w-14 rounded-full flex justify-center items-center md:text-2xl text-xl text-white mb-4 md:mb-0 mx-auto md:mx-0">${ayah.number}</div>
          <div class="space-y-4 w-full">
            <p class="md:text-4xl text-3xl">${ayah.text}</p>
            <p class="md:text-2xl text-xl text-center" dir="ltr">${englishTranslation}</p>
          </div>
        </div>
      `;
    }).join('');
    
    contentElement.innerHTML = ayahsHtml;
  }

  /**
   * Set up intersection observer to track visible ayahs
   */
  setupIntersectionObserver() {
    const contentDivs = document.querySelectorAll('.ayah');
    const options = {
      rootMargin: "0px 0px -600px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.localStorageService.setItem('ayah', entry.target.id);
        }
      });
    }, options);

    contentDivs.forEach(ayah => {
      observer.observe(ayah);
    });
  }

  /**
   * Scroll to the top of the content
   */
  scrollToTop() {
    document.getElementById('contentholder').scrollTo(0, 0);
  }

  /**
   * Update the page title
   */
  updatePageTitle() {
    document.title = this.surah.englishName;
  }

  /**
   * Save the current surah location to localStorage
   */
  saveLocationToStorage() {
    // Prevent saving if we're navigating directly via URL
    const directAccess = !document.referrer || !document.referrer.includes(window.location.host);
    if (!directAccess) {
      this.localStorageService.setItem('location', this.surah.englishName);
    }
  }
} 