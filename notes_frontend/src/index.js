import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import htm from "htm";
import { App } from "./components/App.js";

const html = htm.bind(h);

render(html`<${App} />`, document.getElementById("app"));
