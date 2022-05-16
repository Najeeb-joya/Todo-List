const add_task_btn = document.querySelector('.add-task-btn');
const tasks = document.querySelector('.tasks');

const add_task = (task_value) => {

    let task_div = document.createElement('div');
    task_div.setAttribute('class','task');

    let span = document.createElement('span');

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    let label = document.createElement('label');
    label.textContent = " " + task_value;

    let button = document.createElement('button');
    button.textContent = "Delete";
    button.setAttribute('class','task-delete');

    tasks.appendChild(task_div);
    task_div.appendChild(span);
    span.appendChild(checkbox);
    span.appendChild(label);

    
    task_div.appendChild(button);

}

add_task_btn.addEventListener('click',e => {
    const task_input = document.querySelector('.task-input');
    console.log("Clicked");
    add_task(task_input.value);

    task_input.value = "";
});