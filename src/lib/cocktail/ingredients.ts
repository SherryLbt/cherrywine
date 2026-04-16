export type IngredientOption = {
  name: string;
  id: string;
  amount: string;
  color: string;
};

export const baseMap: Record<string, IngredientOption> = {
  vodka: { name: '\u4f0f\u7279\u52a0', id: 'Vodka', amount: '45ml', color: 'bg-primary' },
  gin: { name: '\u91d1\u9152', id: 'Gin', amount: '45ml', color: 'bg-primary' },
  rum: { name: '\u6717\u59c6\u9152', id: 'Rum', amount: '45ml', color: 'bg-primary' },
  whiskey: { name: '\u5a01\u58eb\u5fcc', id: 'Whiskey', amount: '45ml', color: 'bg-primary' },
  tequila: { name: '\u9f99\u820c\u5170', id: 'Tequila', amount: '45ml', color: 'bg-primary' },
  brandy: { name: '\u767d\u5170\u5730', id: 'Brandy', amount: '45ml', color: 'bg-primary' },
  liqueur: { name: '\u5229\u53e3\u9152', id: 'Liqueur', amount: '30ml', color: 'bg-primary' },
};

export const mixerMap: Record<string, IngredientOption> = {
  lemon_juice: { name: '\u67e0\u6aac\u6c41', id: 'Lemon juice', amount: '15ml', color: 'bg-secondary' },
  lime_juice: { name: '\u9752\u67e0\u6c41', id: 'Lime juice', amount: '15ml', color: 'bg-secondary' },
  grapefruit_juice: { name: '\u897f\u67da\u6c41', id: 'Grapefruit juice', amount: '45ml', color: 'bg-secondary' },
  orange_juice: { name: '\u6a59\u6c41', id: 'Orange juice', amount: '60ml', color: 'bg-secondary' },
  pineapple_juice: { name: '\u83e0\u841d\u6c41', id: 'Pineapple juice', amount: '60ml', color: 'bg-secondary' },
  cranberry_juice: { name: '\u8513\u8d8a\u8393\u6c41', id: 'Cranberry juice', amount: '60ml', color: 'bg-secondary' },
  soda_water: { name: '\u82cf\u6253\u6c34', id: 'Soda water', amount: '120ml', color: 'bg-secondary' },
  cola: { name: '\u53ef\u4e50', id: 'Cola', amount: '120ml', color: 'bg-secondary' },
  guava_juice: { name: '\u82ad\u4e50\u6c41', id: 'Guava juice', amount: '60ml', color: 'bg-secondary' },
  strawberry_juice: { name: '\u8349\u8393\u6c41', id: 'Strawberry juice', amount: '45ml', color: 'bg-secondary' },
  cream: { name: '\u5976\u6cb9', id: 'Cream', amount: '30ml', color: 'bg-secondary' },
  coconut_milk: { name: '\u6930\u5976', id: 'Coconut milk', amount: '45ml', color: 'bg-secondary' },
  jasmine_tea: { name: '\u8309\u8389\u82b1\u8336', id: 'Jasmine tea', amount: '90ml', color: 'bg-secondary' },
  green_tea: { name: '\u7eff\u8336', id: 'Green tea', amount: '90ml', color: 'bg-secondary' },
  simple_syrup: { name: '\u7cd6\u6d46', id: 'Simple syrup', amount: '10ml', color: 'bg-secondary' },
  cane_syrup: { name: '\u8517\u7cd6\u7cd6\u6d46', id: 'Cane syrup', amount: '10ml', color: 'bg-secondary' },
  grenadine: { name: '\u77f3\u69b4\u7cd6\u6d46', id: 'Grenadine', amount: '10ml', color: 'bg-secondary' },
  green_mint_syrup: { name: '\u7eff\u8584\u8377\u7cd6\u6d46', id: 'Green mint syrup', amount: '10ml', color: 'bg-secondary' },
  elderflower_cordial: { name: '\u63a5\u9aa8\u6728\u82b1\u6d53\u6d46', id: 'Elderflower cordial', amount: '10ml', color: 'bg-secondary' },
  ice_cubes: { name: '\u51b0\u5757', id: 'Ice cubes', amount: 'to taste', color: 'bg-secondary' },
  angostura_bitters: { name: '\u82e6\u7cbe\uff08Angostura Bitters\uff09', id: 'Angostura bitters', amount: '2 dashes', color: 'bg-secondary' },
  mint: { name: '\u8584\u8377', id: 'Mint', amount: 'a little', color: 'bg-secondary' },
};

