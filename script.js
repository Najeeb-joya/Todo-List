const add_task_btn = document.querySelector('.add-task-btn');
const tasks = document.querySelector('.tasks');

let tasks_number = 0, remain_tasks_number=0; 

let all_task_num = document.querySelector('.all-task-num');
let remain_task_num = document.querySelector('.remain-task-num');

let quote = document.querySelector('.qoute'); 
let author = document.querySelector('.author');

let search_tasks=document.querySelector('.search-tasks'); 


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
        search_tasks.style.display = "block";
    }else{
        search_tasks.style.display = "none";  
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

// handle event listener of add task button
add_task_btn.addEventListener('click',e => {
    const task_input = document.querySelector('.task-input');
    if(task_input.value){ // check if input task has value
        add_task(task_input.value);
        task_input.value = "";
        tasks_num_inc_dec("inc");
        remain_tasks_num_inc_dec("inc");
        
    }
    
});


// add event listener for Tasks Dive
tasks.addEventListener('click', e=>{    
    console.log("tasks event fired");
    if(e.target.classList.contains('task-delete')){
            e.target.parentElement.remove();
            if(tasks_number === remain_tasks_number){
                console.log("if caLLED");
                remain_tasks_num_inc_dec("dec");
            }
            tasks_num_inc_dec("dec");
    }

    // check if the checkbox is checked 
    if(e.target.checked){
        console.log("Checked Now");
        if(e.target.checked){
            e.target.style.textDecoration = "line-through";
            remain_tasks_num_inc_dec("dec");

        }
        else{
            e.target.style.textDecoration="none";
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
    quote.textContent = localStorage.getItem('quote');
    author.textContent = localStorage.getItem('author'); 
});
};

window.addEventListener('load', getQuote);

quote.textContent = "\"" + localStorage.getItem('quote') + "\"";
author.textContent = localStorage.getItem('author');

setInterval(getQuote,20000);



