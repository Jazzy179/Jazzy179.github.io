const tabs = Array.from(document.querySelectorAll("[data-tab]"));
const panels = Array.from(document.querySelectorAll(".tab-panel"));

function selectTab(tabId, options = {}) {
  const selectedTab = tabs.find((tab) => tab.dataset.tab === tabId);
  if (!selectedTab) return;

  tabs.forEach((tab) => {
    const active = tab === selectedTab;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  panels.forEach((panel) => {
    panel.hidden = panel.id !== `panel-${tabId}`;
  });

  if (options.scroll) {
    document.querySelector(".profile-content").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (options.focus) selectedTab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab.dataset.tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    selectTab(tabs[nextIndex].dataset.tab, { focus: true });
  });
});

document.querySelectorAll("[data-open-tab]").forEach((control) => {
  control.addEventListener("click", () => selectTab(control.dataset.openTab, { scroll: true }));
});

if (window.lucide) window.lucide.createIcons();
