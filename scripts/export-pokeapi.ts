/**
 * Export PokeAPI data to local JSON files for Knowledge Graph creation.
 *
 * Usage: npx tsx scripts/export-pokeapi.ts
 *
 * Exports:
 *   data/pokemon.json       — All Pokemon (id, names, types, stats, evolution, descriptions)
 *   data/types.json         — All 18 types (names, damage relations)
 *   data/generations.json   — All 9 generations (names, regions, pokemon ranges)
 *   data/evolutions.json    — All evolution chains
 *   data/regions.json       — All 9 regions (names, location slugs)
 *   data/locations.json     — All locations (names, region, areas)
 *   data/kg-triples.json    — Pre-built KG triples (subject, predicate, object)
 */

const POKEAPI = 'https://pokeapi.co/api/v2';
const LOCALES = ['fr', 'en', 'es', 'de', 'it'] as const;
const TOTAL_POKEMON = 1025;
const BATCH_SIZE = 50;
const DELAY_MS = 100;

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed: ${url} (${res.status})`);
  return res.json() as Promise<T>;
}

function pickNames(names: { name: string; language: { name: string } }[]) {
  const result: Record<string, string> = {};
  for (const n of names) {
    if ((LOCALES as readonly string[]).includes(n.language.name)) {
      result[n.language.name] = n.name;
    }
  }
  return result;
}

function pickFlavorTexts(entries: { flavor_text: string; language: { name: string }; version: { name: string } }[]) {
  const result: Record<string, string> = {};
  for (const locale of LOCALES) {
    const entry = entries.find(e => e.language.name === locale);
    if (entry) {
      result[locale] = entry.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    }
  }
  return result;
}

function pickGenera(genera: { genus: string; language: { name: string } }[]) {
  const result: Record<string, string> = {};
  for (const g of genera) {
    if ((LOCALES as readonly string[]).includes(g.language.name)) {
      result[g.language.name] = g.genus;
    }
  }
  return result;
}

// ─── TYPES ───

async function exportTypes() {
  console.log('📦 Exporting types...');
  const types: unknown[] = [];

  for (let id = 1; id <= 18; id++) {
    const t: any = await fetchJson(`${POKEAPI}/type/${id}`);
    types.push({
      id: t.id,
      slug: t.name,
      names: pickNames(t.names),
      damage_relations: {
        double_damage_from: t.damage_relations.double_damage_from.map((d: any) => d.name),
        double_damage_to: t.damage_relations.double_damage_to.map((d: any) => d.name),
        half_damage_from: t.damage_relations.half_damage_from.map((d: any) => d.name),
        half_damage_to: t.damage_relations.half_damage_to.map((d: any) => d.name),
        no_damage_from: t.damage_relations.no_damage_from.map((d: any) => d.name),
        no_damage_to: t.damage_relations.no_damage_to.map((d: any) => d.name),
      },
      pokemon_count: t.pokemon.length,
      pokemon_slugs: t.pokemon.map((p: any) => p.pokemon.name),
    });
    process.stdout.write(`  type ${id}/18\r`);
  }
  console.log('  ✓ 18 types exported');
  return types;
}

// ─── GENERATIONS ───

async function exportGenerations() {
  console.log('📦 Exporting generations...');
  const generations: unknown[] = [];

  for (let id = 1; id <= 9; id++) {
    const g: any = await fetchJson(`${POKEAPI}/generation/${id}`);
    const speciesIds = g.pokemon_species
      .map((s: any) => {
        const match = s.url.match(/\/(\d+)\/$/);
        return match ? Number(match[1]) : 0;
      })
      .filter((n: number) => n > 0)
      .sort((a: number, b: number) => a - b);

    generations.push({
      id: g.id,
      slug: g.name,
      names: pickNames(g.names),
      region: g.main_region.name,
      pokemon_count: speciesIds.length,
      dex_range: { from: Math.min(...speciesIds), to: Math.max(...speciesIds) },
      pokemon_ids: speciesIds,
    });
    process.stdout.write(`  gen ${id}/9\r`);
  }
  console.log('  ✓ 9 generations exported');
  return generations;
}

// ─── EVOLUTION CHAINS ───

async function exportEvolutions() {
  console.log('📦 Exporting evolution chains...');
  const chains: unknown[] = [];

  // Fetch total count
  const first: any = await fetchJson(`${POKEAPI}/evolution-chain?limit=1`);
  const total = first.count;
  console.log(`  ${total} chains to fetch...`);

  for (let offset = 0; offset < total; offset += 20) {
    const batch: any = await fetchJson(`${POKEAPI}/evolution-chain?limit=20&offset=${offset}`);

    for (const result of batch.results) {
      try {
        const chain: any = await fetchJson(result.url);
        const parsed = flattenChain(chain.chain);
        chains.push({
          id: chain.id,
          stages: parsed,
        });
      } catch {
        // Some chains may 404
      }
      await delay(DELAY_MS);
    }
    process.stdout.write(`  ${Math.min(offset + 20, total)}/${total} chains\r`);
  }
  console.log(`  ✓ ${chains.length} evolution chains exported`);
  return chains;
}

function flattenChain(link: any, stage = 1): any[] {
  const speciesId = extractId(link.species.url);
  const result: any[] = [{
    species: link.species.name,
    species_id: speciesId,
    stage,
    trigger: link.evolution_details?.[0]?.trigger?.name ?? null,
    min_level: link.evolution_details?.[0]?.min_level ?? null,
  }];

  for (const child of link.evolves_to ?? []) {
    result.push(...flattenChain(child, stage + 1));
  }
  return result;
}

function extractId(url: string): number {
  const match = url.match(/\/(\d+)\/$/);
  return match ? Number(match[1]) : 0;
}

// ─── POKEMON ───

async function exportPokemon() {
  console.log(`📦 Exporting ${TOTAL_POKEMON} Pokemon...`);
  const pokemon: unknown[] = [];

  for (let start = 1; start <= TOTAL_POKEMON; start += BATCH_SIZE) {
    const end = Math.min(start + BATCH_SIZE - 1, TOTAL_POKEMON);
    const batchIds = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const batchResults = await Promise.all(
      batchIds.map(async (id) => {
        try {
          const [poke, species]: [any, any] = await Promise.all([
            fetchJson(`${POKEAPI}/pokemon/${id}`),
            fetchJson(`${POKEAPI}/pokemon-species/${id}`),
          ]);

          return {
            id: poke.id,
            slug: poke.name,
            names: pickNames(species.names),
            genera: pickGenera(species.genera),
            flavor_texts: pickFlavorTexts(species.flavor_text_entries),
            types: poke.types.map((t: any) => t.type.name),
            stats: {
              hp: poke.stats[0]?.base_stat ?? 0,
              attack: poke.stats[1]?.base_stat ?? 0,
              defense: poke.stats[2]?.base_stat ?? 0,
              special_attack: poke.stats[3]?.base_stat ?? 0,
              special_defense: poke.stats[4]?.base_stat ?? 0,
              speed: poke.stats[5]?.base_stat ?? 0,
              total: poke.stats.reduce((s: number, st: any) => s + st.base_stat, 0),
            },
            height_dm: poke.height,
            weight_hg: poke.weight,
            height_m: poke.height / 10,
            weight_kg: poke.weight / 10,
            base_experience: poke.base_experience,
            capture_rate: species.capture_rate,
            generation: species.generation.name,
            evolution_chain_id: extractId(species.evolution_chain?.url ?? ''),
            evolves_from: species.evolves_from_species?.name ?? null,
            sprite_official: poke.sprites?.other?.['official-artwork']?.front_default ?? null,
            sprite_default: poke.sprites?.front_default ?? null,
            sprite_shiny: poke.sprites?.other?.['official-artwork']?.front_shiny ?? null,
            is_legendary: species.is_legendary,
            is_mythical: species.is_mythical,
            is_baby: species.is_baby,
            habitat: species.habitat?.name ?? null,
            shape: species.shape?.name ?? null,
            color: species.color?.name ?? null,
            growth_rate: species.growth_rate?.name ?? null,
            egg_groups: species.egg_groups?.map((e: any) => e.name) ?? [],
            gender_rate: species.gender_rate,
            has_gender_differences: species.has_gender_differences,
            hatch_counter: species.hatch_counter,
          };
        } catch (err) {
          console.error(`  ⚠ Failed for Pokemon #${id}: ${err}`);
          return null;
        }
      }),
    );

    pokemon.push(...batchResults.filter(Boolean));
    process.stdout.write(`  ${end}/${TOTAL_POKEMON} Pokemon\r`);
    await delay(DELAY_MS * 2);
  }

  console.log(`  ✓ ${pokemon.length} Pokemon exported`);
  return pokemon;
}

