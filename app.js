// =========================================================
// PRODUCT DATABASE — 6 Featured + 48 from CSV
// =========================================================

// AI-generated image cache (SVG phone illustrations)
const aiImageCache = {};

// Brand color map for SVG illustrations
const brandColors = {
  Apple: ["#c0c8d0", "#e8ecf0"],
  Samsung: ["#1428A0", "#4d78ff"],
  Redmi: ["#FF5500", "#ff8833"],
  Realme: ["#FFD200", "#FF6600"],
  POCO: ["#F5C518", "#FF2200"],
  Oppo: ["#007BFF", "#00d4ff"],
  Vivo: ["#2255FF", "#7799ff"],
  iQOO: ["#00D4FF", "#0044ff"],
  Nothing: ["#e8e8e8", "#ffffff"],
  Motorola: ["#5D2D91", "#bb44ff"],
  Infinix: ["#00C853", "#80ffaa"],
  Tecno: ["#FF3D00", "#ff8800"],
  Lava: ["#D32F2F", "#ff6655"],
  Google: ["#4285F4", "#34A853"],
  OnePlus: ["#EB0028", "#ff6688"],
  Xiaomi: ["#FF6D00", "#ffaa44"],
};

// ── REAL PHONE IMAGE MAPPING ──────────────────────────────
const phoneImageMap = {
  "iPhone 15 Pro Max": "images/apple-iphone-15-pro-max.jpg",
  "iPhone 15 Pro": "images/apple-iphone-15-pro.jpg",
  "iPhone 15": "images/apple-iphone-15.jpg",
  "iPhone 14": "images/apple-iphone-14.jpg",
  "iPhone 14 Pro Max": "images/apple-iphone-14-pro-max-.jpg",
  "iPhone 13": "images/apple-iphone-13.jpg",
  "iPhone 12": "images/apple-iphone-12.jpg",
  "iPhone 11": "images/apple-iphone-11.jpg",
  "iPhone 8": "images/apple-iphone-8-new.jpg",
  "iPhone SE": "images/apple-iphone-se-2020.jpg",

  "Samsung Galaxy S24 Ultra":
    "images/samsung-galaxy-s24-ultra-5g-sm-s928-stylus.jpg",
  "Samsung Galaxy S25 Ultra 5G": "images/samsung-galaxy-s25-ultra-sm-s938.jpg",
  "Samsung Galaxy S26 Ultra 5G": "images/samsung-galaxy-s26-ultra-new.jpg",
  "Samsung Galaxy S26 5G": "images/samsung-galaxy-s26.jpg",
  "Samsung Galaxy S25": "images/samsung-galaxy-s25-sm-s931.jpg",
  "Samsung Galaxy S 20": "images/samsung-galaxy-s20-.jpg",
  "Samsung Galaxy S 10": "images/samsung-galaxy-s10.jpg",
  "Samsung Galaxy S 25": "images/samsung-galaxy-s25-sm-s931.jpg",
  "Samsung Galaxy A 7": "images/samsung-galaxy-a7-sm-a750f.jpg",
  "Samsung Galaxy F 36": "images/samsung-galaxy-f36.jpg",
  "Samsung Galaxy S 5": "images/samsung-galaxy-a7-sm-a750f.jpg",
  "Samsung Galaxy A07 5G": "images/samsung-galaxy-a07-5g.jpg",
  "Samsung Galaxy A17 5G": "images/samsung-galaxy-a17-5g.jpg",
  "Samsung Galaxy S25 FE 5G": "images/samsung-galaxy-s25-fe.jpg",

  "OnePlus 12": "images/oneplus-12.jpg",
  "OnePlus 11": "images/oneplus-12.jpg",

  "Google Pixel 8 Pro": "images/google-pixel-8-pro.jpg",
  "Google Pixel 8": "images/google-pixel-8.jpg",
  "Google Pixel 10 Pro": "images/google-pixel-10-pro.jpg",
  "Google Pixel 10 Pro XL 5G":
    // actual file has trailing hyphen before extension
    "images/google-pixel-10-pro-xl-.jpg",
  "Google Pixel 10 Pro Fold 5G":
    // double hyphen version in folder
    "images/google-pixel-10-pro-fold--.jpg",
  "Google Pixel 10 5G":
    // file name includes extra hyphen
    "images/google-pixel-10-.jpg",
  "Google Pixel 10a 5G":
    // folder image uses no 5G suffix
    "images/google-pixel-10a.jpg",
  "Google Pixel 9A 5G":
    // folder image uses no 5G suffix
    "images/google-pixel-9a.jpg",

  "Xiaomi 14 Ultra": "images/xiaomi-14-ultra-new.jpg",
  "Xiaomi 13 Ultra": "images/xiaomi-13-ultra.jpg",

  "Nothing Phone (2)": "images/nothing-phone2_.jpg",
  "Nothing Phone (1)": "images/nothing-phone-1.jpg",
  "Nothing Phone (3)": "images/nothing-phone-3-new.jpg",
  "Nothing Phone (3a) Lite 5G": "images/nothing-phone-3a-lite.jpg",
  "Nothing Phone 3 5G": "images/nothing-phone-3.jpg",
  "CMF by Nothing Phone 2 Pro 5G": "images/nothing-cmf-phone-2-pro.jpg",

  "Redmi Note 10": "images/xiaomi-redmi-note10--.jpg",
  "Redmi K 80 Pro": "images/xiaomi-redmi-k80-pro.jpg",
  "Redmi K 80": "images/xiaomi-redmi-k80.jpg",
  "Redmi K 90": "images/xiaomi-redmi-k90.jpg",
  "Redmi Note 6 pro": "images/xiaomi-redmi-note-6-pro.jpg",

  "Realme GT 7": "images/realme-gt-7.jpg",
  "Realme GT 6": "images/realme-gt6.jpg",
  "Realme GT 2": "images/realme-gt2.jpg",
  "Realme GT 2 pro": "images/realme-gt2-pro.jpg",

  "POCO X 7": "images/poco-x7.jpg",
  "POCO F7 Pro": "images/poco-f7-pro.jpg",
  "POCO X7 pro": "images/poco-x7-pro.jpg",
  "POCO M8 Pro 5G": "images/poco-m8-pro-5g.jpg",

  "Oppo A 17": "images/oppo-a17.jpg",
  "Oppo Reno15 F": "images/oppo-reno15-f.jpg",
  "Oppo Reno2": "images/oppo-reno2.jpg",
  "Oppo Reno 6": "images/oppo-reno6.jpg",

  "Vivo V 7": "images/vivo-iqoo-7-india-.jpg",
  "Vivo X 300": "images/vivo-x300.jpg",
  "Vivo Y 19s": "images/vivo-y19s.jpg",
  "Vivo Y 400": "images/vivo-y400-4g.jpg",
  "Vivo V70 Elite 5G": "images/vivo-v70-elite.jpg",
  "Vivo V70 5G": "images/vivo-v70.jpg",
  "Vivo T4 Pro 5G": "images/vivo-t4-pro.jpg",

  "iQOO 15R ": "images/vivo-iqoo-15r.jpg",
  "iQOO 15R ultra": "images/vivo-iqoo-15-ultra.jpg",
  "iQOO Neo 10": "images/vivo-iqoo-neo-10.jpg",

  "Motorola Edge 70 fussion": "images/motorola-edge-70-fusion.jpg",
  "Motorola Edge": "images/motorola-edge-midnight-magenta.jpg",
  "Motorola Moto G 86 power": "images/motorola-moto-g86-power.jpg",
  "Motorola Moto G85": "images/motorola-moto-g85.jpg",

  "Infinix Note 11": "images/infinix-note11.jpg",
  "Infinix Hot 5": "images/infinix-hot10.jpg",
  "Infinix Zero 40": "images/infinix-zero40-5g-.jpg",

  "Tecno Spark 9 pro": "images/tecno-spark9-pro.jpg",
  "Tecno Pova 7": "images/tecno-pova7.jpg",

  "Lava Agni4": "images/lava-agni4.jpg",

  // Additional brand/product name variations
  "Apple iPhone SE": "images/apple-iphone-se-2020.jpg",
  "Apple iPhone 14 Pro Max": "images/apple-iphone-14-pro-max-.jpg",

  "Samsung Galaxy A 7": "images/samsung-galaxy-a7-sm-a750f.jpg",
  "Samsung Galaxy F 36": "images/samsung-galaxy-f36.jpg",
  "Samsung Galaxy S 5": "images/samsung-galaxy-a7-sm-a750f.jpg",

  "Redmi Note 6 pro": "images/xiaomi-redmi-note-6-pro.jpg",
  "Redmi K 80 Pro": "images/xiaomi-redmi-k80-pro.jpg",
  "Redmi K 80": "images/xiaomi-redmi-k80.jpg",
  "Redmi K 90": "images/xiaomi-redmi-k90.jpg",

  "Realme GT 7": "images/realme-gt-7.jpg",
  "Realme GT 2": "images/realme-gt2.jpg",
  "Realme GT 2 pro": "images/realme-gt2-pro.jpg",

  "POCO F7 Pro": "images/poco-f7-pro.jpg",
  "POCO X7 pro": "images/poco-x7-pro.jpg",
  "POCO M8 Pro 5G": "images/poco-m8-pro-5g.jpg",

  "Oppo Reno15 F": "images/oppo-reno15-f.jpg",
  "Oppo Reno2": "images/oppo-reno2.jpg",

  "Vivo X 300": "images/vivo-x300.jpg",
  "Vivo Y 19s": "images/vivo-y19s.jpg",
  "Vivo Y 400": "images/vivo-y400-4g.jpg",

  "iQOO 15R ": "images/vivo-iqoo-15r.jpg",
  "iQOO 15R ultra": "images/vivo-iqoo-15-ultra.jpg",
  "iQOO Neo 10": "images/vivo-iqoo-neo-10.jpg",

  "Motorola Edge 70 fussion": "images/motorola-edge-70-fusion.jpg",
  "Motorola Moto G 86 power": "images/motorola-moto-g86-power.jpg",
  "Motorola Moto G85": "images/motorola-moto-g85.jpg",

  "Infinix Zero 40": "images/infinix-zero40-5g-.jpg",
  "Tecno Spark 9 pro": "images/tecno-spark9-pro.jpg",
  "Tecno Pova 7": "images/tecno-pova7.jpg",

  "Lava Blaze": "images/lava-blaze-duo3.jpg",
};

// ── SMART IMAGE MAPPING FUNCTION ───────────────────────────
function getRealProductImage(productName, brand) {
  // Try exact mapping first
  if (phoneImageMap[productName]) {
    return phoneImageMap[productName];
  }

  // Smart partial matching - try various matching strategies
  const lowerName = productName.toLowerCase();
  const lowerBrand = brand.toLowerCase();

  // Priority 1: Exact substring match of mapped keys
  for (const [key, url] of Object.entries(phoneImageMap)) {
    const lowerKey = key.toLowerCase();
    // Match if key is in product name or vice versa (for "iPhone 15" vs "Apple iPhone 15")
    if (lowerName.includes(lowerKey) || lowerKey.includes(lowerName)) {
      return url;
    }
  }

  // Priority 2: Try common product name reformatting
  // Remove brand from product name and try matching
  const withoutBrand = lowerName.replace(lowerBrand, "").trim();
  for (const [key, url] of Object.entries(phoneImageMap)) {
    const lowerKey = key.toLowerCase();
    if (withoutBrand.includes(lowerKey) || lowerKey.includes(withoutBrand)) {
      return url;
    }
  }

  // Priority 3: Slug-based fallback (local image path)
  const slug = productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `images/${slug}.jpg`;
}

