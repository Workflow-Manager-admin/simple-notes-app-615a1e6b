import { h } from "preact";
import htm from "htm";
const html = htm.bind(h);

// PUBLIC_INTERFACE
export function Sidebar({ onCreateNote, search, onSearch }) {
  /**
   * Sidebar navigation: create and search.
   */
  return html`
    <aside class="sidebar">
      <button class="create-btn" onClick=${onCreateNote}>
        ＋ New Note
      </button>
      <input
        class="search-input"
        type="search"
        value=${search}
        placeholder="Search notes..."
        onInput=${e => onSearch(e.target.value)}
        aria-label="Search notes"
      />
    </aside>
  `;
}
