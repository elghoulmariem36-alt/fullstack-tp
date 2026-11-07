const ICONS: [RegExp, string][] = [
  [/wash/i, '\u{1F9FA}'],
  [/\btv\b|television/i, '\u{1F4FA}'],
  [/air|condition|clim/i, '\u2744\uFE0F'],
  [/\bpc\b|computer|laptop/i, '\u{1F4BB}'],
  [/microwave/i, '\u{1F372}'],
  [/oven|cooker|stove/i, '\u{1F525}'],
  [/vacuum/i, '\u{1F9F9}'],
  [/fridge|refrigerator|freezer/i, '\u{1F9CA}'],
  [/light|lamp|bulb/i, '\u{1F4A1}'],
  [/\bfan\b/i, '\u{1F300}'],
];

export function applianceIcon(name: string): string {
  const match = ICONS.find(([pattern]) => pattern.test(name));
  return match ? match[1] : '\u{1F50C}';
}
