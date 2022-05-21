const add_task_btn = document.querySelector('.add-task-btn');
const tasks = document.querySelector('.tasks');

let delete_btn, tasks_number = 0, remain_tasks_number=0; 

let all_task_num = document.querySelector('.all-task-num');
let remain_task_num = document.querySelector('.remain-task-num');

let quote = document.querySelector('.qoute'); 
let author = document.querySelector('.author');

let search_tasks=document.querySelector('.search-tasks'); 


all_task_num.textContent = tasks_number; 
remain_task_num.textContent = remain_tasks_number;

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

const remain_tasks_num_inc_dec = (inc, dec)=>{
    if(inc === "inc"){
        remain_tasks_number++;
        remain_task_num.textContent = remain_tasks_number;
    }else{
        remain_tasks_number--;
        remain_task_num.textContent = remain_tasks_number;
    }
}

const add_task = (task_value) => {

    let task_div = document.createElement('div');
    task_div.setAttribute('class','task');

    let span = document.createElement('span');

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    let label = document.createElement('label');
    label.textContent = task_value;

    delete_btn = document.createElement('button');
    delete_btn.textContent = "Delete";
    delete_btn.setAttribute('class','task-delete');

    tasks.appendChild(task_div);
    task_div.appendChild(span);
    span.appendChild(checkbox);
    span.appendChild(label);

    
    task_div.appendChild(delete_btn);


    delete_btn.addEventListener('click',e => {
        task_div.remove(); // remove the task when user click on Delete button

        tasks_num_inc_dec("dec");
        remain_tasks_num_inc_dec("dec");
        
    });

    checkbox.addEventListener('change', e =>{
        if(e.target.checked){
            label.style.textDecoration = "line-through";
            remain_tasks_num_inc_dec("dec");

        }
        else{
            label.style.textDecoration="none";
            remain_tasks_num_inc_dec("inc");
        }
    });
    label.addEventListener('click',e=>{
        if(label.style.textDecoration === "none" || label.style.textDecoration === ""){
            label.style.textDecoration = "line-through";
            remain_tasks_num_inc_dec("dec");
            checkbox.checked=true;
        }else{
            label.style.textDecoration = "none";
            remain_tasks_num_inc_dec("inc");
            checkbox.checked=false;
        }
        
    });

}

add_task_btn.addEventListener('click',e => {
    const task_input = document.querySelector('.task-input');
    if(task_input.value){ // check if input task has value
        add_task(task_input.value);
        tasks_num_inc_dec("inc");
        remain_tasks_num_inc_dec("inc");
        
    }
    task_input.value = "";
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



