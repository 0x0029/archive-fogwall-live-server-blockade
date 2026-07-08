// ==========================================
// FOGWALL - Asset Loader
// Injects all generated assets into the page
// ==========================================

class AssetLoader {
    constructor() {
        this.assets = new FogwallAssets().generateAll();
    }

    // Inject favicon
    injectFavicon() {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = this.assets.favicon;
        document.head.appendChild(link);
    }

    // Inject social preview
    injectSocialPreview() {
        const meta = document.createElement('meta');
        meta.property = 'og:image';
        meta.content = this.assets.social;
        document.head.appendChild(meta);

        const meta2 = document.createElement('meta');
        meta2.name = 'twitter:image';
        meta2.content = this.assets.social;
        document.head.appendChild(meta2);
    }

    // Set logo in header
    setLogo(element) {
        if (element) {
            element.innerHTML = `<img src="${this.assets.logo}" alt="Fogwall Logo" style="height:100%;width:auto;" />`;
        }
    }

    // Set hero background
    setHeroBackground(element) {
        if (element) {
            element.style.backgroundImage = `url(${this.assets.hero})`;
            element.style.backgroundSize = 'cover';
            element.style.backgroundPosition = 'center';
        }
    }

    // Get icon by name
    getIcon(name) {
        return this.assets.icons[name] || this.assets.icons.servers;
    }

    // Create an icon element
    createIconElement(name, size = 24) {
        const img = document.createElement('img');
        img.src = this.getIcon(name);
        img.width = size;
        img.height = size;
        img.alt = name;
        img.style.display = 'inline-block';
        return img;
    }

    // Inject spinner
    injectSpinner(element) {
        if (element) {
            element.innerHTML = `<img src="${this.assets.spinner}" alt="Loading..." style="width:100%;height:auto;" />`;
        }
    }

    // Load all assets
    loadAll() {
        this.injectFavicon();
        this.injectSocialPreview();

        // Log loaded assets
        console.log('🌫️ Fogwall Assets Loaded:');
        console.log(`  ✅ Favicon: ${this.assets.favicon.length} chars`);
        console.log(`  ✅ Logo: ${this.assets.logo.length} chars`);
        console.log(`  ✅ Hero: ${this.assets.hero.length} chars`);
        console.log(`  ✅ Social: ${this.assets.social.length} chars`);
        console.log(`  ✅ ${Object.keys(this.assets.icons).length} icons loaded`);
    }
}

// Auto-load when DOM is ready
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const loader = new AssetLoader();
        loader.loadAll();

        // Example: Inject logo into header
        const logoContainer = document.querySelector('.brand-icon');
        if (logoContainer) {
            loader.setLogo(logoContainer);
        }

        // Example: Inject spinner
        const spinnerContainer = document.querySelector('.spinner');
        if (spinnerContainer) {
            loader.injectSpinner(spinnerContainer);
        }

        window.fogwallAssets = loader;
    });
}