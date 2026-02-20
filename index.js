// Odds and Events (vanilla DOM)
// Mounts to #app if present, otherwise mounts to <body> (so it won't be blank).

// --------------------
// State
// --------------------
const state = {
  numberBank: [],
  odds: [],
  evens: [],
};

// --------------------
// Helpers
// --------------------
function toNumber(value) {
  const num = parseInt(value, 10);
  return Number.isNaN(num) ? null : num;
}

function isEven(n) {
  return n % 2 === 0;
}

function sortOne() {
  if (state.numberBank.length === 0) return;

  const n = state.numberBank.shift(); // remove first
  if (isEven(n)) state.evens.push(n);
  else state.odds.push(n);
}

function sortAll() {
  while (state.numberBank.length > 0) {
    sortOne();
  }
}

// --------------------
// Components
// --------------------
function Title() {
  const h1 = document.createElement("h1");
  h1.textContent = "Odds and Events";
  return h1;
}

function Controls() {
  const form = document.createElement("form");
  form.id = "controls";

  const input = document.createElement("input");
  input.type = "number";
  input.name = "number";
  input.placeholder = "Add a number";

  const addBtn = document.createElement("button");
  addBtn.type = "submit";
  addBtn.textContent = "Add Number";

  const sortOneBtn = document.createElement("button");
  sortOneBtn.type = "button";
  sortOneBtn.textContent = "Sort 1";

  const sortAllBtn = document.createElement("button");
  sortAllBtn.type = "button";
  sortAllBtn.textContent = "Sort All";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const n = toNumber(input.value);
    if (n !== null) state.numberBank.push(n);
    input.value = "";
    render();
  });

  sortOneBtn.addEventListener("click", () => {
    sortOne();
    render();
  });

  sortAllBtn.addEventListener("click", () => {
    sortAll();
    render();
  });

  form.append(input, addBtn, sortOneBtn, sortAllBtn);
  return form;
}

function NumberList(titleText, numbers) {
  const section = document.createElement("section");
  section.className = "panel";

  const title = document.createElement("h2");
  title.textContent = titleText;

  const list = document.createElement("ul");
  list.className = "numbers";

  for (let i = 0; i < numbers.length; i++) {
    const li = document.createElement("li");
    li.className = "pill";
    li.textContent = numbers[i];
    list.appendChild(li);
  }

  section.append(title, list);
  return section;
}

function Layout() {
  const wrapper = document.createElement("div");
  wrapper.id = "wrapper";

  const panels = document.createElement("div");
  panels.id = "panels";

  panels.append(
    NumberList("Number Bank", state.numberBank),
    NumberList("Odds", state.odds),
    NumberList("Evens", state.evens)
  );

  wrapper.append(Title(), Controls(), panels);
  return wrapper;
}

// --------------------
// Render / Mount
// --------------------
function getRoot() {
  // Prefer #app if it exists
  let root = document.querySelector("#app");

  // If not, create one so we still show something without editing HTML
  if (!root) {
    root = document.createElement("div");
    root.id = "app";
    document.body.appendChild(root);
  }

  return root;
}

function render() {
  const root = getRoot();
  root.innerHTML = "";
  root.appendChild(Layout());
}

render();