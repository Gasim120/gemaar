# EMAAR AI - Development Plan

## Design Guidelines

### Design References
- **Premium Real Estate**: Dark luxury aesthetic with gold accents
- **Style**: Modern Dark Mode + Glass Morphism + Premium Feel

### Color Palette
- Primary Background: #0A0B14 (Deep Dark Blue-Black)
- Secondary Background: #141520 (Dark Card)
- Accent Gold: #C9A84C (Premium Gold)
- Accent Gold Light: #E8D48B (Light Gold)
- Text Primary: #FFFFFF
- Text Secondary: #9CA3AF
- Glass: rgba(255, 255, 255, 0.05)
- Border: rgba(201, 168, 76, 0.2)

### Typography
- Headings: Inter, font-weight 700
- Body: Inter, font-weight 400
- Arabic: Tajawal (Google Font for RTL)

### Key Component Styles
- Cards: Glass morphism with subtle gold borders
- Buttons: Gold gradient, rounded-lg
- Inputs: Dark background with gold focus border
- Slider: Custom before/after comparison slider

### Images (CDN URLs)
1. hero-luxury-living-room.png - Hero section background
2. before-after-bedroom.png - Before/after showcase
3. showcase-kitchen.png - Kitchen showcase
4. showcase-exterior-villa.png - Exterior showcase

---

## Development Tasks

### Files to Create/Modify:
1. **src/lib/api.ts** - API client setup with web-sdk (auth, entities, AI, storage)
2. **src/lib/i18n.ts** - Internationalization (Arabic/English) with RTL support
3. **src/components/Layout.tsx** - Main layout with header, dark/light mode, language toggle
4. **src/pages/Index.tsx** - Landing page (hero, features, showcases, pricing)
5. **src/pages/Dashboard.tsx** - Upload + AI processing + results page
6. **src/pages/Pricing.tsx** - Subscription plans page
7. **src/pages/Admin.tsx** - Admin dashboard
8. **src/App.tsx** - Router setup with all pages