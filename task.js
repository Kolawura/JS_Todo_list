// STORE MY ELEMENT IN A VARIABLE
const addBtn = document.querySelector("button"),
  taskContainer = document.querySelector("#task"),
  newTaskInput = document.querySelector("#wrapper input"),
  countTask = document.querySelector(".count-value"),
  errorMsg = document.querySelector(".error");

// CALL THE ADDTASK FUNCTION WITH THE ENTER KEY ON THE  KEYBOARD
addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
// CALL ADDTASK FUNCTION WHEN BUTTON IS CLICKED
addBtn.addEventListener("click", addTask);

// ADDTASK FUNCTION
function addTask() {
  // MAKE THE BUTTON DISPALY ADD
  addBtn.textContent = "Add";
  if (newTaskInput.value != "") {
    errorMsg.style.display = "none";
    // CALL FUNCTION THAT STORES THE TASK ADDED TO LOCALSTORAGE
    addToLocalStore();
    // CLEAR THE TASK CONTAINER SO AS TO AVOID REPETIVE DISPLAY OF TASKS
    taskContainer.innerHTML = "";
    // THEN DISPLAY THE TASK THAT HAS BEEN STORED IN THE LOCALSTORAGE
    displayTask();
  } else {
    errorMsg.innerText = "Sorry input cannot be empty!";
    // SHOW ERROR MSG IF NO TASK IS WRITTEN IN THE INPUT
    errorMsg.style.display = "block";
    // CLEAR THE MSG AFTER 2 SECONDS
    setTimeout(() => {
      errorMsg.style.display = "none";
    }, 2000);
    return;
  }
}

