// ============================================
// LESSON 10 — CLASSWORK EXERCISE: To-Do List (the Week 5 deliverable)
// index.html and styles.css are GIVEN. You write this file.
// All three go at the ROOT of iyf-s12-week-05-{username}.
//
// THE RULE: the array is the truth, the page is a picture of it.
//   Every action = (1) change `todos`  (2) call render()
//   Never change the page directly in one place and the array in another.
//
// textContent for task text · ONE click listener on the list · const/let only
// ============================================

// ---------- DOM elements (given) ----------
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const formError = document.getElementById("form-error");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// ---------- State (given) ----------
let todos = [];            // [{ id, text, completed }]
let currentFilter = "all"; // "all" | "active" | "completed"
let nextId = 1;
let editingId = null;      // id of the task being edited, or null


// ============================================
// STEP 1 — render the list from the array
// ============================================

// TODO 1a: createTodoElement(todo) returns an <li class="todo-item" data-id="…"> containing:
//   - <input type="checkbox" class="toggle">  (checked if completed)
//   - <span class="todo-text">  ← text via textContent, NOT innerHTML
//   - <button type="button" class="delete">✕</button>  with aria-label `Delete "…"`
//   and the class "completed" on the li when todo.completed is true
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "toggle";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `Mark "${todo.text}" as done`);

    li.append(checkbox);

    if (todo.id === editingId) {
        // editing mode: draw an input instead of the text
        const edit = document.createElement("input");
        edit.type = "text";
        edit.className = "edit";
        edit.value = todo.text;
        edit.setAttribute("aria-label", "Edit task");
        li.append(edit);
    } else {
        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text; // textContent, never innerHTML
        li.append(span);
    }

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete";
    del.textContent = "✕";
    del.setAttribute("aria-label", `Delete "${todo.text}"`);
    li.append(del);

    return li;
}

// TODO 1b: visibleTodos() returns todos filtered by currentFilter
function visibleTodos() {
    if (currentFilter === "active") return todos.filter((t) => !t.completed);
    if (currentFilter === "completed") return todos.filter((t) => t.completed);
    return todos;
}

// TODO 1c: render() — replace the list's children with the visible todos, then updateStats()
//   hint: todoList.replaceChildren(...visibleTodos().map(createTodoElement))
function render() {
    todoList.replaceChildren(...visibleTodos().map(createTodoElement));
    updateStats();

    // when editing, put the cursor in the edit box
    const edit = todoList.querySelector(".edit");
    if (edit) {
        edit.focus();
        edit.setSelectionRange(edit.value.length, edit.value.length);
    }
}

// TODO 1d: updateStats() — "1 item left" / "3 items left" (watch the plural)
function updateStats() {
    const count = todos.filter((t) => !t.completed).length;
    itemsLeft.textContent = `${count} ${count === 1 ? "item" : "items"} left`;
}


// ============================================
// STEP 2 — add a task
// ============================================

// TODO 2a: addTodo(text) — push { id: nextId++, text, completed: false }, then render()
function addTodo(text) {
    todos.push({ id: nextId++, text, completed: false });
    render();
}

// TODO 2b: listen for SUBMIT on the form (so Enter works too)
//   - event.preventDefault()   (why? try it without)
//   - trim the value; if empty, show "Type a task first." in formError and stop
//   - otherwise clear the error, addTodo, empty the input, focus it
form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop the browser reloading the page
    const text = input.value.trim();
    if (text === "") {
        formError.textContent = "Type a task first.";
        return;
    }
    formError.textContent = "";
    addTodo(text);
    input.value = "";
    input.focus();
});

// ✅ Commit:  git commit -m "Add: add tasks to the list"


// ============================================
// STEP 3 — toggle and delete with ONE delegated listener
// ============================================

// TODO 3a: toggleTodo(id) and deleteTodo(id) — change the array, then render()
function toggleTodo(id) {
    const todo = todos.find((t) => t.id === id);
    if (todo) todo.completed = !todo.completed;
    render();
}
function deleteTodo(id) {
    todos = todos.filter((t) => t.id !== id);
    render();
}

// TODO 3b: ONE click listener on todoList:
//   - const item = event.target.closest(".todo-item");  if (!item) return;
//   - const id = Number(item.dataset.id);               ← dataset gives strings!
//   - if the click was inside .delete → deleteTodo(id) and return   (check delete FIRST)
//   - otherwise → toggleTodo(id)
todoList.addEventListener("click", (event) => {
    const item = event.target.closest(".todo-item");
    if (!item) return;
    if (event.target.closest(".edit")) return; // clicking inside the edit box does nothing
    const id = Number(item.dataset.id); // dataset gives strings!

    if (event.target.closest(".delete")) {
        deleteTodo(id);
        return;
    }
    toggleTodo(id);
});
//
// TEST: add a task AFTER the page loaded and click it. Does it toggle? That's delegation.

// ✅ Commit:  git commit -m "Add: toggle and delete with event delegation"


// ============================================
// STEP 4 — filters, stats, clear completed
// ============================================

function filterTodos(filter) {
    currentFilter = filter;
    filters.forEach((btn) => {
        const isActive = btn.dataset.filter === filter;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
    });
    render();
}

filters.forEach((btn) => {
    btn.addEventListener("click", () => filterTodos(btn.dataset.filter));
});

function clearCompleted() {
    todos = todos.filter((t) => !t.completed);
    render();
}

clearCompletedBtn.addEventListener("click", clearCompleted);

// ✅ Commit:  git commit -m "Add: filters, stats and clear completed"


// ============================================
// STEP 5 — BONUS: double-click to edit
//   dblclick on .todo-text → show an <input class="edit"> with the text
//   Enter saves (trimmed; empty keeps the old text) · Escape cancels
//   hint: keep an `editingId` in state and let createTodoElement draw the input

todoList.addEventListener("dblclick", (event) => {
    const textEl = event.target.closest(".todo-text");
    if (!textEl) return;
    editingId = Number(textEl.closest(".todo-item").dataset.id);
    render();
});

function saveEdit(newText) {
    const todo = todos.find((t) => t.id === editingId);
    const trimmed = newText.trim();
    if (todo && trimmed !== "") todo.text = trimmed; // empty keeps the old text
    editingId = null;
    render();
}

function cancelEdit() {
    editingId = null;
    render();
}

todoList.addEventListener("keydown", (event) => {
    if (!event.target.classList.contains("edit")) return;
    if (event.key === "Enter") saveEdit(event.target.value);
    else if (event.key === "Escape") cancelEdit();
});
// ✅ Commit:  git commit -m "Add: edit a task by double-click"
// ============================================


// ---------- Initialize ----------
render();

// ============================================
// FINALLY: Settings → Pages → main / root. Your to-do list is the live site.
// Put the URL in your README under "Live Demo". git push.
// ============================================
