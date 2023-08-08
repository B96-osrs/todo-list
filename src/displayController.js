import imageTrash from "./img/trash.svg";
import imageCheckBox from "./img/checkBox.svg";
import format, { endOfDay } from 'date-fns'


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
        let todoCardIndex = 0;

        project.todoArray.forEach(element => {

            let todoCard = document.createElement("div");
            todoCard.classList.add("todo-card");
            todoCard.setAttribute("data-key", todoCardIndex);
            cardContainer.appendChild(todoCard);

            createTodoItem(todoCard,element);
            todoCardIndex++;
            console.log("element priority: " + element.priority);
            if(element.priority === "high") {
                todoCard.style.borderColor = "red";
            }
            else if (element.priority === "low") {
                todoCard.style.borderColor = "orange";
            }

            if(element.checkBox === "true") {
                todoCard.style.borderColor = "green";
            }

        });
    }


    function createTodoItem(parent,todoItem) {
        let todoTitle = document.createElement("div");
        todoTitle.textContent = todoItem.title;

        let todoDescription = document.createElement("div");
        todoDescription.setAttribute("id", "todo-description");
        todoDescription.textContent = todoItem.description;

        let todoDueDate = document.createElement("div");
        todoDueDate.textContent = todoItem.dueDate;
        let todoPriority = document.createElement("div");
        todoPriority.textContent = "Priority: " + todoItem.priority;

        let iconDiv = document.createElement("div");

        let todoCheckIcon = document.createElement("img");
        todoCheckIcon.classList.add("icon");
        todoCheckIcon.setAttribute("id", "todo-check");
        todoCheckIcon.setAttribute("data-key",parent.dataset.key);
        todoCheckIcon.src = imageCheckBox;

        let todoTrashIcon = document.createElement("img");
        todoTrashIcon.classList.add("icon");
        todoTrashIcon.setAttribute("id","todo-delete");
        todoTrashIcon.setAttribute("data-key",parent.dataset.key);

        todoTrashIcon.src = imageTrash;
        iconDiv.appendChild(todoCheckIcon);
        iconDiv.appendChild(todoTrashIcon);

        

        parent.appendChild(todoTitle);
        parent.appendChild(todoDueDate);
        parent.appendChild(todoPriority);
        parent.appendChild(todoDescription);
        parent.appendChild(iconDiv);

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
        if(!(project.name === "General")) {
            projectHeader.appendChild(projectDeleteButton);
        }
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

    function showTodoItemModal(parent) {
        let todoModal = document.createElement("div");
        todoModal.setAttribute("id","todo-form");
        parent.appendChild(todoModal);

        let todoTitleLabel = document.createElement("label");
        todoTitleLabel.setAttribute("for", "todo-title");
        todoTitleLabel.textContent = "Title";
        let todoTitle = document.createElement("input");
        todoTitle.setAttribute("type", "text");
        todoTitle.setAttribute("id", "todo-title");

        let todoDescriptionLabel = document.createElement("label");
        todoDescriptionLabel.setAttribute("for", "todo-description");
        todoDescriptionLabel.textContent = "Description";
        let todoDescription = document.createElement("input");
        todoDescription.setAttribute("type", "text");
        todoDescription.setAttribute("id", "todo-description");

        let todoDueDateLabel = document.createElement("label");
        todoDueDateLabel.setAttribute("for", "todo-date");
        todoDueDateLabel.textContent = "Due Date";
        let todoDueDate = document.createElement("input");
        todoDueDate.setAttribute("type", "date");
        todoDueDate.setAttribute("id", "todo-date");
        todoDueDate.setAttribute("value","2024-01-01");


        let todoPriorityLabel = document.createElement("label");
        todoPriorityLabel.setAttribute("for", "todo-priority");
        todoPriorityLabel.textContent = "Priority";
        let todoPriority = document.createElement("select");
        todoPriority.setAttribute("id", "todo-priority");
        let optionLow = document.createElement("option");
        todoPriority.appendChild(optionLow);
        optionLow.textContent = "low";
        let optionHigh = document.createElement("option");
        optionHigh.textContent = "high"
        todoPriority.appendChild(optionHigh);


        let todoSubmitButton = document.createElement("button");
        todoSubmitButton.setAttribute("id", "submit-button");
        todoSubmitButton.textContent = "Add Todo";

        todoModal.appendChild(todoTitleLabel);
        todoModal.appendChild(todoTitle);
        todoModal.appendChild(todoDescriptionLabel);
        todoModal.appendChild(todoDescription);
        todoModal.appendChild(todoDueDateLabel);
        todoModal.appendChild(todoDueDate);
        todoModal.appendChild(todoPriorityLabel);
        todoModal.appendChild(todoPriority);
        todoModal.appendChild(todoSubmitButton);
    }


    function hidePopup() {
       let contentBox = document.querySelector(".content");
        contentBox.removeChild(contentBox.lastChild);
    }

    function updateMainContainer(parent, project) {
        clearCurrentProject(parent);
        displayProjectHeader(parent,project);
        displayTodoItems(parent,project);

        console.log("maincontainer updated");
    }

    function highlightCurrentProject(currentProject) {
        let projectNodeList = document.querySelectorAll(".project");
        projectNodeList.forEach(element => {
            element.style.color = "white";
        });
       projectNodeList[currentProject].style.color = "green";
    }


    return {displayProjectList, showProjectModal,showTodoItemModal, hidePopup, updateMainContainer, highlightCurrentProject};
})();


export {
    displayController,
};