export const garnishMap: Record<string, IngredientOption> = {
  cherry: { name: '\u7ea2\u6a31\u6843', id: 'Cherry', amount: '1 pc', color: 'bg-tertiary-dim' },
  orange_slice: { name: '\u6a59\u7247', id: 'Orange slice', amount: '1 pc', color: 'bg-tertiary-dim' },
  orange_peel: { name: '\u6a59\u76ae', id: 'Orange peel', amount: '1 strip', color: 'bg-tertiary-dim' },
  lemon_slice: { name: '\u67e0\u6aac\u7247', id: 'Lemon slice', amount: '1 pc', color: 'bg-tertiary-dim' },
  lemon_peel: { name: '\u67e0\u6aac\u76ae', id: 'Lemon peel', amount: '1 strip', color: 'bg-tertiary-dim' },
  lime_wedge: { name: '\u9752\u67e0\u89d2', id: 'Lime wedge', amount: '1 pc', color: 'bg-tertiary-dim' },
  lime_slice: { name: '\u9752\u67e0\u7247', id: 'Lime slice', amount: '1 pc', color: 'bg-tertiary-dim' },
  lime_peel: { name: '\u9752\u67e0\u76ae', id: 'Lime peel', amount: '1 strip', color: 'bg-tertiary-dim' },
  mint_leaf: { name: '\u8584\u8377\u53f6', id: 'Mint leaf', amount: '1 pc', color: 'bg-tertiary-dim' },
  celery_stick: { name: '\u82b9\u83dc', id: 'Celery stick', amount: '1 stick', color: 'bg-tertiary-dim' },
  olive: { name: '\u6a44\u6984', id: 'Olive', amount: '1 pc', color: 'bg-tertiary-dim' },
  sugar_rim: { name: '\u7cd6\u971c\u8fb9', id: 'Sugar rim', amount: '1 ring', color: 'bg-tertiary-dim' },
  salt_rim: { name: '\u76d0\u8fb9', id: 'Salt rim', amount: '1 ring', color: 'bg-tertiary-dim' },
  cocktail_umbrella: { name: '\u9e21\u5c3e\u9152\u4f1e', id: 'Cocktail umbrella', amount: '1 pc', color: 'bg-tertiary-dim' },
};

export const glasswareMap: Record<string, IngredientOption> = {
  martini: { name: '\u9a6c\u5929\u5c3c\u676f', id: 'Martini glass', amount: '1 pc', color: 'bg-outline' },
  old_fashioned: { name: '\u53e4\u5178\u676f', id: 'Old-Fashioned glass', amount: '1 pc', color: 'bg-outline' },
  collins: { name: '\u67ef\u6797\u676f', id: 'Collins glass', amount: '1 pc', color: 'bg-outline' },
  hurricane: { name: '\u98d3\u98ce\u676f', id: 'Hurricane cup', amount: '1 pc', color: 'bg-outline' },
  flute: { name: '\u7b1b\u5f62\u676f', id: 'Flute glass', amount: '1 pc', color: 'bg-outline' },
};

type BuildCocktailPromptInput = {
  base: string | null;
  mixers: string[];
  garnishes: string[];
  glassware: string | null;
  template?: CocktailPromptTemplate;
};

type PromptContext = {
  ingredientList: string;
  garnishList: string;
  glasswareName: string;
};

export type CocktailPromptTemplate = 'editorial' | 'cinematic' | 'minimal';

export const COCKTAIL_PROMPT_TEMPLATES: CocktailPromptTemplate[] = ['editorial', 'cinematic', 'minimal'];

function getSelectedIds(keys: string[], options: Record<string, IngredientOption>) {
  return keys.map((key) => options[key]?.id).filter((id): id is string => Boolean(id));
}

function toCommaList(items: string[]) {
  return items.filter(Boolean).join(', ');
}

function withIndefiniteArticle(noun: string) {
  const first = noun.trim().charAt(0).toLowerCase();
  const article = ['a', 'e', 'i', 'o', 'u'].includes(first) ? 'an' : 'a';
  return `${article} ${noun}`;
}

const promptTemplateBuilders: Record<CocktailPromptTemplate, (context: PromptContext) => string> = {
  editorial: ({ ingredientList, garnishList, glasswareName }) =>
    `A beautifully styled cocktail made with ${ingredientList}, garnished with ${garnishList}, served in ${withIndefiniteArticle(glasswareName)}. Studio drink photography, centered composition, clean background, realistic liquid texture, condensation on glass, cinematic lighting, high detail, premium editorial beverage shot.`,
  cinematic: ({ ingredientList, garnishList, glasswareName }) =>
    `An elegant craft cocktail made with ${ingredientList}, garnished with ${garnishList}, served in ${withIndefiniteArticle(glasswareName)}. Cinematic bar photography, dramatic side lighting, rich highlights on liquid, ultra-clean styling, shallow depth of field, premium advertising aesthetic, high detail.`,
  minimal: ({ ingredientList, garnishList, glasswareName }) =>
    `A modern cocktail made with ${ingredientList}, garnished with ${garnishList}, served in ${withIndefiniteArticle(glasswareName)}. Minimal studio drink photography, centered framing, soft shadow, clean backdrop, crisp glass reflections, realistic texture, high detail, refined premium look.`,
};

export function buildCocktailPrompt({
  base,
  mixers,
  garnishes,
  glassware,
  template = 'editorial',
}: BuildCocktailPromptInput) {
  const baseId = base ? baseMap[base]?.id || '' : '';
  const mixerIds = getSelectedIds(mixers, mixerMap);
  const garnishIds = getSelectedIds(garnishes, garnishMap);
  const glassId = glassware ? glasswareMap[glassware]?.id || 'cocktail glass' : 'cocktail glass';

  const ingredientParts = [baseId, ...mixerIds].filter(Boolean);
  const ingredientList = ingredientParts.length > 0 ? toCommaList(ingredientParts) : 'classic spirits';
  const garnishList = garnishIds.length > 0 ? toCommaList(garnishIds) : 'no garnish';

  const builder = promptTemplateBuilders[template] || promptTemplateBuilders.editorial;
  return builder({
    ingredientList,
    garnishList,
    glasswareName: glassId,
  });
}
