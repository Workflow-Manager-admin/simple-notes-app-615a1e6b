import { h } from "preact";
import htm from "htm";
const html = htm.bind(h);

// PUBLIC_INTERFACE
export function Header({ title, color }) {
  /**
   * App header bar.
   * @param {string} title - The app title.
   * @param {string} color - The main color (for styling header bg).
   */
  return html`
    <header class="header" style=${{ background: color }}>
      <span class="header-title">${title}</span>
    </header>
  `;
}
