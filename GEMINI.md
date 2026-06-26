# Project Overview: 景丰科技 (Environmental Simulation Co. Ltd.)

This project is the official website for **景丰科技股份有限公司** (Environmental Simulation Co. Ltd.), a professional environmental engineering consultancy. The site serves as a portal for their services, technical publications, and corporate information. It is designed to be hosted on GitHub Pages but includes PHP components for backend functionality.

## Core Technologies
- **Frontend:** HTML5, CSS3 (Vanilla + modern effects like `backdrop-filter`), jQuery.
- **Libraries:** 
  - **Swiper.js:** Used for interactive carousels and sliders.
  - **Typed.js:** For typing animations.
  - **WOW.js / Animate.css:** For scroll-based animations.
  - **FontAwesome / Linearicons:** For iconography.
- **Backend:** PHP (used for `contact.html` via `sento.php` and SMTP).
- **Automation:** Python (used for content transformation).
- **Data:** RSS feeds from environmental agencies (EMA, EPA) integrated via `jsq/news.js`.

## Directory Structure
- `/`: Main HTML pages (e.g., `index.html`, `about.html`, `service_*.html`).
- `css/`: Stylesheets, including third-party and custom layouts (`layout.css`, `simenvi_basic.css`).
- `jsq/`: Custom JavaScript logic (e.g., `news.js` for RSS, `submenu.js`).
- `download/`: Technical PDFs, research papers, and corporate brochures.
- `images/`: Static graphic assets, logos, and gallery images.
- `vendor/`: Third-party assets.

## Key Files
- `index.html`: The landing page featuring service highlights and news.
- `convert_paper.py`: A utility script that parses table-based HTML in `download_paper.html` and transforms it into a modern Swiper-based slider interface.
- `jsq/news.js`: Fetches and parses RSS feeds from environmental government agencies using `allorigins.win` as a CORS proxy.
- `config.sample.php`: Template for SMTP credentials used by the PHP mailer.
- `README.md`: Contains non-standard project notes, specifically regarding Google Form integration and free asset sourcing.

## Development & Maintenance Workflows

### 1. Updating Research Papers
The research paper section in `download_paper.html` is managed via `convert_paper.py`.
- **Workflow:** Update the raw HTML table in the target file, then run the Python script to regenerate the interactive Swiper UI.
- **Command:** `python convert_paper.py`

### 2. Form Integration
The project uses two methods for form submissions:
- **Google Forms:** Used for some contact sections. Requires matching `entry.ID` values from the Google Form to the HTML `name` attributes.
- **Direct Mail (PHP):** Uses `sento.php`. Requires a valid `config.php` (copied from `config.sample.php`) with SMTP credentials.

### 3. News Integration
News items are dynamically fetched from:
- `https://service.ema.gov.tw/Rss/RssChannel/zh-tw/215` (Taiwan EMA)
- `https://www.epa.ie/resources/rss/index-90474.xml` (Ireland EPA)
Changes to feed sources should be made in `jsq/news.js`.

## Guidelines
- **Styling:** Prefer Vanilla CSS. Adhere to the established color variables in `:root` (e.g., `--primary-color: #2a698a`).
- **Responsive Design:** Most pages use custom media queries. Check `css/default.css` and inline styles for RWD breakpoints.
- **File Naming:** Service pages follow the `service_X-Y.html` pattern.
