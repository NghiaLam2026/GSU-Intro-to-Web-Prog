/*************************************************
 * Student Score Tracker - Starter Template
 * TODO: Complete the required functions
 *************************************************/

// ===========================
// 1) Data
// ===========================

// TODO: Store student records here
// Each record should look like: { name: "Alice", score: 88 }
let students = [];

// Optional: track current view mode ("all" or "passing")
let currentFilter = "all";


// ===========================
// 2) DOM Selections
// ===========================
const nameInput = document.querySelector("#nameInput");
const scoreInput = document.querySelector("#scoreInput");

const addBtn = document.querySelector("#addBtn");
const showPassingBtn = document.querySelector("#showPassingBtn");
const showAllBtn = document.querySelector("#showAllBtn");
const clearBtn = document.querySelector("#clearBtn");

const messageEl = document.querySelector("#message");
const tableBody = document.querySelector("#studentTableBody");

const totalCountEl = document.querySelector("#totalCount");
const avgScoreEl = document.querySelector("#avgScore");
const highestScoreEl = document.querySelector("#highestScore");
const lowestScoreEl = document.querySelector("#lowestScore");
const passingCountEl = document.querySelector("#passingCount");


// ===========================
// 3) Event Listeners
// ===========================
addBtn.addEventListener("click", handleAddStudent);
showPassingBtn.addEventListener("click", handleShowPassing);
showAllBtn.addEventListener("click", handleShowAll);
clearBtn.addEventListener("click", handleClearAll);

// Optional: Press Enter to add (students can keep or remove)
nameInput.addEventListener("keydown", handleEnterKey);
scoreInput.addEventListener("keydown", handleEnterKey);


// ===========================
// 4) Event Handlers
// ===========================

function handleAddStudent() {
  // TODO:
  // 1. Read values from inputs
  // 2. Validate name and score
  // 3. If invalid -> show message and stop
  // 4. If valid -> push new object into students
  // 5. Clear inputs
  // 6. Re-render table + update summary

  const name = nameInput.value.trim();
  const scoreValue = scoreInput.value.trim();

  // Example starter validation (you can improve this)
  if (name === "") {
    showMessage("Name cannot be empty.");
    return;
  }

  if (scoreValue === "" || Number.isNaN(Number(scoreValue))) {
    showMessage("Score must be a valid number.");
    return;
  }

  const score = Number(scoreValue);

  if (score < 0 || score > 100) {
    showMessage("Score must be between 0 and 100.");
    return;
  }

  // TODO: Add to students array
  students.push({ name: name, score: score });

  // TODO: clear inputs 
  nameInput.value = "";
  scoreInput.value = "";

  // TODO: render based on currentFilter
  renderTable(getVisibleStudents());
  updateSummary();

  showMessage("Student added.", false);
}

function handleShowPassing() {
  currentFilter = "passing";

  // TODO: render passing students only
  const visible = getVisibleStudents();
  renderTable(visible);

  showMessage("Showing passing students.", false);
}

function handleShowAll() {
  currentFilter = "all";

  // TODO: render all students
  renderTable(getVisibleStudents());

  showMessage("Showing all students.", false);
}

function handleClearAll() {
  // TODO:
  // 1. Clear students array
  // 2. Clear table
  // 3. Reset summary
  // 4. Show message

  students = [];
  renderTable(getVisibleStudents());
  updateSummary();

  showMessage("All records cleared.", false);
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleAddStudent();
  }
}


// ===========================
// 5) Helper Functions
// ===========================

function getVisibleStudents() {
  // TODO: return the correct array based on currentFilter
  // If currentFilter === "passing", return only score >= 60
  // Otherwise return all students

  if (currentFilter === "passing") {
    return students.filter(student => student.score >= 60);
  }

  return students;
}

function renderTable(list) {
  // TODO:
  // Render table rows using DOM manipulation
  // You may use:
  // - tableBody.innerHTML = ...
  // OR
  // - createElement / appendChild

  // Clear old rows first
  tableBody.innerHTML = "";

  // Example empty state row
  if (list.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="4">No records to display.</td>`;
    tableBody.appendChild(row);
    return;
  }

  // TODO: loop through list and create rows
  list.forEach((student, index) => {
    const status = student.score >= 60 ? "Pass" : "Fail";
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.score}</td>
      <td>${status}</td>
    `;
    tableBody.appendChild(row);
  });
}

function updateSummary() {
  // TODO:
  // Calculate and display:
  // - total
  // - average (2 decimals)
  // - highest
  // - lowest
  // - passing count

  // Hints:
  // const total = students.length;
  // const scores = students.map(s => s.score);
  // const sum = scores.reduce((acc, n) => acc + n, 0);

  if (students.length === 0) {
    totalCountEl.textContent = "0";
    avgScoreEl.textContent = "0.00";
    highestScoreEl.textContent = "0";
    lowestScoreEl.textContent = "0";
    passingCountEl.textContent = "0";
    return;
  }

  // TODO: replace these placeholders with real calculations
  const total = students.length;
  const scores = students.map(s => s.score);
  const sum = scores.reduce((acc, n) => acc + n, 0);
  const average = sum / total;
  const highest = Math.max(...scores);
  const lowest = Math.min(...scores);
  const passingCount = students.filter(s => s.score >= 60).length;

  totalCountEl.textContent = String(total);
  avgScoreEl.textContent = average.toFixed(2);
  highestScoreEl.textContent = String(highest);
  lowestScoreEl.textContent = String(lowest);
  passingCountEl.textContent = String(passingCount);
}

function showMessage(text, isError = true) {
  messageEl.textContent = text;
  messageEl.style.color = isError ? "#b00020" : "#0a7a2f";
}


// ===========================
// 6) Initial Render
// ===========================
renderTable(getVisibleStudents());
updateSummary();