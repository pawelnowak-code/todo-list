{
let tasks = [];

    const addNewTask = (newTaskContent) => {
       
        tasks = [
            ...tasks, 
            {
                content: newTaskContent,
            },
        ];

        render();

    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0,taskIndex),
            ...tasks.slice(taskIndex+1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0,taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex+1),
        ];
        render();
    };

    const bindEvents = () => {

        const removeButtons = document.querySelectorAll(".js-removeTaskButton");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => { removeTask(index) });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-isTaskDoneButton");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => { toggleTaskDone(index) });
        });

    }

    const render = () => {
        let htmlString = "";

        // for (const task of tasks ) {
        tasks.forEach((task) => {
            htmlString += `
                <li class="tasksList__taskItem"> 
                    <button class="tasksList__taskButton${task.done ? " tasksList__taskButton--done" : ""} js-isTaskDoneButton">
                        ${task.done ? "✓" : ""}
                    </button>
                    <span class="tasksList__taskContent${task.done ? " tasksList__taskContent--done" : ""}">
                        ${task.content}
                    </span>                
                    <button class="tasksList__taskButton js-removeTaskButton">🗑️</button>
                </li>
            `;
        });

        document.querySelector(".js-tasksList").innerHTML = htmlString;

        bindEvents();

    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        } else {
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}