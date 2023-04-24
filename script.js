
const form = document.getElementById('employee-form');
const tableBody = document.getElementById('employee-table-body');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const toggleButton = document.getElementById('toggle-mode');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});


searchButton.addEventListener('click', () => {
  displayEmployees();
});

searchInput.addEventListener('input', () => {
  displayEmployees();
});

let employees = [];

// Load employees from local storage on page load
window.addEventListener('load', () => {
  const storedEmployees = localStorage.getItem('employees');
  if (storedEmployees) {
    employees = JSON.parse(storedEmployees);
    displayEmployees();
  }
});

function addEmployee(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const id = generateID();
  const employee = { id, name, phone, email };
  employees.push(employee);
  displayEmployees();
  form.reset();
}

function deleteEmployee(id) {
  employees = employees.filter(employee => employee.id !== id);
  displayEmployees();
  
  // Save employees to local storage
  localStorage.setItem('employees', JSON.stringify(employees));
}

function displayEmployees() {
  tableBody.innerHTML = '';

  const searchTerm = searchInput.value;
  const filteredEmployees = searchEmployees(searchTerm);

  filteredEmployees.forEach(employee => {
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
  
  // Save employees to local storage
  localStorage.setItem('employees', JSON.stringify(employees));
}

function searchEmployees(searchTerm) {
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredEmployees;
}

function generateID() {
  const randomNum = Math.random().toString().substring(2, 6);
  return parseInt(randomNum);
}

form.addEventListener('submit', addEmployee);
