const add_task_btn = document.querySelector('.add-task-btn');
const tasks = document.querySelector('.tasks');

let delete_btn; 

const add_task = (task_value) => {

    let task_div = document.createElement('div');
    task_div.setAttribute('class','task');

    let span = document.createElement('span');

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    let label = document.createElement('label');
    label.textContent = " " + task_value;

    delete_btn = document.createElement('button');
    delete_btn.textContent = "Delete";
    delete_btn.setAttribute('class','task-delete');

    tasks.appendChild(task_div);
    task_div.appendChild(span);
    span.appendChild(checkbox);
    span.appendChild(label);

    
    task_div.appendChild(delete_btn);


    delete_btn.addEventListener('click',e => {
        console.log("Task Deleted");
        task_div.remove();
    });

}

add_task_btn.addEventListener('click',e => {
    const task_input = document.querySelector('.task-input');
    if(task_input.value){
        add_task(task_input.value);
    }
    

    task_input.value = "";
});

