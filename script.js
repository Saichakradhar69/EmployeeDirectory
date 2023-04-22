
const form = document.getElementById('employee-form');
const tableBody = document.getElementById('employee-table-body');

let employees = [];

function addEmployee(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const id = employees.length + 1;
  const employee = { id, name, phone, email };
  employees.push(employee);
  displayEmployees();
  form.reset();
}

function deleteEmployee(id) {
  employees = employees.filter(employee => employee.id !== id);
  displayEmployees();
}


function displayEmployees() {
  tableBody.innerHTML = '';

  employees.forEach(employee => {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.textContent = employee.id;
    const nameCell = document.createElement('td');
    nameCell.textContent = employee.name;
    const phoneCell = document.createElement('td');
    phoneCell.textContent = employee.phone;
    const emailCell = document.createElement('td');
    emailCell.textContent = employee.email;
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteEmployee(employee.id));
    actionCell.appendChild(deleteButton);
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(phoneCell);
    row.appendChild(emailCell);
    row.appendChild(actionCell);
    tableBody.appendChild(row);
  });
}

// Dark mode toggle function
// function toggleDarkMode() {
//   document.body.classList.toggle('dark-mode');
// }

form.addEventListener('submit', addEmployee);
toggle.addEventListener('change', toggleDarkMode);
