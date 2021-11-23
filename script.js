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

function createTask() {
  const textInput = document.querySelector('#texto-tarefa').value;
  const taskList = document.querySelector('#lista-tarefas');
  const newli = document.createElement('li');
  newli.innerText = textInput;
  newli.addEventListener('click', changeBgColor);
  taskList.appendChild(newli);
  clearInput();
}

const button = document.querySelector('#criar-tarefa');
button.addEventListener('click', createTask);
