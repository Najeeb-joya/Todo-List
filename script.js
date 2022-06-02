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

// function to increase or decrease the all tasks number
const tasks_num_inc_dec = (inc, dec)=>{
    
    if(inc==="inc"){
        tasks_number++;
        all_task_num.textContent = tasks_number;
    }else{
        tasks_number--;
        all_task_num.textContent = tasks_number;
    } 
    if(tasks_number > 2){
        search_tasks.style.display="block";
        search_tasks.style.visibility = "visible";
    }else{
        search_tasks.style.visibility = "hidden";  
    }
}

// function to increase or decrease the remaining tasks number 
const remain_tasks_num_inc_dec = (inc, dec)=>{
    if(inc === "inc"){
        remain_tasks_number++;
        remain_task_num.textContent = remain_tasks_number;
    }else{
        remain_tasks_number--;
        remain_task_num.textContent = remain_tasks_number;
    }
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


//event listener for searching task
search_input.addEventListener('keyup',e=>{
     task_search();
});


let tasks_array = []; 
add_task_form.addEventListener('submit', e=>{
    e.preventDefault();
    const task_input = document.querySelector('.task-input');
    if(task_input.value){ // check if input task has value
        add_task(task_input.value);
     //   localStorage.setItem(localStorage.length.toString(), task_input.value); // save the inserted tasks on localhStorage
        tasks_array.push(task_input.value);
        localStorage.setItem('taks', JSON.stringify(tasks_array));
        task_input.value = "";
        tasks_num_inc_dec("inc");
        remain_tasks_num_inc_dec("inc");
        
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
        
        console.log(tasks_array);
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
    console.log("tasks event fired");

    if(e.target.classList.contains('task-delete')){
            e.target.parentElement.remove();
            localStorage.removeItem(localStorage.lengt);
            if(tasks_number === remain_tasks_number){
                remain_tasks_num_inc_dec("dec");
            }
            tasks_num_inc_dec("dec");
    }

    // check if the checkbox is checked 
    if(e.target.classList.contains('check-value')){
        console.log("Checked Now");
        if(e.target.checked){
            e.target.nextElementSibling.style.textDecoration = "line-through";
            remain_tasks_num_inc_dec("dec");

        }
        else{
            console.log("Come Here");
            e.target.nextElementSibling.style.textDecoration="none";
            remain_tasks_num_inc_dec("inc");
        }
    }

    // task label event handler 
    if(e.target.classList.contains('label')){

        if(e.target.style.textDecoration === "none" || e.target.style.textDecoration === ""){
                        e.target.style.textDecoration = "line-through";
                        remain_tasks_num_inc_dec("dec");
                        e.target.previousElementSibling.checked=true;
                    }else{
                        e.target.style.textDecoration = "none";
                        remain_tasks_num_inc_dec("inc");
                        e.target.previousElementSibling.checked=false;
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



