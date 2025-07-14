import { h } from "preact";
import htm from "htm";
import { useState, useEffect } from "preact/hooks";
import { v4 as uuidv4 } from "uuid";
import { Header } from "./Header.js";
import { Sidebar } from "./Sidebar.js";
import { NotesList } from "./NotesList.js";
import { NoteEditor } from "./NoteEditor.js";

const html = htm.bind(h);

// Util to load from localStorage
function loadNotes() {
  try {
    const raw = localStorage.getItem("notes");
    if (raw) return JSON.parse(raw);
  } catch { }
  return [];
}

// Save to localStorage
function saveNotes(notes) {
  try {
    localStorage.setItem("notes", JSON.stringify(notes));
  } catch { }
}

// Main app colors
const COLORS = {
  primary: "#007bff",
  secondary: "#6c757d",
  accent: "#17a2b8"
};

// PUBLIC_INTERFACE
export function App() {
  /**
   * Main application component for Simple Notes App.
   * Provides CRUD and search; minimalistic UI; persists data locally.
   */
  const [notes, setNotes] = useState(loadNotes());
  const [selectedId, setSelectedId] = useState(
    notes.length > 0 ? notes[0].id : null
  );
  const [search, setSearch] = useState("");

  // Keep localStorage up-to-date.
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Choose which notes to show, based on search.
  const filteredNotes = search.trim()
    ? notes.filter(
        n =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.body.toLowerCase().includes(search.toLowerCase())
      )
    : notes;

  // Select most relevant note if none is selected
  useEffect(() => {
    if (
      filteredNotes.length &&
      !filteredNotes.some((n) => n.id === selectedId)
    ) {
      setSelectedId(filteredNotes[0].id);
    }
    if (!filteredNotes.length) setSelectedId(null);
  }, [filteredNotes, selectedId]);

  // CRUD handlers
  function handleCreateNote() {
    const newNote = {
      id: uuidv4(),
      title: "Untitled Note",
      body: "",
      created: Date.now(),
      updated: Date.now()
    };
    setNotes([newNote, ...notes]);
    setSelectedId(newNote.id);
  }

  function handleUpdateNote(updatedNote) {
    setNotes(notes =>
      notes.map(n =>
        n.id === updatedNote.id ? { ...updatedNote, updated: Date.now() } : n
      )
    );
  }

  function handleDeleteNote(id) {
    const idx = notes.findIndex((n) => n.id === id);
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes);
    // Select next note if possible
    if (selectedId === id && newNotes.length > 0) {
      setSelectedId(
        newNotes[idx] ? newNotes[idx].id
          : newNotes[newNotes.length - 1].id
      );
    } else if (newNotes.length === 0) {
      setSelectedId(null);
    }
  }

  function handleSelectNote(id) {
    setSelectedId(id);
  }

  function handleSetSearch(query) {
    setSearch(query);
  }

  const selectedNote = notes.find(n => n.id === selectedId);

  return html`
    <div class="app-container">
      <${Header} title="Simple Notes" color=${COLORS.primary} />
      <main class="main-layout">
        <${Sidebar}
          onCreateNote=${handleCreateNote}
          search=${search}
          onSearch=${handleSetSearch}
        />
        <${NotesList}
          notes=${filteredNotes}
          selectedId=${selectedId}
          onSelectNote=${handleSelectNote}
          onDeleteNote=${handleDeleteNote}
        />
        <${NoteEditor}
          note=${selectedNote}
          onUpdateNote=${handleUpdateNote}
          accentColor=${COLORS.accent}
        />
      </main>
    </div>
  `;
}
