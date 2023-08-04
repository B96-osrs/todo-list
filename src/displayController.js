const displayController = (function() {

    function displayProjectList(parent, projectArray) {
        projectArray.forEach(element => {
            let projectDiv = document.createElement("div");
            projectDiv.textContent = element.name;
            parent.appendChild(projectDiv);

        });
    }

    function displayTodoItems(parent,todoArray) {
        todoArray.forEach(element => {
            let todoCard = document.createElement("div");
            todoCard.classList.add("todo-card");

            let todoTitle = document.createElement("div");
            todoTitle.textContent = element.title;

            let todoDescription = document.createElement("div");
            todoDescription.textContent = element.description;

            let todoDueDate = document.createElement("div");
            todoDueDate.textContent = element.dueDate;
            let todoPriority = document.createElement("div");
            todoPriority.textContent = element.priority;
            let todoCheckbox = document.createElement("div");
            todoCheckbox.textContent = element.checkBox;

            parent.appendChild(todoCard);
            todoCard.appendChild(todoTitle);
            todoCard.appendChild(todoDescription);
            todoCard.appendChild(todoDueDate);
            todoCard.appendChild(todoPriority);
            todoCard.appendChild(todoCheckbox);

        });
    }

    return {displayProjectList, displayTodoItems};
})();


export {
    displayController,
};