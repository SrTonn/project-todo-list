const taskListId = '#lista-tarefas';

function clearInput() {
  document.querySelector('#texto-tarefa').value = '';
}

function changeBgColor(event) {
  const element = event.target;
  const selected = document.querySelector('.selected');
  if (selected && selected.classList.contains('selected')) {
    selected.classList.remove('selected');
  }
  if (!element.classList.contains('selected') && element !== selected) {
    element.classList.toggle('selected');
  }
}

function riskItem(event) {
  const element = event.target;
  element.classList.toggle('completed');
}

function createTask() {
  const textInput = document.querySelector('#texto-tarefa').value;
  const taskList = document.querySelector(taskListId);
  const newli = document.createElement('li');
  newli.innerText = textInput;
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

const newTaskBtn = document.querySelector('#criar-tarefa');
newTaskBtn.addEventListener('click', createTask);

const clearBtn = document.querySelector('#apaga-tudo');
clearBtn.addEventListener('click', clearTasks);

const removeCompletedBtn = document.querySelector('#remover-finalizados');
removeCompletedBtn.addEventListener('click', removeCompleted);

const saveTaskBtn = document.querySelector('#salvar-tarefas');
saveTaskBtn.addEventListener('click', saveTaskList);

// https://gomakethings.com/saving-html-to-localstorage-with-vanilla-js/#:~:text=Save%20the%20HTML%20to%20localStorage%20%23&text=The%20innerHTML%20property%20returns%20the,to%20save%20data%20to%20localStorage%20.
function loadTaskList() {
  const data = localStorage.getItem('data');
  const taskList = document.querySelector(taskListId);
  taskList.innerHTML = data;
}
loadTaskList();