// ─── REGIONS & LOCATIONS ───

async function exportRegions() {
  console.log('📦 Exporting regions & locations...');
  const regions: any[] = [];
  const locations: any[] = [];

  // Fetch all regions (1-9 for main series)
  for (let id = 1; id <= 9; id++) {
    const r: any = await fetchJson(`${POKEAPI}/region/${id}`);
    regions.push({
      id: r.id,
      slug: r.name,
      names: pickNames(r.names),
      location_slugs: r.locations.map((l: any) => l.name),
      main_generation: r.main_generation?.name ?? null,
    });
    process.stdout.write(`  region ${id}/9\r`);
  }
  console.log('  ✓ 9 regions exported');

  // Fetch all locations for these regions
  // Get the total count first
  const firstPage: any = await fetchJson(`${POKEAPI}/location?limit=1`);
  const totalLocations = Math.min(firstPage.count, 1000);
  console.log(`  ${totalLocations} locations to fetch...`);

  for (let offset = 0; offset < totalLocations; offset += 20) {
    const batch: any = await fetchJson(`${POKEAPI}/location?limit=20&offset=${offset}`);
    for (const result of batch.results) {
      try {
        const loc: any = await fetchJson(`${POKEAPI}/location/${result.name}`);
        locations.push({
          id: loc.id,
          slug: loc.name,
          names: pickNames(loc.names),
          region: loc.region?.name ?? null,
          area_slugs: loc.areas?.map((a: any) => a.name) ?? [],
        });
      } catch {
        // Some locations may fail
      }
    }
    process.stdout.write(`  ${Math.min(offset + 20, totalLocations)}/${totalLocations} locations\r`);
    await delay(DELAY_MS);
  }
  console.log(`  ✓ ${locations.length} locations exported`);

  return { regions, locations };
}

