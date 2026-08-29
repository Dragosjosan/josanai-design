# Shared design

Plain CSS design tokens and reusable elements. There is no build step or package to maintain.

## Add as a submodule

From the consuming repository:

```sh
git submodule add  frontend/src/design
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

Set `data-theme="dark"`, `data-density="compact"`, or `data-skin="document"` on the `<html>` element to enable the included variants.