// ── AI IMAGE GENERATION via Anthropic API ──────────────────
async function loadAIImage(product) {
  const cacheKey = `krisithra_ai_img_v2_${product.id}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    document
      .querySelectorAll(`[data-product-id="${product.id}"] .product-img`)
      .forEach((el) => {
        el.src = cached;
      });
    return;
  }
  // Use Anthropic API to generate a detailed prompt, then render that as SVG
  // (Actual image generation would require a separate image API)
  // For now we use our enhanced SVG art system
}

function generatePhoneSVG(brand, model, price) {
  const key = `${brand}_${model}`;
  if (aiImageCache[key]) return aiImageCache[key];
  const colors = brandColors[brand] || ["#00c8ff", "#00ffb2"];
  const c1 = colors[0],
    c2 = colors[1];
  const isPremium = price > 80000;
  const hasNotch = brand === "Apple";
  const hasPunch = !hasNotch;

  // Dynamic camera module based on brand
  const cameraLayouts = {
    Apple: `
      <!-- Apple Island -->
      <rect x="52" y="19" width="36" height="38" rx="10" fill="#0a0a0f"/>
      <rect x="52" y="19" width="36" height="38" rx="10" fill="none" stroke="${c1}" stroke-width="0.6" stroke-opacity="0.5"/>
      <!-- Main lens -->
      <circle cx="63" cy="30" r="8" fill="#050508"/>
      <circle cx="63" cy="30" r="6.5" fill="#0d0d15"/>
      <circle cx="63" cy="30" r="5" fill="#111120"/>
      <circle cx="63" cy="30" r="3.5" fill="${c1}" opacity="0.25"/>
      <circle cx="63" cy="30" r="2" fill="${c2}" opacity="0.4"/>
      <circle cx="61.2" cy="28.2" r="1.2" fill="white" opacity="0.55"/>
      <!-- Second lens -->
      <circle cx="77" cy="30" r="7" fill="#050508"/>
      <circle cx="77" cy="30" r="5.5" fill="#0d0d15"/>
      <circle cx="77" cy="30" r="4" fill="#111120"/>
      <circle cx="77" cy="30" r="2.5" fill="${c1}" opacity="0.2"/>
      <circle cx="75.5" cy="28.5" r="1" fill="white" opacity="0.5"/>
      <!-- Third lens -->
      <circle cx="63" cy="47" r="6" fill="#050508"/>
      <circle cx="63" cy="47" r="4.5" fill="#0d0d15"/>
      <circle cx="63" cy="47" r="3" fill="${c2}" opacity="0.2"/>
      <circle cx="61.8" cy="45.8" r="0.8" fill="white" opacity="0.45"/>
      <!-- LiDAR -->
      <circle cx="77" cy="47" r="4" fill="#050508"/>
      <circle cx="77" cy="47" r="2.5" fill="${c2}" opacity="0.35"/>
      <circle cx="77" cy="47" r="1.2" fill="${c1}" opacity="0.6"/>
      <!-- Flash -->
      <rect x="54" y="40" width="5" height="5" rx="2" fill="#ffdd88" opacity="0.8"/>`,

    Samsung: `
      <!-- Samsung island pill -->
      <rect x="54" y="18" width="32" height="44" rx="12" fill="#08080f"/>
      <rect x="54" y="18" width="32" height="44" rx="12" fill="none" stroke="${c1}" stroke-width="0.6" stroke-opacity="0.5"/>
      <!-- Main 200MP lens -->
      <circle cx="70" cy="30" r="9" fill="#050508"/>
      <circle cx="70" cy="30" r="7.5" fill="#0a0a12"/>
      <circle cx="70" cy="30" r="6" fill="#0f0f1a"/>
      <circle cx="70" cy="30" r="4" fill="${c1}" opacity="0.18"/>
      <circle cx="70" cy="30" r="2.2" fill="${c2}" opacity="0.35"/>
      <circle cx="67.8" cy="27.8" r="1.5" fill="white" opacity="0.5"/>
      <!-- Tele lens -->
      <circle cx="70" cy="47" r="7" fill="#050508"/>
      <circle cx="70" cy="47" r="5.5" fill="#0a0a12"/>
      <circle cx="70" cy="47" r="4" fill="${c1}" opacity="0.15"/>
      <circle cx="68.5" cy="45.5" r="1.2" fill="white" opacity="0.45"/>
      <!-- Periscope label -->
      <text x="70" y="49.5" text-anchor="middle" font-size="2.5" fill="${c2}" opacity="0.7" font-family="Arial">10x</text>
      <!-- Ultra-wide badge -->
      <rect x="56" y="20" width="8" height="6" rx="2" fill="${c2}" opacity="0.2"/>
      <text x="60" y="24.5" text-anchor="middle" font-size="2.5" fill="${c2}" opacity="0.9" font-family="Arial">0.6</text>
      <!-- Flash cluster -->
      <circle cx="79" cy="28" r="3" fill="#ffcc55" opacity="0.75"/>
      <circle cx="79" cy="28" r="1.5" fill="#ffe899" opacity="0.9"/>`,

    Google: `
      <!-- Pixel camera bar -->
      <rect x="22" y="18" width="96" height="22" rx="8" fill="#08080f"/>
      <rect x="22" y="18" width="96" height="22" rx="8" fill="none" stroke="${c1}" stroke-width="0.5" stroke-opacity="0.4"/>
      <!-- Main lens -->
      <circle cx="50" cy="29" r="8.5" fill="#050508"/>
      <circle cx="50" cy="29" r="7" fill="#0a0a12"/>
      <circle cx="50" cy="29" r="5.5" fill="#0f0f1a"/>
      <circle cx="50" cy="29" r="3.8" fill="${c1}" opacity="0.2"/>
      <circle cx="50" cy="29" r="2" fill="${c2}" opacity="0.4"/>
      <circle cx="47.8" cy="26.8" r="1.4" fill="white" opacity="0.55"/>
      <!-- Second lens -->
      <circle cx="72" cy="29" r="7" fill="#050508"/>
      <circle cx="72" cy="29" r="5.5" fill="#0a0a12"/>
      <circle cx="72" cy="29" r="4" fill="${c1}" opacity="0.15"/>
      <circle cx="70.2" cy="27.2" r="1.1" fill="white" opacity="0.45"/>
      <!-- Tele -->
      <circle cx="90" cy="29" r="5.5" fill="#050508"/>
      <circle cx="90" cy="29" r="4" fill="${c2}" opacity="0.2"/>
      <circle cx="88.6" cy="27.6" r="0.9" fill="white" opacity="0.4"/>
      <!-- Flash strip -->
      <rect x="100" y="25" width="12" height="8" rx="3" fill="#ffdd88" opacity="0.75"/>`,

    default: `
      <!-- Triple camera island -->
      <rect x="56" y="19" width="28" height="40" rx="8" fill="#080810"/>
      <rect x="56" y="19" width="28" height="40" rx="8" fill="none" stroke="${c1}" stroke-width="0.6" stroke-opacity="0.4"/>
      <!-- Main lens -->
      <circle cx="70" cy="30" r="8" fill="#050508"/>
      <circle cx="70" cy="30" r="6.5" fill="#0d0d15"/>
      <circle cx="70" cy="30" r="5" fill="${c1}" opacity="0.18"/>
      <circle cx="70" cy="30" r="2.8" fill="${c2}" opacity="0.3"/>
      <circle cx="68" cy="28" r="1.3" fill="white" opacity="0.5"/>
      <!-- Wide lens -->
      <circle cx="70" cy="46" r="6" fill="#050508"/>
      <circle cx="70" cy="46" r="4.5" fill="#0d0d15"/>
      <circle cx="70" cy="46" r="3" fill="${c1}" opacity="0.15"/>
      <circle cx="68.5" cy="44.5" r="1" fill="white" opacity="0.4"/>
      <!-- Ultra-wide small -->
      <circle cx="62" cy="24" r="3" fill="${c2}" opacity="0.25"/>
      <circle cx="62" cy="24" r="1.5" fill="${c1}" opacity="0.4"/>
      <!-- Flash -->
      <circle cx="78" cy="24" r="2.5" fill="#ffcc55" opacity="0.7"/>
      <circle cx="78" cy="24" r="1.2" fill="#ffe090" opacity="0.9"/>`,
  };
  const camera = cameraLayouts[brand] || cameraLayouts["default"];

  const safeKey = key.replace(/[^a-z0-9]/gi, "_");
  // Brand-specific body colors
  const bodyGrad = {
    Apple: ["#1c2030", "#0f1520", "#080d18"],
    Samsung: ["#18203a", "#0e1528", "#060e20"],
    Nothing: ["#1a1a1a", "#0e0e0e", "#080808"],
    Google: ["#1a2238", "#0e1825", "#06101c"],
  };
  const bg = bodyGrad[brand] || ["#141c30", "#0c1422", "#060c18"];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 290" width="140" height="290">
  <defs>
    <linearGradient id="body_${safeKey}" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="${bg[0]}"/>
      <stop offset="50%" stop-color="${bg[1]}"/>
      <stop offset="100%" stop-color="${bg[2]}"/>
    </linearGradient>
    <linearGradient id="frame_${safeKey}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="${c2}" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="${c1}" stop-opacity="0.7"/>
    </linearGradient>
    <linearGradient id="screen_${safeKey}" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#0c1828"/>
      <stop offset="60%" stop-color="#060e18"/>
      <stop offset="100%" stop-color="#030810"/>
    </linearGradient>
    <linearGradient id="shine_${safeKey}" x1="0%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="white" stop-opacity="0.1"/>
      <stop offset="40%" stop-color="white" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="wallpaper_${safeKey}" x1="30%" y1="0%" x2="70%" y2="100%">
      <stop offset="0%" stop-color="${c1}" stop-opacity="0.12"/>
      <stop offset="50%" stop-color="${c2}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${c1}" stop-opacity="0.04"/>
    </linearGradient>
    <radialGradient id="glowaura_${safeKey}" cx="50%" cy="90%">
      <stop offset="0%" stop-color="${c1}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${c1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="lensshine_${safeKey}" cx="35%" cy="35%">
      <stop offset="0%" stop-color="white" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur_${safeKey}"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="softglow_${safeKey}">
      <feGaussianBlur stdDeviation="2.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="screenclip_${safeKey}">
      <rect x="18" y="${hasNotch ? "62" : "60"}" width="104" height="200" rx="8"/>
    </clipPath>
    <clipPath id="phoneclip_${safeKey}">
      <rect x="10" y="6" width="120" height="278" rx="22"/>
    </clipPath>
  </defs>

  <!-- Ground shadow -->
  <ellipse cx="70" cy="282" rx="42" ry="6" fill="black" opacity="0.4" filter="url(#blur_${safeKey})"/>
  <!-- Ambient glow under phone -->
  <ellipse cx="70" cy="270" rx="50" ry="18" fill="url(#glowaura_${safeKey})" filter="url(#blur_${safeKey})"/>

  <!-- Phone shadow depth -->
  <rect x="14" y="10" width="120" height="278" rx="22" fill="black" opacity="0.45"/>

  <!-- Phone body -->
  <rect x="10" y="6" width="120" height="278" rx="22" fill="url(#body_${safeKey})"/>

  <!-- Metal frame outer -->
  <rect x="10" y="6" width="120" height="278" rx="22" fill="none" stroke="url(#frame_${safeKey})" stroke-width="1.4"/>
  <!-- Metal frame inner highlight -->
  <rect x="11.5" y="7.5" width="117" height="275" rx="21" fill="none" stroke="white" stroke-width="0.4" stroke-opacity="0.08"/>

  <!-- Backglass shine -->
  <rect x="10" y="6" width="120" height="278" rx="22" fill="url(#shine_${safeKey})" clip-path="url(#phoneclip_${safeKey})"/>

  <!-- Left edge highlight streak -->
  <rect x="12" y="30" width="2.5" height="200" rx="1.2" fill="white" opacity="0.06"/>
  <!-- Right edge shadow -->
  <rect x="126" y="30" width="2" height="200" rx="1" fill="black" opacity="0.3"/>

  ${
    isPremium
      ? `
  <!-- Premium side accent line -->
  <rect x="10" y="6" width="120" height="2" rx="1" fill="url(#frame_${safeKey})" opacity="0.6"/>
  <rect x="10" y="282" width="120" height="2" rx="1" fill="url(#frame_${safeKey})" opacity="0.4"/>
  `
      : ""
  }

  <!-- Camera module area (top back) -->
  ${camera}

  <!-- Screen outer bezel -->
  <rect x="16" y="58" width="108" height="208" rx="14" fill="#050810"/>
  <!-- Screen surface -->
  <rect x="18" y="60" width="104" height="204" rx="12" fill="url(#screen_${safeKey})"/>
  <!-- Screen wallpaper glow -->
  <rect x="18" y="60" width="104" height="204" rx="12" fill="url(#wallpaper_${safeKey})"/>
  <!-- Screen glass shine -->
  <rect x="18" y="60" width="52" height="204" rx="12" fill="url(#shine_${safeKey})" opacity="1.5"/>

  <!-- Status bar -->
  <rect x="22" y="64" width="96" height="12" rx="4" fill="black" opacity="0.25"/>
  <!-- Time text placeholder -->
  <rect x="26" y="67" width="22" height="5" rx="2" fill="white" opacity="0.35"/>
  <!-- Status icons -->
  <rect x="96" y="67" width="8" height="5" rx="1.5" fill="white" opacity="0.28"/>
  <rect x="107" y="67" width="6" height="5" rx="1.5" fill="${c1}" opacity="0.5"/>

  ${
    hasNotch
      ? `<!-- iPhone Dynamic Island -->
    <rect x="47" y="62" width="46" height="14" rx="7" fill="#030507"/>
    <circle cx="62" cy="69" r="3" fill="#050810"/>
    <circle cx="62" cy="69" r="1.8" fill="#0a0f18"/>
    <rect x="70" y="64" width="20" height="10" rx="5" fill="#030507"/>`
      : `<!-- Punch hole -->
    <circle cx="70" cy="70" r="5" fill="#030507"/>
    <circle cx="70" cy="70" r="3.5" fill="#050810"/>
    <circle cx="70" cy="70" r="2" fill="#0a0f18"/>
    <circle cx="68.8" cy="68.8" r="0.8" fill="white" opacity="0.25"/>`
  }

  <!-- App grid / screen content -->
  <!-- Widgets row 1 -->
  <rect x="22" y="88" width="96" height="28" rx="8" fill="${c1}" opacity="0.08"/>
  <rect x="28" y="93" width="40" height="4" rx="2" fill="${c1}" opacity="0.5"/>
  <rect x="28" y="101" width="28" height="3" rx="1.5" fill="white" opacity="0.2"/>
  <rect x="88" y="91" width="24" height="22" rx="6" fill="${c2}" opacity="0.15"/>
  <text x="100" y="106" text-anchor="middle" font-size="9" fill="${c2}" opacity="0.7" font-family="Arial">📶</text>

  <!-- App grid row 1 -->
  ${[0, 1, 2, 3]
    .map(
      (i) => `
  <rect x="${26 + i * 22}" y="124" width="18" height="18" rx="5"
    fill="hsl(${((parseInt(c1.slice(1), 16) / 0xffffff) * 360 + i * 60) % 360},65%,45%)"
    opacity="${0.55 + i * 0.05}"/>
  <rect x="${29 + i * 22}" y="127" width="12" height="12" rx="3"
    fill="hsl(${((parseInt(c1.slice(1), 16) / 0xffffff) * 360 + i * 60 + 20) % 360},80%,60%)"
    opacity="0.3"/>
  `,
    )
    .join("")}

  <!-- App grid row 2 -->
  ${[0, 1, 2, 3]
    .map(
      (i) => `
  <rect x="${26 + i * 22}" y="148" width="18" height="18" rx="5"
    fill="hsl(${((parseInt(c2.slice(1), 16) / 0xffffff) * 360 + i * 60) % 360},60%,42%)"
    opacity="0.5"/>
  `,
    )
    .join("")}

  <!-- App grid row 3 -->
  ${[0, 1, 2, 3]
    .map(
      (i) => `
  <rect x="${26 + i * 22}" y="172" width="18" height="18" rx="5"
    fill="hsl(${((parseInt(c1.slice(1), 16) / 0xffffff) * 360 + i * 45 + 30) % 360},55%,40%)"
    opacity="0.42"/>
  `,
    )
    .join("")}

  <!-- Notification banner -->
  <rect x="22" y="196" width="96" height="22" rx="7" fill="white" opacity="0.06"/>
  <rect x="28" y="200" width="14" height="14" rx="4" fill="${c1}" opacity="0.4"/>
  <rect x="46" y="202" width="38" height="3.5" rx="1.5" fill="white" opacity="0.3"/>
  <rect x="46" y="209" width="28" height="3" rx="1.5" fill="white" opacity="0.15"/>

  <!-- Bottom doc -->
  <rect x="22" y="225" width="96" height="28" rx="8" fill="black" opacity="0.3"/>
  ${[0, 1, 2, 3]
    .map(
      (i) => `
  <rect x="${28 + i * 22}" y="229" width="18" height="18" rx="5"
    fill="hsl(${((parseInt(c1.slice(1), 16) / 0xffffff) * 360 + i * 90) % 360},70%,50%)"
    opacity="0.6"/>
  `,
    )
    .join("")}

  <!-- Home indicator -->
  <rect x="52" y="258" width="36" height="4" rx="2" fill="white" opacity="0.3"/>

  <!-- Brand watermark on back (subtle) -->
  <text x="70" y="46" text-anchor="middle" font-size="6" font-weight="700"
    fill="${c1}" opacity="0.35" font-family="Arial" letter-spacing="2">${brand.substring(0, 7).toUpperCase()}</text>

  <!-- Power button -->
  <rect x="129" y="88" width="3.5" height="28" rx="1.8" fill="url(#frame_${safeKey})" opacity="0.8"/>
  <rect x="129.5" y="89" width="2.5" height="26" rx="1.2" fill="white" opacity="0.1"/>

  <!-- Volume buttons -->
  <rect x="7.5" y="80" width="3.5" height="18" rx="1.8" fill="url(#frame_${safeKey})" opacity="0.75"/>
  <rect x="7.5" y="104" width="3.5" height="24" rx="1.8" fill="url(#frame_${safeKey})" opacity="0.75"/>
  <!-- Mute switch (Apple) -->
  ${brand === "Apple" ? `<rect x="7.5" y="60" width="3.5" height="12" rx="1.8" fill="url(#frame_${safeKey})" opacity="0.6"/>` : ``}

  <!-- Bottom speaker grille -->
  ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${44 + i * 8}" cy="${276}" r="1.5" fill="black" opacity="0.6"/>`).join("")}
  ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${44 + i * 8}" cy="${276}" r="1" fill="${c1}" opacity="0.12"/>`).join("")}
  <!-- USB-C port -->
  <rect x="57" y="278" width="26" height="5" rx="2.5" fill="#080c14"/>
  <rect x="58" y="279" width="24" height="3" rx="1.5" fill="${c1}" opacity="0.2"/>
  <!-- Front camera area glow -->
  <circle cx="70" cy="70" r="8" fill="${c1}" opacity="0.04" filter="url(#softglow_${safeKey})"/>