// ─── TYPE EFFECTIVENESS CALCULATOR ───

function computeTypeEffectiveness(pokemonTypes: string[], allTypes: any[]) {
  // Build a lookup: typeName → damage_relations
  const typeMap = new Map<string, any>();
  for (const t of allTypes) {
    typeMap.set(t.slug, t.damage_relations);
  }

  // All 18 type slugs
  const allTypeSlugs = allTypes.map((t: any) => t.slug as string);

  // Initialize multiplier at 1x for every attacking type
  const multipliers = new Map<string, number>();
  for (const slug of allTypeSlugs) {
    multipliers.set(slug, 1);
  }

  // For each of the Pokemon's defensive types, multiply the factors
  for (const defType of pokemonTypes) {
    const rel = typeMap.get(defType);
    if (!rel) continue;

    for (const atk of rel.double_damage_from) {
      multipliers.set(atk, (multipliers.get(atk) ?? 1) * 2);
    }
    for (const atk of rel.half_damage_from) {
      multipliers.set(atk, (multipliers.get(atk) ?? 1) * 0.5);
    }
    for (const atk of rel.no_damage_from) {
      multipliers.set(atk, 0);
    }
  }

  // Group by effectiveness category
  const result: { doubleWeakTo: string[]; weakTo: string[]; resistsType: string[]; doubleResists: string[]; immuneTo: string[] } = {
    doubleWeakTo: [],  // 4x
    weakTo: [],        // 2x
    resistsType: [],   // 0.5x
    doubleResists: [], // 0.25x
    immuneTo: [],      // 0x
  };

  for (const [type, mult] of multipliers) {
    if (mult === 0) result.immuneTo.push(type);
    else if (mult === 4) result.doubleWeakTo.push(type);
    else if (mult === 2) result.weakTo.push(type);
    else if (mult === 0.5) result.resistsType.push(type);
    else if (mult === 0.25) result.doubleResists.push(type);
  }

  return result;
}

// ─── STAT TIER CLASSIFIER ───

function getStatTier(bst: number): string {
  if (bst >= 600) return 'tier:legendary';  // 600+ (pseudo-legendaries, legendaries)
  if (bst >= 500) return 'tier:high';       // 500-599
  if (bst >= 400) return 'tier:mid';        // 400-499
  if (bst >= 300) return 'tier:low';        // 300-399
  return 'tier:very-low';                   // <300
}

function getRoleFromStats(stats: any): string[] {
  const roles: string[] = [];
  if (stats.attack > stats.special_attack && stats.attack >= 100) roles.push('role:physical-attacker');
  if (stats.special_attack > stats.attack && stats.special_attack >= 100) roles.push('role:special-attacker');
  if (stats.attack >= 100 && stats.special_attack >= 100) roles.push('role:mixed-attacker');
  if (stats.defense >= 100 || stats.special_defense >= 100) roles.push('role:wall');
  if (stats.defense >= 100 && stats.special_defense >= 100) roles.push('role:tank');
  if (stats.speed >= 100) roles.push('role:fast');
  if (stats.hp >= 100) roles.push('role:bulky');
  return roles;
}

function getSizeCategory(height_m: number): string {
  if (height_m >= 5) return 'size:giant';      // 5m+
  if (height_m >= 2) return 'size:large';      // 2-5m
  if (height_m >= 1) return 'size:medium';     // 1-2m
  if (height_m >= 0.5) return 'size:small';    // 0.5-1m
  return 'size:tiny';                          // <0.5m
}

