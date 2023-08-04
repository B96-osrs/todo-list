const displayController = (function() {

    function displayProjectList(parent, projectArray) {
        for(let i = 0; i < projectArray.length; i++) {
            let projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.setAttribute("data-key",i);
            projectDiv.textContent = projectArray[i].name;
            parent.appendChild(projectDiv);

        }
    }

    function displayTodoItems(parent, project) {
        project.todoArray.forEach(element => {
            let todoCard = document.createElement("div");
            todoCard.classList.add("todo-card");
            parent.appendChild(todoCard);

            createTodoElements(todoCard,element);

        });
    }


    function createTodoElements(parent,element) {
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

        parent.appendChild(todoTitle);
        parent.appendChild(todoDescription);
        parent.appendChild(todoDueDate);
        parent.appendChild(todoPriority);
        parent.appendChild(todoCheckbox);
    }

    function displayProjectHeader(parent, project) {
        let projectHeader = document.createElement("div");
        parent.appendChild(projectHeader);

        let projectName = document.createElement("div");
        projectName.classList.add("project-title");
        projectName.textContent = project.name;

        projectHeader.appendChild(projectName);

    }

    function clearCurrentProject(parent) {
        parent.innerHTML = "";
    }


    return {displayProjectList, displayTodoItems, displayProjectHeader,clearCurrentProject};
})();


export {
    displayController,
};