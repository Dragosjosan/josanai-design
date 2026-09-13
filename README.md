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

The original cool white, ink, and teal palette stays deliberately small.
All component surfaces and controls use `--radius` (4px); only status dots
and circular loading indicators use a circular shape.

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

All buttons have a visible border, padding, and the shared corner radius.
Legacy `.btn-ghost`, `.iconbtn.ghost`, and `.linkbtn` classes remain supported
as outlined buttons; ordinary navigation links remain text links.

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

The showcase uses an asymmetric specimen layout that collapses into a readable
mobile sequence. Its forms, dismissible update, and native settings dialog are
interactive previews; changes are kept only for the current page session.
