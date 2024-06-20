const form = document.querySelector("form");
const newTaskInput = document.querySelector("#newTask");
const containerTodo = document.querySelector(".container");
const todos = document.querySelector(".todos-container");

let tasksList = [];

// adiciona a tarefa no localStorage e cria a tarefa
const addTask = () => {
    const title = newTaskInput.value;

    if(title != ""){
        tasksList.push({
            task: title,
            finish: false
        })
    
        localStorage.setItem("myTasks", JSON.stringify(tasksList));
        createTask(title);
    } else {
        alert("Você precisa digitar uma tarefa!");
    }

}

// cria toda a estrutura da tarefa
const createTask = (titleTask, status = false) => {
    const newLi = document.createElement("li");
    newLi.classList.add("task-todo");

    const checkTodo = document.createElement("input");
    checkTodo.setAttribute("type", "checkbox");
    checkTodo.setAttribute("onchange", "concludeTask(this)")
    checkTodo.classList.add("finish-task");
    newLi.appendChild(checkTodo);

    const span = document.createElement("span");
    span.classList.add("todo-title");
    span.textContent = titleTask;
    newLi.appendChild(span);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-task")
    removeBtn.textContent = "x";
    newLi.appendChild(removeBtn);

    const ol = document.querySelector("#allTodos");

    if(status) {
        checkTodo.checked = true;
        newLi.classList.toggle("checked")
    }

    containerTodo.classList.add("visible");
    ol.appendChild(newLi);

    removeBtn.addEventListener("click", (e) => {
        deleteTask(e);
    })
}

// funcao para concluir a tarefa
const concludeTask = (checkbox) => {
    const parentBtn = checkbox.parentNode;

    const conclusedTask = parentBtn.querySelector("span").textContent;
    const conclusedTaskIndex = tasksList.findIndex((element) => {
        return element.task === conclusedTask;
    });

    tasksList[conclusedTaskIndex].finish = !tasksList[conclusedTaskIndex].finish;
    localStorage.setItem("myTasks", JSON.stringify(tasksList));
    parentBtn.classList.toggle("checked");
}

// funcao para deletar a tarefa
const deleteTask = (e) => {
    const btn = e.target;
    const btnParent = btn.parentNode;

    const toExclude = btnParent.querySelector("span").textContent;
    const toExcludeIndex = tasksList.findIndex((element) => {
        return element.task === toExclude;
    });

    todos.removeChild(btnParent);
    tasksList.splice(toExcludeIndex, 1);
    localStorage.setItem("myTasks", JSON.stringify(tasksList));
        
    if(tasksList.length < 1){
        containerTodo.classList.remove("visible");
    }
}

// funcao para sempre manter as tarefas atualizadas no localStorage
const updateTasks = () => {
    const localTasks = localStorage.getItem("myTasks");

    if(localTasks){
        tasksList = JSON.parse(localTasks);

        tasksList.forEach((item) => {
            const titleTask = item.task
            const taskStatus = item.finish

            createTask(titleTask, taskStatus);
        })
    }
}

// chama a funcao de atualizar tarefas sempre que atualiza a pagina
updateTasks();

// evento para criar tarefa
form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTask();
    newTaskInput.value = '';
    newTaskInput.focus();
})
