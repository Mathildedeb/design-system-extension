// Génère src/design-system/tokens.css et tokens.ts à partir de design-system/tokens.json.
// Usage : npm run tokens
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const tokens = JSON.parse(readFileSync(resolve(root, 'design-system/tokens.json'), 'utf8'))
const outDir = resolve(root, 'src/design-system')

const flat = []
const walk = (node, path) => {
  if (node && typeof node === 'object' && '$value' in node) {
    flat.push({ path, type: node.$type, value: node.$value })
    return
  }
  for (const [key, child] of Object.entries(node)) {
    if (!key.startsWith('$')) walk(child, [...path, key])
  }
}
walk(tokens, [])

const cssName = (path) => `--${path.join('-')}`
const ref = (value) =>
  typeof value === 'string'
    ? value.replace(/\{([^}]+)\}/g, (_, p) => `var(${cssName(p.split('.'))})`)
    : value

const familyStack = { Faune: "'Faune', Georgia, serif", 'General Sans': "'General Sans', system-ui, sans-serif" }

const toCss = ({ type, value }) => {
  switch (type) {
    case 'fontFamily':
      return familyStack[value] ?? value
    case 'shadow':
      return `${value.offsetX} ${value.offsetY} ${value.blur} ${value.spread} ${value.color}`
    case 'typography': {
      const style = value.fontStyle ?? 'normal'
      const lh = value.lineHeight
      return `${style} ${value.fontWeight} ${value.fontSize}/${lh} ${ref(value.fontFamily)}`
    }
    default:
      return ref(value)
  }
}

const css = [
  '/* Fichier généré par design-system/build-tokens.mjs — ne pas éditer à la main. */',
  ':root {',
  ...flat.map((t) => `  ${cssName(t.path)}: ${toCss(t)};`),
  '}',
  '',
].join('\n')

const ts = [
  '// Fichier généré par design-system/build-tokens.mjs — ne pas éditer à la main.',
  '// Chaque entrée renvoie la variable CSS correspondante (à utiliser dans style={{ ... }}).',
  `export const tokens = ${JSON.stringify(
    Object.fromEntries(flat.map((t) => [t.path.join('.'), `var(${cssName(t.path)})`])),
    null,
    2,
  )} as const`,
  '',
  'export type TokenName = keyof typeof tokens',
  '',
].join('\n')

mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'tokens.css'), css)
writeFileSync(resolve(outDir, 'tokens.ts'), ts)
console.log(`${flat.length} tokens générés dans src/design-system/`)
