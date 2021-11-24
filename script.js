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

function clearInput() {
  document.querySelector(textTaskId).value = '';
}

function changeBgColor(event) {
  const element = event.target;
  const selected = document.querySelector('.selected');
  if (selected && selected.classList.contains('selected')) {
    selected.classList.remove('selected');
  }
  element.classList.add('selected');
}

function riskItem(event) {
  const element = event.target;
  element.classList.toggle('completed');
}

function createTask(event) {
  if (event.key && event.key !== 'Enter') return;

  const inputElement = document.querySelector(textTaskId);
  const taskList = document.querySelector(taskListId);
  const newli = document.createElement('li');

  inputElement.focus();

  newli.innerText = inputElement.value;
  newli.addEventListener('click', changeBgColor);
  newli.addEventListener('dblclick', riskItem);
  taskList.appendChild(newli);

  clearInput();
}

function clearTasks() {
  const taskList = document.querySelector(taskListId);
  taskList.innerHTML = '';
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
// https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
function loadTaskList() {
  const data = localStorage.getItem('data');
  const taskList = document.querySelector(taskListId);
  taskList.innerHTML = data;
  const liList = Array.from(document.getElementsByTagName('li'));
  liList.forEach((element) => {
    element.addEventListener('click', changeBgColor);
    element.addEventListener('dblclick', riskItem);
  });
}
loadTaskList();

function swapItems(parentNode, itemToMoveUp, itemToMoveDown) {
  parentNode.insertBefore(itemToMoveUp, itemToMoveDown);
}

// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore#example_2
function moveToUp() {
  const selected = document.querySelector('.selected');
  const previousSelected = selected && selected.previousElementSibling;
  const parentOl = selected && selected.parentNode;

  if (!previousSelected) return;

  swapItems(parentOl, selected, previousSelected);
}

function moveToDown() {
  const selected = document.querySelector('.selected');
  const nextElement = selected && selected.nextElementSibling;
  const parentOl = selected && selected.parentNode;

  if (!nextElement) return;

  swapItems(parentOl, nextElement, selected);
}

function removeSelected() {
  const selected = document.querySelector('.selected');
  selected.remove();
}

input.addEventListener('keydown', createTask);
newTaskBtn.addEventListener('click', createTask);
clearBtn.addEventListener('click', clearTasks);
removeCompletedBtn.addEventListener('click', removeCompleted);
saveTaskBtn.addEventListener('click', saveTaskList);
moveUpBtn.addEventListener('click', moveToUp);
moveDownBtn.addEventListener('click', moveToDown);
removeSelectedBtn.addEventListener('click', removeSelected);
