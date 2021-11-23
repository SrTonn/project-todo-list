function clearInput() {
  document.querySelector('#texto-tarefa').value = '';
}

function changeBgColor(event) {
  const element = event.target;
  element.style.backgroundColor = 'rgb(128,128,128)';
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
