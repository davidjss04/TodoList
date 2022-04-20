const todos =JSON.parse(localStorage.getItem('todos')) || [];
var isNew = true;

const render = () => {
        const todoList = document.getElementById('todo-list');
        const todosTemplate = todos.map(t => {
            if (t.status === false) {
                return '<li>' + t.text + '<span class="close">\u00D7</span></li>';
            }else {
                return '<li class="checked">' + t.text + '<span class="close">\u00D7</span></li>';
            }
        });
        todoList.innerHTML = todosTemplate.join('');

        var close = document.getElementsByClassName('close');
        Array.from(close).forEach((close, i) => {
            close.onclick = function () {
                var li = this.parentElement;
                li.remove();
                //li.style.display = 'none';
                todos.splice(i,1);
                render();
            }
        })

        const elements = document.querySelectorAll('#todo-list li');
        elements.forEach((element, i) => {
            element.addEventListener('click', () => {
                if (element.tagName == 'LI'){
                    element.classList.toggle('checked');
                }
                if (todos[i] != undefined) todos[i].status = true;
                //render();
            })
        })
}



window.onload = () => {
    render();
    const form = document.getElementById('todo-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        const todo = document.getElementById('todo');
        const todoText = todo.value;
        todo.value = '';
        if(isNew){
            const objTodo = {
                text: todoText,
                status: false
            }
            todos.push(objTodo);
            const todoString = JSON.stringify(todos);
            localStorage.setItem('todos', todoString);
            console.log(objTodo.status);
        }
        render();
    }
}

