const form = document.querySelector('#task-form'), input = document.querySelector('#task-input'), list = document.querySelector('#tasks');
let tasks = JSON.parse(localStorage.getItem('todo-tasks') || '[]');
function save() { localStorage.setItem('todo-tasks', JSON.stringify(tasks)); render(); }
function render() {
  list.replaceChildren();
  tasks.forEach((task, index) => {
    const li = document.createElement('li'), check = document.createElement('input'), text = document.createElement('span'), remove = document.createElement('button');
    li.className = task.done ? 'done' : ''; check.type = 'checkbox'; check.checked = task.done; check.setAttribute('aria-label', `Mark ${task.text} complete`); text.textContent = task.text;
    remove.textContent = '×'; remove.className = 'remove'; remove.setAttribute('aria-label', `Delete ${task.text}`);
    check.addEventListener('change', () => { tasks[index].done = check.checked; save(); });
    remove.addEventListener('click', () => { tasks.splice(index, 1); save(); }); li.append(check, text, remove); list.append(li);
  });
  const remaining = tasks.filter(task => !task.done).length; document.querySelector('#count').textContent = `${remaining} task${remaining === 1 ? '' : 's'} remaining`;
}
form.addEventListener('submit', event => { event.preventDefault(); const text = input.value.trim(); if (text) { tasks.push({ text, done: false }); input.value = ''; save(); input.focus(); } });
document.querySelector('#clear').addEventListener('click', () => { tasks = tasks.filter(task => !task.done); save(); }); render();
