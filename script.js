function clearInput() {
  document.querySelector('#texto-tarefa').value = '';
}

function createTask() {
  const textInput = document.querySelector('#texto-tarefa').value;
  const taskList = document.querySelector('#lista-tarefas');
  const newli = document.createElement('li');
  newli.innerText = textInput;
  taskList.appendChild(newli);
  clearInput();
}

const button = document.querySelector('#criar-tarefa');
button.addEventListener('click', createTask);
