# Turing Point — Website

A static, multi-page site. No build step — open `index.html` in a browser, or deploy the whole folder as-is to any static host (Netlify, Vercel, GitHub Pages, cPanel, etc.).

## Structure
```
index.html        Home
services.html      Services
work.html          Work / portfolio
process.html       Process
pricing.html       Pricing
about.html         About
contact.html       Contact (form)
assets/css/style.css
assets/js/main.js
assets/fonts/Miroge.otf
assets/images/tp-logo.png
robots.txt
sitemap.xml
```

## Before you go live — things to update
1. **Domain**: `robots.txt` and `sitemap.xml` use a placeholder domain (`turingpoint.example`). Replace with your real domain once you have one.
2. **Email**: the mailto link in `contact.html` uses `hello@turingpoint.example` — replace with your real inbox.
3. **WhatsApp**: the WhatsApp link in `contact.html` (`id="whatsapp"`) is a bare `https://wa.me/` — add your number, e.g. `https://wa.me/91XXXXXXXXXX`.
4. **Social links**: Instagram / Facebook / LinkedIn links on the Contact page are placeholders (`#`) since no real URLs were provided — swap in your real profile links once they exist.
5. **Contact form backend**: the form currently validates on the client but has **no backend connected**, so it honestly tells the visitor it isn't wired up yet instead of faking a "message sent" confirmation. To connect it:
   - Sign up for [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) (both have free tiers), or point it at your own backend.
   - Open `assets/js/main.js`, find the `TODO` block inside the `submit` handler, and replace it with a real `fetch()` call to your endpoint.
   - Update the success/error messaging once it's live.
6. **Project screenshots**: the Work page currently shows text-based placeholder thumbnails for Trinetram Architects and VASTRO (no screenshots were supplied). Swap `.project-thumb` in `work.html` for real `<img>` screenshots when you have them.

## Notes
- Miroge (the custom font) is used **only** for the "Turing Point" wordmark, per your instruction — everything else uses Inter.
- Digital Services is marked "Coming Soon" throughout (cards, services page, pricing) and has no active CTA, as specified.
- No fake testimonials, stats, clients or team bios were added anywhere.
