const add_task_btn = document.querySelector('.add-task-btn');
const add_task_form = document.querySelector('.add-tasks');
const tasks = document.querySelector('.tasks');

let tasks_number = 0, remain_tasks_number=0; 

let all_task_num = document.querySelector('.all-task-num');
let remain_task_num = document.querySelector('.remain-task-num');

let quote = document.querySelector('.qoute'); 
let author = document.querySelector('.author');

let search_tasks=document.querySelector('.search-tasks'); 

let search_input= document.querySelector('.search-input');

all_task_num.textContent = tasks_number; 
remain_task_num.textContent = remain_tasks_number;
let tasks_array = []; 

const taskCount = ()=>{
    let getTasks = localStorage.getItem('tasks');
    all_task_num.textContent = JSON.parse(getTasks).length;
    remain_task_num.textContent = JSON.parse(getTasks).length;
}


// function for adding new tasks 
const add_task = (task_value) => {
    
    let html = `
        <div class="task"> 
            <span>
                <input type="checkbox" class="check-value">
                <label class = "label">${task_value}</label>
            </span>
           <button class="task-delete">Delete</button>
        </div>
    `;
        tasks.innerHTML += html;
}

const task_search = () => {
    let todos =  document.querySelectorAll('.label');
    // change the node list to array using spread
   let todo_array = [...todos];
   todo_array.filter(todo => !todo.textContent.includes(search_input.value))
   .forEach(ftodo => ftodo.parentElement.parentElement.style.display="none");

   todo_array.filter(todo => todo.textContent.includes(search_input.value))
  .forEach(ftodo => ftodo.parentElement.parentElement.style.display="flex");
}

// change the task status on localStorage
const isComplete = (status, target) =>{
    let stored_taskss = JSON.parse(localStorage.getItem("tasks"));
    if(status  === "checked"){   
        stored_taskss.forEach(val => {
            if(val.title == target.nextElementSibling.textContent){
                val.isComplete = true;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(stored_taskss));
    }else{
        stored_taskss.forEach(val => {
            if(val.title == target.nextElementSibling.textContent){
                val.isComplete = false;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(stored_taskss))
    }
}

// onload event Lister to call add_task function when page is loaded 
window.addEventListener('load', e =>{
   
    if(localStorage.getItem('tasks')){
          tasks_array = JSON.parse(localStorage.getItem('tasks')); 
          tasks_array.forEach(val =>{


                  let html = `
                            <div class="task"> 
                                 <span>
                                    <input type="checkbox" class="check-value" ${val.isComplete ? "checked":""}>
                                    <label class = "label" ${val.isComplete ? "style='text-decoration:line-through'":"style='text-decoration:none'"
                                }>${val.title}</label>
                                </span>
                            <button class="task-delete">Delete</button>
                            </div>
                        `;
        tasks.innerHTML += html;

        taskCount();        
        });     
}});


//event listener for searching task
search_input.addEventListener('keyup',e=>{
     task_search();
});



add_task_form.addEventListener('submit', e=>{
    e.preventDefault();
    const task_input = document.querySelector('.task-input');
    if(task_input.value){ // check if input task has value
        add_task(task_input.value);
     //   localStorage.setItem(localStorage.length.toString(), task_input.value); // save the inserted tasks on localhStorage
     const todos = {
         title:task_input.value,
         isComplete:false
     }
        tasks_array.push(todos);
        localStorage.setItem('tasks', JSON.stringify(tasks_array));
        task_input.value = "";
        taskCount(); 
       // remain_tasks_num_inc_dec("inc");
        
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    
    }
});

// handle event listener of add task button
// add_task_btn.addEventListener('click',e => {
//     const task_input = document.querySelector('.task-input');
//     if(task_input.value){ // check if input task has value
//         add_task(task_input.value);
//         task_input.value = "";
//         tasks_num_inc_dec("inc");
//         remain_tasks_num_inc_dec("inc");
        
//     }
    
// });


// add event listener for Tasks Dive
tasks.addEventListener('click', e=>{    
    if(e.target.classList.contains('task-delete')){
            e.target.parentElement.remove();

        
            let stored_tasks = JSON.parse(localStorage.getItem('tasks'));
            if(stored_tasks.length > 1){ 
                localStorage.setItem('tasks', JSON.stringify(stored_tasks.slice(0,-1)));
            }else {
                localStorage.removeItem('tasks');
                tasks_array = []; // empty the tasks_array when all tasks remove from local storage
            }
            
            // if(tasks_number === remain_tasks_number){
            //     remain_tasks_num_inc_dec("dec");
            // }
            //tasks_num_inc_dec("dec");
            taskCount();
            
    }

    // check if the checkbox is checked 
    if(e.target.classList.contains('check-value')){
       

        if(e.target.checked){
            e.target.nextElementSibling.style.textDecoration = "line-through";
            //console.log(JSON.parse(localStorage.getItem('tasks')));
            isComplete("checked", e.target)

            remain_tasks_num_inc_dec("dec");

        }
        else{
            e.target.nextElementSibling.style.textDecoration="none";
            isComplete("notchecked", e.target);
            remain_tasks_num_inc_dec("inc");
        }
    }

    // task label event handler 
    if(e.target.classList.contains('label')){
        let getTasks=  JSON.parse(localStorage.getItem("tasks"))
        if(e.target.style.textDecoration === "none" || e.target.style.textDecoration === ""){
                        e.target.style.textDecoration = "line-through";
                        remain_tasks_num_inc_dec("dec");
                        e.target.previousElementSibling.checked=true;
                     
                        
                        getTasks.forEach(task => {
                            if(task.title == e.target.textContent){
                                task.isComplete = true;
                            localStorage.setItem('tasks',JSON.stringify(getTasks)); 
                            }
                        });
                    }else{
                        e.target.style.textDecoration = "none";
                        remain_tasks_num_inc_dec("inc");
                        e.target.previousElementSibling.checked=false;

                        getTasks.forEach(task => {
                            if(task.title == e.target.textContent){
                                task.isComplete = false;
                            localStorage.setItem('tasks',JSON.stringify(getTasks)); 
                            }
                        });
                    }   
    }
});




const getQuote = ()=>{
        //const random = Math.round(Math.random() * 100);
//fetch('https://type.fit/api/quotes')
const request = fetch('https://api.quotable.io/random');
request.then(response =>{
    return response.json();
})
.then(data =>{
    console.log(data.length, "outside of IF");
    if(data.length <= 75){
        localStorage.setItem('quote', data.content);
        localStorage.setItem('author',data.author);
    
        quote.textContent = "\"" + data.content + "\"";
        author.textContent = data.author;
    }else{
        quote.textContent = "\"" + localStorage.getItem('quote') + "\"";
        author.textContent = localStorage.getItem('author');
    }
})
.catch(erro =>{
    console.log("Promise did not resolve");
    if(localStorage.length > 0){
    quote.textContent = localStorage.getItem('quote');
    author.textContent = localStorage.getItem('author'); 
    }else{
        quote.textContent = "\"Nothing of value comes fast or easy; Drips of water can one day break a stone.\"";
        author.textContent = "Unkonw";
    }
});
};
window.addEventListener('load', getQuote);

quote.textContent = "\"" + localStorage.getItem('quote') + "\"";
author.textContent = localStorage.getItem('author');

setInterval(getQuote,20000);