function addToLocalStore() {
  // CREATE A VARIABLE CALL TASKS
  let tasks, checkTask;
  // IF TASKS DOES NOT EXIST IN THE LOCAL STORAGE SET THE VAR(TASKS) TO BE AN ARRAY
  if (!Array.isArray(tasks) && localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // IF TASK EXIST GET IT AND ASSIGN IT TO TASKS (ARRAY)
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // ADD THE NEW TASKS ADDED INTO THE TASKS ARRAY
  tasks.unshift(newTaskInput.value);

  // STORE THE NEW TASKS ARRAY BACK TO LOCALSTORAGE
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // CLEAR THE INPUT BOX
  newTaskInput.value = "";
  if (!Array.isArray(checkTask) && localStorage.getItem("checkTask") === null) {
    checkTask = [];
  } else {
    // IF CHECKTASK EXIST GET IT AND ASSIGN IT TO TASKS (ARRAY)
    checkTask = JSON.parse(localStorage.getItem("checkTask"));
  }
  // ADD THE NEW TASKS ADDED INTO THE TASKS ARRAY
  checkTask.unshift("");

  // STORE THE NEW TASKS ARRAY BACK TO LOCALSTORAGE
  localStorage.setItem("checkTask", JSON.stringify(checkTask));
}

function displayTask() {
  // CHECK IF TASKS EXIST IN THE LOCALSTORAGE, IF IT DOES
  // ASSIGN IT TO AN ARRY TASK, IF NOT CREATE ONE.
  let tasks, checkTask;
  if (!Array.isArray(tasks) && localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  if (!Array.isArray(checkTask) && localStorage.getItem("checkTask") === null) {
    checkTask = [];
  } else {
    checkTask = JSON.parse(localStorage.getItem("checkTask"));
  }
  tasks.forEach((task, index) => {
    // CREATE THE ELEMENTS NEEDED AND ASSIGN CLASSES TO THEM
    const todoList = document.createElement("ol");
    const newLi = document.createElement("li");
    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const compBtn = document.createElement("button");

    todoList.classList.add("todo-list");
    delBtn.classList.add("delBtn");
    editBtn.classList.add("editBtn");
    compBtn.classList.add("compBtn");

    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    delBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    compBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    const taskName = task.trim();
    //
    newLi.textContent = taskName;
    todoList.appendChild(newLi);
    todoList.appendChild(editBtn);
    todoList.appendChild(compBtn);
    todoList.appendChild(delBtn);
    taskContainer.appendChild(todoList);
    taskContainer.style.display = "block";
    checkTask = JSON.parse(localStorage.getItem("checkTask"));
    if (
      checkTask[index] === null ||
      checkTask[index] === undefined ||
      checkTask[index] === ""
    ) {
      newLi.style.textDecoration = "";
      newLi.style.color = "#000";
    } else {
      newLi.style.textDecoration = "line-through";
      newLi.style.color = "rgb(0, 0, 0, 0.5)";
    }
    function display() {
      let count = 0;
      checkTask.forEach((value) => {
        if (value) {
          count++;
        }
      });
      function displayCount() {
        countTask.innerText = tasks.length - count;
      }
      displayCount();
    }
    display();
    // CHECK IF THE TASK ADDED IS NOT AN EMPTY SRING AND GIVE
    // AN ERROR MSG WHEN NECCESSARY
    if (!tasks) {
      errorMsg.innerText = "Sorry input cannot be empty!";
      errorMsg.style.display = "block";
      setTimeout(() => {
        errorMsg.style.display = "none";
      }, 1000);
      return;
    }
    // EVENTLISTENERS FOR THE COMPLETE, EDIT AND DELETE BUTTONS

    compBtn.addEventListener("click", function () {
      // CHECK IF TASKS EXIST IN THE LOCALSTORAGE, IF IT DOES
      // ASSIGN IT TO AN ARRY TASK, IF NOT CREATE ONE.
      let tasks, checkTask;
      if (!Array.isArray(tasks) && localStorage.getItem("tasks") === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      }
      if (
        !Array.isArray(checkTask) &&
        localStorage.getItem("checkTask") === null
      ) {
        checkTask = [];
      } else {
        checkTask = JSON.parse(localStorage.getItem("checkTask"));
      }
      const complete = checkTask[index] === "line-through";
      checkTask[index] = complete ? "" : "line-through";
      localStorage.setItem("checkTask", JSON.stringify(checkTask));
      if (
        checkTask[index] === null ||
        checkTask[index] === undefined ||
        checkTask[index] === ""
      ) {
        newLi.style.textDecoration = "";
        newLi.style.color = "#000";
      } else {
        newLi.style.textDecoration = "line-through";
        newLi.style.color = "rgb(0, 0, 0, 0.5)";
      }
      function display() {
        let count = 0;
        checkTask.forEach((value) => {
          if (value) {
            count++;
          }
        });
        function displayCount() {
          countTask.innerText = tasks.length - count;
        }
        displayCount();
      }
      display();
    });
    editBtn.addEventListener("click", function () {
      // CHECK IF TASKS EXIST IN THE LOCALSTORAGE, IF IT DOES
      // ASSIGN IT TO AN ARRY TASK, IF NOT CREATE ONE.
      let tasks, checkTask;
      if (!Array.isArray(tasks) && localStorage.getItem("tasks") === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      }
      if (
        !Array.isArray(checkTask) &&
        localStorage.getItem("checkTask") === null
      ) {
        checkTask = [];
      } else {
        checkTask = JSON.parse(localStorage.getItem("checkTask"));
      }
      if (newTaskInput.value != "") {
        errorMsg.innerText = "Please Submit or clear input text first";
        errorMsg.style.display = "block";
        setTimeout(() => {
          errorMsg.style.display = "none";
        }, 2000);
        return;
      } else {
        addBtn.textContent = "Edit";
        newTaskInput.value = tasks[index];
        tasks.splice(index, 1);
        checkTask.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("checkTask", JSON.stringify(checkTask));
        taskContainer.innerHTML = "";
        display();
        displayTask();
        if (taskContainer.innerHTML === "") {
          let count = 0;
          function displayCount() {
            countTask.innerText = tasks.length - count;
          }
          displayCount();
          displayTask();
          taskContainer.style.display = "none";
        }
      }
    });
    delBtn.addEventListener("click", function () {
      // CHECK IF TASKS EXIST IN THE LOCALSTORAGE, IF IT DOES
      // ASSIGN IT TO AN ARRY TASK, IF NOT CREATE ONE.
      let tasks, checkTask;
      if (!Array.isArray(tasks) && localStorage.getItem("tasks") === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
      }
      if (
        !Array.isArray(checkTask) &&
        localStorage.getItem("checkTask") === null
      ) {
        checkTask = [];
      } else {
        checkTask = JSON.parse(localStorage.getItem("checkTask"));
      }
      const del = confirm("Are you sure you want to delete this item?");
      if (del == true) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskContainer.innerHTML = "";
        checkTask.splice(index, 1);
        localStorage.setItem("checkTask", JSON.stringify(checkTask));
        display();
        displayTask();
      }
      if (newLi.textContent == "") {
        taskContainer.style.display = "none";
      }
      if (taskContainer.innerHTML === "") {
        let count = 0;
        function displayCount() {
          countTask.innerText = tasks.length - count;
        }
        displayCount();
        displayTask();
        taskContainer.style.display = "none";
      } else {
        taskContainer.style.display = "block";
      }
    });
  });
}
displayTask();
