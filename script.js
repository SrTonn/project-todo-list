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
  const taskList = document.querySelector('#lista-tarefas');
  const newli = document.createElement('li');
  newli.innerText = textInput;
  newli.addEventListener('click', changeBgColor);
  newli.addEventListener('dblclick', riskItem);
  taskList.appendChild(newli);
  clearInput();
}

function clearTasks() {
  const taskList = document.querySelector('#lista-tarefas');
  taskList.innerHTML = '';
}

const newTaskBtn = document.querySelector('#criar-tarefa');
newTaskBtn.addEventListener('click', createTask);

const clearBtn = document.querySelector('#apaga-tudo');
clearBtn.addEventListener('click', clearTasks);
