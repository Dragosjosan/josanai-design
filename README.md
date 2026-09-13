# Shared design

Plain CSS design tokens, layout primitives, semantic defaults, and reusable
components. There is no build step or package to maintain.

Open [`showcase.html`](./showcase.html) for the complete visual reference.

## Add as a submodule

From the consuming repository:

```sh
git submodule add git@github.com:Dragosjosan/josanai-design.git frontend/src/design
git submodule update --init
```

## Use the design elements

Import the files once in the frontend entry point, before the project's own CSS:

```ts
import "./design/fonts.css";
import "./design/tokens.css";
import "./design/elements.css";
import "./App.css";
```

Use the variables and classes directly:

```html
<button class="btn btn-primary">Save</button> <input class="input" />
```

## Foundations

Spacing follows a 4px scale from `--space-1` (4px) through `--space-20`
(80px). Type tokens run from `--text-xs` (11px) through `--text-3xl`
(40px), with matching `.text-*` utilities.

The original cool white and ink palette stays deliberately small. Teal is the
default accent; gray, black, and muted blue are also available.
Component surfaces and buttons use `--radius` (4px). Switches use a rounded
track and circular thumb; status dots and loading indicators are also circular.

Set `data-accent="teal|gray|black|blue"` on the page or a component:

```html
<html lang="en" data-accent="gray">

<button class="btn btn-primary" data-accent="black">Save</button>
```

The showcase's **Accent** selector previews each palette. Accents apply to
primary buttons, links, focus indicators, toggles, and informational states.
Success, warning, and error colors keep their meaning across palettes.
`--on-accent` supplies the contrasting foreground for filled controls.
Accents use CSS `light-dark()` with the existing `color-scheme`, including in
nested dark sections. Black becomes a light neutral in dark mode for contrast.

Semantic color is reserved for small indicators and field errors. The four
states retain their soft, ink, and border tokens for compatibility, but those
tokens now resolve to neutral surfaces, text, and hairlines:

```css
--info;
--info-soft;
--info-ink;
--info-border;

--success;
--warning;
--danger; /* also available as --alert-* aliases */
```

## Layout

Use the primitives on any elements. Their spacing can be changed with a
modifier or a local custom property.

```html
<main class="container section">
  <div class="stack stack-lg">
    <header class="row row-between">
      <h1>Projects</h1>
      <button class="btn btn-primary">New project</button>
    </header>

    <div class="grid grid-3">
      <article class="card">...</article>
      <article class="card">...</article>
      <article class="card">...</article>
    </div>
  </div>
</main>
```

Available primitives include `.container`, `.stack`, `.row`, `.grid`,
`.split`, `.spacer`, and `.section`. The fixed two- and three-column grids and
`.split` collapse at 720px.

## Components

The component layer includes:

- `.btn`, `.iconbtn`, `.input`, `.field`, and `.check-row`
- `.card` with header, footer, title, compact, and soft helpers
- `.badge` with neutral and semantic state modifiers
- `.alert` with info, success, warning, and danger modifiers
- `.table` and `.table-wrap`
- `.divider` and `.divider-label`
- `.spinner` in three sizes
- `.empty-state`
- `.sidepanel`
- `.metrics` with value, unit, and supporting-note helpers
- `.tabs`, `.selection-group`, and `.option-group`
- Native `.progress` and `.meter` elements
- `.chart` presentation, legends, readouts, and data-series tokens
- `.activity-list`, `.form-group`, `.form-check`, and `.repeat-list`

See [Application patterns](./PATTERNS.md) for markup and behavior guidance.
The optional `behaviors.js` adds accessible keyboard and selection behavior to
`[data-tabs]` groups. Other new form controls use native browser behavior;
applications own data updates, chart interactions, and repeatable rows.

All buttons have a visible border, padding, and the shared corner radius.
Legacy `.btn-ghost`, `.iconbtn.ghost`, and `.linkbtn` classes remain supported
as outlined buttons; ordinary navigation links remain text links.

Controls use a 40px default height and a separate `--control-border` token so
interactive boundaries stay distinct from decorative hairlines. At mobile
widths or with a coarse pointer, buttons have at least 44px targets and inputs
use 16px text. Buttons include hover, focus, pressed, and disabled states.
Use `.icon` on inline SVGs for a consistent 16px size and 1.5px stroke.

Badges are unboxed labels with a small colored dot. Alerts are compact text
rows with a bare icon and a neutral separator. They have no tinted fill.
The legacy `.badge-solid` modifier adds a neutral background. `.soft` uses a
neutral surface with a thin colored leading edge.

```html
<span class="badge badge-success">Complete</span>

<div class="alert alert-warning" role="alert">
  <span class="alert-icon" aria-hidden="true">!</span>
  <div class="alert-content">
    <h3 class="alert-title">Usage approaching the limit</h3>
    <p>This workspace has used 82% of its allowance.</p>
  </div>
</div>
```

Native headings, paragraphs, links, lists, blockquotes, inline code, code
blocks, keyboard input, rules, and tables receive readable semantic defaults.

The existing `data-density="compact"`, `data-skin="document"`, and legacy
`data-theme="dark"` attributes remain supported for consuming projects. The
showcase itself presents the default light appearance.

The showcase gives each numbered section its own row, with a consistent label
column and example area that stack on mobile. Its forms, dismissible update, and native settings dialog are
interactive previews; changes are kept only for the current page session.