</svg>`;

  aiImageCache[key] =
    "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
  return aiImageCache[key];
}

const productsDB = [
  // ── FEATURED FLAGSHIPS ──────────────────────────────────
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    display: '6.7" Super Retina XDR OLED 120Hz',
    processor: "Apple A17 Pro",
    camera: "48MP + 12MP + 12MP Triple",
    battery: "4422 mAh",
    ram: "8GB",
    storage: ["256GB", "512GB", "1TB"],
    price: 159900,
    stock: 12,
    status: "instock",
    featured: true,
    image: "images/apple-iphone-15-pro-max.jpg",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    display: '6.8" QHD+ Dynamic AMOLED 120Hz',
    processor: "Snapdragon 8 Gen 3",
    camera: "200MP + 12MP + 10MP + 50MP",
    battery: "5000 mAh",
    ram: "12GB",
    storage: ["256GB", "512GB", "1TB"],
    price: 129999,
    stock: 7,
    status: "instock",
    featured: true,
    image: "images/samsung-galaxy-s24-ultra-5g-sm-s928-stylus.jpg",
  },
  {
    id: 3,
    name: "OnePlus 12",
    brand: "OnePlus",
    display: '6.82" ProXDR LTPO AMOLED 120Hz',
    processor: "Snapdragon 8 Gen 3",
    camera: "50MP + 64MP + 48MP Hasselblad",
    battery: "5400 mAh",
    ram: "16GB",
    storage: ["256GB", "512GB"],
    price: 64999,
    stock: 0,
    status: "outstock",
    featured: true,
    image: "images/oneplus-12.jpg",
  },
  {
    id: 4,
    name: "Google Pixel 8 Pro",
    brand: "Google",
    display: '6.7" LTPO OLED 120Hz',
    processor: "Google Tensor G3",
    camera: "50MP + 48MP + 48MP",
    battery: "5050 mAh",
    ram: "12GB",
    storage: ["128GB", "256GB", "512GB", "1TB"],
    price: 106999,
    stock: 3,
    status: "instock",
    featured: true,
    image: "images/google-pixel-8-pro.jpg",
  },
  {
    id: 5,
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    display: '6.73" LTPO AMOLED 120Hz',
    processor: "Snapdragon 8 Gen 3",
    camera: "50MP Leica Quad Camera",
    battery: "5300 mAh",
    ram: "16GB",
    storage: ["512GB", "1TB"],
    price: 99999,
    stock: 2,
    status: "restock",
    featured: true,
    image: "images/xiaomi-14-ultra-new.jpg",
  },
  {
    id: 6,
    name: "Nothing Phone (2)",
    brand: "Nothing",
    display: '6.7" LTPO OLED 120Hz',
    processor: "Snapdragon 8+ Gen 1",
    camera: "50MP + 50MP Dual",
    battery: "4700 mAh",
    ram: "12GB",
    storage: ["256GB", "512GB"],
    price: 44999,
    stock: 15,
    status: "instock",
    featured: true,
    image: "images/nothing-phone2_.jpg",
  },
  // ── CSV PRODUCTS ─────────────────────────────────────────
  {
    id: 100,
    name: "Apple iPhone 11",
    brand: "Apple",
    display: "5G · OLED Display",
    processor: "Apple A15 Bionic",
    camera: "50MP Camera",
    battery: "4079mAh",
    ram: "12GB",
    storage: ["256GB"],
    price: 119940,
    stock: 5,
    status: "instock",
    image: "images/apple-iphone-11.jpg",
  },
  {
    id: 101,
    name: "Apple iPhone SE",
    brand: "Apple",
    display: "5G · OLED Display",
    processor: "Samsung Exynos 2200",
    camera: "50MP Camera",
    battery: "5107mAh",
    ram: "4GB",
    storage: ["256GB"],
    price: 114346,
    stock: 5,
    status: "instock",
    image: "images/apple-iphone-se-2020.jpg",
  },
  {
    id: 102,
    name: "Apple iPhone 15",
    brand: "Apple",
    display: "5G · Super Retina XDR",
    processor: "MediaTek Dimensity 920",
    camera: "48MP Camera",
    battery: "4802mAh",
    ram: "6GB",
    storage: ["64GB"],
    price: 109172,
    stock: 5,
    status: "instock",
    image: "images/apple-iphone-15.jpg",
  },
  {
    id: 103,
    name: "Apple iPhone 8",
    brand: "Apple",
    display: "4G · Retina Display",
    processor: "Apple A16 Bionic",
    camera: "108MP Camera",
    battery: "4621mAh",
    ram: "6GB",
    storage: ["256GB"],
    price: 103083,
    stock: 5,
    status: "instock",
    image: "images/apple-iphone-8-new.jpg",
  },
  {
    id: 104,
    name: "Samsung Galaxy S 20",
    brand: "Samsung",
    display: "5G · Dynamic AMOLED",
    processor: "MediaTek Dimensity 920",
    camera: "50MP Camera",
    battery: "5893mAh",
    ram: "8GB",
    storage: ["256GB"],
    price: 119838,
    stock: 5,
    status: "instock",
    image: "images/samsung-galaxy-s20-.jpg",
  },
  {
    id: 105,
    name: "Samsung Galaxy S 26 ultra",
    brand: "Samsung",
    display: "5G · AMOLED 120Hz",
    processor: "Samsung Exynos 2200",
    camera: "48MP Camera",
    battery: "4862mAh",
    ram: "6GB",
    storage: ["512GB"],
    price: 119717,
    stock: 5,
    status: "instock",
    image: "images/samsung-galaxy-s26-ultra-new.jpg",
  },
  {
    id: 106,
    name: "Samsung Galaxy S 25",
    brand: "Samsung",
    display: "4G · QHD+ AMOLED",
    processor: "Apple A15 Bionic",
    camera: "200MP Camera",
    battery: "4386mAh",
    ram: "8GB",
    storage: ["512GB"],
    price: 119528,
    stock: 5,
    status: "instock",
    image: "images/samsung-galaxy-s25-fe.jpg",
  },
  {
    id: 107,
    name: "Samsung Galaxy A 7",
    brand: "Samsung",
    display: "5G · Super AMOLED",
    processor: "MediaTek Dimensity 920",
    camera: "108MP Camera",
    battery: "5123mAh",
    ram: "6GB",
    storage: ["512GB"],
    price: 118765,
    stock: 5,
    status: "instock",
    image: "images/samsung-galaxy-a07-5g.jpg",
  },
  {
    id: 108,
    name: "Samsung Galaxy F 36",
    brand: "Samsung",
    display: "5G · AMOLED Display",
    processor: "MediaTek Dimensity 8200",
    camera: "48MP Camera",
    battery: "5285mAh",
    ram: "6GB",
    storage: ["512GB"],
    price: 117442,
    stock: 5,
    status: "instock",
    image: "images/samsung-galaxy-f36.jpg",
  },
  {
    id: 109,
    name: "Samsung Galaxy S 5",
    brand: "Samsung",
    display: "5G · Dynamic AMOLED",
    processor: "Apple A15 Bionic",
    camera: "50MP Camera",
    battery: "5680mAh",
    ram: "4GB",
    storage: ["256GB"],
    price: 117190,
    stock: 5,
    status: "instock",
    image: "images/samsung-galaxy-s25-sm-s931.jpg",
  },
  {
    id: 110,
    name: "Redmi Note 10",
    brand: "Redmi",
    display: "5G · AMOLED Display",
    processor: "Samsung Exynos 2200",
    camera: "200MP Camera",
    battery: "4104mAh",
    ram: "12GB",
    storage: ["256GB"],
    price: 119348,
    stock: 5,
    status: "instock",
    image: "images/xiaomi-redmi-note10--.jpg",
  },
  {
    id: 111,
    name: "Redmi K 80",
    brand: "Redmi",
    display: "5G · AMOLED 120Hz",
    processor: "MediaTek Dimensity 8200",
    camera: "50MP Camera",
    battery: "4719mAh",
    ram: "8GB",
    storage: ["256GB"],
    price: 119343,
    stock: 5,
    status: "instock",
    image: "images/xiaomi-redmi-k80-.jpg",
  },
  {
    id: 112,
    name: "Redmi K 80 pro",
    brand: "Redmi",
    display: "4G · AMOLED Display",
    processor: "MediaTek Dimensity 920",
    camera: "108MP Camera",
    battery: "4871mAh",
    ram: "4GB",
    storage: ["64GB"],
    price: 118796,
    stock: 5,
    status: "instock",
    image: "images/xiaomi-redmi-k80-pro-.jpg",
  },
  {
    id: 113,
    name: "Redmi 90",
    brand: "Redmi",
    display: "5G · AMOLED 120Hz",
    processor: "Apple A15 Bionic",
    camera: "48MP Camera",
    battery: "5237mAh",
    ram: "6GB",
    storage: ["512GB"],
    price: 118763,
    stock: 5,
    status: "instock",
    image: "images/xiaomi-redmi-90.jpg",
  },
  {
    id: 114,
    name: "Redmi Note 6 pro",
    brand: "Redmi",
    display: "4G · AMOLED Display",
    processor: "Qualcomm Snapdragon 8 Gen 2",
    camera: "48MP Camera",
    battery: "5270mAh",
    ram: "6GB",
    storage: ["512GB"],
    price: 116717,
    stock: 5,
    status: "instock",
    image: "images/xiaomi-redmi-note-6-pro-r.jpg",
  },
  {
    id: 115,
    name: "Realme GT 7",
    brand: "Realme",
    display: "5G · AMOLED 144Hz",
    processor: "Qualcomm Snapdragon 8 Gen 2",
    camera: "50MP Camera",
    battery: "5281mAh",
    ram: "6GB",
    storage: ["512GB"],
    price: 119817,
    stock: 5,
    status: "instock",
    image: "images/realme-gt-7.jpg",
  },
  {
    id: 116,
    name: "Realme GT 6",
    brand: "Realme",
    display: "5G · AMOLED 120Hz",
    processor: "Samsung Exynos 2200",
    camera: "200MP Camera",
    battery: "5283mAh",
    ram: "4GB",
    storage: ["64GB"],
    price: 119093,
    stock: 5,
    status: "instock",
    image: "images/realme-gt6.jpg",
  },
  {
    id: 117,
    name: "Realme GT 2",
    brand: "Realme",
    display: "4G · AMOLED Display",
    processor: "Samsung Exynos 2200",
    camera: "108MP Camera",
    battery: "4844mAh",
    ram: "4GB",
    storage: ["256GB"],
    price: 117294,
    stock: 5,
    status: "instock",
    image: "images/realme-gt2.jpg",
  },
  {
    id: 118,
    name: "Realme GT 2 pro",
    brand: "Realme",
    display: "4G · AMOLED 120Hz",
    processor: "Qualcomm Snapdragon 7 Gen 1",
    camera: "64MP Camera",
    battery: "4584mAh",
    ram: "12GB",
    storage: ["128GB"],
    price: 117133,
    stock: 5,
    status: "instock",
    image: "images/realme-gt2-pro.jpg",
  },
  {
    id: 119,
    name: "POCO X 7",
    brand: "POCO",
    display: "5G · AMOLED 120Hz",
    processor: "Samsung Exynos 2200",
    camera: "108MP Camera",
    battery: "5812mAh",
    ram: "12GB",
    storage: ["64GB"],
    price: 113555,
    stock: 5,
    status: "instock",
    image: "images/xiaomi-poco-x7.jpg",
  },
  {
    id: 120,
    name: "POCO m8 pro",
    brand: "POCO",
    display: "5G · AMOLED 144Hz",
    processor: "Apple A16 Bionic",
    camera: "108MP Camera",
    battery: "5114mAh",
    ram: "12GB",
    storage: ["512GB"],
    price: 113304,
    stock: 5,
    status: "instock",
    image: "images/xiaomi-poco-m8-pro.jpg",
  },
  {
    id: 121,
    name: "POCO X 7 pro",
    brand: "POCO",
    display: "4G · AMOLED 120Hz",
    processor: "Apple A16 Bionic",
    camera: "50MP Camera",
    battery: "5112mAh",
    ram: "6GB",
    storage: ["512GB"],
    price: 112000,
    stock: 5,
    status: "instock",
    image: "images/xiaomi-poco-x7-pro.jpg",
  },
  {
    id: 122,
    name: "POCO M 13",
    brand: "POCO",
    display: "4G · AMOLED Display",
    processor: "Samsung Exynos 2200",
    camera: "48MP Camera",
    battery: "5494mAh",
    ram: "8GB",
    storage: ["128GB"],
    price: 111675,
    stock: 5,
    status: "instock",
    image: "images/xiaomi-poco-m8-pro.jpg",
  },
  {
    id: 123,
    name: "Oppo A 17",
    brand: "Oppo",
    display: "4G · AMOLED Display",
    processor: "Apple A16 Bionic",
    camera: "50MP Camera",
    battery: "4180mAh",
    ram: "4GB",
    storage: ["256GB"],
    price: 118411,
    stock: 5,
    status: "instock",
    image: "images/oppo-a17.jpg",
  },
  {
    id: 124,
    name: "Oppo Reno 15",
    brand: "Oppo",
    display: "4G · AMOLED 90Hz",
    processor: "Samsung Exynos 2200",
    camera: "64MP Camera",
    battery: "5595mAh",
    ram: "6GB",
    storage: ["512GB"],
    price: 117831,
    stock: 5,
    status: "instock",
    image: "images/oppo-reno15-f.jpg",
  },
  {
    id: 125,
    name: "Oppo Reno 24",
    brand: "Oppo",
    display: "5G · AMOLED 120Hz",
    processor: "MediaTek Dimensity 920",
    camera: "48MP Camera",
    battery: "4556mAh",
    ram: "8GB",
    storage: ["64GB"],
    price: 117521,
    stock: 5,
    status: "instock",
    image: "images/oppo-reno2.jpg",
  },
  {
    id: 126,
    name: "Oppo Reno 6",
    brand: "Oppo",
    display: "5G · AMOLED 90Hz",
    processor: "MediaTek Dimensity 920",
    camera: "50MP Camera",
    battery: "4361mAh",
    ram: "8GB",
    storage: ["256GB"],
    price: 117278,
    stock: 5,
    status: "instock",
    image: "images/oppo-reno6-4g.jpg",
  },
  {
    id: 127,
    name: "Vivo V 70",
    brand: "Vivo",
    display: "5G · AMOLED Display",
    processor: "Apple A15 Bionic",
    camera: "108MP Camera",
    battery: "4997mAh",
    ram: "4GB",
    storage: ["128GB"],
    price: 119307,
    stock: 5,
    status: "instock",
    image: "images/vivo-v70.jpg",
  },
  {
    id: 128,
    name: "Vivo X 300",
    brand: "Vivo",
    display: "5G · AMOLED 120Hz",
    processor: "Qualcomm Snapdragon 7 Gen 1",
    camera: "48MP Camera",
    battery: "5103mAh",
    ram: "4GB",
    storage: ["256GB"],
    price: 117818,
    stock: 5,
    status: "instock",
    image: "images/vivo-x300.jpg",
  },
  {
    id: 129,
    name: "Vivo V 70 elite",
    brand: "Vivo",
    display: "4G · AMOLED Display",
    processor: "Samsung Exynos 2200",
    camera: "108MP Camera",
    battery: "5716mAh",
    ram: "4GB",
    storage: ["64GB"],
    price: 117312,
    stock: 5,
    status: "instock",
    image: "images/vivo-v70-elite.jpg",
  },
  {
    id: 130,
    name: "Vivo T 4 pro",
    brand: "Vivo",
    display: "4G · LCD Display",
    processor: "MediaTek Dimensity 8200",
    camera: "200MP Camera",
    battery: "5169mAh",
    ram: "8GB",
    storage: ["128GB"],
    price: 116556,
    stock: 5,
    status: "instock",
    image: "images/vivo-t4-pro.jpg",
  },
  {
    id: 131,
    name: "iQOO 15 ultra",
    brand: "iQOO",
    display: "4G · AMOLED 120Hz",
    processor: "Samsung Exynos 2200",
    camera: "64MP Camera",
    battery: "4660mAh",
    ram: "4GB",
    storage: ["64GB"],
    price: 119510,
    stock: 5,
    status: "instock",
    image: "images/vivo-iqoo-15-ultra.jpg",
  },
  {
    id: 132,
    name: "iQOO 15r",
    brand: "iQOO",
    display: "4G · AMOLED 144Hz",
    processor: "Apple A15 Bionic",
    camera: "50MP Camera",
    battery: "5787mAh",
    ram: "12GB",
    storage: ["64GB"],
    price: 118473,
    stock: 5,
    status: "instock",
    image: "images/vivo-iqoo-15r.jpg",
  },
  {
    id: 133,
    name: "iQOO Neo 10",
    brand: "iQOO",
    display: "4G · AMOLED 120Hz",
    processor: "Qualcomm Snapdragon 8 Gen 2",
    camera: "200MP Camera",
    battery: "4055mAh",
    ram: "6GB",
    storage: ["512GB"],
    price: 107504,
    stock: 5,
    status: "instock",
    image: "images/vivo-iqoo-neo-10.jpg",
  },
  {
    id: 134,
    name: "Nothing Phone (1)",
    brand: "Nothing",
    display: "4G · OLED 120Hz",
    processor: "MediaTek Dimensity 920",
    camera: "48MP Camera",
    battery: "5534mAh",
    ram: "12GB",
    storage: ["256GB"],
    price: 115918,
    stock: 5,
    status: "instock",
    image: "images/nothing-phone-1.jpg",
  },
  {
    id: 135,
    name: "Nothing Phone (2)",
    brand: "Nothing",
    display: "5G · OLED 120Hz",
    processor: "Qualcomm Snapdragon 8 Gen 2",
    camera: "64MP Camera",
    battery: "4681mAh",
    ram: "6GB",
    storage: ["64GB"],
    price: 104856,
    stock: 5,
    status: "instock",
    image: "images/nothing-phone2_.jpg",
  },
  {
    id: 136,
    name: "Nothing Phone (3)",
    brand: "Nothing",
    display: "4G · OLED 120Hz",
    processor: "MediaTek Dimensity 920",
    camera: "200MP Camera",
    battery: "4502mAh",
    ram: "12GB",
    storage: ["64GB"],
    price: 104514,
    stock: 5,
    status: "instock",
    image: "images/nothing-phone-3-new.jpg",
  },
  {
    id: 137,
    name: "Motorola Moto g85",
    brand: "Motorola",
    display: "4G · IPS LCD",
    processor: "Qualcomm Snapdragon 7 Gen 1",
    camera: "108MP Camera",
    battery: "4665mAh",
    ram: "4GB",
    storage: ["128GB"],
    price: 117758,
    stock: 5,
    status: "instock",
    image: "images/motorola-moto-g85.jpg",
  },
  {
    id: 138,
    name: "Motorola g86 power",
    brand: "Motorola",
    display: "5G · pOLED 144Hz",
    processor: "MediaTek Dimensity 8200",
    camera: "200MP Camera",
    battery: "5778mAh",
    ram: "8GB",
    storage: ["256GB"],
    price: 116824,
    stock: 5,
    status: "instock",
    image: "images/motorola-moto-g86-power.jpg",
  },
  {
    id: 139,
    name: "Motorola edge ",
    brand: "Motorola",
    display: "4G · IPS LCD",
    processor: "MediaTek Dimensity 8200",
    camera: "64MP Camera",
    battery: "5953mAh",
    ram: "6GB",
    storage: ["256GB"],
    price: 112532,
    stock: 5,
    status: "instock",
    image: "images/motorola-edge-midnight-magenta.jpg",
  },
  {
    id: 140,
    name: "Motorola edge 70 fusion",
    brand: "Motorola",
    display: "5G · IPS LCD",
    processor: "MediaTek Dimensity 920",
    camera: "200MP Camera",
    battery: "5079mAh",
    ram: "4GB",
    storage: ["512GB"],
    price: 104564,
    stock: 5,
    status: "instock",
    image: "images/motorola-edge-70-fusion.jpg",
  },
  {
    id: 141,
    name: "Infinix Note 11",
    brand: "Infinix",
    display: "4G · AMOLED Display",
    processor: "Qualcomm Snapdragon 8 Gen 2",
    camera: "64MP Camera",
    battery: "5277mAh",
    ram: "12GB",
    storage: ["64GB"],
    price: 116970,
    stock: 5,
    status: "instock",
    image: "images/infinix-note11.jpg",
  },
  {
    id: 142,
    name: "Infinix Hot 10",
    brand: "Infinix",
    display: "4G · IPS LCD",
    processor: "Apple A15 Bionic",
    camera: "48MP Camera",
    battery: "5555mAh",
    ram: "12GB",
    storage: ["128GB"],
    price: 116735,
    stock: 5,
    status: "instock",
    image: "images/infinix-hot10.jpg",
  },
  {
    id: 143,
    name: "Infinix Zero 40",
    brand: "Infinix",
    display: "4G · AMOLED Display",
    processor: "Samsung Exynos 2200",
    camera: "50MP Camera",
    battery: "5683mAh",
    ram: "4GB",
    storage: ["64GB"],
    price: 115459,
    stock: 5,
    status: "instock",
    image: "images/infinix-zero40-5g-.jpg",
  },
  {
    id: 144,
    name: "Tecno Spark 9 pro",
    brand: "Tecno",
    display: "5G · IPS LCD",
    processor: "Samsung Exynos 2200",
    camera: "200MP Camera",
    battery: "5822mAh",
    ram: "12GB",
    storage: ["512GB"],
    price: 109710,
    stock: 5,
    status: "instock",
    image: "images/tecno-spark9-pro.jpg",
  },
  {
    id: 145,
    name: "Tecno Pova 7",
    brand: "Tecno",
    display: "5G · IPS LCD",
    processor: "Apple A16 Bionic",
    camera: "50MP Camera",
    battery: "4976mAh",
    ram: "4GB",
    storage: ["256GB"],
    price: 109550,
    stock: 5,
    status: "instock",
    image: "images/tecno-pova7.jpg",
  },
  {
    id: 146,
    name: "Lava Blaze duo3",
    brand: "Lava",
    display: "4G · IPS LCD",
    processor: "MediaTek Dimensity 920",
    camera: "50MP Camera",
    battery: "4827mAh",
    ram: "4GB",
    storage: ["512GB"],
    price: 119834,
    stock: 5,
    status: "instock",
    image: "images/lava-blaze-duo3.jpg",
  },
  {
    id: 147,
    name: "Lava Agni4",
    brand: "Lava",
    display: "5G · AMOLED Display",
    processor: "Samsung Exynos 2200",
    camera: "108MP Camera",
    battery: "5866mAh",
    ram: "4GB",
    storage: ["256GB"],
    price: 116511,
    stock: 5,
    status: "instock",
    image: "images/lava-agni4.jpg",
  },
  // ── POORVIKA PRODUCTS ──────
  {
    id: 200,
    name: "Vivo V70 Elite 5G",
    brand: "Vivo",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "12GB",
    storage: ["512GB"],
    price: 61999,
    color: "Passion Red",
    stock: 15,
    status: "instock",
    image: "images/vivo-v70-elite.jpg",
  },
  {
    id: 201,
    name: "Vivo V70 Elite 5G",
    brand: "Vivo",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "12GB",
    storage: ["256GB"],
    price: 56999,
    color: "Passion Red",
    stock: 15,
    status: "instock",
    image: "images/vivo-v70-elite.jpg",
  },
  {
    id: 202,
    name: "Vivo V70 Elite 5G",
    brand: "Vivo",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "8GB",
    storage: ["256GB"],
    price: 51999,
    color: "Passion Red",
    stock: 15,
    status: "instock",
    image: "images/vivo-v70-elite.jpg",
  },
  {
    id: 203,
    name: "Vivo V70 5G",
    brand: "Vivo",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "12GB",
    storage: ["256GB"],
    price: 49999,
    color: "Lemon Yellow",
    stock: 30,
    status: "instock",
    image: "images/vivo-v70.jpg",
  },
  {
    id: 204,
    name: "Vivo V70 5G",
    brand: "Vivo",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "8GB",
    storage: ["256GB"],
    price: 45999,
    color: "Lemon Yellow",
    stock: 30,
    status: "instock",
    image: "images/vivo-v70.jpg",
  },
  {
    id: 205,
    name: "Vivo T4 Pro 5G",
    brand: "Vivo",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "12GB",
    storage: ["256GB"],
    price: 31999,
    color: "Nitro Blue",
    stock: 30,
    status: "instock",
    image: "images/vivo-t4-pro.jpg",
  },
  {
    id: 206,
    name: "Samsung Galaxy S26 Ultra 5G",
    brand: "Samsung",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "16GB",
    storage: ["1TB"],
    price: 189999,
    orig_price: null,
    discount: "",
    color: "Cobalt Violet",
    stock: 8,
    status: "instock",
    image: "images/samsung-galaxy-s26-ultra-new.jpg",
  },
  {
    id: 207,
    name: "Samsung Galaxy S26 Ultra 5G",
    brand: "Samsung",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "12GB",
    storage: ["512GB"],
    price: 139999,
    color: "White",
    stock: 8,
    status: "instock",
    image: "images/samsung-galaxy-s26-ultra-new.jpg",
  },
  {
    id: 208,
    name: "Samsung Galaxy S26 5G",
    brand: "Samsung",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "12GB",
    storage: ["512GB"],
    price: 87999,
    orig_price: null,
    discount: "",
    color: "White",
    stock: 15,
    status: "instock",
    image: "images/samsung-galaxy-s26.jpg",
  },
  {
    id: 209,
    name: "Samsung Galaxy A07 5G",
    brand: "Samsung",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "6GB",
    storage: ["128GB"],
    price: 17999,
    orig_price: null,
    discount: "",
    color: "Black",
    stock: 30,
    status: "instock",
    image: "images/samsung-galaxy-a07-5g.jpg",
  },
  {
    id: 210,
    name: "Samsung Galaxy A07 5G",
    brand: "Samsung",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "4GB",
    storage: ["128GB"],
    price: 15999,
    orig_price: null,
    discount: "",
    color: "Black",
    stock: 30,
    status: "instock",
    image: "images/samsung-galaxy-a07-5g.jpg",
  },
  {
    id: 211,
    name: "Samsung Galaxy S25 FE 5G",
    brand: "Samsung",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "8GB",
    storage: ["256GB"],
    price: 65999,
    orig_price: null,
    discount: "",
    color: "White",
    stock: 15,
    status: "instock",
    image: "images/samsung-galaxy-s25-fe.jpg",
  },
  {
    id: 212,
    name: "Samsung Galaxy S25 Ultra 5G",
    brand: "Samsung",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "12GB",
    storage: ["512GB"],
    price: 141999,
    orig_price: null,
    discount: "",
    color: "Titanium Jetblack",
    stock: 8,
    status: "instock",
    image: "images/samsung-galaxy-s25-ultra-sm-s938.jpg",
  },
  {
    id: 213,
    name: "Samsung Galaxy A17 5G",
    brand: "Samsung",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "8GB",
    storage: ["256GB"],
    price: 23499,
    color: "Black",
    stock: 30,
    status: "instock",
    image: "images/samsung-galaxy-a17-5g.jpg",
  },
  {
    id: 214,
    name: "Nothing Phone (3a) Lite 5G",
    brand: "Nothing",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "8GB",
    storage: ["256GB"],
    price: 23999,
    color: "Blue",
    stock: 30,
    status: "instock",
    image: "images/nothing-phone-3a-lite-.jpg",
  },
  {
    id: 215,
    name: "Nothing Phone (3a) Lite 5G",
    brand: "Nothing",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "8GB",
    storage: ["128GB"],
    price: 21999,
    color: "White",
    stock: 30,
    status: "instock",
    image: "images/nothing-phone-3a-lite-.jpg",
  },
  {
    id: 216,
    name: "Nothing Phone 3 5G",
    brand: "Nothing",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "16GB",
    storage: ["512GB"],
    price: 89999,
    color: "Black",
    stock: 15,
    status: "instock",
    image: "images/nothing-phone-3-new.jpg",
  },
  {
    id: 217,
    name: "Nothing Phone 3 5G",
    brand: "Nothing",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "12GB",
    storage: ["256GB"],
    price: 79999,
    color: "White",
    stock: 15,
    status: "instock",
    image: "images/nothing-phone-3-new.jpg",
  },
  {
    id: 218,
    name: "CMF by Nothing Phone 2 Pro 5G",
    brand: "Nothing",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "8GB",
    storage: ["256GB"],
    price: 20999,
    color: "Orange",
    stock: 30,
    status: "instock",
    image: "images/nothing-cmf-phone-2-pro.jpg",
  },
  {
    id: 219,
    name: "CMF by Nothing Phone 2 Pro 5G",
    brand: "Nothing",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "8GB",
    storage: ["128GB"],
    price: 18999,
    color: "Orange",
    stock: 30,
    status: "instock",
    image: "images/nothing-cmf-phone-2-pro.jpg",
  },
  {
    id: 220,
    name: "Google Pixel 10a 5G",
    brand: "Google",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "8GB",
    storage: ["256GB"],
    price: 49999,
    orig_price: null,
    discount: "",
    color: "Berry",
    stock: 30,
    status: "instock",
    image: "images/google-pixel-10a.jpg",
  },
  {
    id: 221,
    name: "Google Pixel 10 Pro Fold 5G",
    brand: "Google",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "16GB",
    storage: ["256GB"],
    price: 172999,
    orig_price: null,
    discount: "",
    color: "Moonstone",
    stock: 8,
    status: "instock",
    image: "images/google-pixel-10-pro-fold--.jpg",
  },
  {
    id: 222,
    name: "Google Pixel 10 Pro XL 5G",
    brand: "Google",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "16GB",
    storage: ["256GB"],
    price: 124999,
    orig_price: null,
    discount: "",
    color: "Moonstone",
    stock: 8,
    status: "instock",
    image: "images/google-pixel-10-pro-xl-.jpg",
  },
  {
    id: 223,
    name: "Google Pixel 10 Pro 5G",
    brand: "Google",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "16GB",
    storage: ["256GB"],
    price: 109999,
    orig_price: null,
    discount: "",
    color: "Moonstone",
    stock: 8,
    status: "instock",
    image: "images/google-pixel-10-pro-xl-.jpg",
  },
  {
    id: 224,
    name: "Google Pixel 10 5G",
    brand: "Google",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "12GB",
    storage: ["256GB"],
    price: 74999,
    orig_price: null,
    discount: "",
    color: "Indigo",
    stock: 15,
    status: "instock",
    image: "images/google-pixel-10-.jpg",
  },
  {
    id: 225,
    name: "Google Pixel 9A 5G",
    brand: "Google",
    display: "5G · AMOLED Display",
    processor: "Latest Flagship Chip",
    camera: "50MP AI Camera",
    battery: "5000mAh",
    ram: "8GB",
    storage: ["256GB"],
    price: 39999,
    orig_price: null,
    discount: "",
    color: "Obsidian",
    stock: 30,
    status: "instock",
    image: "images/google-pixel-9a.jpg",
  },
];

// Pre-populate product images from mapping if not provided
productsDB.forEach((p) => {
  if (!p.image || p.image === "null" || p.image === null) {
    // Use smart mapping to find image path
    p.image = getRealProductImage(p.name, p.brand);
  }
});

// Orders store (simulated)
let ordersDB = JSON.parse(localStorage.getItem("krisithra_orders") || "[]");
const WHATSAPP_NUMBER = "918438504787"; // Replace with actual number
const ADMIN_CREDS = { user: "admin", pass: "krisithra2024" };
const GST_RATE = 0.18;
let currentProduct = null;

// =========================================================
// STARFIELD
// =========================================================
function buildStars() {
  const sf = document.getElementById("starfield");
  for (let i = 0; i < 180; i++) {
    const s = document.createElement("div");
    s.className = "star";
    const sz = Math.random() * 2 + 0.5;
    s.style.cssText = `
      width:${sz}px; height:${sz}px;
      top:${Math.random() * 100}%; left:${Math.random() * 100}%;
      --dur:${2 + Math.random() * 4}s; --del:${Math.random() * 5}s;
      --op1:${0.1 + Math.random() * 0.4}; --op2:${0.5 + Math.random() * 0.5};
    `;
    sf.appendChild(s);
  }
}
buildStars();

// =========================================================
// CURSOR
// =========================================================
const cursor = document.getElementById("cursor");
const dot = cursor.querySelector(".cursor-dot");
const ring = cursor.querySelector(".cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
}
animRing();

// =========================================================
// SCROLL REVEAL
// =========================================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// =========================================================
// PRODUCT RENDERING
// =========================================================
function getStatusBadge(status, stock) {
  if (status === "outstock" || stock === 0)
    return '<span class="stock-badge badge-outstock">Out of Stock</span>';
  if (status === "restock")
    return '<span class="stock-badge badge-restock">Restocking Soon</span>';
  return '<span class="stock-badge badge-instock">In Stock</span>';
}

let currentPage = 0;
const PAGE_SIZE = 12;
let currentList = [];

function renderProducts(list, reset = true) {
  const grid = document.getElementById("productsGrid");
  if (reset) {
    grid.innerHTML = "";
    currentPage = 0;
    currentList = list;
  }
  const start = currentPage * PAGE_SIZE;
  const slice = list.slice(start, start + PAGE_SIZE);
  slice.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product-card reveal";
    const disabled =
      p.stock === 0 || p.status === "outstock"
        ? 'disabled style="opacity:0.4;cursor:not-allowed;"'
        : "";
    const featuredBadge = p.featured
      ? '<span class="featured-badge">⭐ Featured</span>'
      : "";
    const discountBadge = p.discount
      ? `<span class="discount-badge">${p.discount}</span>`
      : "";
    const poorvikaBadge =
      p.source === "Poorvika"
        ? '<span class="poorvika-badge">📍 Poorvika</span>'
        : "";
    const origPriceHTML = p.orig_price
      ? `<span class="orig-price">₹${Math.round(p.orig_price).toLocaleString("en-IN")}</span>`
      : "";
    const colorDot = p.color
      ? `<span style="font-size:0.7rem;color:var(--text-dim);font-family:var(--font-ui);">• ${p.color}</span>`
      : "";
    // choose image: explicit or mapping
    const productImage = p.image || getRealProductImage(p.name, p.brand);
    card.innerHTML = `
      <div class="card-image-zone">
        ${getStatusBadge(p.status, p.stock)}
        ${featuredBadge}
        ${discountBadge}
        ${poorvikaBadge}
        <img src="${productImage}" alt="${p.name}" class="product-img" width="120" height="230" style="object-fit:contain;background:linear-gradient(135deg,rgba(0,200,255,0.1),rgba(0,255,178,0.1));border-radius:8px;padding:8px;" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" data-product-id="${p.id}">
        <div style="display:none;width:140px;height:220px;align-items:center;justify-content:center;padding:10px;background:linear-gradient(135deg,rgba(0,200,255,0.05),rgba(0,255,178,0.05));border-radius:8px;"><img src="${generatePhoneSVG(p.brand, p.name, p.price)}" width="100" height="190" style="object-fit:contain;filter:drop-shadow(0 8px 20px rgba(0,200,255,0.25));"></div>
      </div>
      <div class="card-body">
        <div class="card-brand" style="display:flex;align-items:center;gap:6px;">${p.brand} ${colorDot}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-specs">
          <div class="spec-item"><span class="spec-icon">📺</span>${p.display}</div>
          <div class="spec-item"><span class="spec-icon">⚡</span>${p.processor}</div>
          <div class="spec-item"><span class="spec-icon">🔋</span>${p.battery}</div>
          <div class="spec-item"><span class="spec-icon">💾</span>${p.ram} RAM · ${p.storage[0]}</div>
        </div>
        <div class="card-price">${origPriceHTML}₹${p.price.toLocaleString("en-IN")}<small>incl. GST</small></div>
        <div class="card-actions">
          <button class="btn-card btn-order" ${disabled} onclick="openOrderModal(${p.id})">📋 Order Now</button>
          <button class="btn-card btn-pay" ${disabled} onclick="openPayModal(${p.id})">💳 Pay Online</button>
          <button class="btn-card btn-whatsapp-btn btn-whatsapp" onclick="whatsappOrder(${p.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Order
          </button>
        </div>
      </div>
    `;
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(10px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
    grid.appendChild(card);
  });
  const existing = document.getElementById("loadMoreBtn");
  if (existing) existing.remove();
  if ((currentPage + 1) * PAGE_SIZE < list.length) {
    const btn = document.createElement("div");
    btn.id = "loadMoreBtn";
    btn.style.cssText =
      "grid-column: 1/-1; text-align:center; margin-top:1rem;";
    const remaining = list.length - (currentPage + 1) * PAGE_SIZE;
    btn.innerHTML = `<button class="btn-secondary" onclick="loadMore()" style="padding:14px 50px;">Load More (${remaining} more)</button>`;
    grid.appendChild(btn);
  }
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function loadMore() {
  currentPage++;
  renderProducts(currentList, false);
}

function buildFilters() {
  const bar = document.getElementById("filterBar");
  const brands = [...new Set(productsDB.map((p) => p.brand))];
  brands.forEach((b) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.brand = b;
    btn.textContent = b;
    btn.onclick = function () {
      filterProducts(this, b);
    };
    bar.appendChild(btn);
  });
}

function filterProducts(btn, brand) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  const list =
    brand === "all" ? productsDB : productsDB.filter((p) => p.brand === brand);
  renderProducts(list);
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// =========================================================
// MODALS
// =========================================================
function openModal(id) {
  document.getElementById(id).classList.add("open");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}
document.querySelectorAll(".modal-overlay").forEach((m) => {
  m.addEventListener("click", (e) => {
    if (e.target === m) m.classList.remove("open");
  });
});

// =========================================================
// ORDER MODAL
// =========================================================
function openOrderModal(pid) {
  const p = productsDB.find((x) => x.id === pid);
  currentProduct = p;
  const oid = generateOrderId();
  document.getElementById("orderModalContent").innerHTML = `
    <div style="margin-bottom:1.5rem;">
      <div style="display:flex; align-items:center; gap:1rem; padding:1rem; background:rgba(0,200,255,0.05); border:1px solid rgba(0,200,255,0.15); border-radius:10px; margin-bottom:1.5rem;">
        <div style="font-size:2rem;">📱</div>
        <div>
          <div style="font-family:var(--font-display); font-size:0.9rem; color:var(--accent-blue);">${p.name}</div>
          <div style="color:var(--text-muted); font-size:0.8rem;">${p.brand} · ₹${p.price.toLocaleString("en-IN")}</div>
        </div>
      </div>
      <div class="input-group">
        <label class="input-label">Full Name</label>
        <input type="text" class="admin-input" id="orderName" placeholder="Enter your name">
      </div>
      <div class="input-group">
        <label class="input-label">Mobile Number</label>
        <input type="tel" class="admin-input" id="orderPhone" placeholder="+91 98765 43210">
      </div>
      <div class="input-group">
        <label class="input-label">Delivery Address</label>
        <input type="text" class="admin-input" id="orderAddress" placeholder="Street, City, Pincode">
      </div>
      <div class="input-group">
        <label class="input-label">Storage Variant</label>
        <select class="admin-input" id="orderStorage">
          ${p.storage.map((s) => `<option>${s}</option>`).join("")}
        </select>
      </div>
    </div>
    <div style="background:rgba(0,200,255,0.05); border:1px solid rgba(0,200,255,0.15); border-radius:8px; padding:1rem; margin-bottom:1.5rem; font-family:var(--font-ui); font-size:0.85rem;">
      <div style="display:flex; justify-content:space-between; color:var(--text-muted); margin-bottom:0.35rem;">
        <span>Base Price</span><span>₹${Math.round(p.price / 1.18).toLocaleString("en-IN")}</span>
      </div>
      <div style="display:flex; justify-content:space-between; color:var(--text-muted); margin-bottom:0.5rem;">
        <span>GST (18%)</span><span>₹${Math.round(p.price - p.price / 1.18).toLocaleString("en-IN")}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-weight:700; color:var(--accent-blue); border-top:1px solid rgba(0,200,255,0.2); padding-top:0.5rem;">
        <span>Total</span><span>₹${p.price.toLocaleString("en-IN")}</span>
      </div>
    </div>
    <button class="btn-primary" style="width:100%; justify-content:center;" onclick="placeOrder('${oid}')">
      <span>📋 Place Order ${oid}</span>
    </button>
  `;
  openModal("orderModal");
}

function placeOrder(oid) {
  const name = document.getElementById("orderName").value.trim();
  const phone = document.getElementById("orderPhone").value.trim();
  const address = document.getElementById("orderAddress").value.trim();
  const storage = document.getElementById("orderStorage").value;
  if (!name || !phone || !address) {
    showToast("Please fill all fields", "error");
    return;
  }
  const order = {
    id: oid,
    product: currentProduct.name,
    productId: currentProduct.id,
    price: currentProduct.price,
    status: "Order Placed",
    name,
    phone,
    address,
    storage,
    date: new Date().toLocaleDateString("en-IN"),
    paid: false,
  };
  ordersDB.push(order);
  localStorage.setItem("krisithra_orders", JSON.stringify(ordersDB));
  closeModal("orderModal");
  showToast(
    `Order ${oid} placed successfully! Thank you for your purchase and have a great day.`,
    "success",
  );
  setTimeout(() => showInvoiceModal(order), 600);
}

// =========================================================
// PAYMENT MODAL
// =========================================================
function openPayModal(pid) {
  const p = productsDB.find((x) => x.id === pid);
  currentProduct = p;
  const oid = generateOrderId();
  const base = Math.round(p.price / 1.18);
  const gst = p.price - base;
  document.getElementById("payModalContent").innerHTML = `
    <div style="padding:1rem; background:rgba(0,200,255,0.05); border:1px solid rgba(0,200,255,0.15); border-radius:10px; margin-bottom:1.5rem; display:flex; gap:1rem; align-items:center;">
      <div style="font-size:2rem;">📱</div>
      <div>
        <div style="font-family:var(--font-display); font-size:0.9rem; color:var(--accent-blue); margin-bottom:0.2rem;">${p.name}</div>
        <div style="color:var(--text-muted); font-size:0.8rem;">${p.brand}</div>
      </div>
    </div>
    <div class="input-group">
      <label class="input-label">Full Name</label>
      <input type="text" class="admin-input" id="payName" placeholder="As per Aadhaar">
    </div>
    <div class="input-group">
      <label class="input-label">Email (for invoice)</label>
      <input type="email" class="admin-input" id="payEmail" placeholder="you@example.com">
    </div>
    <div class="input-group">
      <label class="input-label">Mobile</label>
      <input type="tel" class="admin-input" id="payPhone" placeholder="+91 9876543210">
    </div>
    <div class="input-group">
      <label class="input-label">Storage</label>
      <select class="admin-input" id="payStorage">${p.storage.map((s) => `<option>${s}</option>`).join("")}</select>
    </div>
    <div style="background:rgba(0,255,178,0.05); border:1px solid rgba(0,255,178,0.2); border-radius:8px; padding:1rem; margin-bottom:1.5rem; font-family:var(--font-ui); font-size:0.85rem;">
      <div style="display:flex; justify-content:space-between; color:var(--text-muted); margin-bottom:0.3rem;"><span>Subtotal</span><span>₹${base.toLocaleString("en-IN")}</span></div>
      <div style="display:flex; justify-content:space-between; color:var(--text-muted); margin-bottom:0.5rem;"><span>CGST (9%) + SGST (9%)</span><span>₹${gst.toLocaleString("en-IN")}</span></div>
      <div style="display:flex; justify-content:space-between; font-weight:800; color:var(--accent-mint); border-top:1px solid rgba(0,255,178,0.2); padding-top:0.5rem; font-family:var(--font-display); font-size:1rem;"><span>TOTAL</span><span>₹${p.price.toLocaleString("en-IN")}</span></div>
    </div>
    <div style="background:rgba(0,0,0,0.2); border-radius:8px; padding:0.75rem; margin-bottom:1rem; display:flex; gap:0.5rem; align-items:center;">
      <span style="font-size:1.2rem;">🔒</span>
      <span style="font-size:0.75rem; color:var(--text-muted);">Secured by Razorpay · UPI · Cards · Net Banking · Wallets</span>
    </div>
    <button class="btn-primary" style="width:100%; justify-content:center;" onclick="initiatePayment('${oid}')">
      <span>💳 Pay ₹${p.price.toLocaleString("en-IN")} Securely</span>
    </button>
  `;
  openModal("payModal");
}

function initiatePayment(oid) {
  const name = document.getElementById("payName").value.trim();
  const email = document.getElementById("payEmail").value.trim();
  const phone = document.getElementById("payPhone").value.trim();
  const storage = document.getElementById("payStorage").value;
  if (!name || !email || !phone) {
    showToast("Please fill all fields", "error");
    return;
  }

  // Simulate Razorpay flow
  document.getElementById("payModalContent").innerHTML = `
    <div style="text-align:center; padding:2rem;">
      <div style="font-size:3rem; margin-bottom:1rem; animation:float 2s ease-in-out infinite;">💳</div>
      <div style="font-family:var(--font-display); font-size:0.9rem; color:var(--accent-blue); margin-bottom:0.5rem;">PROCESSING PAYMENT</div>
      <div style="color:var(--text-muted); font-size:0.85rem; margin-bottom:2rem;">Connecting to Razorpay secure gateway...</div>
      <div style="width:100%; height:4px; background:rgba(0,200,255,0.1); border-radius:2px; overflow:hidden;">
        <div style="height:100%; background:linear-gradient(90deg,var(--accent-blue),var(--accent-mint)); width:0%; transition:width 2s ease; border-radius:2px;" id="payProgress"></div>
      </div>
    </div>
  `;
  setTimeout(() => {
    document.getElementById("payProgress").style.width = "100%";
  }, 100);

  setTimeout(() => {
    const order = {
      id: oid,
      product: currentProduct.name,
      productId: currentProduct.id,
      price: currentProduct.price,
      status: "Processing",
      name,
      email,
      phone,
      storage,
      date: new Date().toLocaleDateString("en-IN"),
      paid: true,
      razorpayId:
        "pay_" + Math.random().toString(36).substr(2, 16).toUpperCase(),
    };
    ordersDB.push(order);
    // Deduct stock
    const prod = productsDB.find((x) => x.id === currentProduct.id);
    if (prod && prod.stock > 0) {
      prod.stock--;
      if (prod.stock === 0) prod.status = "outstock";
    }
    localStorage.setItem("krisithra_orders", JSON.stringify(ordersDB));

    document.getElementById("payModalContent").innerHTML = `
      <div style="text-align:center; padding:2rem;">
        <div style="font-size:3.5rem; margin-bottom:1rem;">✅</div>
        <div style="font-family:var(--font-display); font-size:1rem; color:var(--accent-mint); margin-bottom:0.5rem;">PAYMENT SUCCESSFUL</div>
        <div style="color:var(--text-muted); font-size:0.85rem; margin-bottom:0.5rem;">Order ID: <strong style="color:var(--accent-blue);">${oid}</strong></div>
        <div style="color:var(--text-dim); font-size:0.75rem; margin-bottom:1.5rem;">Razorpay ID: ${order.razorpayId}</div>
        <div style="background:rgba(0,255,136,0.08); border:1px solid rgba(0,255,136,0.2); border-radius:8px; padding:1rem; margin-bottom:1.5rem; font-size:0.8rem; color:var(--text-muted);">
          📧 Invoice will be emailed to <strong style="color:var(--accent-blue);">${email}</strong>
        </div>
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <button class="btn-primary" style="flex:1; justify-content:center; min-width:140px;" onclick="closeModal('payModal'); setTimeout(()=>showInvoiceModal(${JSON.stringify(JSON.stringify(order))}),200)">
            <span>📄 View Invoice</span>
          </button>
          <button class="btn-secondary" style="flex:1; justify-content:center; min-width:140px;" onclick="closeModal('payModal')">
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    `;
    showToast("Payment successful! ✅", "success");
    renderProducts(productsDB);
  }, 2500);
}

// =========================================================
// INVOICE
// =========================================================
function showInvoiceModal(order) {
  if (typeof order === "string") order = JSON.parse(order);
  const base = Math.round(order.price / 1.18);
  const cgst = Math.round((order.price - base) / 2);
  const sgst = cgst;
  document.getElementById("invoiceContent").innerHTML = `
    <div class="invoice-box" id="invoicePrint">
      <div class="invoice-header">
        <div>
          <div class="invoice-store-name">KRISITHRA MOBILES</div>
          <div style="font-size:0.75rem; color:#666; margin-top:0.25rem;">Tiruppur, Tamil Nadu - 641604</div>
          <div style="font-size:0.75rem; color:#666;">GSTIN: 33XXXXX1234Z1ZV</div>
          <div style="font-size:0.75rem; color:#666;">📞 +91 98765 43210</div>
        </div>
        <div style="text-align:right;">
          <div style="font-weight:700; font-size:1rem; color:#0066cc;">TAX INVOICE</div>
          <div style="font-size:0.75rem; color:#666; margin-top:0.25rem;">Invoice #: ${order.id}</div>
          <div style="font-size:0.75rem; color:#666;">Date: ${order.date}</div>
          <div style="font-size:0.75rem; font-weight:700; color:${order.paid ? "#16a34a" : "#dc2626"}; margin-top:0.25rem;">
            ${order.paid ? "✅ PAID" : "⏳ PENDING"}
          </div>
        </div>
      </div>
      <div style="margin-bottom:1rem; padding:0.75rem; background:#f8fafc; border-radius:6px;">
        <div style="font-weight:600; font-size:0.85rem; margin-bottom:0.25rem;">Bill To:</div>
        <div style="font-size:0.85rem; color:#374151;">${order.name || "Customer"}</div>
        <div style="font-size:0.8rem; color:#6b7280;">${order.phone || ""}</div>
        ${order.address ? `<div style="font-size:0.8rem; color:#6b7280;">${order.address}</div>` : ""}
      </div>
      <table class="invoice-table">
        <thead><tr><th>Description</th><th>HSN</th><th>Qty</th><th>Base Price</th><th>GST</th><th>Total</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>${order.product}</strong>${order.storage ? `<br><small style="color:#6b7280">${order.storage}</small>` : ""}</td>
            <td>8517</td>
            <td>1</td>
            <td>₹${base.toLocaleString("en-IN")}</td>
            <td>CGST ₹${cgst.toLocaleString("en-IN")}<br>SGST ₹${sgst.toLocaleString("en-IN")}</td>
            <td><strong>₹${order.price.toLocaleString("en-IN")}</strong></td>
          </tr>
          <tr class="invoice-total">
            <td colspan="5" style="text-align:right; padding-right:12px; color:white; font-weight:700;">TOTAL AMOUNT</td>
            <td style="color:white; font-weight:900; font-size:1rem;">₹${order.price.toLocaleString("en-IN")}</td>
          </tr>
        </tbody>
      </table>
      <div style="display:flex; justify-content:space-between; font-size:0.75rem; margin-top:0.75rem; color:#374151;">
        <div><strong>Amount in Words:</strong> ${numberToWords(order.price)} Rupees Only</div>
        <div><strong>Razorpay ID:</strong> ${order.razorpayId || "N/A"}</div>
      </div>
      <div class="invoice-footer">
        Thank you for shopping with Krisithra Mobiles! 🚀<br>
        This is a computer-generated invoice. No signature required.<br>
        For support: support@krisithramobiles.in | +91 98765 43210
      </div>
    </div>
  `;
  openModal("invoiceModal");
}

function downloadInvoice() {
  const el = document.getElementById("invoicePrint");
  const w = window.open("", "_blank");
  w.document.write(
    `<html><head><title>Invoice</title><link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Space+Grotesk&display=swap" rel="stylesheet"><style>body{font-family:'Space Grotesk',sans-serif;padding:20px;}</style></head><body>${el.outerHTML}<script>window.print();window.close()<\/script></body></html>`,
  );
  w.document.close();
}

