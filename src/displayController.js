const displayController = (function() {

    function displayProjectList(parent, projectArray) {
        parent.innerHTML = "";
        for(let i = 0; i < projectArray.length; i++) {
            let projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.setAttribute("data-key",i);
            projectDiv.textContent = projectArray[i].name;
            parent.appendChild(projectDiv);

        }
    }

    function displayTodoItems(parent, project) {
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        parent.appendChild(cardContainer);

        project.todoArray.forEach(element => {

            let todoCard = document.createElement("div");
            todoCard.classList.add("todo-card");
            cardContainer.appendChild(todoCard);

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
        projectHeader.classList.add("project-header");
        parent.appendChild(projectHeader);

        let projectName = document.createElement("div");
        projectName.classList.add("project-title");
        projectName.textContent = project.name;

        let projectDeleteButton = document.createElement("button");
        projectDeleteButton.classList.add("delete-button");
        projectDeleteButton.textContent = "Delete Project";

        let projectAddTodoButton = document.createElement("button");
        projectAddTodoButton.setAttribute("id","add-todo-button");
        projectAddTodoButton.textContent = "Add To-do List";


        projectHeader.appendChild(projectName);
        projectHeader.appendChild(projectDeleteButton);
        projectHeader.appendChild(projectAddTodoButton);

    }

    function clearCurrentProject(parent) {
        parent.innerHTML = "";
    }

    function showProjectModal(parent) {
        let projectModal = document.createElement("div");
        projectModal.classList.add("project-form");
        parent.appendChild(projectModal);

        let projectInput = document.createElement("input");
        projectInput.setAttribute("type", "text");
        projectInput.setAttribute("id", "project-input");

        let projectInputLabel = document.createElement("label");
        projectInputLabel.setAttribute("for","project-input");
        projectInputLabel.textContent = "Project Name";

        let projectSubmitButton = document.createElement("button");
        projectSubmitButton.setAttribute("id", "submit-button");
        projectSubmitButton.textContent = "Add Project";

        projectModal.appendChild(projectInputLabel);
        projectModal.appendChild(projectInput);
        projectModal.appendChild(projectSubmitButton);
    }


    function hideProjectModal() {
       let contentBox = document.querySelector(".content");
        contentBox.removeChild(contentBox.lastChild);
    }


    return {displayProjectList, displayTodoItems, displayProjectHeader,clearCurrentProject, showProjectModal, hideProjectModal};
})();


export {
    displayController,
};