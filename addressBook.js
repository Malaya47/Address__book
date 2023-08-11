const entries = JSON.parse(localStorage.getItem("entries")) || [];

function saveEntriesToLocalStorage() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

function renderEntries() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  entries.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.id = `entry${index}`;
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.address}</td>
      <td>${entry.phone}</td>
      <td>${entry.email}</td>
      <td>
        <div style="display: flex; gap: 20px;" id="action${index}">
          <button onclick="editEntry(${index})">
            <i class="material-symbols-outlined">edit_square</i>
          </button>
          <button onclick="deleteEntry(${index})">
            <i class="material-symbols-outlined">delete</i>
          </button>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function editEntry(index) {
  const actionDiv = document.getElementById(`action${index}`);
  actionDiv.innerHTML = `
    <button onclick="saveChanges(${index})">
      <i class="material-symbols-outlined">save</i>
    </button>
    <button onclick="renderEntries()">
      <i class="material-symbols-outlined">cancel</i>
    </button>
  `;

  const row = document.getElementById(`entry${index}`);
  const columns = row.children;
  const name = columns[0].textContent;
  const address = columns[1].textContent;
  const phone = columns[2].textContent;
  const email = columns[3].textContent;

  columns[0].innerHTML = `<input type="text" value="${name}" id="name${index}" />`;
  columns[1].innerHTML = `<input type="text" value="${address}" id="address${index}" />`;
  columns[2].innerHTML = `<input type="tel" value="${phone}" id="phone${index}" />`;
  columns[3].innerHTML = `<input type="email" value="${email}" id="email${index}" />`;
}

function saveChanges(index) {
  const newName = document.getElementById(`name${index}`).value;
  const newAddress = document.getElementById(`address${index}`).value;
  const newPhone = document.getElementById(`phone${index}`).value;
  const newEmail = document.getElementById(`email${index}`).value;

  entries[index] = {
    name: newName,
    address: newAddress,
    phone: newPhone,
    email: newEmail,
  };

  renderEntries();
  saveEntriesToLocalStorage();
}

function deleteEntry(index) {
  entries.splice(index, 1);
  renderEntries();
  saveEntriesToLocalStorage();
}

function createEntry() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  if (!name || !address || !phone || !email) {
    alert("All fields are required!");
    return;
  }

  entries.push({
    name: name,
    address: address,
    phone: phone,
    email: email,
  });

  renderEntries();
  saveEntriesToLocalStorage();

  // Clear input fields
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}

function searchEntries() {
  const searchText = document.getElementById("search").value.toLowerCase();

  const filteredEntries = entries.filter((entry) => {
    return (
      entry.name.toLowerCase().includes(searchText) ||
      entry.address.toLowerCase().includes(searchText) ||
      entry.phone.toLowerCase().includes(searchText) ||
      entry.email.toLowerCase().includes(searchText)
    );
  });

  renderFilteredEntries(filteredEntries);
}

function renderFilteredEntries(filteredEntries) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  filteredEntries.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.id = `entry${index}`;
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.address}</td>
      <td>${entry.phone}</td>
      <td>${entry.email}</td>
      <td>
        <div style="display: flex; gap: 20px;" id="action${index}">
          <button onclick="editEntry(${index})">
            <i class="material-symbols-outlined">edit_square</i>
          </button>
          <button onclick="deleteEntry(${index})">
            <i class="material-symbols-outlined">delete</i>
          </button>
        </div>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Initial rendering
renderEntries();
