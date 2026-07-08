// ==========================================
// FOGWALL - Asset Generator
// All assets created with code
// No external images needed!
// ==========================================

class FogwallAssets {
    constructor() {
        this.assets = {};
    }

    // ==========================================
    // 1. FAVICON (64x64)
    // ==========================================
    createFavicon() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Background gradient
        const grad = ctx.createLinearGradient(0, 0, 64, 64);
        grad.addColorStop(0, '#6c5ce7');
        grad.addColorStop(1, '#a78bfa');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(8, 8, 48, 48, 12);
        ctx.fill();

        // Fog icon (cloud shape)
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.arc(26, 32, 12, 0, Math.PI * 2);
        ctx.arc(38, 28, 10, 0, Math.PI * 2);
        ctx.arc(44, 34, 8, 0, Math.PI * 2);
        ctx.arc(18, 30, 8, 0, Math.PI * 2);
        ctx.fill();

        // F letter
        ctx.fillStyle = '#6c5ce7';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('F', 32, 34);

        return canvas.toDataURL('image/png');
    }

    // ==========================================
    // 2. MAIN LOGO (512x512)
    // ==========================================
    createLogo() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Background (transparent)
        ctx.clearRect(0, 0, 512, 512);

        // Glow effect
        const glow = ctx.createRadialGradient(256, 220, 20, 256, 220, 200);
        glow.addColorStop(0, 'rgba(108, 92, 231, 0.15)');
        glow.addColorStop(1, 'rgba(108, 92, 231, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, 512, 512);

        // Main fog icon
        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, '#6c5ce7');
        grad.addColorStop(0.5, '#8b7cf7');
        grad.addColorStop(1, '#a78bfa');
        ctx.fillStyle = grad;

        // Fog cloud shape
        ctx.beginPath();
        ctx.arc(200, 256, 80, 0, Math.PI * 2);
        ctx.arc(280, 220, 70, 0, Math.PI * 2);
        ctx.arc(340, 250, 60, 0, Math.PI * 2);
        ctx.arc(160, 240, 60, 0, Math.PI * 2);
        ctx.arc(240, 300, 65, 0, Math.PI * 2);
        ctx.fill();

        // White overlay for depth
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.arc(190, 240, 40, 0, Math.PI * 2);
        ctx.arc(270, 210, 35, 0, Math.PI * 2);
        ctx.fill();

        // "F" text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 180px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(108, 92, 231, 0.5)';
        ctx.shadowBlur = 40;
        ctx.fillText('F', 256, 260);
        ctx.shadowBlur = 0;

        // Brand name
        ctx.fillStyle = '#e8e8f0';
        ctx.font = 'bold 56px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('FOGWALL', 256, 360);

        // Tagline
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '24px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('Server Status', 256, 418);

        return canvas.toDataURL('image/png');
    }

    // ==========================================
    // 3. HERO BACKGROUND (1920x1080)
    // ==========================================
    createHeroBackground() {
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');

        // Dark base
        const grad = ctx.createRadialGradient(960, 300, 100, 960, 300, 800);
        grad.addColorStop(0, '#1a1a3e');
        grad.addColorStop(0.5, '#0f0f1a');
        grad.addColorStop(1, '#0a0a0f');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1920, 1080);

        // Glow orbs
        const orbs = [
            { x: 200, y: 200, r: 300, color: 'rgba(108, 92, 231, 0.08)' },
            { x: 1700, y: 800, r: 400, color: 'rgba(167, 139, 250, 0.06)' },
            { x: 960, y: 500, r: 500, color: 'rgba(108, 92, 231, 0.04)' },
        ];

        for (const orb of orbs) {
            const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
            g.addColorStop(0, orb.color);
            g.addColorStop(1, 'rgba(108, 92, 231, 0)');
            ctx.fillStyle = g;
            ctx.fillRect(orb.x - orb.r, orb.y - orb.r, orb.r * 2, orb.r * 2);
        }

        // Fog particles
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 1920;
            const y = Math.random() * 1080;
            const r = Math.random() * 100 + 50;
            const g = ctx.createRadialGradient(x, y, 0, x, y, r);
            g.addColorStop(0, `rgba(255,255,255,${Math.random() * 0.02})`);
            g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = g;
            ctx.fillRect(x - r, y - r, r * 2, r * 2);
        }

        return canvas.toDataURL('image/webp');
    }

    // ==========================================
    // 4. SVG ICONS (as data URLs)
    // ==========================================
    createIcon(name) {
        const icons = {
            // Server/Online dot
            online: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#00d4aa" stroke-width="2"/>
                <circle cx="12" cy="12" r="6" fill="#00d4aa">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
                </circle>
            </svg>`,

            // Offline dot
            offline: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#ff6b6b" stroke-width="2"/>
                <circle cx="12" cy="12" r="6" fill="#ff6b6b" opacity="0.5"/>
            </svg>`,

            // Players
            players: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>`,

            // Map
            map: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>`,

            // Game mode
            mode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>`,

            // Refresh
            refresh: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 4v6h6"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>`,

            // Servers tab
            servers: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                <line x1="6" y1="6" x2="6" y2="6.01"/>
                <line x1="6" y1="18" x2="6" y2="18.01"/>
            </svg>`,

            // Players tab
            playersTab: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>`,

            // Analytics tab
            analytics: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>`,

            // Settings/gear
            settings: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>`,

            // Arrow/chevron
            chevron: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
            </svg>`,

            // Empty state
            empty: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="8" y1="8" x2="16" y2="16"/>
                <line x1="16" y1="8" x2="8" y2="16"/>
            </svg>`,
        };

        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(icons[name] || icons.servers)}`;
    }

    // ==========================================
    // 5. LOADING SPINNER (Animated SVG)
    // ==========================================
    createSpinner() {
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#6c5ce7" stroke-width="4" opacity="0.2"/>
                <circle cx="25" cy="25" r="20" fill="none" stroke="#6c5ce7" stroke-width="4" 
                    stroke-dasharray="90" stroke-dashoffset="90" stroke-linecap="round">
                    <animate attributeName="stroke-dashoffset" from="90" to="0" dur="1.5s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1.5s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `)}`;
    }

    // ==========================================
    // 6. SOCIAL PREVIEW (1200x630)
    // ==========================================
    createSocialPreview() {
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 630;
        const ctx = canvas.getContext('2d');

        // Background
        const grad = ctx.createLinearGradient(0, 0, 1200, 630);
        grad.addColorStop(0, '#0a0a0f');
        grad.addColorStop(0.5, '#14141e');
        grad.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1200, 630);

        // Glow
        const glow = ctx.createRadialGradient(600, 300, 50, 600, 300, 500);
        glow.addColorStop(0, 'rgba(108, 92, 231, 0.1)');
        glow.addColorStop(1, 'rgba(108, 92, 231, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, 1200, 630);

        // Fog icon (large)
        ctx.fillStyle = '#6c5ce7';
        ctx.beginPath();
        ctx.arc(600, 270, 80, 0, Math.PI * 2);
        ctx.arc(680, 240, 70, 0, Math.PI * 2);
        ctx.arc(740, 270, 60, 0, Math.PI * 2);
        ctx.arc(530, 260, 60, 0, Math.PI * 2);
        ctx.fill();

        // "F" on fog
        ctx.fillStyle = 'white';
        ctx.font = 'bold 160px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('F', 600, 270);

        // Title
        ctx.fillStyle = 'white';
        ctx.font = 'bold 72px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText('FOGWALL', 600, 440);

        // Subtitle
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '32px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('Blockade3D Server Status', 600, 450);

        return canvas.toDataURL('image/png');
    }

    // ==========================================
    // 7. Generate ALL Assets
    // ==========================================
    generateAll() {
        return {
            favicon: this.createFavicon(),
            logo: this.createLogo(),
            hero: this.createHeroBackground(),
            social: this.createSocialPreview(),
            spinner: this.createSpinner(),
            icons: {
                online: this.createIcon('online'),
                offline: this.createIcon('offline'),
                players: this.createIcon('players'),
                map: this.createIcon('map'),
                mode: this.createIcon('mode'),
                refresh: this.createIcon('refresh'),
                servers: this.createIcon('servers'),
                playersTab: this.createIcon('playersTab'),
                analytics: this.createIcon('analytics'),
                settings: this.createIcon('settings'),
                chevron: this.createIcon('chevron'),
                empty: this.createIcon('empty'),
            }
        };
    }
}

// ==========================================
// EXPORT for use in other files
// ==========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FogwallAssets;
}

// If in browser, attach to window
if (typeof window !== 'undefined') {
    window.FogwallAssets = FogwallAssets;
}