# Application patterns

Import `tokens.css` and `elements.css` as usual. All patterns inherit the selected
accent, appearance, typography, and 4px radius. The interactive examples are in
`showcase.html`, starting at **09 / Metrics**.

## Metric strips

Use a description list so each value stays associated with its label. Add
`.metric-primary` to emphasize one value. The strip becomes two columns at 720px.

```html
<dl class="metrics">
  <div class="metric metric-primary">
    <dt class="metric-label">Completion</dt>
    <dd class="metric-value">84<span class="metric-unit">%</span></dd>
    <dd class="metric-note">This week</dd>
  </div>
  <div class="metric">
    <dt class="metric-label">Processed</dt>
    <dd class="metric-value">128</dd>
    <dd class="metric-note">Across 4 sources</dd>
  </div>
</dl>
```

## Tabs

Use unique IDs for every tab and panel. The selected tab has `aria-selected="true"`
and `tabindex="0"`; other tabs have `tabindex="-1"` and hidden panels.

```html
<div data-tabs>
  <div class="tabs" role="tablist" aria-label="Workspace views">
    <button class="tab" type="button" id="tab-overview" role="tab"
      aria-controls="panel-overview" aria-selected="true">Overview</button>
    <button class="tab" type="button" id="tab-activity" role="tab"
      aria-controls="panel-activity" aria-selected="false" tabindex="-1">Activity</button>
  </div>
  <div class="tab-panel" id="panel-overview" role="tabpanel"
    aria-labelledby="tab-overview" tabindex="0">Overview content</div>
  <div class="tab-panel" id="panel-activity" role="tabpanel"
    aria-labelledby="tab-activity" tabindex="0" hidden>Activity content</div>
</div>
```

For plain HTML, load the optional enhancement once:

```html
<script src="./design/behaviors.js" defer></script>
```

It handles click, arrow keys, Home/End, focus, disabled tabs, and panel visibility
inside `[data-tabs]`. It supports `aria-orientation="vertical"` and RTL direction.
Call `JosanDesign.initTabs(container)` after inserting a new group dynamically.
Initialization is idempotent.

Framework applications can omit this script and manage the same ARIA attributes
and `hidden` state themselves. Do not attach both controllers to the same group.

## Selection groups and option cards

Use native radios for one choice, or checkboxes for multiple choices. Group them
with a labeled fieldset. Every independent radio group needs a distinct `name`.
The native input supplies keyboard behavior and exposes the selected state.

```html
<fieldset class="form-group">
  <legend>Reporting period</legend>
  <div class="selection-group">
    <label class="choice"><input type="radio" name="period" value="week" checked>Week</label>
    <label class="choice"><input type="radio" name="period" value="month">Month</label>
  </div>
</fieldset>
```

For choices that need a value or explanation, use `.option-group` and `.option`:

```html
<fieldset class="form-group">
  <legend>Run frequency</legend>
  <div class="option-group">
    <label class="option">
      <span class="option-head">
        <span class="option-title">Daily</span>
        <input type="radio" name="frequency" value="daily" checked>
      </span>
      <span class="option-value">7 <span class="metric-unit">runs / week</span></span>
      <span class="option-note">Every morning at 09:00.</span>
    </label>
  </div>
</fieldset>
```

Selection uses the input indicator and accent border, with a neutral background.
Option cards stack at 480px. Inputs support native `disabled` states.

## Progress and meters

Use `<progress>` for task completion and `<meter>` for a measurement within a
known range. Always associate a visible label and show a readable value. Set
`min`, `max`, `low`, `high`, and `optimum` according to the measurement's meaning.

```html
<label class="measure-label" for="import-progress">Import complete <span>84%</span></label>
<progress class="progress" id="import-progress" value="84" max="100">84%</progress>

<label class="measure-label" for="storage">Storage used <span>68 / 100 GB</span></label>
<meter class="meter" id="storage" min="0" max="100" low="20" high="80"
  optimum="50" value="68">68 of 100 GB</meter>
```

Keep values and labels synchronized in the application. A meter can use the
warning or danger color for a suboptimal value; include explanatory text so color
is never the only indicator.

## Chart presentation

The shared CSS provides presentation, independent of the rendering library:

- `.chart`, `.chart-header`, `.chart-title`, `.chart-caption`
- `.chart-plot`, `.chart-svg`, `.chart-axis`, `.chart-grid`
- `.chart-line`, `.chart-point`, `.chart-reference`, `.chart-cursor`
- `.chart-legend`, `.legend-key`, `.legend-label`
- `.chart-tooltip`, `.chart-tooltip-row`, `.chart-tooltip-value`

Use `--chart-1`, `--chart-2`, and `--chart-3` for data series. Set `--series-color`
on a series, legend item, or readout row to choose its color. These colors adapt
to dark mode and remain independent of the page accent and semantic states.
Use line styles and text labels to distinguish series as well as color.

`.chart-svg` keeps a 480px minimum drawing width; `.chart-plot` contains horizontal
scrolling. Give the scroll region an accessible label and keyboard focus. Supply
an SVG title/description and a readable data table. The showcase demonstrates a
native range input (`.range`) for touch and keyboard inspection, plus legend
buttons with `aria-pressed` and a visible readout. Its values are demonstration
data; chart rendering, visibility, inspection, and export belong to the app.

## Activity and schedule lists

```html
<ol class="activity-list">
  <li class="activity-item">
    <time class="activity-time" datetime="2026-09-14T09:00">Mon · 09:00</time>
    <span class="activity-title">Import completed</span>
    <span class="activity-value">128 items</span>
  </li>
</ol>
```

An item can use a `.badge` or button in place of the trailing value. Render time
zones and relative dates according to the application's requirements.

## Form groups and repeatable rows

Use `.form-group` with a `<legend>`, `.form-check` for labeled checkboxes/radios,
and `.field-help` for descriptions connected with `aria-describedby`.
`textarea.input` resizes vertically; inputs support `disabled` and `readonly`.

```html
<label class="form-check"><input type="checkbox" name="report">Email the report</label>
<div class="field">
  <label class="field-label" for="notes">Notes</label>
  <textarea class="input" id="notes" aria-describedby="notes-help"></textarea>
  <p class="field-help" id="notes-help">Included with the report.</p>
</div>
```

`.repeat-list` contains `.repeat-row` elements. Each row lays out two `.field`
children and an action button; fields stack on small screens. Give every new
input a unique ID and associated label, label remove buttons with their row,
and return focus to a remaining row after removal. Announce changes with a
status message. The application owns adding, removing, validating, and saving
rows; the showcase provides a small working example.