function getWeightCategory(weight_kg: number): string {
  if (weight_kg >= 200) return 'weight_class:super-heavy';  // 200kg+
  if (weight_kg >= 80) return 'weight_class:heavy';         // 80-200kg
  if (weight_kg >= 25) return 'weight_class:medium';        // 25-80kg
  if (weight_kg >= 5) return 'weight_class:light';          // 5-25kg
  return 'weight_class:feather';                            // <5kg
}

// ─── KG TRIPLES ───

function buildTriples(pokemon: any[], types: any[], generations: any[], evolutions: any[], regionData?: { regions: any[]; locations: any[] }) {
  console.log('📦 Building KG triples...');
  const triples: { subject: string; predicate: string; object: string }[] = [];
  const t3 = (s: string, p: string, o: string) => triples.push({ subject: s, predicate: p, object: o });

  // Build lookup maps
  const pokemonById = new Map<number, any>();
  for (const p of pokemon) pokemonById.set(p.id, p);

  const typeMap = new Map<string, any>();
  for (const t of types) typeMap.set(t.slug, t);

  // ════════════════════════════════════
  // ── 1. POKEMON TRIPLES ──
  // ════════════════════════════════════
  for (const p of pokemon) {
    const s = `pokemon:${p.slug}`;

    // Dex number
    t3(s, 'hasDexNumber', String(p.id));

    // Types
    for (const type of p.types) {
      t3(s, 'hasType', `type:${type}`);
    }
    // Type combination identity (e.g. "grass+poison" or "fire")
    const typeCombo = p.types.sort().join('+');
    t3(s, 'hasTypeCombination', `type_combo:${typeCombo}`);

    // Generation
    t3(s, 'belongsToGeneration', `generation:${p.generation}`);

    // Evolution from
    if (p.evolves_from) {
      t3(s, 'evolvesFrom', `pokemon:${p.evolves_from}`);
    }

    // ── Individual stats ──
    t3(s, 'hasHP', String(p.stats.hp));
    t3(s, 'hasAttack', String(p.stats.attack));
    t3(s, 'hasDefense', String(p.stats.defense));
    t3(s, 'hasSpAtk', String(p.stats.special_attack));
    t3(s, 'hasSpDef', String(p.stats.special_defense));
    t3(s, 'hasSpeed', String(p.stats.speed));
    t3(s, 'hasStatTotal', String(p.stats.total));

    // Stat tier & role
    t3(s, 'inStatTier', getStatTier(p.stats.total));
    for (const role of getRoleFromStats(p.stats)) {
      t3(s, 'hasRole', role);
    }

    // ── Physical attributes ──
    t3(s, 'hasHeight', String(p.height_m));
    t3(s, 'hasWeight', String(p.weight_kg));
    t3(s, 'inSizeCategory', getSizeCategory(p.height_m));
    t3(s, 'inWeightClass', getWeightCategory(p.weight_kg));
    if (p.base_experience) t3(s, 'hasBaseExp', String(p.base_experience));
    t3(s, 'hasCaptureRate', String(p.capture_rate));

    // ── Classification attributes ──
    if (p.shape) t3(s, 'hasShape', `shape:${p.shape}`);
    if (p.color) t3(s, 'hasColor', `color:${p.color}`);
    if (p.growth_rate) t3(s, 'hasGrowthRate', `growth_rate:${p.growth_rate}`);
    if (p.habitat) t3(s, 'livesIn', `habitat:${p.habitat}`);

    // ── Boolean flags ──
    if (p.is_legendary) t3(s, 'isLegendary', 'true');
    if (p.is_mythical) t3(s, 'isMythical', 'true');
    if (p.is_baby) t3(s, 'isBaby', 'true');

    // ── Gender ──
    if (p.gender_rate === -1) {
      t3(s, 'isGenderless', 'true');
    } else if (p.gender_rate >= 0) {
      t3(s, 'genderRate', String(p.gender_rate));
    }
    if (p.has_gender_differences) t3(s, 'hasGenderDifferences', 'true');
    if (p.hatch_counter) t3(s, 'hatchCounter', String(p.hatch_counter));

    // ── Egg groups ──
    for (const eg of p.egg_groups) {
      t3(s, 'inEggGroup', `egg_group:${eg}`);
    }

    // ── Names per locale ──
    for (const [locale, name] of Object.entries(p.names)) {
      t3(s, `name:${locale}`, name as string);
    }

    // ── Genera per locale ──
    for (const [locale, genus] of Object.entries(p.genera ?? {})) {
      t3(s, `genus:${locale}`, genus as string);
    }

    // ── Flavor texts per locale ──
    for (const [locale, text] of Object.entries(p.flavor_texts ?? {})) {
      t3(s, `description:${locale}`, text as string);
    }

    // ── Sprites ──
    if (p.sprite_official) t3(s, 'spriteOfficial', p.sprite_official);
    if (p.sprite_default) t3(s, 'spriteDefault', p.sprite_default);
    if (p.sprite_shiny) t3(s, 'spriteShiny', p.sprite_shiny);

    // ── Type effectiveness (computed from dual-typing) ──
    const eff = computeTypeEffectiveness(p.types, types);
    for (const tp of eff.doubleWeakTo) t3(s, 'doubleWeakTo', `type:${tp}`);
    for (const tp of eff.weakTo) t3(s, 'weakTo', `type:${tp}`);
    for (const tp of eff.resistsType) t3(s, 'resistsType', `type:${tp}`);
    for (const tp of eff.doubleResists) t3(s, 'doubleResists', `type:${tp}`);
    for (const tp of eff.immuneTo) t3(s, 'immuneTo', `type:${tp}`);

    // ── STAB coverage (types this Pokemon hits super-effectively with its own types) ──
    const stabCoverage = new Set<string>();
    for (const ownType of p.types) {
      const tData = typeMap.get(ownType);
      if (tData) {
        for (const target of tData.damage_relations.double_damage_to) {
          stabCoverage.add(target);
        }
      }
    }
    for (const target of stabCoverage) {
      t3(s, 'stabEffectiveAgainst', `type:${target}`);
    }
  }

  // ════════════════════════════════════
  // ── 2. TYPE TRIPLES ──
  // ════════════════════════════════════
  for (const t of types) {
    const s = `type:${t.slug}`;

    // Entity type
    t3(s, 'entityType', 'Type');

    // Damage relations (offensive)
    for (const target of t.damage_relations.double_damage_to) {
      t3(s, 'superEffectiveAgainst', `type:${target}`);
    }
    for (const target of t.damage_relations.half_damage_to) {
      t3(s, 'notVeryEffectiveAgainst', `type:${target}`);
    }
    for (const target of t.damage_relations.no_damage_to) {
      t3(s, 'noEffectAgainst', `type:${target}`);
    }

    // Damage relations (defensive)
    for (const target of t.damage_relations.double_damage_from) {
      t3(s, 'vulnerableTo', `type:${target}`);
    }
    for (const target of t.damage_relations.half_damage_from) {
      t3(s, 'resistantTo', `type:${target}`);
    }
    for (const target of t.damage_relations.no_damage_from) {
      t3(s, 'immuneFrom', `type:${target}`);
    }

    // Names
    for (const [locale, name] of Object.entries(t.names)) {
      t3(s, `name:${locale}`, name as string);
    }

    // Type → Pokemon count
    t3(s, 'pokemonCount', String(t.pokemon_count));

    // Type → Pokemon (reverse relation)
    for (const slug of t.pokemon_slugs) {
      t3(s, 'hasPokemon', `pokemon:${slug}`);
    }
  }

  // ════════════════════════════════════
  // ── 3. GENERATION TRIPLES ──
  // ════════════════════════════════════
  const GEN_SLUGS = ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii', 'generation-ix'];

  for (let gi = 0; gi < generations.length; gi++) {
    const g = generations[gi];
    const s = `generation:${g.slug}`;

    // Entity type
    t3(s, 'entityType', 'Generation');
    t3(s, 'generationNumber', String(g.id));

    // Region
    t3(s, 'hasRegion', `region:${g.region}`);
    t3(s, 'dexRange', `${g.dex_range.from}-${g.dex_range.to}`);
    t3(s, 'pokemonCount', String(g.pokemon_count));

    // Generation ordering
    if (gi > 0) {
      t3(s, 'precededBy', `generation:${GEN_SLUGS[gi - 1]}`);
    }
    if (gi < generations.length - 1) {
      t3(s, 'followedBy', `generation:${GEN_SLUGS[gi + 1]}`);
    }

    // Names
    for (const [locale, name] of Object.entries(g.names)) {
      t3(s, `name:${locale}`, name as string);
    }

    // Generation → Pokemon (containsPokemon)
    for (const pid of g.pokemon_ids) {
      const poke = pokemonById.get(pid);
      if (poke) {
        t3(s, 'containsPokemon', `pokemon:${poke.slug}`);
      }
    }

    // Region entity → Generation link
    t3(`region:${g.region}`, 'introducedIn', s);
  }

  // ════════════════════════════════════
  // ── 4. EVOLUTION CHAINS (enriched) ──
  // ════════════════════════════════════
  for (const chain of evolutions) {
    const chainId = `evolution_chain:${chain.id}`;

    // Chain metadata
    const maxStage = Math.max(...chain.stages.map((st: any) => st.stage));
    t3(chainId, 'entityType', 'EvolutionChain');
    t3(chainId, 'chainSize', String(chain.stages.length));
    t3(chainId, 'maxStage', String(maxStage));

    // Is it a branching chain? (multiple Pokemon at same stage)
    const stageGroups = new Map<number, string[]>();
    for (const stage of chain.stages) {
      const arr = stageGroups.get(stage.stage) ?? [];
      arr.push(stage.species);
      stageGroups.set(stage.stage, arr);
    }
    const hasBranch = [...stageGroups.values()].some(arr => arr.length > 1);
    if (hasBranch) t3(chainId, 'isBranching', 'true');

    // Link all members to the chain
    for (const stage of chain.stages) {
      t3(`pokemon:${stage.species}`, 'inEvolutionChain', chainId);
      t3(`pokemon:${stage.species}`, 'evolutionStage', String(stage.stage));
      t3(chainId, 'containsPokemon', `pokemon:${stage.species}`);

      // Is base form (stage 1)?
      if (stage.stage === 1) t3(chainId, 'basePokemon', `pokemon:${stage.species}`);
      // Is final form?
      if (stage.stage === maxStage) t3(`pokemon:${stage.species}`, 'isFinalEvolution', 'true');
      // Is single-stage (no evolution)?
      if (chain.stages.length === 1) t3(`pokemon:${stage.species}`, 'hasNoEvolution', 'true');
    }

    // Evolution transitions
    for (let i = 0; i < chain.stages.length - 1; i++) {
      const current = chain.stages[i];
      const next = chain.stages[i + 1];
      if (current && next && next.stage > current.stage) {
        t3(`pokemon:${current.species}`, 'evolvesInto', `pokemon:${next.species}`);
        const evoId = `evolution:${current.species}->${next.species}`;
        t3(evoId, 'entityType', 'Evolution');
        t3(evoId, 'from', `pokemon:${current.species}`);
        t3(evoId, 'to', `pokemon:${next.species}`);
        if (next.trigger) {
          t3(evoId, 'trigger', next.trigger);
          t3(`pokemon:${next.species}`, 'evolvesVia', `trigger:${next.trigger}`);
        }
        if (next.min_level) {
          t3(evoId, 'minLevel', String(next.min_level));
          t3(`pokemon:${next.species}`, 'evolvesAtLevel', String(next.min_level));
        }
      }
    }
  }

  // ════════════════════════════════════
  // ── 5. INVERSE ENTITY RELATIONS ──
  // ════════════════════════════════════

  // Collect unique entities and their Pokemon for inverse links
  const habitatPokemon = new Map<string, string[]>();
  const shapePokemon = new Map<string, string[]>();
  const colorPokemon = new Map<string, string[]>();
  const growthRatePokemon = new Map<string, string[]>();
  const eggGroupPokemon = new Map<string, string[]>();
  const typeComboMembers = new Map<string, string[]>();

  for (const p of pokemon) {
    if (p.habitat) {
      const arr = habitatPokemon.get(p.habitat) ?? [];
      arr.push(p.slug);
      habitatPokemon.set(p.habitat, arr);
    }
    if (p.shape) {
      const arr = shapePokemon.get(p.shape) ?? [];
      arr.push(p.slug);
      shapePokemon.set(p.shape, arr);
    }
    if (p.color) {
      const arr = colorPokemon.get(p.color) ?? [];
      arr.push(p.slug);
      colorPokemon.set(p.color, arr);
    }
    if (p.growth_rate) {
      const arr = growthRatePokemon.get(p.growth_rate) ?? [];
      arr.push(p.slug);
      growthRatePokemon.set(p.growth_rate, arr);
    }
    for (const eg of p.egg_groups) {
      const arr = eggGroupPokemon.get(eg) ?? [];
      arr.push(p.slug);
      eggGroupPokemon.set(eg, arr);
    }
    const combo = p.types.sort().join('+');
    const arr = typeComboMembers.get(combo) ?? [];
    arr.push(p.slug);
    typeComboMembers.set(combo, arr);
  }

  // Habitat entities
  for (const [habitat, slugs] of habitatPokemon) {
    const s = `habitat:${habitat}`;
    t3(s, 'entityType', 'Habitat');
    t3(s, 'pokemonCount', String(slugs.length));
    for (const slug of slugs) t3(s, 'hasPokemon', `pokemon:${slug}`);
  }

  // Shape entities
  for (const [shape, slugs] of shapePokemon) {
    const s = `shape:${shape}`;
    t3(s, 'entityType', 'Shape');
    t3(s, 'pokemonCount', String(slugs.length));
    for (const slug of slugs) t3(s, 'hasPokemon', `pokemon:${slug}`);
  }

  // Color entities
  for (const [color, slugs] of colorPokemon) {
    const s = `color:${color}`;
    t3(s, 'entityType', 'Color');
    t3(s, 'pokemonCount', String(slugs.length));
    for (const slug of slugs) t3(s, 'hasPokemon', `pokemon:${slug}`);
  }

  // Growth rate entities
  for (const [rate, slugs] of growthRatePokemon) {
    const s = `growth_rate:${rate}`;
    t3(s, 'entityType', 'GrowthRate');
    t3(s, 'pokemonCount', String(slugs.length));
    for (const slug of slugs) t3(s, 'hasPokemon', `pokemon:${slug}`);
  }

  // Egg group entities
  for (const [eg, slugs] of eggGroupPokemon) {
    const s = `egg_group:${eg}`;
    t3(s, 'entityType', 'EggGroup');
    t3(s, 'pokemonCount', String(slugs.length));
    for (const slug of slugs) t3(s, 'hasPokemon', `pokemon:${slug}`);
  }

  // Type combination entities
  for (const [combo, slugs] of typeComboMembers) {
    const s = `type_combo:${combo}`;
    t3(s, 'entityType', 'TypeCombination');
    t3(s, 'pokemonCount', String(slugs.length));
    for (const typeSlug of combo.split('+')) {
      t3(s, 'includesType', `type:${typeSlug}`);
    }
    for (const slug of slugs) t3(s, 'hasPokemon', `pokemon:${slug}`);
  }

  // ════════════════════════════════════
  // ── 6. REGION ENTITIES ──
  // ════════════════════════════════════
  const REGION_NAMES: Record<string, Record<string, string>> = {
    kanto:    { fr: 'Kanto',    en: 'Kanto',    es: 'Kanto',    de: 'Kanto',    it: 'Kanto' },
    johto:    { fr: 'Johto',    en: 'Johto',    es: 'Johto',    de: 'Johto',    it: 'Johto' },
    hoenn:    { fr: 'Hoenn',    en: 'Hoenn',    es: 'Hoenn',    de: 'Hoenn',    it: 'Hoenn' },
    sinnoh:   { fr: 'Sinnoh',   en: 'Sinnoh',   es: 'Sinnoh',   de: 'Sinnoh',   it: 'Sinnoh' },
    unova:    { fr: 'Unys',     en: 'Unova',    es: 'Teselia',  de: 'Einall',   it: 'Unima' },
    kalos:    { fr: 'Kalos',    en: 'Kalos',    es: 'Kalos',    de: 'Kalos',    it: 'Kalos' },
    alola:    { fr: 'Alola',    en: 'Alola',    es: 'Alola',    de: 'Alola',    it: 'Alola' },
    galar:    { fr: 'Galar',    en: 'Galar',    es: 'Galar',    de: 'Galar',    it: 'Galar' },
    paldea:   { fr: 'Paldea',   en: 'Paldea',   es: 'Paldea',   de: 'Paldea',   it: 'Paldea' },
  };

  for (const [slug, names] of Object.entries(REGION_NAMES)) {
    const s = `region:${slug}`;
    t3(s, 'entityType', 'Region');
    for (const [locale, name] of Object.entries(names)) {
      t3(s, `name:${locale}`, name);
    }
  }

  // ── Region → Location relationships (from exportRegions data) ──
  if (regionData) {
    for (const region of regionData.regions) {
      const rs = `region:${region.slug}`;
      t3(rs, 'locationCount', String(region.location_slugs.length));
      for (const locSlug of region.location_slugs) {
        t3(rs, 'hasLocation', `location:${locSlug}`);
      }
    }

    for (const loc of regionData.locations) {
      const ls = `location:${loc.slug}`;
      t3(ls, 'entityType', 'Location');
      if (loc.region) {
        t3(ls, 'inRegion', `region:${loc.region}`);
      }
      for (const [locale, name] of Object.entries(loc.names)) {
        t3(ls, `name:${locale}`, name as string);
      }
      for (const area of loc.area_slugs) {
        t3(ls, 'hasArea', `location_area:${area}`);
      }
      t3(ls, 'areaCount', String(loc.area_slugs.length));
    }
  }

  // ════════════════════════════════════
  // ── 7. STAT TIER ENTITIES ──
  // ════════════════════════════════════
  const STAT_TIERS: Record<string, { label: string; range: string }> = {
    'tier:very-low':  { label: 'Very Low', range: '0-299' },
    'tier:low':       { label: 'Low', range: '300-399' },
    'tier:mid':       { label: 'Mid', range: '400-499' },
    'tier:high':      { label: 'High', range: '500-599' },
    'tier:legendary': { label: 'Legendary', range: '600+' },
  };
  for (const [id, info] of Object.entries(STAT_TIERS)) {
    t3(id, 'entityType', 'StatTier');
    t3(id, 'label', info.label);
    t3(id, 'bstRange', info.range);
  }

  // ════════════════════════════════════
  // ── 8. SIZE & WEIGHT CATEGORY ENTITIES ──
  // ════════════════════════════════════
  const SIZE_CATS: Record<string, string> = {
    'size:tiny': '<0.5m', 'size:small': '0.5-1m', 'size:medium': '1-2m',
    'size:large': '2-5m', 'size:giant': '5m+',
  };
  for (const [id, range] of Object.entries(SIZE_CATS)) {
    t3(id, 'entityType', 'SizeCategory');
    t3(id, 'range', range);
  }

  const WEIGHT_CATS: Record<string, string> = {
    'weight_class:feather': '<5kg', 'weight_class:light': '5-25kg', 'weight_class:medium': '25-80kg',
    'weight_class:heavy': '80-200kg', 'weight_class:super-heavy': '200kg+',
  };
  for (const [id, range] of Object.entries(WEIGHT_CATS)) {
    t3(id, 'entityType', 'WeightClass');
    t3(id, 'range', range);
  }

  // ════════════════════════════════════
  // ── 9. ROLE ENTITIES ──
  // ════════════════════════════════════
  const ROLES: Record<string, string> = {
    'role:physical-attacker': 'Physical Attacker (Atk >= 100, Atk > SpAtk)',
    'role:special-attacker': 'Special Attacker (SpAtk >= 100, SpAtk > Atk)',
    'role:mixed-attacker': 'Mixed Attacker (Atk >= 100 & SpAtk >= 100)',
    'role:wall': 'Wall (Def >= 100 or SpDef >= 100)',
    'role:tank': 'Tank (Def >= 100 & SpDef >= 100)',
    'role:fast': 'Fast (Speed >= 100)',
    'role:bulky': 'Bulky (HP >= 100)',
  };
  for (const [id, desc] of Object.entries(ROLES)) {
    t3(id, 'entityType', 'Role');
    t3(id, 'description', desc);
  }

  console.log(`  ✓ ${triples.length} triples generated`);
  return triples;
}

