/* Optional enhancement for [data-tabs]. Frameworks can manage the same ARIA
   attributes themselves and use the CSS without loading this file. */
(() => {
  function initTabs(scope = document) {
    const groups = [...scope.querySelectorAll('[data-tabs]')];
    if (scope.matches?.('[data-tabs]')) groups.unshift(scope);
    groups.forEach((group) => {
      if (group.dataset.tabsReady) return;
      const list = group.querySelector('[role="tablist"]');
      if (!list) return;
      const tabs = () => [...list.querySelectorAll('[role="tab"]')]
        .filter((tab) => tab.closest('[role="tablist"]') === list);
      const enabled = () => tabs().filter((tab) => !tab.disabled && tab.getAttribute('aria-disabled') !== 'true');
      const activate = (selected, focus = false) => {
        if (!enabled().includes(selected)) return;
        tabs().forEach((tab) => {
          const active = tab === selected;
          tab.setAttribute('aria-selected', String(active));
          tab.tabIndex = active ? 0 : -1;
          const panel = document.getElementById(tab.getAttribute('aria-controls'));
          if (panel?.closest('[data-tabs]') === group) panel.hidden = !active;
        });
        if (focus) selected.focus();
      };
      activate(enabled().find((tab) => tab.getAttribute('aria-selected') === 'true') || enabled()[0]);
      list.addEventListener('click', (event) => {
        const tab = event.target.closest('[role="tab"]');
        if (tab) activate(tab);
      });
      list.addEventListener('keydown', (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        const items = enabled();
        const index = items.indexOf(event.target.closest('[role="tab"]'));
        if (index < 0) return;
        const vertical = list.getAttribute('aria-orientation') === 'vertical';
        const rtl = getComputedStyle(list).direction === 'rtl';
        const next = vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight';
        const previous = vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft';
        let target;
        if (event.key === next) target = items[(index + 1) % items.length];
        else if (event.key === previous) target = items[(index - 1 + items.length) % items.length];
        else if (event.key === 'Home') target = items[0];
        else if (event.key === 'End') target = items[items.length - 1];
        if (target) { event.preventDefault(); activate(target, true); }
      });
      group.dataset.tabsReady = 'true';
    });
  }
  window.JosanDesign = { ...window.JosanDesign, initTabs };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initTabs(), { once: true });
  else initTabs();
})();
