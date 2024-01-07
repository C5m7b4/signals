console.log("ready to code");

import { createSignal, createComputed, createEffect } from "./Signals";

// signals library goes here

let currentAccessed = null;
const effectQueue = [];

// end of signals library

const count = createSignal(0);
const multiplier = createSignal(2);

createEffect(() => {
  console.log(
    "Effect called: Count is ",
    count.value,
    " and multiplier is ",
    multiplier.value
  );
});

count.value = 1;
multiplier.value = 3;

const multipleCount = createComputed(
  () => count.value * multiplier.value,
  [count, multiplier]
);

console.log(multipleCount.value);

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const taskFilter = document.getElementById("taskFilter");
const taskCounter = document.getElementById("taskCounter");

const tasks = createSignal([]);
const filter = createSignal("all");

const filteredTasks = createComputed(() => {
  const currentFilter = filter.value;
  const currentTasks = tasks.value;
  if (currentFilter === "all") {
    return currentTasks;
  } else if (currentFilter === "active") {
    return currentTasks.filter((task) => !task.completed);
  } else {
    return currentTasks.filter((task) => task.completed);
  }
});

const taskCount = createComputed(() => {
  return tasks.value.length;
});

const activeTaskCount = createComputed(() => {
  return tasks.value.filter((task) => !task.completed).length;
});

const completedTaskCount = createComputed(() => {
  return tasks.value.filter((task) => task.completed).length;
});

todoForm.addEventListener("submit", (event) => {
  debugger;
  event.preventDefault();
  const taskTitle = todoInput.value.trim();
  if (taskTitle) {
    const newTask = { title: taskTitle, completed: false };
    tasks.value = [...tasks.value, newTask];
    todoInput.value = "";
  }
});

taskFilter.addEventListener("change", (event) => {
  filter.value = event.target.value;
});

createEffect(() => {
  const currentTasks = filteredTasks.value;
  todoList.innerHTML = "";
  currentTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks.value[index].completed = checkbox.checked;
      tasks.value = [...tasks.value];
    });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + task.title));
    listItem.appendChild(label);
    todoList.appendChild(listItem);
  });
});

createEffect(() => {
  taskCounter.textContent = `
        Total: ${taskCount.value},
        Active: ${activeTaskCount.value},
        Completed: ${completedTaskCount.value}`;
});