function numberToWords(num) {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  if (num < 20) return a[num];
  if (num < 100)
    return b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "");
  if (num < 1000)
    return (
      a[Math.floor(num / 100)] +
      " Hundred" +
      (num % 100 ? " " + numberToWords(num % 100) : "")
    );
  if (num < 100000)
    return (
      numberToWords(Math.floor(num / 1000)) +
      " Thousand" +
      (num % 1000 ? " " + numberToWords(num % 1000) : "")
    );
  if (num < 10000000)
    return (
      numberToWords(Math.floor(num / 100000)) +
      " Lakh" +
      (num % 100000 ? " " + numberToWords(num % 100000) : "")
    );
  return (
    numberToWords(Math.floor(num / 10000000)) +
    " Crore" +
    (num % 10000000 ? " " + numberToWords(num % 10000000) : "")
  );
}

// =========================================================
// WHATSAPP ORDER
// =========================================================
function whatsappOrder(pid) {
  const p = productsDB.find((x) => x.id === pid);
  const oid = generateOrderId();
  // include a friendly greeting at the start of the WhatsApp message
  const msg = encodeURIComponent(
    `👋 *Hello!* I would like to place an order with Krisithra Mobiles.\n\n` +
      `🛒 *NEW ORDER - Krisithra Mobiles*\n\n` +
      `📱 *Product:* ${p.name}\n` +
      `🏷️ *Brand:* ${p.brand}\n` +
      `💰 *Price:* ₹${p.price.toLocaleString("en-IN")} (incl. GST)\n` +
      `🔖 *Order ID:* ${oid}\n\n` +
      `Please confirm availability and share payment details.\n` +
      `Thank you for ordering the product! Have a great day! 🌟`,
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  showToast("Opening WhatsApp...", "info");
  // inform user that a greeting will be sent along with order details
  showToast("A message with greetings is being prepared", "success");
  // final thank-you toast
  showToast("Thank you for your order! Have a great day!", "success");
}

// =========================================================
// ORDER TRACKER
// =========================================================
const trackingSteps = [
  {
    id: "placed",
    name: "Order Placed",
    icon: "📋",
    desc: "Your order has been received and confirmed.",
  },
  {
    id: "processing",
    name: "Processing",
    icon: "⚙️",
    desc: "We're preparing your device for shipment.",
  },
  {
    id: "shipped",
    name: "Shipped",
    icon: "🚚",
    desc: "Your order is out for delivery.",
  },
  {
    id: "delivered",
    name: "Delivered",
    icon: "🎉",
    desc: "Package delivered successfully.",
  },
];
const statusMap = {
  "Order Placed": 0,
  Processing: 1,
  Shipped: 2,
  Delivered: 3,
};

function trackOrder() {
  const oid = document.getElementById("trackInput").value.trim().toUpperCase();
  const tl = document.getElementById("timeline");
  if (!oid) {
    showToast("Please enter an Order ID", "error");
    return;
  }
  const order = ordersDB.find((o) => o.id === oid);
  if (!order) {
    tl.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted); font-family:var(--font-ui);">
      <div style="font-size:2rem; margin-bottom:1rem;">🔍</div>
      <div>Order <strong>${oid}</strong> not found. Please check the Order ID.</div>
    </div>`;
    return;
  }
  const curStep = statusMap[order.status] ?? 0;
  tl.innerHTML =
    `
    <div style="background:rgba(0,200,255,0.05); border:1px solid rgba(0,200,255,0.2); border-radius:10px; padding:1rem; margin-bottom:1.5rem; font-family:var(--font-ui); font-size:0.85rem; display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.5rem;">
      <div><span style="color:var(--text-muted);">Product:</span> <strong>${order.product}</strong></div>
      <div><span style="color:var(--text-muted);">Amount:</span> <strong style="color:var(--accent-mint);">₹${order.price.toLocaleString("en-IN")}</strong></div>
      <div><span style="color:var(--text-muted);">Date:</span> ${order.date}</div>
      <div><span style="color:var(--text-muted);">Payment:</span> <strong style="color:${order.paid ? "var(--green)" : "var(--yellow)"}">${order.paid ? "✅ Paid" : "⏳ Pending"}</strong></div>
    </div>
  ` +
    trackingSteps
      .map(
        (s, i) => `
    <div class="timeline-step ${i === curStep ? "active" : ""} ${i < curStep ? "done" : ""}">
      <div class="step-dot">${s.icon}</div>
      <div class="step-info">
        <div class="step-name" style="color:${i === curStep ? "var(--accent-blue)" : i < curStep ? "var(--green)" : "var(--text-muted)"}">
          ${s.name} ${i < curStep ? "✓" : i === curStep ? "← CURRENT" : ""}
        </div>
        <div class="step-desc">${s.desc}</div>
        ${i <= curStep ? `<div class="step-time">${order.date}</div>` : ""}
      </div>
    </div>
  `,
      )
      .join("");
}

// =========================================================
// ADMIN
// =========================================================
function adminLogin() {
  const u = document.getElementById("adminUser").value;
  const p = document.getElementById("adminPass").value;
  if (u === ADMIN_CREDS.user && p === ADMIN_CREDS.pass) {
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadAdminPanel();
    showToast("Welcome, Admin!", "success");
  } else {
    showToast("Invalid credentials!", "error");
  }
}
function adminLogout() {
  document.getElementById("adminLogin").style.display = "block";
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("adminUser").value = "";
  document.getElementById("adminPass").value = "";
}

function loadAdminPanel() {
  const totalOrders = ordersDB.length;
  const paidOrders = ordersDB.filter((o) => o.paid);
  const totalRevenue = paidOrders.reduce((s, o) => s + o.price, 0);
  const totalStock = productsDB.reduce((s, p) => s + p.stock, 0);

  document.getElementById("analyticsGrid").innerHTML = `
    <div class="analytic-card"><div class="analytic-label">Total Orders</div><div class="analytic-value">${totalOrders}</div><div class="analytic-sub">All orders placed</div></div>
    <div class="analytic-card"><div class="analytic-label">Paid Orders</div><div class="analytic-value">${paidOrders.length}</div><div class="analytic-sub">Successfully paid</div></div>
    <div class="analytic-card"><div class="analytic-label">Total Revenue</div><div class="analytic-value">₹${(totalRevenue / 100000).toFixed(1)}L</div><div class="analytic-sub">₹${totalRevenue.toLocaleString("en-IN")} collected</div></div>
    <div class="analytic-card"><div class="analytic-label">Total Stock</div><div class="analytic-value">${totalStock}</div><div class="analytic-sub">Units remaining</div></div>
  `;

  document.getElementById("adminTableBody").innerHTML = productsDB
    .map(
      (p) => `
    <tr>
      <td><strong style="color:var(--text-white)">${p.name}</strong></td>
      <td>${p.brand}</td>
      <td style="color:var(--accent-blue)">₹${p.price.toLocaleString("en-IN")}</td>
      <td>${p.stock}</td>
      <td><span class="stock-badge ${p.stock === 0 ? "badge-outstock" : p.status === "restock" ? "badge-restock" : "badge-instock"}" style="font-size:0.65rem;">${p.stock === 0 ? "Out" : "In Stock"}</span></td>
      <td>
        <div class="stock-edit">
          <input type="number" class="stock-input" value="${p.stock}" id="stock_${p.id}" min="0">
          <button class="btn-update" onclick="updateStock(${p.id})">Update</button>
        </div>
      </td>
    </tr>
  `,
    )
    .join("");

  document.getElementById("ordersTableBody").innerHTML = ordersDB.length
    ? [...ordersDB]
        .reverse()
        .map(
          (o) => `
      <tr>
        <td style="color:var(--accent-blue)">${o.id}</td>
        <td>${o.product}</td>
        <td>₹${o.price.toLocaleString("en-IN")}</td>
        <td><span class="stock-badge ${o.paid ? "badge-instock" : "badge-restock"}" style="font-size:0.65rem;">${o.paid ? "Paid" : "Pending"}</span></td>
        <td>${o.date}</td>
      </tr>
    `,
        )
        .join("")
    : `<tr><td colspan="5" style="text-align:center; color:var(--text-dim); padding:2rem;">No orders yet</td></tr>`;
}

function updateStock(pid) {
  const val = parseInt(document.getElementById(`stock_${pid}`).value);
  const p = productsDB.find((x) => x.id === pid);
  if (!isNaN(val) && val >= 0) {
    p.stock = val;
    p.status = val === 0 ? "outstock" : "instock";
    loadAdminPanel();
    renderProducts(productsDB);
    showToast(`Stock updated: ${p.name} → ${val} units`, "success");
  }
}

// =========================================================
// HELPERS
// =========================================================
function generateOrderId() {
  return (
    "KRM-" +
    Date.now().toString().slice(-6) +
    Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0")
  );
}

function showToast(msg, type = "info") {
  const c = document.getElementById("toastContainer");
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => t.classList.add("show"), 50);
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 400);
  }, 4000);
}

// Render default tracking timeline
function renderDefaultTimeline() {
  document.getElementById("timeline").innerHTML = trackingSteps
    .map(
      (s, i) => `
    <div class="timeline-step ${i === 0 ? "active" : ""}">
      <div class="step-dot">${s.icon}</div>
      <div class="step-info">
        <div class="step-name" style="color:${i === 0 ? "var(--accent-blue)" : "var(--text-muted)"}">${s.name}</div>
        <div class="step-desc">${s.desc}</div>
      </div>
    </div>
  `,
    )
    .join("");
}

// =========================================================
// INIT
// =========================================================
buildFilters();
renderProducts(productsDB);
renderDefaultTimeline();

// Reveal on scroll
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 80) el.classList.add("visible");
  });
});
// Initial reveal pass
setTimeout(() => {
  document.querySelectorAll(".reveal").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) el.classList.add("visible");
  });
}, 100);
