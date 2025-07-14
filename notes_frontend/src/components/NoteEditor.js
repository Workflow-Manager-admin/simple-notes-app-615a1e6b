import { h } from "preact";
import htm from "htm";
import { useEffect, useState } from "preact/hooks";
const html = htm.bind(h);

// PUBLIC_INTERFACE
export function NoteEditor({ note, onUpdateNote, accentColor }) {
  /**
   * Edit/view note pane.
   */
  const [title, setTitle] = useState(note ? note.title : "");
  const [body, setBody] = useState(note ? note.body : "");

  // Reset editor on note switch
  useEffect(() => {
    setTitle(note ? note.title : "");
    setBody(note ? note.body : "");
  }, [note && note.id]);

  if (!note) {
    return html`<section class="note-editor empty"><p>Select or create a note</p></section>`;
  }

  // Save on blur/change
  function handleSave() {
    if (note.title !== title || note.body !== body) {
      onUpdateNote({ ...note, title, body });
    }
  }

  return html`
    <section class="note-editor">
      <input
        class="editor-title"
        value=${title}
        placeholder="Note title"
        style=${{ borderBottomColor: accentColor }}
        onInput=${e => setTitle(e.target.value)}
        onBlur=${handleSave}
        aria-label="Note title"
      />
      <textarea
        class="editor-body"
        value=${body}
        rows="12"
        placeholder="Write your note here..."
        style=${{ borderColor: accentColor }}
        onInput=${e => setBody(e.target.value)}
        onBlur=${handleSave}
        aria-label="Note content"
      />
      <div class="editor-timestamps">
        Created: ${new Date(note.created).toLocaleString()}<br/>
        Updated: ${new Date(note.updated).toLocaleString()}
      </div>
    </section>
  `;
}