// ─── MAIN ───

async function main() {
  const fs = await import('fs');
  const path = await import('path');
  const outDir = path.resolve(process.cwd(), 'data');
  fs.mkdirSync(outDir, { recursive: true });

  console.log('🔴 PokeAPI Full Export\n');

  const types = await exportTypes();
  fs.writeFileSync(path.join(outDir, 'types.json'), JSON.stringify(types, null, 2));
  console.log('');

  const generations = await exportGenerations();
  fs.writeFileSync(path.join(outDir, 'generations.json'), JSON.stringify(generations, null, 2));
  console.log('');

  const evolutions = await exportEvolutions();
  fs.writeFileSync(path.join(outDir, 'evolutions.json'), JSON.stringify(evolutions, null, 2));
  console.log('');

  const pokemon = await exportPokemon();
  fs.writeFileSync(path.join(outDir, 'pokemon.json'), JSON.stringify(pokemon, null, 2));
  console.log('');

  const regionData = await exportRegions();
  fs.writeFileSync(path.join(outDir, 'regions.json'), JSON.stringify(regionData.regions, null, 2));
  fs.writeFileSync(path.join(outDir, 'locations.json'), JSON.stringify(regionData.locations, null, 2));
  console.log('');

  const triples = buildTriples(pokemon, types, generations, evolutions, regionData);
  fs.writeFileSync(path.join(outDir, 'kg-triples.json'), JSON.stringify(triples, null, 2));
  console.log('');

  // Summary
  const summary = {
    exported_at: new Date().toISOString(),
    counts: {
      pokemon: pokemon.length,
      types: types.length,
      generations: generations.length,
      evolution_chains: evolutions.length,
      regions: regionData.regions.length,
      locations: regionData.locations.length,
      kg_triples: triples.length,
    },
    locales: [...LOCALES],
    files: ['pokemon.json', 'types.json', 'generations.json', 'evolutions.json', 'regions.json', 'locations.json', 'kg-triples.json'],
  };
  fs.writeFileSync(path.join(outDir, 'export-summary.json'), JSON.stringify(summary, null, 2));

  console.log('═══════════════════════════════════');
  console.log(`✅ Export complete → ${outDir}/`);
  console.log(`   ${pokemon.length} Pokemon`);
  console.log(`   ${types.length} Types`);
  console.log(`   ${generations.length} Generations`);
  console.log(`   ${evolutions.length} Evolution chains`);
  console.log(`   ${regionData.regions.length} Regions`);
  console.log(`   ${regionData.locations.length} Locations`);
  console.log(`   ${triples.length} KG triples`);
  console.log('═══════════════════════════════════');
}

main().catch(console.error);
