import { h } from "preact";
import htm from "htm";
const html = htm.bind(h);

// PUBLIC_INTERFACE
export function NotesList({ notes, selectedId, onSelectNote, onDeleteNote }) {
  /**
   * List of notes, selectable and deletable.
   */
  return html`
    <section class="notes-list">
      ${notes.length === 0 && html`<div class="empty-placeholder">No notes found.</div>`}
      ${notes.map(note => html`
        <div
          key=${note.id}
          class=${"note-list-item" + (note.id === selectedId ? " selected" : "")}
          tabIndex="0"
          onClick=${() => onSelectNote(note.id)}
          onKeyDown=${(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onSelectNote(note.id);
            }
          }}
          aria-selected=${note.id === selectedId}
        >
          <span class="note-title">${note.title || <em>Untitled</em>}</span>
          <button class="delete-btn" onClick=${e => { e.stopPropagation(); onDeleteNote(note.id); }} title="Delete">🗑</button>
        </div>
      `)}
    </section>
  `;
}
