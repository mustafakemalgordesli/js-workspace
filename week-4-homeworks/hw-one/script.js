const styles = `
    body {
        background-color: #f5f7fa;
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ins-api-users {
        max-width: 1200px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .users-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
    }

    .users-table th {
        background: #2c3e50;
        color: white;
        padding: 16px;
        text-align: left;
        font-weight: 600;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .users-table td {
        padding: 16px;
        border-bottom: 1px solid #edf2f7;
        color: #4a5568;
        font-size: 14px;
        transition: all 0.2s ease;
    }

    .users-table tr:last-child td {
        border-bottom: none;
    }

    .users-table tr:hover td {
        background: #f8fafc;
        transform: scale(1.01);
    }

    .delete-btn {
        background: #e53e3e;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(229, 62, 62, 0.2);
    }

    .delete-btn:hover {
        background: #c53030;
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(229, 62, 62, 0.3);
    }

    .delete-btn:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(229, 62, 62, 0.2);
    }

    .error-message {
        background: #fff5f5;
        color: #c53030;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-weight: 500;
        display: flex;
        align-items: center;
        border: 1px solid #feb2b2;
    }

    .error-message::before {
        content: "⚠️";
        margin-right: 10px;
        font-size: 18px;
    }

    @media (max-width: 768px) {
        .ins-api-users {
            margin: 20px;
            padding: 15px;
        }

        .users-table th,
        .users-table td {
            padding: 12px;
            font-size: 13px;
        }

        .delete-btn {
            padding: 6px 12px;
            font-size: 12px;
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

const API_URL = "https://jsonplaceholder.typicode.com/users";
const STORAGE_KEY = "userData";
const STORAGE_TIMESTAMP_KEY = "userDataTimestamp";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

let container = document.querySelector(".ins-api-users");

function isStoredDataValid() {
  const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);
  if (!timestamp) return false;

  const storedTime = parseInt(timestamp);
  const currentTime = new Date().getTime();
  return currentTime - storedTime < ONE_DAY_MS;
}

function saveToLocalStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  localStorage.setItem(STORAGE_TIMESTAMP_KEY, new Date().getTime().toString());
}

function getFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

function deleteUser(userId) {
  const storedData = getFromLocalStorage();
  if (storedData) {
    const updatedData = storedData.filter((user) => user.id !== userId);
    saveToLocalStorage(updatedData);
    displayUsers(updatedData);
  }
}

function displayUsers(users) {
  container.innerHTML = "";

  const table = document.createElement("table");
  table.className = "users-table";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const headers = ["Name", "Username", "Email", "Address", "Actions"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  users.forEach((user) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = user.name;
    row.appendChild(nameCell);

    const usernameCell = document.createElement("td");
    usernameCell.textContent = user.username;
    row.appendChild(usernameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    const addressCell = document.createElement("td");
    addressCell.textContent = `${user.address.street}, ${user.address.suite}, ${user.address.city}`;
    row.appendChild(addressCell);

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteUser(user.id));
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

function showError(message) {
  container.innerHTML = "";

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;

  container.appendChild(errorDiv);
}

function fetchUsers() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      saveToLocalStorage(data);
      displayUsers(data);
    })
    .catch((err) => {
      showError("Error fetching users: " + err.message);
    });
}

function init() {
  if (isStoredDataValid()) {
    const storedData = getFromLocalStorage();
    displayUsers(storedData);
  } else {
    fetchUsers();
  }
}

init();
