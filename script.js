const textTaskId = '#texto-tarefa';
const input = document.querySelector(textTaskId);
const newTaskBtn = document.querySelector('#criar-tarefa');
const clearBtn = document.querySelector('#apaga-tudo');
const removeCompletedBtn = document.querySelector('#remover-finalizados');
const saveTaskBtn = document.querySelector('#salvar-tarefas');
const moveUpBtn = document.querySelector('#mover-cima');
const moveDownBtn = document.querySelector('#mover-baixo');
const removeSelectedBtn = document.querySelector('#remover-selecionado');
const taskListId = '#lista-tarefas';
const tagOl = document.querySelector(taskListId);

function clearInput() {
  document.querySelector(textTaskId).value = '';
}

function changeBgColor(event) {
  const element = event.target;
  const selected = document.querySelector('.selected');
  if (element === tagOl) return;
  if (selected && selected.classList.contains('selected')) {
    selected.classList.remove('selected');
  }
  element.classList.add('selected');
}

function riskItem(event) {
  const element = event.target;
  if (element === tagOl) return;
  element.classList.toggle('completed');
}

function generateLi(inputValue, parentNode) {
  const newli = document.createElement('li');
  newli.innerText = inputValue;
  parentNode.appendChild(newli);
}

function createTask(event) {
  const inputElement = document.querySelector(textTaskId);
  const taskList = document.querySelector(taskListId);

  if (event.key && event.key !== 'Enter') return;
  if (!inputElement.validity.valid) return;

  inputElement.focus();

  generateLi(inputElement.value, taskList);
  clearInput();
}

function clearTasks() {
  tagOl.innerHTML = '';
}

function removeCompleted() {
  const completedList = document.querySelectorAll('.completed');
  completedList.forEach((element) => {
    element.remove();
  });
}

function saveTaskList() {
  const taskList = document.querySelector(taskListId).innerHTML;
  localStorage.setItem('data', taskList);
}

// https://gomakethings.com/saving-html-to-localstorage-with-vanilla-js/#:~:text=Save%20the%20HTML%20to%20localStorage%20%23&text=The%20innerHTML%20property%20returns%20the,to%20save%20data%20to%20localStorage%20.
function loadTaskList() {
  const data = localStorage.getItem('data');
  tagOl.innerHTML = data;
}
loadTaskList();

function swapItems(parentNode, itemToMoveUp, itemToMoveDown) {
  parentNode.insertBefore(itemToMoveUp, itemToMoveDown);
}

// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore#example_2
function moveToUp() {
  const selected = document.querySelector('.selected');
  const previousSelected = selected && selected.previousElementSibling;

  if (!previousSelected) return;

  swapItems(tagOl, selected, previousSelected);
}

function moveToDown() {
  const selected = document.querySelector('.selected');
  const nextElement = selected && selected.nextElementSibling;

  if (!nextElement) return;

  swapItems(tagOl, nextElement, selected);
}

function removeSelected() {
  const selected = document.querySelector('.selected');
  if (selected) selected.remove();
}

input.addEventListener('keydown', createTask);
newTaskBtn.addEventListener('click', createTask);
clearBtn.addEventListener('click', clearTasks);
removeCompletedBtn.addEventListener('click', removeCompleted);
saveTaskBtn.addEventListener('click', saveTaskList);
moveUpBtn.addEventListener('click', moveToUp);
moveDownBtn.addEventListener('click', moveToDown);
removeSelectedBtn.addEventListener('click', removeSelected);
tagOl.addEventListener('click', changeBgColor);
tagOl.addEventListener('dblclick', riskItem);
