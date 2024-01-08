console.log("ready to code");

import Signals from "./Signals";

console.log("stuff", Signals);

// const count = Signals.createSignal(0);
// const multiplier = Signals.createSignal(2);

// Signals.createEffect(() => {
//   console.log(
//     "Effect called: Count is ",
//     count.value,
//     " and multiplier is ",
//     multiplier.value
//   );
// });

// count.value = 1;
// multiplier.value = 3;

// const multipleCount = Signals.createComputed(
//   () => count.value * multiplier.value,
//   [count, multiplier]
// );

// console.log(multipleCount.value);

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const taskFilter = document.getElementById("taskFilter");
const taskCounter = document.getElementById("taskCounter");

const tasks = Signals.createSignal([]);
const filter = Signals.createSignal("all");

const filteredTasks = Signals.createComputed(() => {
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

const taskCount = Signals.createComputed(() => {
  return tasks.value.length;
});

const activeTaskCount = Signals.createComputed(() => {
  return tasks.value.filter((task) => !task.completed).length;
});

const completedTaskCount = Signals.createComputed(() => {
  return tasks.value.filter((task) => task.completed).length;
});

todoForm.addEventListener("submit", (event) => {
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

Signals.createEffect(() => {
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

Signals.createEffect(() => {
  taskCounter.textContent = `
        Total: ${taskCount.value},
        Active: ${activeTaskCount.value},
        Completed: ${completedTaskCount.value}`;
});
