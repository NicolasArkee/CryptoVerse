<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>POKEDEX — Brand Guidelines</title>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --red-pale: #FFE5E5;
      --red-bright: #FF3333;
      --red: #CC0000;
      --red-dark: #8B0000;
      --red-abyss: #2A0000;
      --yellow-light: #FFE87A;
      --yellow: #FFCB05;
      --yellow-dark: #CC9900;
      --blue-light: #7B8CE8;
      --blue: #3B4CCA;
      --blue-dark: #1E2D8A;
      --void: #0A0A0A;
      --deep: #111111;
      --dark: #1A1A1A;
      --border: #2A2A2A;
      --border-light: #333333;
      --muted: #666666;
      --subtle: #999999;
      --light: #CCCCCC;
      --white: #FFFFFF;
      --font-pixel: 'Press Start 2P', monospace;
      --font-ui: 'Outfit', sans-serif;
      --glow-red: 0 0 40px rgba(204,0,0,0.8), 0 0 80px rgba(204,0,0,0.4);
      --glow-yellow: 0 0 20px rgba(255,203,5,0.6);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: var(--font-ui);
      background: var(--void);
      color: var(--white);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    body::before {
      content: '';
      position: fixed; inset: 0;
      background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px);
      pointer-events: none;
      z-index: 9999;
    }

    .page { max-width: 1200px; margin: 0 auto; padding: 3rem 2.5rem 8rem; }

    /* ─── COVER ─── */
    .cover {
      position: relative;
      background: var(--deep);
      border: 1px solid var(--border);
      padding: 6rem 4rem 6rem 4rem;
      margin-bottom: 5rem;
      overflow: hidden;
    }
    .cover-pixel-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(204,0,0,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(204,0,0,0.04) 1px, transparent 1px);
      background-size: 48px 48px;
    }
    .cover::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 40% 50%, rgba(204,0,0,0.18), transparent 65%);
      pointer-events: none;
    }
    .cover::after {
      content: '';
      position: absolute;
      bottom: -80px; right: -80px;
      width: 380px; height: 380px;
      background: radial-gradient(circle, rgba(255,203,5,0.07), transparent 65%);
      pointer-events: none;
    }
    .cover-badge {
      display: inline-block;
      font-family: var(--font-pixel);
      font-size: .5rem;
      color: var(--yellow);
      border: 1px solid rgba(255,203,5,0.5);
      padding: .4rem .85rem;
      margin-bottom: 2.5rem;
      position: relative; z-index: 1;
      letter-spacing: .08em;
    }
    .cover h1 {
      font-family: var(--font-pixel);
      font-size: 2.8rem;
      line-height: 1.5;
      color: var(--white);
      position: relative; z-index: 1;
      text-shadow: var(--glow-red);
    }
    .cover-sub {
      font-family: var(--font-pixel);
      font-size: .6rem;
      color: var(--red-bright);
      margin-top: .75rem;
      position: relative; z-index: 1;
      letter-spacing: .12em;
    }
    .cover p {
      margin-top: 2rem;
      font-size: 1.05rem;
      color: var(--subtle);
      max-width: 520px;
      position: relative; z-index: 1;
      font-weight: 300;
      line-height: 1.8;
    }
    .cover-pokeball {
      position: absolute;
      right: 3.5rem; top: 50%;
      transform: translateY(-50%);
      width: 220px; height: 220px;
      opacity: 0.05; z-index: 0;
    }

    /* ─── SECTION STRUCTURE ─── */
    .section { margin-bottom: 5rem; }
    .section-eyebrow {
      font-family: var(--font-pixel);
      font-size: .5rem;
      color: var(--red-bright);
      letter-spacing: .18em;
      display: flex; align-items: center; gap: 1rem;
      margin-bottom: .85rem;
    }
    .section-eyebrow::after {
      content: '';
      flex: 1; height: 1px;
      background: linear-gradient(90deg, var(--red), transparent);
    }
    .section-heading {
      font-size: 2.1rem;
      font-weight: 700;
      margin-bottom: .5rem;
      line-height: 1.2;
    }
    .section-desc {
      color: var(--subtle);
      font-size: .9rem;
      margin-bottom: 2.5rem;
      font-weight: 300;
      max-width: 680px;
      line-height: 1.8;
    }
    .divider {
      border: none;
      border-top: 1px solid var(--border);
      margin: 5rem 0;
    }

    /* ─── PERSONAS ─── */
    .persona-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }
    .persona-card {
      background: var(--dark);
      border: 1px solid var(--border);
      padding: 2rem;
      position: relative; overflow: hidden;
    }
    .persona-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 3px;
    }
    .persona-card.p-red::before { background: var(--red); }
    .persona-card.p-yellow::before { background: var(--yellow); }
    .persona-card.p-blue::before { background: var(--blue-light); }
    .persona-card::after {
      content: attr(data-num);
      position: absolute;
      bottom: 1rem; right: 1.5rem;
      font-family: var(--font-pixel);
      font-size: .45rem;
      color: var(--border-light);
      letter-spacing: .1em;
    }
    .persona-avatar {
      font-size: 2.2rem;
      margin-bottom: 1.25rem;
      display: block;
    }
    .persona-tag {
      display: inline-block;
      font-family: var(--font-pixel);
      font-size: .42rem;
      padding: .3rem .65rem;
      margin-bottom: .85rem;
      letter-spacing: .08em;
    }
    .persona-tag.t-red { background: rgba(204,0,0,0.15); color: var(--red-bright); border: 1px solid rgba(204,0,0,0.35); }
    .persona-tag.t-yellow { background: rgba(255,203,5,0.12); color: var(--yellow); border: 1px solid rgba(255,203,5,0.3); }
    .persona-tag.t-blue { background: rgba(59,76,202,0.18); color: var(--blue-light); border: 1px solid rgba(59,76,202,0.35); }
    .persona-name { font-size: 1.3rem; font-weight: 700; margin-bottom: .2rem; }
    .persona-age { font-size: .78rem; color: var(--muted); margin-bottom: 1.25rem; font-weight: 400; }
    .persona-desc {
      font-size: .82rem; color: var(--light);
      line-height: 1.75; margin-bottom: 1.5rem; font-weight: 300;
    }
    .persona-list { list-style: none; }
    .persona-list li {
      font-size: .78rem; color: var(--subtle);
      padding: .35rem 0;
      border-bottom: 1px solid var(--border);
      display: flex; align-items: flex-start; gap: .6rem;
    }
    .persona-list li:last-child { border-bottom: none; }
    .persona-list li .dot {
      flex-shrink: 0; width: 5px; height: 5px;
      margin-top: .38rem;
    }
    .dot-red { background: var(--red); }
    .dot-yellow { background: var(--yellow); }
    .dot-blue { background: var(--blue-light); }

    /* ─── BRAND DNA ─── */
    .dna-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem; margin-bottom: 1.25rem;
    }
    .dna-card {
      background: var(--dark);
      border: 1px solid var(--border);
      padding: 2rem;
    }
    .dna-label {
      font-family: var(--font-pixel);
      font-size: .45rem;
      color: var(--red-bright);
      letter-spacing: .15em;
      margin-bottom: 1rem;
    }
    .dna-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 1.25rem; }
    .archetype-visual {
      display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
    }
    .archetype-item {
      background: rgba(255,255,255,0.04);
      padding: 1.25rem; text-align: center;
    }
    .archetype-icon { font-size: 1.6rem; margin-bottom: .5rem; }
    .archetype-name { font-size: .78rem; font-weight: 600; color: var(--light); }
    .archetype-sub { font-size: .7rem; color: var(--muted); margin-top: .2rem; line-height: 1.5; }
    .value-pills { display: flex; flex-wrap: wrap; gap: .5rem; }
    .pill {
      font-size: .75rem; font-weight: 600;
      padding: .4rem .9rem; border: 1px solid;
    }
    .pill-red { border-color: rgba(204,0,0,0.5); color: var(--red-bright); background: rgba(204,0,0,0.08); }
    .pill-yellow { border-color: rgba(255,203,5,0.4); color: var(--yellow); background: rgba(255,203,5,0.07); }
    .pill-neutral { border-color: var(--border-light); color: var(--light); background: rgba(255,255,255,0.04); }

    .insight-list { display: flex; flex-direction: column; gap: .75rem; }
    .insight-item {
      display: flex; gap: 1.25rem; align-items: flex-start;
      padding: 1.1rem 1.25rem;
      background: rgba(255,255,255,0.03);
      border-left: 2px solid var(--red);
    }
    .insight-num {
      font-family: var(--font-pixel);
      font-size: .5rem; color: var(--red-bright);
      flex-shrink: 0; padding-top: .15rem;
    }
    .insight-text { font-size: .85rem; color: var(--light); line-height: 1.75; font-weight: 400; }
    .insight-text strong { color: var(--white); font-weight: 600; }

    /* ─── NAMING ─── */
    .naming-hero {
      background: var(--dark);
      border: 1px solid var(--border);
      padding: 5rem 4rem;
      text-align: center;
      position: relative; overflow: hidden;
      margin-bottom: 1.25rem;
    }
    .naming-hero::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at center, rgba(204,0,0,0.12), transparent 70%);
    }
    .naming-hero-pixel-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(204,0,0,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(204,0,0,0.035) 1px, transparent 1px);
      background-size: 32px 32px;
    }
    .naming-hero h2 {
      font-family: var(--font-pixel);
      font-size: 2.8rem;
      color: var(--white);
      position: relative; z-index: 1;
      text-shadow: var(--glow-red);
      line-height: 1.5; margin-bottom: 1.5rem;
    }
    .naming-hero .tagline {
      font-size: 1.15rem; color: var(--subtle);
      position: relative; z-index: 1;
      font-weight: 300; font-style: italic;
    }
    .naming-hero .tagline strong { color: var(--yellow); font-style: normal; font-weight: 600; }

    .tagline-options {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
    .tagline-card {
      background: var(--dark);
      border: 1px solid var(--border);
      padding: 1.5rem;
    }
    .tagline-card.preferred { border-color: rgba(204,0,0,0.6); }
    .tagline-label {
      font-family: var(--font-pixel);
      font-size: .42rem;
      color: var(--muted); letter-spacing: .1em;
      margin-bottom: .75rem;
    }
    .tagline-card.preferred .tagline-label { color: var(--red-bright); }
    .tagline-text { font-size: .95rem; font-weight: 600; color: var(--white); margin-bottom: .5rem; line-height: 1.5; }
    .tagline-note { font-size: .75rem; color: var(--muted); font-weight: 300; line-height: 1.6; }

    /* ─── COULEURS ─── */
    .color-group-label {
      font-family: var(--font-pixel);
      font-size: .45rem;
      color: var(--muted);
      letter-spacing: .15em;
      margin-bottom: 1rem;
      margin-top: 2.25rem;
    }
    .color-group-label:first-child { margin-top: 0; }
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
      gap: .9rem;
    }
    .color-card { background: var(--dark); border: 1px solid var(--border); overflow: hidden; }
    .color-swatch { height: 68px; }
    .color-info { padding: .7rem; }
    .color-name { font-size: .75rem; font-weight: 600; margin-bottom: .15rem; }
    .color-value { font-size: .62rem; color: var(--muted); font-family: 'Courier New', monospace; }

    /* ─── TYPE BADGES ─── */
    .type-badges-grid { display: flex; flex-wrap: wrap; gap: .6rem; }
    .type-badge {
      font-family: var(--font-ui);
      font-size: .72rem; font-weight: 600;
      padding: .32rem .85rem;
      letter-spacing: .04em;
      text-transform: uppercase;
    }

    /* ─── TYPO ─── */
    .typo-specimen {
      background: var(--dark);
      border: 1px solid var(--border);
      overflow: hidden; margin-bottom: 1rem;
    }
    .typo-display { padding: 2rem 2rem 1.5rem; border-bottom: 1px solid var(--border); }
    .typo-meta {
      padding: .7rem 2rem;
      display: flex; gap: 2rem;
      font-size: .7rem; color: var(--muted);
      background: rgba(255,255,255,0.02);
    }
    .typo-meta strong { color: var(--light); margin-right: .2rem; }

    .weight-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
      gap: 1rem; margin-top: 1.5rem;
    }
    .weight-card { background: var(--dark); border: 1px solid var(--border); padding: 1.25rem; }
    .weight-card .preview { font-size: 2rem; line-height: 1.2; margin-bottom: .5rem; font-family: var(--font-ui); }
    .weight-card .label { font-size: .62rem; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; font-weight: 600; }

    /* ─── SPACING ─── */
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: .82rem;
    }
    .data-table th {
      text-align: left;
      font-weight: 600; font-size: .75rem;
      padding: .65rem 1rem;
      background: var(--dark);
      color: var(--white);
      border-bottom: 2px solid var(--red);
    }
    .data-table td {
      padding: .55rem 1rem;
      border-bottom: 1px solid var(--border);
      color: var(--light);
      vertical-align: middle;
    }
    .data-table code {
      font-family: 'Courier New', monospace;
      font-size: .7rem;
      background: rgba(255,255,255,0.06);
      color: var(--red-bright);
      padding: .15rem .4rem;
    }
    .spacing-bar {
      height: 7px;
      background: linear-gradient(90deg, var(--red), var(--red-bright));
      min-width: 3px;
    }

    /* ─── COMPOSANTS ─── */
    .comp-demo {
      background: var(--dark);
      border: 1px solid var(--border);
      padding: 2rem;
      margin-bottom: 1rem;
    }
    .comp-label {
      font-family: var(--font-pixel);
      font-size: .42rem;
      color: var(--muted);
      letter-spacing: .1em;
      margin-bottom: 1.5rem;
    }
    .btn-row { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; }

    .btn {
      font-family: var(--font-ui);
      font-weight: 600;
      cursor: pointer; border: none;
      font-size: .9rem;
      display: inline-flex; align-items: center; gap: .5rem;
      transition: all .15s ease;
      line-height: 1;
    }
    .btn-primary { background: var(--red); color: var(--white); padding: .8rem 1.75rem; }
    .btn-primary:hover { background: var(--red-bright); }
    .btn-secondary { background: transparent; color: var(--white); padding: .8rem 1.75rem; border: 1px solid var(--border-light); }
    .btn-secondary:hover { border-color: var(--subtle); }
    .btn-ghost { background: rgba(255,255,255,0.07); color: var(--light); padding: .8rem 1.75rem; }
    .btn-yellow { background: var(--yellow); color: #000; padding: .8rem 1.75rem; font-weight: 700; }
    .btn-pixel {
      font-family: var(--font-pixel); font-size: .48rem;
      background: var(--red); color: var(--white);
      padding: 1rem 1.75rem; letter-spacing: .06em;
      box-shadow: var(--glow-red);
    }
    .btn-sm { font-size: .78rem; padding: .55rem 1.2rem; }
    .btn-lg { font-size: 1rem; padding: 1rem 2.25rem; }

    .search-demo {
      display: flex; align-items: center;
      background: var(--void);
      border: 1px solid var(--border-light);
      padding: .85rem 1.25rem;
      gap: 1rem; max-width: 500px;
      transition: border-color .15s;
    }
    .search-demo:focus-within { border-color: var(--red); }
    .search-icon { color: var(--muted); flex-shrink: 0; font-size: 1rem; }
    .search-input {
      background: transparent; border: none; outline: none;
      color: var(--white); font-family: var(--font-ui);
      font-size: 1rem; flex: 1;
    }
    .search-input::placeholder { color: var(--muted); }
    .search-kbd {
      font-size: .62rem; color: var(--muted);
      border: 1px solid var(--border-light);
      padding: .2rem .45rem; font-family: monospace;
    }

    .cards-row { display: flex; gap: 1rem; flex-wrap: wrap; }
    .poke-card {
      background: var(--void);
      border: 1px solid var(--border);
      padding: 1.5rem; width: 180px;
      text-align: center; position: relative; overflow: hidden;
      transition: border-color .2s, transform .2s;
      cursor: pointer;
    }
    .poke-card:hover { transform: translateY(-2px); }
    .poke-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
    }
    .poke-card.active-red::before { background: var(--red); }
    .poke-card.active-yellow::before { background: var(--yellow); }
    .poke-card.active-blue::before { background: var(--blue-light); }
    .poke-card.active-red:hover { border-color: rgba(204,0,0,0.5); }
    .poke-card.active-yellow:hover { border-color: rgba(255,203,5,0.5); }
    .poke-card.active-blue:hover { border-color: rgba(123,140,232,0.5); }
    .poke-num {
      font-family: var(--font-pixel);
      font-size: .42rem; color: var(--muted);
      margin-bottom: .85rem; display: block;
    }
    .poke-emoji { font-size: 3.5rem; margin-bottom: .75rem; display: block; }
    .poke-name {
      font-size: .85rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: .08em;
      margin-bottom: .6rem;
    }
    .poke-types { display: flex; gap: .3rem; justify-content: center; }

    /* ─── TOKEN BLOCK ─── */
    .token-block {
      background: var(--deep);
      border: 1px solid var(--border);
      border-left: 3px solid var(--red);
      padding: 2.25rem;
      font-family: 'Courier New', monospace;
      font-size: .73rem; line-height: 2.1;
      overflow-x: auto; white-space: pre;
    }
    .tc { color: var(--muted); }
    .tp { color: #FF9E64; }
    .tv { color: #9ECE6A; }

    @media (max-width: 900px) {
      .persona-grid { grid-template-columns: 1fr; }
      .dna-grid { grid-template-columns: 1fr; }
      .tagline-options { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .cover { padding: 3rem 2rem; }
      .cover h1, .naming-hero h2 { font-size: 1.4rem; }
      .page { padding: 2rem 1.25rem 5rem; }
    }
  </style>
</head>
<body>
<div class="page">

  <!-- ══ COVER ══ -->
  <div class="cover">
    <div class="cover-pixel-grid"></div>
    <div class="cover-badge">★ BRAND GUIDELINES V1.0</div>
    <h1>POKEDEX</h1>
    <div class="cover-sub">► L'ENCYCLOPÉDIE DE TOUTES LES GÉNÉRATIONS</div>
    <p>Référentiel complet d'identité de marque. Personas, ADN, naming, couleurs, typographie, composants UI et règles de design pour créer une encyclopédie Pokémon qui réconcilie nostalgie et modernité.</p>
    <svg class="cover-pokeball" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="97" stroke="white" stroke-width="2"/>
      <path d="M3 100 H197" stroke="white" stroke-width="2"/>
      <circle cx="100" cy="100" r="28" stroke="white" stroke-width="2"/>
      <circle cx="100" cy="100" r="16" fill="white"/>
      <path d="M3 100 A97 97 0 0 1 197 100" fill="rgba(204,0,0,0.25)"/>
    </svg>
  </div>

  <!-- ══ 1. BUYER PERSONAS ══ -->
  <div class="section">
    <div class="section-eyebrow">01 — BUYER PERSONAS</div>
    <div class="section-heading">Qui sont nos dresseurs ?</div>
    <p class="section-desc">Trois profils distincts, unis par un même univers. Chacun porte ses propres motivations, frustrations et désirs vis-à-vis de l'encyclopédie. La marque doit résonner avec les trois.</p>

    <div class="persona-grid">
      <div class="persona-card p-red" data-num="PERSONA 01">
        <span class="persona-avatar">🕹️</span>
        <div class="persona-tag t-red">PERSONA 01 — NOSTALGIQUE</div>
        <div class="persona-name">Le Vétéran</div>
        <div class="persona-age">28 – 42 ans · CSP+ · Parents, actifs</div>
        <p class="persona-desc">A grandi avec Pokémon Rouge & Bleu sur Game Boy. L'encyclopédie est pour lui autant un voyage dans le temps qu'un outil. Il veut retrouver l'âme du Pokedex original — pas une fiche technique froide et sans caractère.</p>
        <ul class="persona-list">
          <li><span class="dot dot-red"></span>Veut l'esthétique et la magie de 1996</li>
          <li><span class="dot dot-red"></span>Cherche l'exhaustivité Gen 1 → dernière gen</li>
          <li><span class="dot dot-red"></span>Frustré : les sites modernes ont "tué l'âme"</li>
          <li><span class="dot dot-red"></span>Désir : partager l'univers avec ses enfants</li>
        </ul>
      </div>

      <div class="persona-card p-yellow" data-num="PERSONA 02">
        <span class="persona-avatar">⚡</span>
        <div class="persona-tag t-yellow">PERSONA 02 — COMPÉTITIF</div>
        <div class="persona-name">Le Stratège</div>
        <div class="persona-age">16 – 30 ans · Gamer actif · Mobile-first</div>
        <p class="persona-desc">Joue sur Switch, suit les tournois VGC et Smogon. Il a besoin de données précises et accessibles en quelques secondes : stats, faiblesses typologiques, movesets, tiers. Le Pokedex est son outil quotidien.</p>
        <ul class="persona-list">
          <li><span class="dot dot-yellow"></span>Cherche stats base, EV/IV, counters</li>
          <li><span class="dot dot-yellow"></span>Veut filtres avancés et recherche ultra-rapide</li>
          <li><span class="dot dot-yellow"></span>Frustré : infos dispersées sur 10 sites</li>
          <li><span class="dot dot-yellow"></span>Désir : tout-en-un, mobile, instantané</li>
        </ul>
      </div>

      <div class="persona-card p-blue" data-num="PERSONA 03">
        <span class="persona-avatar">🌟</span>
        <div class="persona-tag t-blue">PERSONA 03 — DÉCOUVREUR</div>
        <div class="persona-name">Le Nouveau Dresseur</div>
        <div class="persona-age">8 – 16 ans · Cartes TCG, Séries, GO</div>
        <p class="persona-desc">Découvre Pokémon via les cartes, la série animée ou Pokémon GO. Il veut explorer et apprendre. L'encyclopédie est sa première carte du monde Pokémon — la simplicité et la découverte passent avant les stats.</p>
        <ul class="persona-list">
          <li><span class="dot dot-blue"></span>Veut une interface ludique et accessible</li>
          <li><span class="dot dot-blue"></span>Cherche "son" Pokémon préféré avant les stats</li>
          <li><span class="dot dot-blue"></span>Frustré : sites trop denses et techniques</li>
          <li><span class="dot dot-blue"></span>Désir : découverte progressive et fun</li>
        </ul>
      </div>
    </div>
  </div>

  <hr class="divider">

  <!-- ══ 2. BRAND DNA ══ -->
  <div class="section">
    <div class="section-eyebrow">02 — BRAND DNA & INSIGHTS</div>
    <div class="section-heading">Ce qui nous connecte à eux</div>
    <p class="section-desc">Au-delà du produit, notre encyclopédie active des ressorts émotionnels profonds communs aux trois personas. La marque doit incarner ces connexions pour créer un lien durable et différenciant.</p>

    <div class="dna-grid">
      <div class="dna-card">
        <div class="dna-label">► ARCHÉTYPES DE MARQUE</div>
        <div class="dna-title">L'Explorateur + Le Sage</div>
        <div class="archetype-visual">
          <div class="archetype-item">
            <div class="archetype-icon">🗺️</div>
            <div class="archetype-name">L'Explorateur</div>
            <div class="archetype-sub">Aventure, découverte, liberté, quête</div>
          </div>
          <div class="archetype-item">
            <div class="archetype-icon">📖</div>
            <div class="archetype-name">Le Sage</div>
            <div class="archetype-sub">Connaissance, exhaustivité, fiabilité, vérité</div>
          </div>
        </div>
      </div>

      <div class="dna-card">
        <div class="dna-label">► VALEURS DE MARQUE</div>
        <div class="dna-title">Ce que l'on incarne</div>
        <div class="value-pills">
          <span class="pill pill-red">Nostalgie</span>
          <span class="pill pill-red">Authenticité</span>
          <span class="pill pill-yellow">Découverte</span>
          <span class="pill pill-yellow">Exhaustivité</span>
          <span class="pill pill-neutral">Accessibilité</span>
          <span class="pill pill-neutral">Précision</span>
          <span class="pill pill-neutral">Passion</span>
          <span class="pill pill-neutral">Communauté</span>
        </div>
      </div>
    </div>

    <div class="insight-list">
      <div class="insight-item">
        <span class="insight-num">01</span>
        <div class="insight-text"><strong>La nostalgie est le premier levier d'engagement.</strong> Tous nos personas partagent un lien émotionnel fort avec l'univers Pokémon, même à des degrés différents. L'esthétique rétro-pixel n'est pas un choix stylistique — c'est un signal de confiance et d'appartenance.</div>
      </div>
      <div class="insight-item">
        <span class="insight-num">02</span>
        <div class="insight-text"><strong>L'encyclopédie doit retrouver son statut de compagnon.</strong> Le Pokedex original était un compagnon de voyage, pas un outil. Notre version numérique doit retrouver ce statut : quelque chose qu'on consulte avec plaisir, pas par obligation froide.</div>
      </div>
      <div class="insight-item">
        <span class="insight-num">03</span>
        <div class="insight-text"><strong>Le dark mode évoque l'univers nocturne des aventuriers.</strong> Les sessions de jeu prolongées, la lampe de chevet, le monde nocturne des dresseurs. Le fond sombre n'est pas un effet de mode — c'est un signal d'appartenance à la culture Pokémon.</div>
      </div>
      <div class="insight-item">
        <span class="insight-num">04</span>
        <div class="insight-text"><strong>Le rouge est déjà dans la mémoire collective.</strong> Rouge Pokedex, Version Rouge, Pokéball — la couleur est culturellement encodée. L'utiliser comme couleur primaire active instantanément les souvenirs et crédibilise l'identité sans explication.</div>
      </div>
    </div>
  </div>

  <hr class="divider">

  <!-- ══ 3. NAMING & TAGLINE ══ -->
  <div class="section">
    <div class="section-eyebrow">03 — NAMING & TAGLINE</div>
    <div class="section-heading">L'identité nommée</div>

    <div class="naming-hero">
      <div class="naming-hero-pixel-grid"></div>
      <h2>POKEDEX</h2>
      <p class="tagline"><strong>"L'encyclopédie de toutes les générations."</strong></p>
    </div>

    <div class="tagline-options">
      <div class="tagline-card preferred">
        <div class="tagline-label">★ RETENU — UNIVERSEL</div>
        <div class="tagline-text">"L'encyclopédie de toutes les générations."</div>
        <div class="tagline-note">Inclusif, couvre les 3 personas. Évoque continuité et exhaustivité. Parle aux nostalgiques comme aux nouveaux.</div>
      </div>
      <div class="tagline-card">
        <div class="tagline-label">OPTION B — NOSTALGIE</div>
        <div class="tagline-text">"Toute la magie de ton enfance."</div>
        <div class="tagline-note">Très émotionnel et puissant pour Le Vétéran. Risque d'exclure Le Stratège et Le Nouveau Dresseur.</div>
      </div>
      <div class="tagline-card">
        <div class="tagline-label">OPTION C — MISSION</div>
        <div class="tagline-text">"Attrape-les tous. Connais-les tous."</div>
        <div class="tagline-note">Clin d'œil direct au slogan original. Très mémorable, mais peut sembler trop littéral ou trop "marketing".</div>
      </div>
    </div>
  </div>

  <hr class="divider">

  <!-- ══ 4. COULEURS ══ -->
  <div class="section">
    <div class="section-eyebrow">04 — COULEURS</div>
    <div class="section-heading">La palette de l'encyclopédie</div>
    <p class="section-desc">Trois familles chromatiques issues de l'univers Pokémon originel. Le rouge comme couleur primaire signature, le jaune comme accent émotionnel rare, le bleu comme couleur fonctionnelle. Plus 18 couleurs de types pour la catégorisation.</p>

    <div class="color-group-label">Primaire — Rouge Pokedex</div>
    <div class="color-grid">
      <div class="color-card">
        <div class="color-swatch" style="background:#FFE5E5"></div>
        <div class="color-info"><div class="color-name" style="color:#111">Red Pale</div><div class="color-value">#FFE5E5</div></div>
      </div>
      <div class="color-card">
        <div class="color-swatch" style="background:#FF3333"></div>
        <div class="color-info"><div class="color-name">Red Bright</div><div class="color-value">#FF3333</div></div>
      </div>
      <div class="color-card">
        <div class="color-swatch" style="background:#CC0000; position:relative">
          <div style="position:absolute;bottom:.4rem;right:.4rem;font-size:.5rem;color:rgba(255,255,255,0.7);font-family:'Courier New'">PRIMARY</div>
        </div>
        <div class="color-info"><div class="color-name">Red ★</div><div class="color-value">#CC0000</div></div>
      </div>
      <div class="color-card">
        <div class="color-swatch" style="background:#8B0000"></div>
        <div class="color-info"><div class="color-name">Red Dark</div><div class="color-value">#8B0000</div></div>
      </div>
      <div class="color-card">
        <div class="color-swatch" style="background:#2A0000"></div>
        <div class="color-info"><div class="color-name">Red Abyss</div><div class="color-value">#2A0000</div></div>
      </div>
    </div>

    <div class="color-group-label">Secondaire — Jaune Pikachu</div>
    <div class="color-grid">
      <div class="color-card">
        <div class="color-swatch" style="background:#FFE87A"></div>
        <div class="color-info"><div class="color-name" style="color:#111">Yellow Light</div><div class="color-value">#FFE87A</div></div>
      </div>
      <div class="color-card">
        <div class="color-swatch" style="background:#FFCB05; position:relative">
          <div style="position:absolute;bottom:.4rem;right:.4rem;font-size:.5rem;color:rgba(0,0,0,0.5);font-family:'Courier New'">ACCENT</div>
        </div>
        <div class="color-info"><div class="color-name" style="color:#111">Yellow ★</div><div class="color-value">#FFCB05</div></div>
      </div>
      <div class="color-card">
        <div class="color-swatch" style="background:#CC9900"></div>
        <div class="color-info"><div class="color-name">Yellow Dark</div><div class="color-value">#CC9900</div></div>
      </div>
    </div>

    <div class="color-group-label">Tertiaire — Bleu Version Bleue</div>
    <div class="color-grid">
      <div class="color-card">
        <div class="color-swatch" style="background:#7B8CE8"></div>
        <div class="color-info"><div class="color-name">Blue Light</div><div class="color-value">#7B8CE8</div></div>
      </div>
      <div class="color-card">
        <div class="color-swatch" style="background:#3B4CCA; position:relative">
          <div style="position:absolute;bottom:.4rem;right:.4rem;font-size:.5rem;color:rgba(255,255,255,0.6);font-family:'Courier New'">UI</div>
        </div>
        <div class="color-info"><div class="color-name">Blue ★</div><div class="color-value">#3B4CCA</div></div>
      </div>
      <div class="color-card">
        <div class="color-swatch" style="background:#1E2D8A"></div>
        <div class="color-info"><div class="color-name">Blue Dark</div><div class="color-value">#1E2D8A</div></div>
      </div>
    </div>

    <div class="color-group-label">Neutres — Palette sombre (dark-first)</div>
    <div class="color-grid">
      <div class="color-card"><div class="color-swatch" style="background:#0A0A0A; border-bottom:1px solid #222"></div><div class="color-info"><div class="color-name">Void</div><div class="color-value">#0A0A0A</div></div></div>
      <div class="color-card"><div class="color-swatch" style="background:#111111"></div><div class="color-info"><div class="color-name">Deep</div><div class="color-value">#111111</div></div></div>
      <div class="color-card"><div class="color-swatch" style="background:#1A1A1A"></div><div class="color-info"><div class="color-name">Dark (cards)</div><div class="color-value">#1A1A1A</div></div></div>
      <div class="color-card"><div class="color-swatch" style="background:#2A2A2A"></div><div class="color-info"><div class="color-name">Border</div><div class="color-value">#2A2A2A</div></div></div>
      <div class="color-card"><div class="color-swatch" style="background:#666666"></div><div class="color-info"><div class="color-name">Muted</div><div class="color-value">#666666</div></div></div>
      <div class="color-card"><div class="color-swatch" style="background:#999999"></div><div class="color-info"><div class="color-name">Subtle</div><div class="color-value">#999999</div></div></div>
      <div class="color-card"><div class="color-swatch" style="background:#CCCCCC"></div><div class="color-info"><div class="color-name" style="color:#111">Light</div><div class="color-value">#CCCCCC</div></div></div>
      <div class="color-card"><div class="color-swatch" style="background:#FFFFFF"></div><div class="color-info"><div class="color-name" style="color:#111">White</div><div class="color-value">#FFFFFF</div></div></div>
    </div>

    <div class="color-group-label" style="margin-top:2.5rem">Couleurs fonctionnelles — 18 Types Pokémon</div>
    <p style="font-size:.82rem;color:var(--muted);margin-bottom:1rem;font-weight:300">Ces couleurs sont les seules exceptions à la palette principale. Utilisées exclusivement comme indicateurs de type — jamais comme décoration.</p>
    <div class="type-badges-grid">
      <span class="type-badge" style="background:#A8A878;color:#fff">Normal</span>
      <span class="type-badge" style="background:#F08030;color:#fff">Feu</span>
      <span class="type-badge" style="background:#6890F0;color:#fff">Eau</span>
      <span class="type-badge" style="background:#78C850;color:#fff">Plante</span>
      <span class="type-badge" style="background:#F8D030;color:#000">Électrik</span>
      <span class="type-badge" style="background:#98D8D8;color:#000">Glace</span>
      <span class="type-badge" style="background:#C03028;color:#fff">Combat</span>
      <span class="type-badge" style="background:#A040A0;color:#fff">Poison</span>
      <span class="type-badge" style="background:#E0C068;color:#000">Sol</span>
      <span class="type-badge" style="background:#A890F0;color:#fff">Vol</span>
      <span class="type-badge" style="background:#F85888;color:#fff">Psy</span>
      <span class="type-badge" style="background:#A8B820;color:#fff">Insecte</span>
      <span class="type-badge" style="background:#B8A038;color:#fff">Roche</span>
      <span class="type-badge" style="background:#705898;color:#fff">Spectre</span>
      <span class="type-badge" style="background:#7038F8;color:#fff">Dragon</span>
      <span class="type-badge" style="background:#705848;color:#fff">Ténèbres</span>
      <span class="type-badge" style="background:#B8B8D0;color:#000">Acier</span>
      <span class="type-badge" style="background:#EE99AC;color:#000">Fée</span>
    </div>
  </div>

  <hr class="divider">

  <!-- ══ 5. TYPOGRAPHIE ══ -->
  <div class="section">
    <div class="section-eyebrow">05 — TYPOGRAPHIE</div>
    <div class="section-heading">Deux voix, une identité</div>
    <p class="section-desc">Système bi-polices à intention claire. <strong style="color:var(--white)">Press Start 2P</strong> pour l'affect rétro et les éléments symboliques. <strong style="color:var(--white)">Outfit</strong> pour la lisibilité UI et le corps de texte. L'une évoque — l'autre informe.</p>

    <div class="color-group-label" style="margin-top:0">Display — Press Start 2P · Titres hero, numéros, labels</div>

    <div class="typo-specimen">
      <div class="typo-display" style="font-family:'Press Start 2P';font-size:1.8rem;line-height:1.6;color:var(--white);text-shadow:var(--glow-red)">POKEDEX</div>
      <div class="typo-meta"><div><strong>Taille</strong> 1.8rem</div><div><strong>Weight</strong> 400 (seul disponible)</div><div><strong>Usage</strong> Logo, hero H1</div></div>
    </div>

    <div class="typo-specimen">
      <div class="typo-display" style="font-family:'Press Start 2P';font-size:.85rem;line-height:2;color:var(--red-bright)">#001 — BULBIZARRE</div>
      <div class="typo-meta"><div><strong>Taille</strong> 0.85rem</div><div><strong>Usage</strong> Numéros Pokedex, identifiants</div></div>
    </div>

    <div class="typo-specimen">
      <div class="typo-display" style="font-family:'Press Start 2P';font-size:.5rem;line-height:2.5;color:var(--muted);letter-spacing:.12em">TYPE — EAU · POIDS 6.9KG · TAILLE 0.7M · GEN I</div>
      <div class="typo-meta"><div><strong>Taille</strong> 0.5rem</div><div><strong>Usage</strong> Metadata, labels de section, badges</div></div>
    </div>

    <div class="color-group-label" style="margin-top:2rem">UI — Outfit · Interface, corps, navigation</div>

    <div class="typo-specimen">
      <div class="typo-display" style="font-family:'Outfit';font-size:2.5rem;font-weight:700;line-height:1.15;color:var(--white)">Encyclopédie Pokémon</div>
      <div class="typo-meta"><div><strong>Taille</strong> 2.5rem</div><div><strong>Weight</strong> 700</div><div><strong>Usage</strong> Titres de section H2</div></div>
    </div>

    <div class="typo-specimen">
      <div class="typo-display" style="font-family:'Outfit';font-size:1.5rem;font-weight:600;line-height:1.3;color:var(--white)">Fiche complète — Bulbizarre</div>
      <div class="typo-meta"><div><strong>Taille</strong> 1.5rem</div><div><strong>Weight</strong> 600</div><div><strong>Usage</strong> Titre de fiche, H3</div></div>
    </div>

    <div class="typo-specimen">
      <div class="typo-display" style="font-family:'Outfit';font-size:1rem;font-weight:400;line-height:1.8;color:var(--light)">Bulbizarre est un Pokémon de type Plante/Poison de la première génération. Apparu dans Pokémon Rouge et Bleu en 1996, il est le #001 dans l'ordre du Pokedex national. Sa graine dorsale absorbe l'énergie solaire et grandit au fil des évolutions.</div>
      <div class="typo-meta"><div><strong>Taille</strong> 1rem</div><div><strong>Weight</strong> 400</div><div><strong>Usage</strong> Corps de texte, descriptions</div></div>
    </div>

    <div class="color-group-label" style="margin-top:2rem">Graisses Outfit</div>
    <div class="weight-grid">
      <div class="weight-card"><div class="preview" style="font-weight:300">Aa</div><div class="label">Light — 300</div></div>
      <div class="weight-card"><div class="preview" style="font-weight:400">Aa</div><div class="label">Regular — 400</div></div>
      <div class="weight-card"><div class="preview" style="font-weight:500">Aa</div><div class="label">Medium — 500</div></div>
      <div class="weight-card"><div class="preview" style="font-weight:600">Aa</div><div class="label">Semibold — 600</div></div>
      <div class="weight-card"><div class="preview" style="font-weight:700">Aa</div><div class="label">Bold — 700</div></div>
      <div class="weight-card"><div class="preview" style="font-weight:800">Aa</div><div class="label">Extrabold — 800</div></div>
    </div>
  </div>

  <hr class="divider">

  <!-- ══ 6. ESPACEMENTS ══ -->
  <div class="section">
    <div class="section-eyebrow">06 — ESPACEMENTS</div>
    <div class="section-heading">Échelle spatiale</div>
    <p class="section-desc">Échelle basée sur un multiple de 4px. Suffixe numérique = multiple de 4 en rem.</p>

    <table class="data-table">
      <thead>
        <tr><th>Token</th><th>Valeur</th><th>px</th><th style="width:38%">Aperçu</th></tr>
      </thead>
      <tbody>
        <tr><td><code>--space-1</code></td><td>0.25rem</td><td>4</td><td><div class="spacing-bar" style="width:4px"></div></td></tr>
        <tr><td><code>--space-2</code></td><td>0.5rem</td><td>8</td><td><div class="spacing-bar" style="width:8px"></div></td></tr>
        <tr><td><code>--space-3</code></td><td>0.75rem</td><td>12</td><td><div class="spacing-bar" style="width:12px"></div></td></tr>
        <tr><td><code>--space-4</code></td><td>1rem</td><td>16</td><td><div class="spacing-bar" style="width:16px"></div></td></tr>
        <tr><td><code>--space-6</code></td><td>1.5rem</td><td>24</td><td><div class="spacing-bar" style="width:24px"></div></td></tr>
        <tr><td><code>--space-8</code></td><td>2rem</td><td>32</td><td><div class="spacing-bar" style="width:32px"></div></td></tr>
        <tr><td><code>--space-12</code></td><td>3rem</td><td>48</td><td><div class="spacing-bar" style="width:48px"></div></td></tr>
        <tr><td><code>--space-16</code></td><td>4rem</td><td>64</td><td><div class="spacing-bar" style="width:64px"></div></td></tr>
        <tr><td><code>--space-20</code></td><td>5rem</td><td>80</td><td><div class="spacing-bar" style="width:80px"></div></td></tr>
        <tr><td><code>--space-24</code></td><td>6rem</td><td>96</td><td><div class="spacing-bar" style="width:96px"></div></td></tr>
        <tr><td><code>--space-32</code></td><td>8rem</td><td>128</td><td><div class="spacing-bar" style="width:128px"></div></td></tr>
      </tbody>
    </table>
  </div>

  <hr class="divider">

  <!-- ══ 7. COMPOSANTS UI ══ -->
  <div class="section">
    <div class="section-eyebrow">07 — COMPOSANTS UI</div>
    <div class="section-heading">La bibliothèque visuelle</div>

    <div class="comp-demo">
      <div class="comp-label">► BOUTONS — 5 VARIANTES + 3 TAILLES</div>
      <div class="btn-row" style="margin-bottom:1rem">
        <button class="btn btn-primary">Découvrir</button>
        <button class="btn btn-secondary">Filtres avancés</button>
        <button class="btn btn-ghost">Voir plus</button>
        <button class="btn btn-yellow">★ Favori</button>
        <button class="btn btn-pixel">START ►</button>
      </div>
      <div class="btn-row">
        <button class="btn btn-primary btn-sm">Small</button>
        <button class="btn btn-primary">Default</button>
        <button class="btn btn-primary btn-lg">Large</button>
      </div>
    </div>

    <div class="comp-demo">
      <div class="comp-label">► BARRE DE RECHERCHE — COMPOSANT CENTRAL</div>
      <div class="search-demo">
        <span class="search-icon">🔍</span>
        <input class="search-input" placeholder="Rechercher un Pokémon, un type…">
        <span class="search-kbd">⌘K</span>
      </div>
      <p style="font-size:.75rem;color:var(--muted);margin-top:.75rem;font-weight:300">Focus → border-color passe à var(--red). Raccourci clavier visible en permanence.</p>
    </div>

    <div class="comp-demo">
      <div class="comp-label">► CARTES POKÉMON — GRILLE 4 COLONNES DESKTOP</div>
      <div class="cards-row">
        <div class="poke-card active-green" style="--active:#78C850">
          <span class="poke-num">#001</span>
          <span class="poke-emoji">🌱</span>
          <div class="poke-name">Bulbizarre</div>
          <div class="poke-types">
            <span class="type-badge" style="background:#78C850;color:#fff;font-size:.6rem;padding:.2rem .55rem">Plante</span>
            <span class="type-badge" style="background:#A040A0;color:#fff;font-size:.6rem;padding:.2rem .55rem">Poison</span>
          </div>
        </div>
        <div class="poke-card active-red" style="border-color:rgba(204,0,0,0.35)">
          <span class="poke-num">#004</span>
          <span class="poke-emoji">🔥</span>
          <div class="poke-name">Salamèche</div>
          <div class="poke-types">
            <span class="type-badge" style="background:#F08030;color:#fff;font-size:.6rem;padding:.2rem .55rem">Feu</span>
          </div>
        </div>
        <div class="poke-card active-blue" style="border-color:rgba(104,144,240,0.35)">
          <span class="poke-num">#007</span>
          <span class="poke-emoji">💧</span>
          <div class="poke-name">Carapuce</div>
          <div class="poke-types">
            <span class="type-badge" style="background:#6890F0;color:#fff;font-size:.6rem;padding:.2rem .55rem">Eau</span>
          </div>
        </div>
        <div class="poke-card active-yellow" style="border-color:rgba(255,203,5,0.4)">
          <span class="poke-num">#025</span>
          <span class="poke-emoji">⚡</span>
          <div class="poke-name">Pikachu</div>
          <div class="poke-types">
            <span class="type-badge" style="background:#F8D030;color:#000;font-size:.6rem;padding:.2rem .55rem">Électrik</span>
          </div>
        </div>
      </div>
    </div>

    <div class="comp-demo" style="background:var(--void)">
      <div class="comp-label">► EXEMPLES DE TYPE BADGES EN CONTEXTE</div>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center">
        <span class="type-badge" style="background:#F08030;color:#fff">Feu</span>
        <span class="type-badge" style="background:#6890F0;color:#fff">Eau</span>
        <span class="type-badge" style="background:#78C850;color:#fff">Plante</span>
        <span class="type-badge" style="background:#7038F8;color:#fff">Dragon</span>
        <span class="type-badge" style="background:#EE99AC;color:#000">Fée</span>
        <span style="font-size:.78rem;color:var(--muted);font-weight:300">← Toujours en UPPERCASE, font-weight 600, Outfit</span>
      </div>
    </div>

    <!-- NAVBAR -->
    <div class="comp-demo" style="padding:0;overflow:hidden">
      <div class="comp-label" style="padding:1.5rem 2rem .5rem">► NAVIGATION — BARRE PRINCIPALE</div>
      <nav style="
        display:flex; align-items:center; justify-content:space-between;
        padding:.9rem 2rem; background:rgba(10,10,10,0.95);
        border-top:1px solid var(--border); border-bottom:1px solid var(--border);
        backdrop-filter:blur(8px);
      ">
        <div style="display:flex;align-items:center;gap:1.5rem">
          <span style="font-family:var(--font-pixel);font-size:.65rem;color:var(--white);text-shadow:0 0 20px rgba(204,0,0,.7)">POKEDEX</span>
          <div style="width:1px;height:18px;background:var(--border)"></div>
          <div style="display:flex;gap:.25rem">
            <a style="font-size:.82rem;color:var(--white);text-decoration:none;padding:.4rem .85rem;background:rgba(204,0,0,0.15);border:1px solid rgba(204,0,0,0.4);font-weight:600">Encyclopédie</a>
            <a style="font-size:.82rem;color:var(--subtle);text-decoration:none;padding:.4rem .85rem;font-weight:500">Générations</a>
            <a style="font-size:.82rem;color:var(--subtle);text-decoration:none;padding:.4rem .85rem;font-weight:500">Types</a>
            <a style="font-size:.82rem;color:var(--subtle);text-decoration:none;padding:.4rem .85rem;font-weight:500">Comparateur</a>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:.75rem">
          <div style="
            display:flex;align-items:center;gap:.6rem;
            background:var(--dark);border:1px solid var(--border);
            padding:.4rem .85rem; width:220px;
          ">
            <span style="color:var(--muted);font-size:.85rem">🔍</span>
            <span style="font-size:.78rem;color:var(--muted)">Rechercher…</span>
            <span style="margin-left:auto;font-size:.6rem;color:var(--muted);border:1px solid var(--border);padding:.1rem .35rem">⌘K</span>
          </div>
          <button style="background:var(--red);color:#fff;border:none;padding:.45rem 1rem;font-family:var(--font-ui);font-size:.8rem;font-weight:600;cursor:pointer">Mes favoris</button>
        </div>
      </nav>
      <p style="font-size:.72rem;color:var(--muted);padding:.75rem 2rem 1.25rem;font-weight:300">Lien actif : fond rgba(rouge,.15) + bordure rouge. Autres liens : color:var(--subtle) → var(--white) au hover. Position sticky top:0, backdrop-filter blur.</p>
    </div>

    <!-- FICHE POKÉMON COMPLÈTE -->
    <div class="comp-demo" style="padding:0;overflow:hidden">
      <div class="comp-label" style="padding:1.5rem 2rem .5rem">► FICHE POKÉMON — PAGE DÉTAIL COMPLÈTE</div>
      <div style="display:grid;grid-template-columns:340px 1fr;gap:0;border-top:1px solid var(--border)">

        <!-- Panneau gauche -->
        <div style="background:var(--void);border-right:1px solid var(--border);padding:2.5rem 2rem;display:flex;flex-direction:column;align-items:center;gap:1.25rem;position:relative;overflow:hidden">
          <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%, rgba(240,128,48,0.12), transparent 65%);pointer-events:none"></div>
          <span style="font-family:var(--font-pixel);font-size:.48rem;color:var(--muted);letter-spacing:.12em;z-index:1">#004 — GÉNÉRATION I</span>
          <div style="font-size:8rem;line-height:1;z-index:1;filter:drop-shadow(0 0 30px rgba(240,128,48,0.4))">🦎</div>
          <div style="font-family:var(--font-pixel);font-size:.9rem;color:var(--white);z-index:1;letter-spacing:.06em">SALAMÈCHE</div>
          <div style="display:flex;gap:.5rem;z-index:1">
            <span class="type-badge" style="background:#F08030;color:#fff;font-size:.68rem">Feu</span>
          </div>
          <div style="width:100%;border-top:1px solid var(--border);padding-top:1.25rem;z-index:1">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;text-align:center">
              <div style="background:var(--dark);padding:.85rem">
                <div style="font-family:var(--font-pixel);font-size:.38rem;color:var(--muted);margin-bottom:.4rem">TAILLE</div>
                <div style="font-size:1.1rem;font-weight:700">0.6 m</div>
              </div>
              <div style="background:var(--dark);padding:.85rem">
                <div style="font-family:var(--font-pixel);font-size:.38rem;color:var(--muted);margin-bottom:.4rem">POIDS</div>
                <div style="font-size:1.1rem;font-weight:700">8.5 kg</div>
              </div>
              <div style="background:var(--dark);padding:.85rem">
                <div style="font-family:var(--font-pixel);font-size:.38rem;color:var(--muted);margin-bottom:.4rem">TALENT</div>
                <div style="font-size:.78rem;font-weight:600;color:var(--light)">Brasier</div>
              </div>
              <div style="background:var(--dark);padding:.85rem">
                <div style="font-family:var(--font-pixel);font-size:.38rem;color:var(--muted);margin-bottom:.4rem">TAUX CAPTURE</div>
                <div style="font-size:1.1rem;font-weight:700;color:var(--yellow)">45</div>
              </div>
            </div>
          </div>
          <button style="width:100%;background:rgba(255,203,5,0.1);border:1px solid rgba(255,203,5,0.35);color:var(--yellow);font-family:var(--font-ui);font-weight:600;font-size:.82rem;padding:.75rem;cursor:pointer;z-index:1">★ Ajouter aux favoris</button>
        </div>

        <!-- Panneau droit -->
        <div style="padding:2rem 2.25rem;display:flex;flex-direction:column;gap:2rem">

          <!-- Description -->
          <div>
            <div style="font-family:var(--font-pixel);font-size:.42rem;color:var(--red-bright);letter-spacing:.12em;margin-bottom:.75rem">► DESCRIPTION</div>
            <p style="font-size:.9rem;color:var(--light);line-height:1.85;font-weight:300;border-left:2px solid var(--red);padding-left:1rem">
              La flamme au bout de sa queue est un indicateur de son état de santé. Elle brûle intensément lorsqu'il est en bonne santé et s'éteint s'il venait à mourir.
            </p>
          </div>

          <!-- Barres de stats -->
          <div>
            <div style="font-family:var(--font-pixel);font-size:.42rem;color:var(--red-bright);letter-spacing:.12em;margin-bottom:1rem">► STATISTIQUES DE BASE</div>
            <div style="display:flex;flex-direction:column;gap:.6rem">
              <!-- stat row macro -->
              <div style="display:grid;grid-template-columns:120px 40px 1fr 45px;align-items:center;gap:.75rem">
                <span style="font-size:.72rem;color:var(--subtle);font-weight:500">PV</span>
                <span style="font-size:.8rem;font-weight:700;text-align:right">39</span>
                <div style="height:6px;background:var(--border);position:relative">
                  <div style="position:absolute;inset:0;width:25.5%;background:#FF5959"></div>
                </div>
                <span style="font-size:.65rem;color:var(--muted);text-align:right">/ 255</span>
              </div>
              <div style="display:grid;grid-template-columns:120px 40px 1fr 45px;align-items:center;gap:.75rem">
                <span style="font-size:.72rem;color:var(--subtle);font-weight:500">Attaque</span>
                <span style="font-size:.8rem;font-weight:700;text-align:right">52</span>
                <div style="height:6px;background:var(--border);position:relative">
                  <div style="position:absolute;inset:0;width:34.1%;background:#F08030"></div>
                </div>
                <span style="font-size:.65rem;color:var(--muted);text-align:right">/ 255</span>
              </div>
              <div style="display:grid;grid-template-columns:120px 40px 1fr 45px;align-items:center;gap:.75rem">
                <span style="font-size:.72rem;color:var(--subtle);font-weight:500">Défense</span>
                <span style="font-size:.8rem;font-weight:700;text-align:right">43</span>
                <div style="height:6px;background:var(--border);position:relative">
                  <div style="position:absolute;inset:0;width:28.2%;background:#F8D030"></div>
                </div>
                <span style="font-size:.65rem;color:var(--muted);text-align:right">/ 255</span>
              </div>
              <div style="display:grid;grid-template-columns:120px 40px 1fr 45px;align-items:center;gap:.75rem">
                <span style="font-size:.72rem;color:var(--subtle);font-weight:500">Att. Spé.</span>
                <span style="font-size:.8rem;font-weight:700;text-align:right">60</span>
                <div style="height:6px;background:var(--border);position:relative">
                  <div style="position:absolute;inset:0;width:39.2%;background:#6890F0"></div>
                </div>
                <span style="font-size:.65rem;color:var(--muted);text-align:right">/ 255</span>
              </div>
              <div style="display:grid;grid-template-columns:120px 40px 1fr 45px;align-items:center;gap:.75rem">
                <span style="font-size:.72rem;color:var(--subtle);font-weight:500">Déf. Spé.</span>
                <span style="font-size:.8rem;font-weight:700;text-align:right">50</span>
                <div style="height:6px;background:var(--border);position:relative">
                  <div style="position:absolute;inset:0;width:32.7%;background:#78C850"></div>
                </div>
                <span style="font-size:.65rem;color:var(--muted);text-align:right">/ 255</span>
              </div>
              <div style="display:grid;grid-template-columns:120px 40px 1fr 45px;align-items:center;gap:.75rem">
                <span style="font-size:.72rem;color:var(--subtle);font-weight:500">Vitesse</span>
                <span style="font-size:.8rem;font-weight:700;text-align:right;color:var(--yellow)">65</span>
                <div style="height:6px;background:var(--border);position:relative">
                  <div style="position:absolute;inset:0;width:42.5%;background:var(--yellow)"></div>
                </div>
                <span style="font-size:.65rem;color:var(--muted);text-align:right">/ 255</span>
              </div>
              <div style="margin-top:.5rem;padding-top:.75rem;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:.72rem;color:var(--muted)">Total</span>
                <span style="font-size:1rem;font-weight:700;color:var(--white)">309</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- CHAÎNE D'ÉVOLUTION -->
    <div class="comp-demo">
      <div class="comp-label">► CHAÎNE D'ÉVOLUTION</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:0;flex-wrap:wrap">

        <div style="text-align:center;padding:1.5rem 2rem">
          <div style="font-size:3.5rem;margin-bottom:.75rem;filter:drop-shadow(0 0 15px rgba(240,128,48,0.3))">🦎</div>
          <div style="font-family:var(--font-pixel);font-size:.42rem;color:var(--muted);margin-bottom:.25rem">#004</div>
          <div style="font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Salamèche</div>
          <div style="margin-top:.5rem"><span class="type-badge" style="background:#F08030;color:#fff;font-size:.58rem;padding:.15rem .5rem">Feu</span></div>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;gap:.35rem;padding:0 .5rem">
          <div style="width:48px;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent)"></div>
          <div style="font-family:var(--font-pixel);font-size:.38rem;color:var(--muted);text-align:center;line-height:1.8">Niv. 16</div>
          <div style="font-size:1.2rem;color:var(--red-bright)">→</div>
        </div>

        <div style="text-align:center;padding:1.5rem 2rem;border:1px solid rgba(204,0,0,0.3);background:rgba(204,0,0,0.05)">
          <div style="font-size:3.5rem;margin-bottom:.75rem;filter:drop-shadow(0 0 20px rgba(204,0,0,0.45))">🐉</div>
          <div style="font-family:var(--font-pixel);font-size:.42rem;color:var(--red-bright);margin-bottom:.25rem">#005</div>
          <div style="font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Reptincel</div>
          <div style="margin-top:.5rem"><span class="type-badge" style="background:#F08030;color:#fff;font-size:.58rem;padding:.15rem .5rem">Feu</span></div>
        </div>

        <div style="display:flex;flex-direction:column;align-items:center;gap:.35rem;padding:0 .5rem">
          <div style="width:48px;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent)"></div>
          <div style="font-family:var(--font-pixel);font-size:.38rem;color:var(--muted);text-align:center;line-height:1.8">Niv. 36</div>
          <div style="font-size:1.2rem;color:var(--red-bright)">→</div>
        </div>

        <div style="text-align:center;padding:1.5rem 2rem">
          <div style="font-size:3.5rem;margin-bottom:.75rem;filter:drop-shadow(0 0 15px rgba(240,128,48,0.3))">🔥</div>
          <div style="font-family:var(--font-pixel);font-size:.42rem;color:var(--muted);margin-bottom:.25rem">#006</div>
          <div style="font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Dracaufeu</div>
          <div style="margin-top:.5rem;display:flex;gap:.3rem;justify-content:center">
            <span class="type-badge" style="background:#F08030;color:#fff;font-size:.58rem;padding:.15rem .5rem">Feu</span>
            <span class="type-badge" style="background:#A890F0;color:#fff;font-size:.58rem;padding:.15rem .5rem">Vol</span>
          </div>
        </div>

      </div>
      <p style="font-size:.72rem;color:var(--muted);margin-top:1rem;text-align:center;font-weight:300">L'évolution active = encadrée avec border var(--red) + fond rgba. Les inactives restent sans décoration.</p>
    </div>

    <!-- TABS / FILTRES -->
    <div class="comp-demo">
      <div class="comp-label">► TABS & FILTRES PAR GÉNÉRATION</div>
      <div style="display:flex;flex-direction:column;gap:1.5rem">

        <!-- Onglets principaux -->
        <div>
          <div style="font-size:.7rem;color:var(--muted);margin-bottom:.6rem;font-weight:300">Navigation par onglets — page fiche</div>
          <div style="display:flex;border-bottom:1px solid var(--border)">
            <button style="font-family:var(--font-ui);font-size:.82rem;font-weight:600;color:var(--white);padding:.7rem 1.25rem;background:transparent;border:none;border-bottom:2px solid var(--red);cursor:pointer;margin-bottom:-1px">Stats</button>
            <button style="font-family:var(--font-ui);font-size:.82rem;font-weight:500;color:var(--muted);padding:.7rem 1.25rem;background:transparent;border:none;cursor:pointer">Attaques</button>
            <button style="font-family:var(--font-ui);font-size:.82rem;font-weight:500;color:var(--muted);padding:.7rem 1.25rem;background:transparent;border:none;cursor:pointer">Évolutions</button>
            <button style="font-family:var(--font-ui);font-size:.82rem;font-weight:500;color:var(--muted);padding:.7rem 1.25rem;background:transparent;border:none;cursor:pointer">Localisation</button>
            <button style="font-family:var(--font-ui);font-size:.82rem;font-weight:500;color:var(--muted);padding:.7rem 1.25rem;background:transparent;border:none;cursor:pointer">Sprite history</button>
          </div>
        </div>

        <!-- Filtres génération -->
        <div>
          <div style="font-size:.7rem;color:var(--muted);margin-bottom:.6rem;font-weight:300">Filtres par génération — page encyclopédie</div>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap">
            <button style="font-family:var(--font-ui);font-size:.75rem;font-weight:600;background:var(--red);color:#fff;border:1px solid var(--red);padding:.4rem .9rem;cursor:pointer">Toutes (1025)</button>
            <button style="font-family:var(--font-ui);font-size:.75rem;font-weight:500;background:transparent;color:var(--subtle);border:1px solid var(--border);padding:.4rem .9rem;cursor:pointer">Gen I · 151</button>
            <button style="font-family:var(--font-ui);font-size:.75rem;font-weight:500;background:transparent;color:var(--subtle);border:1px solid var(--border);padding:.4rem .9rem;cursor:pointer">Gen II · 100</button>
            <button style="font-family:var(--font-ui);font-size:.75rem;font-weight:500;background:transparent;color:var(--subtle);border:1px solid var(--border);padding:.4rem .9rem;cursor:pointer">Gen III · 135</button>
            <button style="font-family:var(--font-ui);font-size:.75rem;font-weight:500;background:transparent;color:var(--subtle);border:1px solid var(--border);padding:.4rem .9rem;cursor:pointer">Gen IV · 107</button>
            <button style="font-family:var(--font-ui);font-size:.75rem;font-weight:500;background:transparent;color:var(--subtle);border:1px solid var(--border);padding:.4rem .9rem;cursor:pointer">Gen V · 156</button>
            <button style="font-family:var(--font-ui);font-size:.75rem;font-weight:500;background:transparent;color:var(--subtle);border:1px solid var(--border);padding:.4rem .9rem;cursor:pointer">Gen VI+</button>
          </div>
        </div>

        <!-- Filtres type -->
        <div>
          <div style="font-size:.7rem;color:var(--muted);margin-bottom:.6rem;font-weight:300">Filtres par type</div>
          <div style="display:flex;gap:.4rem;flex-wrap:wrap">
            <span style="font-size:.72rem;font-weight:600;padding:.3rem .7rem;background:rgba(240,128,48,0.15);border:1px solid rgba(240,128,48,0.5);color:#F08030;cursor:pointer">🔥 Feu</span>
            <span style="font-size:.72rem;font-weight:600;padding:.3rem .7rem;background:transparent;border:1px solid var(--border);color:var(--muted);cursor:pointer">💧 Eau</span>
            <span style="font-size:.72rem;font-weight:600;padding:.3rem .7rem;background:transparent;border:1px solid var(--border);color:var(--muted);cursor:pointer">🌿 Plante</span>
            <span style="font-size:.72rem;font-weight:600;padding:.3rem .7rem;background:transparent;border:1px solid var(--border);color:var(--muted);cursor:pointer">⚡ Électrik</span>
            <span style="font-size:.72rem;font-weight:600;padding:.3rem .7rem;background:transparent;border:1px solid var(--border);color:var(--muted);cursor:pointer">🐉 Dragon</span>
            <span style="font-size:.72rem;font-weight:600;padding:.3rem .7rem;background:transparent;border:1px solid var(--border);color:var(--muted);cursor:pointer">+ 13 types</span>
          </div>
        </div>
      </div>
    </div>

    <!-- TABLEAU DE FAIBLESSES -->
    <div class="comp-demo">
      <div class="comp-label">► TABLEAU DE FAIBLESSES TYPOLOGIQUES — Composant stratégique (Le Stratège)</div>
      <div style="font-size:.8rem;color:var(--subtle);margin-bottom:1.25rem;font-weight:300">Dracaufeu (Feu / Vol) — Multiplicateurs de dégâts reçus</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:.5rem">
        <div style="text-align:center;padding:.6rem .4rem;background:rgba(204,0,0,0.18);border:1px solid rgba(204,0,0,0.4)">
          <div style="font-size:.6rem;color:var(--light);font-weight:600;margin-bottom:.2rem">Roche</div>
          <div style="font-family:var(--font-pixel);font-size:.55rem;color:var(--red-bright)">×4</div>
        </div>
        <div style="text-align:center;padding:.6rem .4rem;background:rgba(104,144,240,0.15);border:1px solid rgba(104,144,240,0.35)">
          <div style="font-size:.6rem;color:var(--light);font-weight:600;margin-bottom:.2rem">Eau</div>
          <div style="font-family:var(--font-pixel);font-size:.55rem;color:#6890F0">×2</div>
        </div>
        <div style="text-align:center;padding:.6rem .4rem;background:rgba(104,144,240,0.15);border:1px solid rgba(104,144,240,0.35)">
          <div style="font-size:.6rem;color:var(--light);font-weight:600;margin-bottom:.2rem">Électrik</div>
          <div style="font-family:var(--font-pixel);font-size:.55rem;color:#6890F0">×2</div>
        </div>
        <div style="text-align:center;padding:.6rem .4rem;background:rgba(168,56,40,0.15);border:1px solid rgba(168,56,40,0.35)">
          <div style="font-size:.6rem;color:var(--light);font-weight:600;margin-bottom:.2rem">Feu</div>
          <div style="font-family:var(--font-pixel);font-size:.55rem;color:#A83828">×½</div>
        </div>
        <div style="text-align:center;padding:.6rem .4rem;background:rgba(168,56,40,0.15);border:1px solid rgba(168,56,40,0.35)">
          <div style="font-size:.6rem;color:var(--light);font-weight:600;margin-bottom:.2rem">Plante</div>
          <div style="font-family:var(--font-pixel);font-size:.55rem;color:#A83828">×¼</div>
        </div>
        <div style="text-align:center;padding:.6rem .4rem;background:rgba(168,56,40,0.15);border:1px solid rgba(168,56,40,0.35)">
          <div style="font-size:.6rem;color:var(--light);font-weight:600;margin-bottom:.2rem">Insecte</div>
          <div style="font-family:var(--font-pixel);font-size:.55rem;color:#A83828">×¼</div>
        </div>
        <div style="text-align:center;padding:.6rem .4rem;background:rgba(0,0,0,0.4);border:1px solid var(--border)">
          <div style="font-size:.6rem;color:var(--light);font-weight:600;margin-bottom:.2rem">Sol</div>
          <div style="font-family:var(--font-pixel);font-size:.55rem;color:var(--muted)">×0</div>
        </div>
        <div style="text-align:center;padding:.6rem .4rem;background:rgba(168,168,120,0.1);border:1px solid rgba(168,168,120,0.25)">
          <div style="font-size:.6rem;color:var(--light);font-weight:600;margin-bottom:.2rem">Normal</div>
          <div style="font-family:var(--font-pixel);font-size:.55rem;color:var(--subtle)">×1</div>
        </div>
      </div>
      <div style="margin-top:1rem;display:flex;gap:1rem;flex-wrap:wrap">
        <span style="font-size:.7rem;display:flex;align-items:center;gap:.35rem;color:var(--subtle)"><span style="display:inline-block;width:10px;height:10px;background:rgba(204,0,0,0.5);border:1px solid var(--red)"></span>Faiblesse ×2 ou ×4</span>
        <span style="font-size:.7rem;display:flex;align-items:center;gap:.35rem;color:var(--subtle)"><span style="display:inline-block;width:10px;height:10px;background:rgba(168,56,40,0.4);border:1px solid #A83828"></span>Résistance ×½ ou ×¼</span>
        <span style="font-size:.7rem;display:flex;align-items:center;gap:.35rem;color:var(--subtle)"><span style="display:inline-block;width:10px;height:10px;background:rgba(0,0,0,0.4);border:1px solid var(--border)"></span>Immunité ×0</span>
      </div>
    </div>

    <!-- NOTIFICATIONS / TOASTS -->
    <div class="comp-demo">
      <div class="comp-label">► TOASTS & NOTIFICATIONS SYSTÈME</div>
      <div style="display:flex;flex-direction:column;gap:.6rem;max-width:420px">
        <div style="display:flex;align-items:center;gap:.85rem;padding:.85rem 1.1rem;background:var(--dark);border:1px solid rgba(78,196,81,0.4);border-left:3px solid #4EC451">
          <span style="font-size:1rem">✓</span>
          <div>
            <div style="font-size:.82rem;font-weight:600;color:var(--white)">Salamèche ajouté aux favoris</div>
            <div style="font-size:.7rem;color:var(--muted);margin-top:.1rem">Retrouvez-le dans votre collection</div>
          </div>
          <span style="margin-left:auto;color:var(--muted);font-size:.75rem;cursor:pointer">✕</span>
        </div>
        <div style="display:flex;align-items:center;gap:.85rem;padding:.85rem 1.1rem;background:var(--dark);border:1px solid rgba(204,0,0,0.4);border-left:3px solid var(--red)">
          <span style="font-size:1rem">⚠</span>
          <div>
            <div style="font-size:.82rem;font-weight:600;color:var(--white)">Pokémon non trouvé</div>
            <div style="font-size:.7rem;color:var(--muted);margin-top:.1rem">Vérifiez l'orthographe ou le numéro</div>
          </div>
          <span style="margin-left:auto;color:var(--muted);font-size:.75rem;cursor:pointer">✕</span>
        </div>
        <div style="display:flex;align-items:center;gap:.85rem;padding:.85rem 1.1rem;background:var(--dark);border:1px solid rgba(59,76,202,0.4);border-left:3px solid var(--blue)">
          <span style="font-size:1rem">ℹ</span>
          <div>
            <div style="font-size:.82rem;font-weight:600;color:var(--white)">Nouvelle génération disponible</div>
            <div style="font-size:.7rem;color:var(--muted);margin-top:.1rem">Gen IX · 120 nouveaux Pokémon ajoutés</div>
          </div>
          <span style="margin-left:auto;color:var(--muted);font-size:.75rem;cursor:pointer">✕</span>
        </div>
      </div>
    </div>

    <!-- PAGINATION -->
    <div class="comp-demo">
      <div class="comp-label">► PAGINATION — NAVIGATION ENCYCLOPÉDIE</div>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem">
        <span style="font-size:.78rem;color:var(--muted);font-weight:300">Affichage de <strong style="color:var(--white)">1–48</strong> sur <strong style="color:var(--white)">1025</strong> Pokémon</span>
        <div style="display:flex;gap:2px">
          <button style="width:36px;height:36px;background:transparent;border:1px solid var(--border);color:var(--muted);cursor:pointer;font-size:.85rem;display:flex;align-items:center;justify-content:center">←</button>
          <button style="width:36px;height:36px;background:var(--red);border:1px solid var(--red);color:#fff;cursor:pointer;font-size:.82rem;font-weight:700;display:flex;align-items:center;justify-content:center">1</button>
          <button style="width:36px;height:36px;background:transparent;border:1px solid var(--border);color:var(--subtle);cursor:pointer;font-size:.82rem;display:flex;align-items:center;justify-content:center">2</button>
          <button style="width:36px;height:36px;background:transparent;border:1px solid var(--border);color:var(--subtle);cursor:pointer;font-size:.82rem;display:flex;align-items:center;justify-content:center">3</button>
          <button style="width:36px;height:36px;background:transparent;border:1px solid var(--border);color:var(--muted);cursor:pointer;font-size:.82rem;display:flex;align-items:center;justify-content:center">…</button>
          <button style="width:36px;height:36px;background:transparent;border:1px solid var(--border);color:var(--subtle);cursor:pointer;font-size:.82rem;display:flex;align-items:center;justify-content:center">22</button>
          <button style="width:36px;height:36px;background:transparent;border:1px solid var(--border);color:var(--muted);cursor:pointer;font-size:.85rem;display:flex;align-items:center;justify-content:center">→</button>
        </div>
      </div>
    </div>

    <!-- EMPTY STATE & LOADING -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
      <div class="comp-demo" style="text-align:center">
        <div class="comp-label" style="text-align:left">► ÉTAT VIDE — AUCUN RÉSULTAT</div>
        <div style="padding:2rem 0">
          <div style="font-family:var(--font-pixel);font-size:1.8rem;color:var(--border-light);margin-bottom:1.25rem;line-height:1.6">?</div>
          <div style="font-size:.95rem;font-weight:600;color:var(--light);margin-bottom:.5rem">Aucun Pokémon trouvé</div>
          <div style="font-size:.78rem;color:var(--muted);line-height:1.75;margin-bottom:1.25rem">Il n'existe aucun Pokémon correspondant<br>à votre recherche "Pikachuu"</div>
          <button style="background:transparent;border:1px solid var(--border);color:var(--subtle);padding:.55rem 1.2rem;font-family:var(--font-ui);font-size:.8rem;cursor:pointer">Effacer les filtres</button>
        </div>
      </div>

      <div class="comp-demo" style="text-align:center">
        <div class="comp-label" style="text-align:left">► ÉTAT DE CHARGEMENT — SKELETON</div>
        <div style="display:flex;flex-direction:column;gap:.75rem;padding:.5rem 0">
          <div style="display:flex;gap:1rem;align-items:center">
            <div style="width:52px;height:52px;background:linear-gradient(90deg,var(--border) 25%,var(--border-light) 50%,var(--border) 75%);flex-shrink:0"></div>
            <div style="flex:1;display:flex;flex-direction:column;gap:.4rem">
              <div style="height:10px;background:linear-gradient(90deg,var(--border) 25%,var(--border-light) 50%,var(--border) 75%);width:60%"></div>
              <div style="height:8px;background:linear-gradient(90deg,var(--border) 25%,var(--border-light) 50%,var(--border) 75%);width:35%"></div>
            </div>
          </div>
          <div style="display:flex;gap:1rem;align-items:center">
            <div style="width:52px;height:52px;background:linear-gradient(90deg,var(--border) 25%,var(--border-light) 50%,var(--border) 75%);flex-shrink:0"></div>
            <div style="flex:1;display:flex;flex-direction:column;gap:.4rem">
              <div style="height:10px;background:linear-gradient(90deg,var(--border) 25%,var(--border-light) 50%,var(--border) 75%);width:75%"></div>
              <div style="height:8px;background:linear-gradient(90deg,var(--border) 25%,var(--border-light) 50%,var(--border) 75%);width:42%"></div>
            </div>
          </div>
          <div style="display:flex;gap:1rem;align-items:center">
            <div style="width:52px;height:52px;background:linear-gradient(90deg,var(--border) 25%,var(--border-light) 50%,var(--border) 75%);flex-shrink:0"></div>
            <div style="flex:1;display:flex;flex-direction:column;gap:.4rem">
              <div style="height:10px;background:linear-gradient(90deg,var(--border) 25%,var(--border-light) 50%,var(--border) 75%);width:50%"></div>
              <div style="height:8px;background:linear-gradient(90deg,var(--border) 25%,var(--border-light) 50%,var(--border) 75%);width:28%"></div>
            </div>
          </div>
          <div style="font-size:.7rem;color:var(--muted);margin-top:.5rem;font-weight:300">Animation shimmer : background-position left→right, 1.5s infini</div>
        </div>
      </div>
    </div>

    <!-- MODAL / OVERLAY -->
    <div class="comp-demo" style="padding:0;overflow:hidden">
      <div class="comp-label" style="padding:1.5rem 2rem .5rem">► MODAL — COMPARATEUR DE POKÉMON</div>
      <div style="background:rgba(0,0,0,0.7);padding:2.5rem;display:flex;justify-content:center;border-top:1px solid var(--border)">
        <div style="background:var(--deep);border:1px solid var(--border);width:100%;max-width:640px">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid var(--border)">
            <div style="font-family:var(--font-pixel);font-size:.52rem;color:var(--white);letter-spacing:.08em">COMPARATEUR</div>
            <button style="background:transparent;border:none;color:var(--muted);cursor:pointer;font-size:.85rem;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)">✕</button>
          </div>
          <div style="padding:1.75rem 1.5rem;display:grid;grid-template-columns:1fr auto 1fr;gap:1.5rem;align-items:center">
            <div style="text-align:center;background:var(--dark);padding:1.25rem;border:1px solid rgba(104,144,240,0.3)">
              <div style="font-size:2.8rem;margin-bottom:.5rem">💧</div>
              <div style="font-family:var(--font-pixel);font-size:.4rem;color:var(--muted);margin-bottom:.25rem">#007</div>
              <div style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Carapuce</div>
              <div style="margin-top:.5rem"><span style="background:#6890F0;color:#fff;font-size:.58rem;padding:.15rem .45rem;font-weight:600">Eau</span></div>
              <div style="margin-top:1rem;text-align:left;display:flex;flex-direction:column;gap:.35rem">
                <div style="display:flex;justify-content:space-between;font-size:.72rem"><span style="color:var(--muted)">PV</span><span style="font-weight:700">45</span></div>
                <div style="display:flex;justify-content:space-between;font-size:.72rem"><span style="color:var(--muted)">Attaque</span><span style="font-weight:700">48</span></div>
                <div style="display:flex;justify-content:space-between;font-size:.72rem"><span style="color:var(--muted)">Défense</span><span style="font-weight:700;color:var(--yellow)">65</span></div>
                <div style="display:flex;justify-content:space-between;font-size:.72rem"><span style="color:var(--muted)">Vitesse</span><span style="font-weight:700">43</span></div>
                <div style="margin-top:.35rem;padding-top:.5rem;border-top:1px solid var(--border);display:flex;justify-content:space-between;font-size:.78rem"><span style="color:var(--muted)">Total</span><span style="font-weight:700">314</span></div>
              </div>
            </div>
            <div style="font-family:var(--font-pixel);font-size:.5rem;color:var(--red-bright);text-align:center;line-height:2">VS</div>
            <div style="text-align:center;background:var(--dark);padding:1.25rem;border:1px solid rgba(240,128,48,0.3)">
              <div style="font-size:2.8rem;margin-bottom:.5rem">🦎</div>
              <div style="font-family:var(--font-pixel);font-size:.4rem;color:var(--muted);margin-bottom:.25rem">#004</div>
              <div style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Salamèche</div>
              <div style="margin-top:.5rem"><span style="background:#F08030;color:#fff;font-size:.58rem;padding:.15rem .45rem;font-weight:600">Feu</span></div>
              <div style="margin-top:1rem;text-align:left;display:flex;flex-direction:column;gap:.35rem">
                <div style="display:flex;justify-content:space-between;font-size:.72rem"><span style="color:var(--muted)">PV</span><span style="font-weight:700">39</span></div>
                <div style="display:flex;justify-content:space-between;font-size:.72rem"><span style="color:var(--muted)">Attaque</span><span style="font-weight:700;color:var(--yellow)">52</span></div>
                <div style="display:flex;justify-content:space-between;font-size:.72rem"><span style="color:var(--muted)">Défense</span><span style="font-weight:700">43</span></div>
                <div style="display:flex;justify-content:space-between;font-size:.72rem"><span style="color:var(--muted)">Vitesse</span><span style="font-weight:700;color:var(--yellow)">65</span></div>
                <div style="margin-top:.35rem;padding-top:.5rem;border-top:1px solid var(--border);display:flex;justify-content:space-between;font-size:.78rem"><span style="color:var(--muted)">Total</span><span style="font-weight:700">309</span></div>
              </div>
            </div>
          </div>
          <div style="padding:1rem 1.5rem;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:.75rem">
            <button style="background:transparent;border:1px solid var(--border);color:var(--subtle);padding:.55rem 1.2rem;font-family:var(--font-ui);font-size:.8rem;cursor:pointer">Réinitialiser</button>
            <button style="background:var(--red);border:none;color:#fff;padding:.55rem 1.2rem;font-family:var(--font-ui);font-size:.8rem;font-weight:600;cursor:pointer">Comparer les attaques →</button>
          </div>
        </div>
      </div>
    </div>

  </div>

  <hr class="divider">

  <!-- ══ 8. RÈGLES DE DESIGN ══ -->
  <div class="section">
    <div class="section-eyebrow">08 — RÈGLES DE DESIGN</div>
    <div class="section-heading">Contraintes & Principes</div>
    <p class="section-desc">Les règles qui assurent la cohérence visuelle et l'intégrité de l'identité sur tous les supports et toutes les pages.</p>

    <table class="data-table">
      <thead><tr><th style="width:26%">Règle</th><th>Détail & Raison</th></tr></thead>
      <tbody>
        <tr><td><strong>Dark mode obligatoire</strong></td><td>Fond #0A0A0A sur toutes les pages. Aucune section en fond blanc sauf éléments isolés (modals, overlays). Le dark mode évoque l'univers nocturne des dresseurs — c'est un signal d'appartenance culturelle.</td></tr>
        <tr><td><strong>Press Start 2P = affect symbolique uniquement</strong></td><td>Uniquement pour : logo, numéros Pokedex, labels de section pixel, badges système. Jamais pour corps de texte, boutons UI, ou navigation. Cette restriction préserve l'impact émotionnel de la police.</td></tr>
        <tr><td><strong>Rouge = signal d'action primaire</strong></td><td>#CC0000 réservé aux CTA principaux, border-top des cards actives, accents de navigation, éléments focus. Ne pas diluer avec des usages purement décoratifs.</td></tr>
        <tr><td><strong>Jaune = rareté & exception</strong></td><td>#FFCB05 réservé aux favoris, badges "Légendaire", étoiles, éléments sélectionnés actifs. Son utilisation rare lui confère sa valeur — le jaune ne doit jamais être banal.</td></tr>
        <tr><td><strong>Types = seule couleur plurielle</strong></td><td>Les 18 couleurs de types Pokémon sont les seules exceptions à la palette principale. Utilisées exclusivement comme indicateurs de type, jamais comme couleurs de décoration générique.</td></tr>
        <tr><td><strong>Radius sharp (0px)</strong></td><td>Zéro border-radius sur les cards, inputs et boutons standards. Rappel du pixel art Game Boy. Seuls les type badges acceptent 2px de radius pour la lisibilité.</td></tr>
        <tr><td><strong>Glow rouge sur les éléments hero</strong></td><td>text-shadow et box-shadow rouge sur les titres display Press Start 2P. Signature visuelle de la marque. Formule : <code>0 0 40px rgba(204,0,0,.8), 0 0 80px rgba(204,0,0,.4)</code></td></tr>
        <tr><td><strong>Grille 4 colonnes pour la liste</strong></td><td>4 colonnes desktop → 3 tablette → 2 mobile → 1 mobile portrait. Gap constant 1.25rem. Les cards Pokémon ne changent pas de taille — seul le nombre de colonnes change.</td></tr>
        <tr><td><strong>Scanlines comme texture d'atmosphère</strong></td><td>Overlay repeating-linear-gradient horizontal très subtil (opacity 3-4%) sur toute la page pour évoquer l'écran CRT/Game Boy. Ne doit jamais affecter la lisibilité.</td></tr>
        <tr><td><strong>Voix encyclopédique & passionnée</strong></td><td>Le ton est celui d'un expert qui partage sa passion. Précis dans les données, chaleureux dans les descriptions. Jamais froid ou purement technique. Jamais infantilisant pour Le Stratège.</td></tr>
        <tr><td><strong>Border-top coloré sur les cards actives</strong></td><td>Ligne de 2px en haut des cards Pokémon, colorée selon le type primaire. Remplace les effets de glow ou d'ombre — plus propre, plus pixel-art.</td></tr>
        <tr><td><strong>Border-left rouge sur les accents éditoriaux</strong></td><td>Bordure gauche de 2px var(--red) sur les blocs d'insight, citations, encadrés. Padding-left 1.25rem. Signature éditoriale cohérente avec l'identité.</td></tr>
      </tbody>
    </table>
  </div>

  <hr class="divider">

  <!-- ══ 9. CSS TOKENS ══ -->
  <div class="section">
    <div class="section-eyebrow">09 — CSS TOKENS</div>
    <div class="section-heading">Variables prêtes à l'emploi</div>

    <div class="token-block"><span class="tc">/* ─── POKEDEX DESIGN TOKENS v1.0 ─── */</span>

:root {
  <span class="tc">/* Fonts */</span>
  <span class="tp">--font-pixel</span>: <span class="tv">'Press Start 2P', monospace</span>;
  <span class="tp">--font-ui</span>:    <span class="tv">'Outfit', sans-serif</span>;

  <span class="tc">/* Primary — Rouge Pokedex */</span>
  <span class="tp">--red-pale</span>:   <span class="tv">#FFE5E5</span>;
  <span class="tp">--red-bright</span>: <span class="tv">#FF3333</span>;
  <span class="tp">--red</span>:        <span class="tv">#CC0000</span>;  <span class="tc">/* ← COULEUR PRIMAIRE */</span>
  <span class="tp">--red-dark</span>:   <span class="tv">#8B0000</span>;
  <span class="tp">--red-abyss</span>:  <span class="tv">#2A0000</span>;

  <span class="tc">/* Secondary — Jaune Pikachu */</span>
  <span class="tp">--yellow-light</span>: <span class="tv">#FFE87A</span>;
  <span class="tp">--yellow</span>:       <span class="tv">#FFCB05</span>;  <span class="tc">/* ← ACCENT RARE */</span>
  <span class="tp">--yellow-dark</span>:  <span class="tv">#CC9900</span>;

  <span class="tc">/* Tertiary — Bleu Version */</span>
  <span class="tp">--blue-light</span>: <span class="tv">#7B8CE8</span>;
  <span class="tp">--blue</span>:       <span class="tv">#3B4CCA</span>;  <span class="tc">/* ← UI / FONCTIONNEL */</span>
  <span class="tp">--blue-dark</span>:  <span class="tv">#1E2D8A</span>;

  <span class="tc">/* Neutrals — dark-first */</span>
  <span class="tp">--void</span>:         <span class="tv">#0A0A0A</span>;  <span class="tc">/* fond page */</span>
  <span class="tp">--deep</span>:         <span class="tv">#111111</span>;  <span class="tc">/* fond sections */</span>
  <span class="tp">--dark</span>:         <span class="tv">#1A1A1A</span>;  <span class="tc">/* fond cards */</span>
  <span class="tp">--border</span>:       <span class="tv">#2A2A2A</span>;  <span class="tc">/* bordures */</span>
  <span class="tp">--border-light</span>: <span class="tv">#333333</span>;  <span class="tc">/* bordures hover */</span>
  <span class="tp">--muted</span>:        <span class="tv">#666666</span>;  <span class="tc">/* texte désactivé */</span>
  <span class="tp">--subtle</span>:       <span class="tv">#999999</span>;  <span class="tc">/* descriptions */</span>
  <span class="tp">--light</span>:        <span class="tv">#CCCCCC</span>;  <span class="tc">/* texte secondaire */</span>
  <span class="tp">--white</span>:        <span class="tv">#FFFFFF</span>;  <span class="tc">/* texte principal */</span>

  <span class="tc">/* Spacing — base 4px */</span>
  <span class="tp">--space-1</span>:  <span class="tv">0.25rem</span>;   <span class="tc">/* 4px  */</span>
  <span class="tp">--space-2</span>:  <span class="tv">0.5rem</span>;    <span class="tc">/* 8px  */</span>
  <span class="tp">--space-4</span>:  <span class="tv">1rem</span>;      <span class="tc">/* 16px */</span>
  <span class="tp">--space-6</span>:  <span class="tv">1.5rem</span>;    <span class="tc">/* 24px */</span>
  <span class="tp">--space-8</span>:  <span class="tv">2rem</span>;      <span class="tc">/* 32px */</span>
  <span class="tp">--space-12</span>: <span class="tv">3rem</span>;      <span class="tc">/* 48px */</span>
  <span class="tp">--space-16</span>: <span class="tv">4rem</span>;      <span class="tc">/* 64px */</span>
  <span class="tp">--space-20</span>: <span class="tv">5rem</span>;      <span class="tc">/* 80px */</span>
  <span class="tp">--space-24</span>: <span class="tv">6rem</span>;      <span class="tc">/* 96px */</span>
  <span class="tp">--space-32</span>: <span class="tv">8rem</span>;      <span class="tc">/* 128px */</span>

  <span class="tc">/* Radius — sharp-first */</span>
  <span class="tp">--radius-none</span>:   <span class="tv">0px</span>;     <span class="tc">/* cards, inputs, boutons */</span>
  <span class="tp">--radius-xs</span>:     <span class="tv">2px</span>;     <span class="tc">/* type badges uniquement */</span>
  <span class="tp">--radius-full</span>:   <span class="tv">9999px</span>; <span class="tc">/* avatars circulaires */</span>

  <span class="tc">/* Glow signatures */</span>
  <span class="tp">--glow-red</span>:    <span class="tv">0 0 40px rgba(204,0,0,.8), 0 0 80px rgba(204,0,0,.4)</span>;
  <span class="tp">--glow-yellow</span>: <span class="tv">0 0 20px rgba(255,203,5,.6)</span>;

  <span class="tc">/* Containers */</span>
  <span class="tp">--container-sm</span>: <span class="tv">40rem</span>;  <span class="tc">/* 640px  — texte */</span>
  <span class="tp">--container-md</span>: <span class="tv">64rem</span>;  <span class="tc">/* 1024px — intermédiaire */</span>
  <span class="tp">--container-lg</span>: <span class="tv">80rem</span>;  <span class="tc">/* 1280px — layout principal */</span>
}</div>
  </div>

</div>
</body>
</html>