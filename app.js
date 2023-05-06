const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

let toDos = [];

function addToDo() {
  // Prevent form submission if input is empty
  if (!input.value) return;

  // Create a new to-do object
  const toDo = {
    id: Date.now(),
    text: input.value,
    completed: false
  };

  // Add the to-do object to the array
  toDos.push(toDo);

  // Clear the input field and update the display
  input.value = '';
  displayToDos();
}

function displayToDos() {
  // Clear the existing list items
  ul.innerHTML = '';

  // Create a new list item for each to-do object
  toDos.forEach(function(toDo) {
    const li = document.createElement('li');
    const textSpan = document.createElement('span');
    const deleteButton = document.createElement('button');

    textSpan.innerText = toDo.text;

    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
      deleteToDoById(toDo.id);
    });

    if (toDo.completed) {
      li.classList.add('completed');
    }

    li.appendChild(textSpan);
    li.appendChild(deleteButton);
    ul.appendChild(li);
  });
}

function deleteToDoById(id) {
  // Remove the to-do object with the given ID from the array
  toDos = toDos.filter(function(toDo) {
    return toDo.id !== id;
  });

  // Update the display
  displayToDos();
}

function toggleToDoCompletedById(id) {
  // Find the to-do object with the given ID
  const toDo = toDos.find(function(toDo) {
    return toDo.id === id;
  });

  // Toggle the completed status of the to-do object
  toDo.completed = !toDo.completed;

  // Update the display
  displayToDos();
}

// Add event listener for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();
  addToDo();
});

// Display any existing to-dos when the page loads
displayToDos();

// Expose the to-dos array for debugging purposes
window.toDos = toDos;
