function generateRandomId() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + Date.now();
}

const priorityEnum = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
};

const priorityOrder = (priority) => {
  const priorityMap = {
    low: 0,
    medium: 1,
    high: 2,
  };
  return priorityMap[priority];
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".task-create-form");
  const taskList = document.querySelector(".task-list");
  const emptyListMessage = document.querySelector(".empty-list-message");

  let tasks = [
    {
      id: generateRandomId(),
      title: "Varsayılan Düşük",
      desc: "Bu, varsayılan olarak eklenen bir görevdir.",
      priority: "low",
      completed: false,
      date: new Date().toLocaleDateString(),
    },
    {
      id: generateRandomId(),
      title: "Varsayılan Yüksek",
      desc: "Bu, varsayılan olarak eklenen bir görevdir.",
      priority: "high",
      completed: false,
      date: new Date().toLocaleDateString(),
    },
    {
      id: generateRandomId(),
      title: "Varsayılan Orta",
      desc: "Bu, varsayılan olarak eklenen bir görevdir.",
      priority: "medium",
      completed: false,
      date: new Date().toLocaleDateString(),
    },
  ];

  const updateTask = (task) => {
    try {
      const taskElement = document.querySelector(
        `.task-item[data-id='${task.id}']`
      );
      if (!taskElement) {
        return false;
      }

      if (task.completed) {
        taskElement.classList.add("completed");
      } else {
        taskElement.classList.remove("completed");
      }
    } catch (error) {
      console.error("Görev güncellenirken hata oluştu:", error);
      alert("Görev güncellenirken bir hata oluştu!");
    }
  };

  const deleteTask = (taskId) => {
    try {
      const taskIndex = tasks.findIndex((task) => task.id === taskId);

      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);

        const taskElement = document.querySelector(
          `.task-item[data-id='${taskId}']`
        );
        if (taskElement) {
          taskElement.remove();
        }

        if (tasks.length === 0) {
          emptyListMessage.style.display = "block";
        }
      }
    } catch (error) {
      console.error("Görev silerken hata oluştu:", error);
      alert("Görev silinemedi!");
    }
  };

  const completeTask = (taskId) => {
    try {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
        updateTask(task);
      }
    } catch (error) {
      console.error("Görev tamamlanırken hata oluştu:", error);
      alert("Görev tamamlanırken bir hata oluştu!");
    }
  };

  const createTask = (task) => {
    try {
      const newTaskElement = document.createElement("li");
      newTaskElement.className = `task-item ${task.priority}-priority`;
      newTaskElement.setAttribute("data-id", task.id);

      const taskContent = document.createElement("div");
      taskContent.className = "task-content";

      const taskTitle = document.createElement("div");
      taskTitle.className = "task-title";
      taskTitle.textContent = task.title;
      taskContent.appendChild(taskTitle);

      const taskDesc = document.createElement("div");
      taskDesc.className = "task-desc";
      taskDesc.textContent = task.desc;
      taskContent.appendChild(taskDesc);

      const taskMeta = document.createElement("div");
      taskMeta.className = "task-meta";
      taskContent.appendChild(taskMeta);

      const taskPriority = document.createElement("span");
      taskPriority.className = `task-priority priority-${task.priority}`;
      taskPriority.textContent = priorityEnum[task.priority];
      taskMeta.appendChild(taskPriority);

      const taskDate = document.createElement("span");
      taskDate.className = "task-date";
      taskDate.textContent = task.date;
      taskMeta.appendChild(taskDate);

      const taskActions = document.createElement("div");
      taskActions.className = "task-actions";
      newTaskElement.appendChild(taskContent);
      newTaskElement.appendChild(taskActions);

      const completeBtn = document.createElement("button");
      completeBtn.className = "task-btn complete-btn";
      completeBtn.title = "Tamamla";
      completeBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>';

      completeBtn.addEventListener("click", () => completeTask(task.id));

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "task-btn delete-btn";
      deleteBtn.title = "Sil";
      deleteBtn.innerHTML = '<ion-icon name="close-outline"></ion-icon>';

      deleteBtn.addEventListener("click", () => deleteTask(task.id));

      taskActions.appendChild(completeBtn);
      taskActions.appendChild(deleteBtn);

      if (task.completed) {
        newTaskElement.classList.add("completed");
      }

      taskList.appendChild(newTaskElement);
    } catch (error) {
      console.error("Görev oluşturuluken hata oluştu:", error);
      alert("Görev oluşturulurken bir hata oluştu!");
    }
  };

  const filterTasks = (filter) => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const sortTasks = (sortOrder) => {
    switch (sortOrder) {
      case "priority-asc":
        return [...tasks].sort(
          (a, b) => priorityOrder(a.priority) - priorityOrder(b.priority)
        );
      case "priority-desc":
        return [...tasks].sort(
          (a, b) => priorityOrder(b.priority) - priorityOrder(a.priority)
        );
      default:
        return tasks;
    }
  };

  const renderTasks = () => {
    if (tasks.length === 0) {
      emptyListMessage.style.display = "block";
      return;
    }

    const filter = document.getElementById("filter-select").value;
    const sortOrder = document.getElementById("sort-select").value;

    let filteredTasks = filterTasks(filter);
    let sortedTasks = sortTasks(sortOrder);

    const tasksToRender = sortedTasks.filter((task) =>
      filteredTasks.includes(task)
    );

    emptyListMessage.style.display = "none";

    taskList.innerHTML = "";

    tasksToRender.forEach((task, index) => {
      createTask(task);
    });
  };

  document
    .getElementById("filter-select")
    .addEventListener("change", renderTasks);
  document
    .getElementById("sort-select")
    .addEventListener("change", renderTasks);

  renderTasks();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
      const title = document.getElementById("title").value.trim();
      const desc = document.getElementById("desc").value.trim();
      const priority = document.querySelector("input[name='priority']:checked");
      const completed = document.getElementById("completed").checked;

      if (!title) {
        alert("Lütfen başlık alanını doldurunuz.");
        return;
      }

      if (!priority) {
        alert("Lütfen bir öncelik seçiniz.");
        return;
      }

      const newTask = {
        id: generateRandomId(),
        title,
        desc,
        priority: priority.value,
        completed,
        date: new Date().toLocaleDateString(),
      };

      tasks.push(newTask);
      createTask(newTask);
      form.reset();
    } catch (error) {
      console.error("Görev eklerken hata oluştu:", error);
      alert("Beklenmeyen bir hata oluştu.");
    }
  });
});
