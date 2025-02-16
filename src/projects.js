import todos from "./todos.js";

const create = (newTitle) => {
    return Object.assign(
        {},
        {title: newTitle},
        {todos: {}},
        {
            getTodoID(todo) {
                return todo.id;
            },
            addTodoToProject(newTodo) {
                this.todos[this.getTodoID(newTodo)] = newTodo;
            }
        },
    );
}

export default {create};

