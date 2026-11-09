// Vector SVG illustrations for Hanukkah symbols
// Designed specifically for children in Grade 2: colorful, crisp, and friendly.

const SVG_ASSETS = {
  // 1. Hanukkiah (9-branched candelabra)
  chanukiah: `
    <svg viewBox="0 0 200 160" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="flameGrad" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stop-color="#fffb00" />
          <stop offset="40%" stop-color="#ff9900" />
          <stop offset="100%" stop-color="#ff3700" stop-opacity="0.8" />
        </radialGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffe259" />
          <stop offset="50%" stop-color="#ffa751" />
          <stop offset="100%" stop-color="#e67e22" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <!-- Base & Stem -->
      <path d="M 70 148 L 130 148 C 125 135 115 135 110 130 L 110 95 L 90 95 L 90 130 C 85 135 75 135 70 148 Z" fill="url(#goldGrad)" stroke="#d35400" stroke-width="2"/>
      <rect x="60" y="146" width="80" height="9" rx="4.5" fill="#f39c12" stroke="#d35400" stroke-width="2"/>
      <!-- Branches -->
      <path d="M 20 65 Q 20 105 100 105 Q 180 105 180 65" fill="none" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round"/>
      <path d="M 40 70 Q 40 100 100 100 Q 160 100 160 70" fill="none" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round"/>
      <path d="M 60 75 Q 60 95 100 95 Q 140 95 140 75" fill="none" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round"/>
      <path d="M 80 80 Q 80 92 100 92 Q 120 92 120 80" fill="none" stroke="url(#goldGrad)" stroke-width="7" stroke-linecap="round"/>
      <line x1="100" y1="95" x2="100" y2="40" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round"/>
      <!-- Cups & Colorful Candles -->
      <!-- 1 --> <rect x="15" y="45" width="10" height="20" rx="2" fill="#e74c3c" /><rect x="13" y="63" width="14" height="6" rx="2" fill="#f1c40f"/>
      <!-- 2 --> <rect x="35" y="50" width="10" height="20" rx="2" fill="#3498db" /><rect x="33" y="68" width="14" height="6" rx="2" fill="#f1c40f"/>
      <!-- 3 --> <rect x="55" y="55" width="10" height="20" rx="2" fill="#2ecc71" /><rect x="53" y="73" width="14" height="6" rx="2" fill="#f1c40f"/>
      <!-- 4 --> <rect x="75" y="60" width="10" height="20" rx="2" fill="#9b59b6" /><rect x="73" y="78" width="14" height="6" rx="2" fill="#f1c40f"/>
      <!-- Shamash (Tall center) -->
      <rect x="95" y="25" width="10" height="26" rx="2" fill="#e67e22" stroke="#d35400" stroke-width="1.5"/><rect x="92" y="49" width="16" height="7" rx="2" fill="#f1c40f"/>
      <!-- 5 --> <rect x="115" y="60" width="10" height="20" rx="2" fill="#1abc9c" /><rect x="113" y="78" width="14" height="6" rx="2" fill="#f1c40f"/>
      <!-- 6 --> <rect x="135" y="55" width="10" height="20" rx="2" fill="#f39c12" /><rect x="133" y="73" width="14" height="6" rx="2" fill="#f1c40f"/>
      <!-- 7 --> <rect x="155" y="50" width="10" height="20" rx="2" fill="#e84393" /><rect x="153" y="68" width="14" height="6" rx="2" fill="#f1c40f"/>
      <!-- 8 --> <rect x="175" y="45" width="10" height="20" rx="2" fill="#00cec9" /><rect x="173" y="63" width="14" height="6" rx="2" fill="#f1c40f"/>
      <!-- Flames -->
      <g filter="url(#glow)">
        <path d="M 20 45 C 16 37 18 30 20 25 C 22 30 24 37 20 45 Z" fill="url(#flameGrad)" />
        <path d="M 40 50 C 36 42 38 35 40 30 C 42 35 44 42 40 50 Z" fill="url(#flameGrad)" />
        <path d="M 60 55 C 56 47 58 40 60 35 C 62 40 64 47 60 55 Z" fill="url(#flameGrad)" />
        <path d="M 80 60 C 76 52 78 45 80 40 C 82 45 84 52 80 60 Z" fill="url(#flameGrad)" />
        <!-- Shamash Flame (Larger) -->
        <path d="M 100 25 C 94 15 97 7 100 2 C 103 7 106 15 100 25 Z" fill="url(#flameGrad)" />
        <path d="M 120 60 C 116 52 118 45 120 40 C 122 45 124 52 120 60 Z" fill="url(#flameGrad)" />
        <path d="M 140 55 C 136 47 138 40 140 35 C 142 40 144 47 140 55 Z" fill="url(#flameGrad)" />
        <path d="M 160 50 C 156 42 158 35 160 30 C 162 35 164 42 160 50 Z" fill="url(#flameGrad)" />
        <path d="M 180 45 C 176 37 178 30 180 25 C 182 30 184 37 180 45 Z" fill="url(#flameGrad)" />
      </g>
    </svg>
  `,

  // 2. Colorful Candles
  candles: `
    <svg viewBox="0 0 160 140" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="candleFlame" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stop-color="#fffb00" />
          <stop offset="50%" stop-color="#ff793f" />
          <stop offset="100%" stop-color="#ff5252" stop-opacity="0.9" />
        </radialGradient>
      </defs>
      <!-- Base stand plate -->
      <ellipse cx="80" cy="125" rx="70" ry="12" fill="#dfe6e9" stroke="#b2bec3" stroke-width="2"/>
      <!-- Candles -->
      <g>
        <!-- Blue candle -->
        <rect x="25" y="55" width="18" height="65" rx="4" fill="#0984e3"/>
        <line x1="34" y1="55" x2="34" y2="48" stroke="#2d3436" stroke-width="2"/>
        <path d="M 34 48 C 29 40 31 32 34 26 C 37 32 39 40 34 48 Z" fill="url(#candleFlame)"/>
        <!-- Yellow candle -->
        <rect x="52" y="45" width="18" height="75" rx="4" fill="#fdcb6e"/>
        <line x1="61" y1="45" x2="61" y2="38" stroke="#2d3436" stroke-width="2"/>
        <path d="M 61 38 C 56 30 58 22 61 16 C 64 22 66 30 61 38 Z" fill="url(#candleFlame)"/>
        <!-- Red candle -->
        <rect x="79" y="35" width="18" height="85" rx="4" fill="#d63031"/>
        <line x1="88" y1="35" x2="88" y2="28" stroke="#2d3436" stroke-width="2"/>
        <path d="M 88 28 C 83 20 85 12 88 6 C 91 12 93 20 88 28 Z" fill="url(#candleFlame)"/>
        <!-- Green candle -->
        <rect x="106" y="50" width="18" height="70" rx="4" fill="#00b894"/>
        <line x1="115" y1="50" x2="115" y2="43" stroke="#2d3436" stroke-width="2"/>
        <path d="M 115 43 C 110 35 112 27 115 21 C 118 27 120 35 115 43 Z" fill="url(#candleFlame)"/>
      </g>
    </svg>
  `,

  // 3. The Shamash (Dedicated Candle that lights all others)
  shamash: `
    <svg viewBox="0 0 140 160" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shamashGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fff275"/>
          <stop offset="100%" stop-color="#f39c12"/>
        </linearGradient>
      </defs>
      <!-- Halo of light -->
      <circle cx="70" cy="40" r="36" fill="#ffeaa7" opacity="0.45"/>
      <!-- Tall golden holder -->
      <ellipse cx="70" cy="145" rx="35" ry="8" fill="#d35400"/>
      <path d="M 62 145 L 65 110 L 75 110 L 78 145 Z" fill="#e67e22"/>
      <rect x="58" y="105" width="24" height="8" rx="3" fill="#f39c12"/>
      <!-- The Shamash Candle -->
      <rect x="62" y="50" width="16" height="57" rx="4" fill="url(#shamashGlow)" stroke="#f39c12" stroke-width="1.5"/>
      <!-- Wick -->
      <line x1="70" y1="50" x2="70" y2="40" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Radiant Flame -->
      <path d="M 70 40 C 62 28 65 16 70 8 C 75 16 78 28 70 40 Z" fill="#ff7675"/>
      <path d="M 70 38 C 65 29 67 20 70 14 C 73 20 75 29 70 38 Z" fill="#ffeaa7"/>
      <!-- Little sparkles -->
      <polygon points="100,30 102,35 107,37 102,39 100,44 98,39 93,37 98,35" fill="#f1c40f"/>
      <polygon points="35,45 37,49 41,51 37,53 35,57 33,53 29,51 33,49" fill="#f1c40f"/>
    </svg>
  `,

  // 4. Eight Days (שְׁמוֹנָה יָמִים)
  eight_days: `
    <svg viewBox="0 0 160 140" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Big cheerful number 8 -->
      <rect x="15" y="15" width="130" height="110" rx="16" fill="#6c5ce7" stroke="#4834d4" stroke-width="3"/>
      <!-- Inner card glow -->
      <circle cx="80" cy="50" r="22" fill="#fff" opacity="0.95"/>
      <circle cx="80" cy="50" r="12" fill="#6c5ce7"/>
      <circle cx="80" cy="85" r="26" fill="#fff" opacity="0.95"/>
      <circle cx="80" cy="85" r="15" fill="#6c5ce7"/>
      <!-- Little festive stars -->
      <text x="30" y="42" font-size="20" fill="#f1c40f">✨</text>
      <text x="115" y="42" font-size="20" fill="#f1c40f">✨</text>
      <text x="45" y="118" font-size="16" font-family="'Rubik', sans-serif" font-weight="bold" fill="#fff">יָמִים</text>
    </svg>
  `,

  // 5. Sufganiyah (Jelly Doughnut)
  sufganiyah: `
    <svg viewBox="0 0 160 140" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="doughnutGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#ffeaa7"/>
          <stop offset="60%" stop-color="#fdcb6e"/>
          <stop offset="100%" stop-color="#e17055"/>
        </radialGradient>
        <radialGradient id="jamGrad" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#ff7675"/>
          <stop offset="60%" stop-color="#d63031"/>
          <stop offset="100%" stop-color="#b71540"/>
        </radialGradient>
      </defs>
      <!-- Shadow -->
      <ellipse cx="80" cy="122" rx="65" ry="12" fill="#2d3436" opacity="0.15"/>
      <!-- Doughnut Body -->
      <ellipse cx="80" cy="85" rx="65" ry="38" fill="url(#doughnutGrad)" stroke="#d68910" stroke-width="2"/>
      <!-- Powdered Sugar Cloud -->
      <ellipse cx="80" cy="72" rx="45" ry="22" fill="#ffffff" opacity="0.88"/>
      <!-- Sugar sprinkles -->
      <circle cx="50" cy="68" r="2.5" fill="#ffffff"/>
      <circle cx="62" cy="62" r="3" fill="#ffffff"/>
      <circle cx="98" cy="65" r="3" fill="#ffffff"/>
      <circle cx="110" cy="72" r="2" fill="#ffffff"/>
      <circle cx="80" cy="55" r="2.5" fill="#ffffff"/>
      <!-- Strawberry Jam Spot -->
      <ellipse cx="80" cy="72" rx="14" ry="12" fill="url(#jamGrad)"/>
      <!-- Jam Highlight -->
      <ellipse cx="76" cy="68" rx="4" ry="3" fill="#ffffff" opacity="0.7"/>
    </svg>
  `,

  // 6. Levivah (Crispy Potato Latke)
  levivah: `
    <svg viewBox="0 0 160 140" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f1f2f6"/>
          <stop offset="100%" stop-color="#ced6e0"/>
        </linearGradient>
      </defs>
      <!-- Plate -->
      <ellipse cx="80" cy="98" rx="72" ry="26" fill="url(#plateGrad)" stroke="#747d8c" stroke-width="2"/>
      <ellipse cx="80" cy="95" rx="55" ry="18" fill="#ffffff"/>
      <!-- Latkes -->
      <!-- Back latke -->
      <path d="M 45 78 C 38 65 52 50 70 52 C 85 48 98 60 95 72 C 96 85 80 92 65 90 C 50 92 40 88 45 78 Z" fill="#e67e22" stroke="#b95304" stroke-width="2"/>
      <!-- Front latke (main) -->
      <path d="M 65 92 C 55 76 68 62 88 64 C 105 60 120 74 116 88 C 118 102 100 110 82 108 C 65 110 56 102 65 92 Z" fill="#f39c12" stroke="#d35400" stroke-width="2.5"/>
      <!-- Crispy bits / shredded potato texture -->
      <path d="M 72 75 Q 80 72 88 78" stroke="#a04000" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 85 88 Q 95 82 102 90" stroke="#a04000" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 70 94 Q 78 98 86 92" stroke="#a04000" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Sour cream or applesauce dollop -->
      <ellipse cx="90" cy="82" rx="10" ry="7" fill="#ffffff" opacity="0.95"/>
    </svg>
  `,

  // 7. Sevivon (Dreidel)
  sevivon: `
    <svg viewBox="0 0 160 160" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dreidelBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0984e3"/>
          <stop offset="50%" stop-color="#74b9ff"/>
          <stop offset="100%" stop-color="#0984e3"/>
        </linearGradient>
      </defs>
      <!-- Shadow -->
      <ellipse cx="80" cy="150" rx="35" ry="7" fill="#2d3436" opacity="0.2"/>
      <!-- Peg handle -->
      <rect x="73" y="12" width="14" height="28" rx="5" fill="#f39c12" stroke="#d35400" stroke-width="2"/>
      <!-- Top Shoulder -->
      <polygon points="35,46 125,46 110,40 50,40" fill="#0652dd"/>
      <!-- Main Cube Body -->
      <polygon points="35,46 125,46 125,108 35,108" fill="url(#dreidelBody)" stroke="#0652dd" stroke-width="3"/>
      <!-- Bottom Tip -->
      <polygon points="35,108 125,108 80,146" fill="#0984e3" stroke="#0652dd" stroke-width="3"/>
      <!-- Hebrew Letter: נ or ג or ה or פ -->
      <text x="80" y="94" font-family="'Rubik', sans-serif" font-weight="900" font-size="44" fill="#ffffff" text-anchor="middle" dominant-baseline="central">נ</text>
    </svg>
  `,

  // 8. The 4 Letters (נ=נס, ג=גדול, ה=היה, פ=פה)
  letters_symbols: `
    <svg viewBox="0 0 200 140" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <g>
        <!-- Nun -->
        <rect x="8" y="25" width="40" height="75" rx="8" fill="#ff7675" stroke="#d63031" stroke-width="2"/>
        <text x="28" y="62" font-family="'Rubik', sans-serif" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">נ</text>
        <text x="28" y="86" font-family="'Rubik', sans-serif" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">נֵס</text>

        <!-- Gimel -->
        <rect x="56" y="25" width="40" height="75" rx="8" fill="#74b9ff" stroke="#0984e3" stroke-width="2"/>
        <text x="76" y="62" font-family="'Rubik', sans-serif" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">ג</text>
        <text x="76" y="86" font-family="'Rubik', sans-serif" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">גָּדוֹל</text>

        <!-- Hei -->
        <rect x="104" y="25" width="40" height="75" rx="8" fill="#55efc4" stroke="#00b894" stroke-width="2"/>
        <text x="124" y="62" font-family="'Rubik', sans-serif" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">ה</text>
        <text x="124" y="86" font-family="'Rubik', sans-serif" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">הָיָה</text>

        <!-- Peh -->
        <rect x="152" y="25" width="40" height="75" rx="8" fill="#ffeaa7" stroke="#fdcb6e" stroke-width="2"/>
        <text x="172" y="62" font-family="'Rubik', sans-serif" font-size="28" font-weight="bold" fill="#2d3436" text-anchor="middle">פ</text>
        <text x="172" y="86" font-family="'Rubik', sans-serif" font-size="11" font-weight="bold" fill="#2d3436" text-anchor="middle">פֹּה</text>
      </g>
      <text x="100" y="125" font-family="'Rubik', sans-serif" font-size="12" font-weight="bold" fill="#2d3436" text-anchor="middle">נֵס גָּדוֹל הָיָה פֹּה</text>
    </svg>
  `,

  // 9. Clay Jug with Olive Oil (כַּד חֶרֶס עִם שֶׁמֶן זַיִת)
  oil_jug: `
    <svg viewBox="0 0 160 150" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="clayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b9770e"/>
          <stop offset="40%" stop-color="#e59866"/>
          <stop offset="100%" stop-color="#ba4a00"/>
        </linearGradient>
        <linearGradient id="oilDrop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f7dc6f"/>
          <stop offset="100%" stop-color="#d4ac0d"/>
        </linearGradient>
      </defs>
      <!-- Shadow -->
      <ellipse cx="80" cy="138" rx="40" ry="8" fill="#2d3436" opacity="0.2"/>
      <!-- Jug Handle -->
      <path d="M 46 60 C 22 62 20 100 48 105" fill="none" stroke="#ba4a00" stroke-width="8" stroke-linecap="round"/>
      <!-- Jug Body -->
      <path d="M 62 38 L 98 38 L 94 54 C 112 65 120 86 116 110 C 112 128 98 135 80 135 C 62 135 48 128 44 110 C 40 86 48 65 66 54 Z" fill="url(#clayGrad)" stroke="#873600" stroke-width="2.5"/>
      <!-- Neck rim -->
      <ellipse cx="80" cy="38" rx="19" ry="6" fill="#e59866" stroke="#873600" stroke-width="2"/>
      <!-- Olive Branch Decoration on the Jug -->
      <ellipse cx="80" cy="95" rx="9" ry="12" fill="#52be80" stroke="#196f3d" stroke-width="1.5"/>
      <!-- Olive leaves -->
      <path d="M 80 83 C 72 80 72 70 80 65 C 88 70 88 80 80 83 Z" fill="#27ae60"/>
      <!-- Golden Oil Drops -->
      <path d="M 125 55 C 120 63 120 70 125 74 C 130 70 130 63 125 55 Z" fill="url(#oilDrop)"/>
      <circle cx="132" cy="85" r="4.5" fill="url(#oilDrop)"/>
    </svg>
  `,

  // 10. Beit HaMikdash (בֵּית-הַמִּקְדָּשׁ)
  beit_hamikdash: `
    <svg viewBox="0 0 170 140" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stoneWall" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fdfefe"/>
          <stop offset="100%" stop-color="#f5cba7"/>
        </linearGradient>
      </defs>
      <!-- Sky / Aura -->
      <circle cx="85" cy="70" r="65" fill="#fef9e7" opacity="0.6"/>
      <!-- Base steps -->
      <rect x="20" y="118" width="130" height="12" rx="3" fill="#d5dbdb" stroke="#99a3a4" stroke-width="1.5"/>
      <rect x="30" y="110" width="110" height="8" rx="2" fill="#eaeded" stroke="#99a3a4" stroke-width="1.5"/>
      <!-- Main Sanctuary Walls -->
      <rect x="42" y="45" width="86" height="65" fill="url(#stoneWall)" stroke="#b7950b" stroke-width="2"/>
      <!-- Golden Crown / Roof battlement -->
      <polygon points="38,45 85,25 132,45" fill="#f1c40f" stroke="#b7950b" stroke-width="2"/>
      <circle cx="85" cy="23" r="4" fill="#e67e22"/>
      <!-- Temple Pillars (Yachin & Boaz) -->
      <rect x="48" y="52" width="10" height="58" fill="#f9e79f" stroke="#b7950b" stroke-width="1.5"/>
      <rect x="112" y="52" width="10" height="58" fill="#f9e79f" stroke="#b7950b" stroke-width="1.5"/>
      <!-- Grand Portal (Golden Doorway) -->
      <path d="M 70 110 L 70 70 A 15 15 0 0 1 100 70 L 100 110 Z" fill="#d4ac0d" stroke="#7d6608" stroke-width="2"/>
      <!-- Inner Glow -->
      <ellipse cx="85" cy="85" rx="6" ry="10" fill="#fef9e7"/>
    </svg>
  `,

  // 11. Menorat Shiv'at HaKanim (מְנוֹרַת שִׁבְעַת הַקָּנִים)
  seven_menorah: `
    <svg viewBox="0 0 170 150" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pureGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff07c"/>
          <stop offset="40%" stop-color="#f1c40f"/>
          <stop offset="100%" stop-color="#b7950b"/>
        </linearGradient>
      </defs>
      <!-- Base (Hexagonal pedestal) -->
      <polygon points="60,140 110,140 102,125 68,125" fill="url(#pureGold)" stroke="#7d6608" stroke-width="2"/>
      <rect x="80" y="80" width="10" height="46" fill="url(#pureGold)" stroke="#7d6608" stroke-width="1.5"/>
      <!-- 7 Branches (3 pairs + center) -->
      <path d="M 25 55 Q 25 100 85 100 Q 145 100 145 55" fill="none" stroke="url(#pureGold)" stroke-width="6" stroke-linecap="round"/>
      <path d="M 45 60 Q 45 92 85 92 Q 125 92 125 60" fill="none" stroke="url(#pureGold)" stroke-width="6" stroke-linecap="round"/>
      <path d="M 65 65 Q 65 85 85 85 Q 105 85 105 65" fill="none" stroke="url(#pureGold)" stroke-width="6" stroke-linecap="round"/>
      <line x1="85" y1="85" x2="85" y2="45" stroke="url(#pureGold)" stroke-width="6" stroke-linecap="round"/>
      <!-- Cups & Flames (7 total) -->
      <!-- Branch 1 --> <path d="M 25 45 C 22 38 23 32 25 28 C 27 32 28 38 25 45 Z" fill="#ff7675"/><circle cx="25" cy="52" r="4" fill="#f1c40f"/>
      <!-- Branch 2 --> <path d="M 45 50 C 42 43 43 37 45 33 C 47 37 48 43 45 50 Z" fill="#ff7675"/><circle cx="45" cy="57" r="4" fill="#f1c40f"/>
      <!-- Branch 3 --> <path d="M 65 55 C 62 48 63 42 65 38 C 67 42 68 48 65 55 Z" fill="#ff7675"/><circle cx="65" cy="62" r="4" fill="#f1c40f"/>
      <!-- Center 4 --> <path d="M 85 36 C 81 27 82 20 85 14 C 88 20 89 27 85 36 Z" fill="#ff7675"/><circle cx="85" cy="43" r="5" fill="#f1c40f"/>
      <!-- Branch 5 --> <path d="M 105 55 C 102 48 103 42 105 38 C 107 42 108 48 105 55 Z" fill="#ff7675"/><circle cx="105" cy="62" r="4" fill="#f1c40f"/>
      <!-- Branch 6 --> <path d="M 125 50 C 122 43 123 37 125 33 C 127 37 128 43 125 50 Z" fill="#ff7675"/><circle cx="125" cy="57" r="4" fill="#f1c40f"/>
      <!-- Branch 7 --> <path d="M 145 45 C 142 38 143 32 145 28 C 147 32 148 38 145 45 Z" fill="#ff7675"/><circle cx="145" cy="52" r="4" fill="#f1c40f"/>
    </svg>
  `,

  // 12. Yehuda HaMakabi (יְהוּדָה הַמַּכַּבִּי)
  yehuda_makabi: `
    <svg viewBox="0 0 160 160" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Blue Heroic Cape -->
      <path d="M 45 60 C 25 100 30 140 35 150 C 50 145 60 145 80 145 C 100 145 110 145 125 150 C 130 140 135 100 115 60 Z" fill="#0984e3"/>
      <!-- Body / Armour -->
      <rect x="62" y="65" width="36" height="55" rx="8" fill="#e67e22" stroke="#d35400" stroke-width="2"/>
      <!-- Belt & Buckle -->
      <rect x="60" y="98" width="40" height="10" fill="#2d3436"/>
      <rect x="74" y="96" width="12" height="14" fill="#f1c40f" stroke="#b7950b" stroke-width="1.5"/>
      <!-- Head / Face -->
      <ellipse cx="80" cy="42" rx="17" ry="19" fill="#fbc531"/>
      <!-- Hair & Beard -->
      <path d="M 64 35 C 64 22 96 22 96 35 C 96 24 64 24 64 35 Z" fill="#6d4c41"/>
      <path d="M 68 50 C 72 65 88 65 92 50 C 96 55 64 55 68 50 Z" fill="#6d4c41"/>
      <!-- Eyes & Smile -->
      <circle cx="74" cy="40" r="2.5" fill="#2d3436"/>
      <circle cx="86" cy="40" r="2.5" fill="#2d3436"/>
      <path d="M 76 47 Q 80 50 84 47" stroke="#2d3436" stroke-width="1.5" fill="none"/>
      <!-- Hero Headband -->
      <rect x="63" y="30" width="34" height="6" fill="#00cec9" rx="2"/>
      <!-- Shield in hand with Torch / Maccabee Symbol -->
      <ellipse cx="118" cy="95" rx="20" ry="26" fill="#f1c40f" stroke="#b7950b" stroke-width="2.5"/>
      <text x="118" y="99" font-family="'Rubik', sans-serif" font-size="16" font-weight="bold" fill="#873600" text-anchor="middle">מ</text>
      <!-- Torch in other hand -->
      <rect x="36" y="65" width="6" height="40" rx="2" fill="#873600"/>
      <polygon points="35,66 43,66 45,58 33,58" fill="#bdc3c7"/>
      <path d="M 39 58 C 33 46 35 36 39 30 C 43 36 45 46 39 58 Z" fill="#ff7675"/>
    </svg>
  `,

  // 13. Maccabean Soldiers (חַיָּלִים מַכַּבִּים)
  maccabi_soldiers: `
    <svg viewBox="0 0 170 140" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- 3 Brave Maccabean soldiers standing together -->
      <!-- Left soldier -->
      <g transform="translate(-10, 10)">
        <ellipse cx="50" cy="50" rx="12" ry="14" fill="#fbc531"/>
        <rect x="42" y="40" width="16" height="4" fill="#0984e3"/>
        <rect x="40" y="64" width="20" height="35" rx="5" fill="#3498db"/>
        <ellipse cx="32" cy="78" rx="10" ry="15" fill="#f1c40f" stroke="#d35400" stroke-width="1.5"/>
      </g>
      <!-- Right soldier -->
      <g transform="translate(10, 10)">
        <ellipse cx="115" cy="50" rx="12" ry="14" fill="#fbc531"/>
        <rect x="107" y="40" width="16" height="4" fill="#0984e3"/>
        <rect x="105" y="64" width="20" height="35" rx="5" fill="#3498db"/>
        <ellipse cx="132" cy="78" rx="10" ry="15" fill="#f1c40f" stroke="#d35400" stroke-width="1.5"/>
      </g>
      <!-- Center Main Captain -->
      <g>
        <ellipse cx="85" cy="45" rx="14" ry="16" fill="#fbc531"/>
        <rect x="76" y="34" width="18" height="5" fill="#00cec9"/>
        <rect x="72" y="60" width="26" height="45" rx="6" fill="#2980b9"/>
        <!-- Shield with Star -->
        <ellipse cx="85" cy="85" rx="15" ry="20" fill="#f1c40f" stroke="#b7950b" stroke-width="2"/>
        <polygon points="85,75 87,81 93,81 88,85 90,91 85,87 80,91 82,85 77,81 83,81" fill="#e67e22"/>
      </g>
      <!-- Ground line -->
      <line x1="20" y1="120" x2="150" y2="120" stroke="#7f8c8d" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `,

  // 14. Antiochus (אַנְטִיּוֹכוֹס)
  antiochus: `
    <svg viewBox="0 0 160 160" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Royal Purple Cape -->
      <path d="M 40 60 C 25 110 30 145 40 150 C 60 148 100 148 120 150 C 130 145 135 110 120 60 Z" fill="#8e44ad"/>
      <!-- Body & Robe -->
      <rect x="58" y="65" width="44" height="65" rx="8" fill="#9b59b6"/>
      <rect x="58" y="95" width="44" height="12" fill="#f1c40f"/>
      <!-- Head / Face -->
      <ellipse cx="80" cy="46" rx="18" ry="20" fill="#fbc531"/>
      <circle cx="73" cy="45" r="2.5" fill="#2d3436"/>
      <circle cx="87" cy="45" r="2.5" fill="#2d3436"/>
      <!-- Strict / grumpy eyebrows -->
      <line x1="70" y1="39" x2="76" y2="42" stroke="#2d3436" stroke-width="2"/>
      <line x1="90" y1="42" x2="84" y2="39" stroke="#2d3436" stroke-width="2"/>
      <!-- Crown -->
      <polygon points="62,32 68,14 74,25 80,10 86,25 92,14 98,32" fill="#f1c40f" stroke="#b7950b" stroke-width="2"/>
      <circle cx="80" cy="10" r="3" fill="#e74c3c"/>
      <!-- Scepter -->
      <line x1="120" y1="60" x2="125" y2="120" stroke="#f1c40f" stroke-width="4"/>
      <circle cx="120" cy="56" r="7" fill="#e74c3c"/>
    </svg>
  `,

  // 15. Greek Soldiers (חַיָּלִים יְוָנִים)
  greek_soldiers: `
    <svg viewBox="0 0 170 140" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- 2 Greek Soldiers with helmets and spears -->
      <!-- Left soldier -->
      <g transform="translate(20, 10)">
        <!-- Helmet crest -->
        <path d="M 40 18 C 30 18 30 30 40 34 Z" fill="#e74c3c"/>
        <ellipse cx="45" cy="44" rx="13" ry="15" fill="#fbc531"/>
        <!-- Bronze helmet -->
        <path d="M 32 40 C 32 25 58 25 58 40 L 55 52 L 35 52 Z" fill="#f39c12" stroke="#b7950b" stroke-width="1.5"/>
        <rect x="36" y="58" width="20" height="38" fill="#e74c3c"/>
        <!-- Round bronze shield -->
        <circle cx="32" cy="76" r="16" fill="#d35400" stroke="#f39c12" stroke-width="3"/>
      </g>
      <!-- Right soldier -->
      <g transform="translate(65, 10)">
        <path d="M 40 18 C 30 18 30 30 40 34 Z" fill="#e74c3c"/>
        <ellipse cx="45" cy="44" rx="13" ry="15" fill="#fbc531"/>
        <path d="M 32 40 C 32 25 58 25 58 40 L 55 52 L 35 52 Z" fill="#f39c12" stroke="#b7950b" stroke-width="1.5"/>
        <rect x="36" y="58" width="20" height="38" fill="#e74c3c"/>
        <!-- Round bronze shield -->
        <circle cx="56" cy="76" r="16" fill="#d35400" stroke="#f39c12" stroke-width="3"/>
        <!-- Spear -->
        <line x1="25" y1="15" x2="25" y2="105" stroke="#7f8c8d" stroke-width="3"/>
        <polygon points="25,6 28,17 22,17" fill="#bdc3c7"/>
      </g>
    </svg>
  `,

  // 16. Ancient Jerusalem (יְרוּשָׁלַיִם הָעַתִּיקָה)
  jerusalem: `
    <svg viewBox="0 0 180 140" class="hanukkah-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jerusalemStone" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fdebd0"/>
          <stop offset="100%" stop-color="#edbb99"/>
        </linearGradient>
      </defs>
      <!-- Sun / Light in the blue sky -->
      <circle cx="150" cy="30" r="16" fill="#f9e79f" opacity="0.8"/>
      <!-- Ancient City Wall with battlements -->
      <rect x="15" y="65" width="150" height="60" fill="url(#jerusalemStone)" stroke="#ba4a00" stroke-width="2"/>
      <!-- Battlements (crenels) -->
      <rect x="15" y="55" width="12" height="12" fill="url(#jerusalemStone)" stroke="#ba4a00" stroke-width="1.5"/>
      <rect x="35" y="55" width="12" height="12" fill="url(#jerusalemStone)" stroke="#ba4a00" stroke-width="1.5"/>
      <rect x="55" y="55" width="12" height="12" fill="url(#jerusalemStone)" stroke="#ba4a00" stroke-width="1.5"/>
      <rect x="75" y="55" width="12" height="12" fill="url(#jerusalemStone)" stroke="#ba4a00" stroke-width="1.5"/>
      <rect x="95" y="55" width="12" height="12" fill="url(#jerusalemStone)" stroke="#ba4a00" stroke-width="1.5"/>
      <rect x="115" y="55" width="12" height="12" fill="url(#jerusalemStone)" stroke="#ba4a00" stroke-width="1.5"/>
      <rect x="135" y="55" width="12" height="12" fill="url(#jerusalemStone)" stroke="#ba4a00" stroke-width="1.5"/>
      <rect x="153" y="55" width="12" height="12" fill="url(#jerusalemStone)" stroke="#ba4a00" stroke-width="1.5"/>
      <!-- Tower of David / Tower in wall -->
      <rect x="75" y="32" width="30" height="40" fill="url(#jerusalemStone)" stroke="#ba4a00" stroke-width="2"/>
      <polygon points="73,32 90,16 107,32" fill="#e59866" stroke="#ba4a00" stroke-width="2"/>
      <!-- City Arched Gate -->
      <path d="M 40 125 L 40 95 A 15 15 0 0 1 70 95 L 70 125 Z" fill="#6e2c00"/>
    </svg>
  `,

  // Trophy for completion / success
  trophy: `
    <svg viewBox="0 0 160 160" class="trophy-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff59d"/>
          <stop offset="40%" stop-color="#fbc531"/>
          <stop offset="100%" stop-color="#e1b12c"/>
        </linearGradient>
      </defs>
      <!-- Base -->
      <rect x="50" y="132" width="60" height="18" rx="5" fill="#2d3436"/>
      <polygon points="62,132 98,132 92,108 68,108" fill="url(#trophyGold)" stroke="#d35400" stroke-width="1.5"/>
      <!-- Handles -->
      <path d="M 45 42 C 18 42 18 85 45 92" fill="none" stroke="url(#trophyGold)" stroke-width="8" stroke-linecap="round"/>
      <path d="M 115 42 C 142 42 142 85 115 92" fill="none" stroke="url(#trophyGold)" stroke-width="8" stroke-linecap="round"/>
      <!-- Cup Body -->
      <path d="M 42 30 L 118 30 C 118 78 100 108 80 108 C 60 108 42 78 42 30 Z" fill="url(#trophyGold)" stroke="#d35400" stroke-width="3"/>
      <!-- Star on Cup -->
      <polygon points="80,50 83,59 92,59 85,65 88,74 80,68 72,74 75,65 68,59 77,59" fill="#ffffff"/>
      <!-- Sparkles -->
      <polygon points="25,25 28,30 33,32 28,34 25,39 23,34 18,32 23,30" fill="#fbc531"/>
      <polygon points="135,22 138,27 143,29 138,31 135,36 133,31 128,29 133,27" fill="#fbc531"/>
    </svg>
  `
};

window.SVG_ASSETS = SVG_ASSETS;
