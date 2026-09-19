/**
 * @copyright codewithsadee 2023
 * @author Sadee <codewithsadee24@gmail.com>
 */

"use strict";
/**

/**
 * Theme toggle.
 *
 * The theme is stored as a `data-theme` attribute on the <html> element
 * ("light" | "dark"); CSS swaps the design tokens through attribute selectors.
 * The user's choice is persisted in localStorage (key: "theme") so it survives
 * reloads, while first-time visitors fall back to their OS preference.
 *
 * This script is loaded in <head> without `defer`, so the initial theme is
 * applied synchronously (the <html> element already exists during parse) and
 * only the DOM-dependent parts are deferred until DOMContentLoaded.
 */

const THEME_STORAGE_KEY = "theme";

/** Valid theme values — guards against corrupted localStorage data. */
const THEMES = ["light", "dark"];

/**
 * Return the theme to apply on first load:
 * 1. The saved preference, if present and valid.
 * 2. The OS preference via `prefers-color-scheme`, when available.
 * 3. "light" as the final fallback.
 */
function getInitialTheme() {
 try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (THEMES.includes(saved)) return saved;
  } catch {
    // localStorage can throw in private/blocked-storage contexts — ignore it.
  }

  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

/** Switch the document to the given theme. */
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

/** Persist the user's choice. Failures must not break the toggle in-session. */
function persistTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (e.g. Safari private mode) — theme still applies now.
  }
}

/**
 * Keep the button's accessible name meaningful. Both icon <span>s are
 * aria-hidden (the CSS shows only the relevant one), so without this the
 * button would have no name for assistive tech.
 */
function syncThemeButton(themeBtn, theme) {
  themeBtn.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
}

/** Bind the toggle once the DOM exists (script is loaded in <head>). */
function initThemeToggle() {
  const themeBtn = document.querySelector("[data-theme-btn]");
  if (!themeBtn) return;

  syncThemeButton(themeBtn, document.documentElement.getAttribute("data-theme"));

  themeBtn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";

    setTheme(nextTheme);
    persistTheme(nextTheme);
    syncThemeButton(themeBtn, nextTheme);
  });
}

 //Apply the initial theme before the first paint (not just DOM-parse time).
setTheme(getInitialTheme());

document.addEventListener("DOMContentLoaded", initThemeToggle);

// ---------------------------------------------------------------------vidieo

/**
 *   Light and dark mode
 */

// the work of the video have problem next in the understaund phase i learn
// const /** {NodeElement} */ $themeBtn=document.querySelector("[data-theme-btn]");
//const /** {NodeElement} */ $HTML = document.documentElement;
//let /** {Boolean | String} */ isDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
//
//if (sessionStorage.getItem("theme")) {
//  $HTML.dataset.theme =sessionStorage.getItem("theme");
//} else{
//  $HTML.dataset.theme = isDark ? "dark" : "light";
//  sessionStorage.setItem("theme",$HTML.dataset.theme);
//}
//
//const changeTheme = () => {
//
//   $HTML.dataset.theme = sessionStorage.getItem("theme") == "light" ? "dark" : "light";
//   sessionStorage.setItem("theme", $HTML.dataset.theme);
//}
//
//$themeBtn.addEventListener("click", changeTheme);


/**
 * TAB
 */


const /** {NodeList} */ $tabBtn= document.querySelectorAll("[data-tab-btn]");
let /** {NodeElement} */   [lastActiveTab] = document.querySelectorAll("[data-tab-content]");
let /** {NodeElement} */ [lastActiveTabBtn] = $tabBtn ;

$tabBtn.forEach(item => {
    item.addEventListener("click", function() {

    lastActiveTab.classList.remove("active");
    lastActiveTabBtn.classList.remove("active");

    const /** {NodeElement} */ tabContent = document.querySelector('[data-tab-content="${item.dataset.tabBtn}"]');
    $tabContent.classList.add("active");
    this.classList.add("active");

    lastActiveTab = $tabContent;
    lastActiveTabBtn= this;

   })
})








