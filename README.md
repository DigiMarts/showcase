# DigiMarts Showcase

**showcase.digimartsng.com**: a logo wall of the products **built by mmiri28** and **marketed and distributed by DigiMarts**. Tap a logo to open a short description, a link (if the product is live), and a WhatsApp button that messages DigiMarts with the product name already filled in.

Plain HTML, CSS and a little JavaScript. There's no build step and no framework.

## Files

| File | What it is |
|---|---|
| `index.html` | The page |
| `assets/js/projects.js` | **The list of projects.** Edit this to add, remove or change a project |
| `assets/js/main.js` | Builds the logo grid and the pop-up |
| `assets/css/styles.css` | Styles (DigiMarts brand colours) |
| `assets/logos/` | Project logos |
| `netlify.toml` | Netlify settings |

## Add a project

1. Put the logo in `assets/logos/`. Square works best: an SVG, or a PNG/JPG about 300×300 px.
2. In `assets/js/projects.js`, copy one block and change the fields. Set `url` to `null` if there's no public link yet; the pop-up then shows **Ask for a demo** instead of **Visit**.
3. Push to `main`, and Netlify deploys it.

Each project also has its own link, e.g. `showcase.digimartsng.com/#meetbook-pro`, which is handy for WhatsApp status and social posts.

## Deploy (Netlify, digimartsng@gmail.com)

1. Netlify → **Add new project → Import an existing project → GitHub** → install the Netlify app on the **DigiMarts** org → choose `DigiMarts/showcase`.
2. Leave the build command empty. The publish directory is `.` (already set in `netlify.toml`).
3. **Domain management → Add a domain** → `showcase.digimartsng.com`.
4. At your DNS provider for digimartsng.com, add:
   `CNAME  showcase  →  <your-site-name>.netlify.app`
5. Wait for HTTPS to switch on (usually a few minutes).

## To do

- [x] Live links for all projects (from mmiri28.com).
- [ ] Replace the placeholder logos for MeetBook Pro, GlowReserve and BizHub with the official ones if they exist.
