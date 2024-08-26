document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
  
    // Load todos
    fetch('/api/todos')
      .then(response => response.json())
      .then(todos => {
        todos.forEach(todo => addTodoToList(todo));
      });
  
    // Add todo
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = todoInput.value.trim();
      if (title) {
        fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        })
          .then(response => response.json())
          .then(data => {
            addTodoToList({ id: data.id, title });
            todoInput.value = '';
          });
      }
    });
  
    function addTodoToList(todo) {
      const li = document.createElement('li');
      li.innerHTML = `
        ${todo.title}
        <button class="delete-btn" data-id="${todo.id}">Delete</button>
      `;
      todoList.appendChild(li);
  
      li.querySelector('.delete-btn').addEventListener('click', () => {
        fetch(`/api/todos/${todo.id}`, { method: 'DELETE' })
          .then(() => li.remove());
      });
    }
  });