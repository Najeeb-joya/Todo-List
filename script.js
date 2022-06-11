const add_task_btn = document.querySelector('.add-task-btn');
const add_task_form = document.querySelector('.add-tasks');
const tasks = document.querySelector('.tasks');

let tasks_number = 0,
   remain_tasks_number = 0;

let all_task_num = document.querySelector('.all-task-num');
let remain_task_num = document.querySelector('.remain-task-num');
let compelet_task_num = document.querySelector('.complete-task-num');

let quote = document.querySelector('.qoute');
let author = document.querySelector('.author');

let search_tasks = document.querySelector('.search-tasks');

let search_input = document.querySelector('.search-input');

let weatherContainer = document.querySelector('.weather');
let weatherIcon = document.querySelector('.weather-icon1');
let cityName = document.querySelector('.city');
let temperature = document.querySelector('.temp-num');
let tasks_array = [];


// count the all tasks and remaining taks
const taskCount = (status = "inc") => {
   let getTasks = JSON.parse(localStorage.getItem('tasks'));
   all_task_num.textContent = getTasks.length;

   let complete_tasks_array = getTasks.filter(task => {
      return task.isComplete === true;
   })
   console.log(complete_tasks_array.length);
   compelet_task_num.textContent = complete_tasks_array.length;

   remain_task_num.textContent = tasks_array.length - compelet_task_num.textContent;
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
   let todos = document.querySelectorAll('.label');
   // change the node list to array using spread
   let todo_array = [...todos];
   todo_array.filter(todo => !todo.textContent.includes(search_input.value))
      .forEach(ftodo => ftodo.parentElement.parentElement.style.display = "none");

   todo_array.filter(todo => todo.textContent.includes(search_input.value))
      .forEach(ftodo => ftodo.parentElement.parentElement.style.display = "flex");
}

// change the task status on localStorage
const isComplete = (status, target) => {
   let stored_taskss = JSON.parse(localStorage.getItem("tasks"));
   if (status === "checked") {
      stored_taskss.forEach(val => {
         if (val.title == target.nextElementSibling.textContent) {
            val.isComplete = true;
         }
      });
      localStorage.setItem('tasks', JSON.stringify(stored_taskss));
   } else {
      stored_taskss.forEach(val => {
         if (val.title == target.nextElementSibling.textContent) {
            val.isComplete = false;
         }
      });
      localStorage.setItem('tasks', JSON.stringify(stored_taskss))
   }
}

// Add Task to LocalStorage
const addTaskToLocalStorage = (taskValue)=>{
   const todos = {
      title: taskValue,
      isComplete: false
   }
   tasks_array.push(todos);
   localStorage.setItem('tasks', JSON.stringify(tasks_array));
   taskCount();
}



// onload event Lister to call add_task function when page is loaded 
window.addEventListener('load', e => {

   if (localStorage.getItem('tasks')) {
      tasks_array = JSON.parse(localStorage.getItem('tasks'));
      tasks_array.forEach(val => {


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
   }
});


//event listener for searching task
search_input.addEventListener('keyup', e => {
   task_search();
});


add_task_form.addEventListener('submit', e => {
   e.preventDefault();
   const task_input = document.querySelector('.task-input');
   let getLStasks = JSON.parse(localStorage.getItem('tasks'));
   if (task_input.value) { // check if input task has value
      add_task(task_input.value);
      addTaskToLocalStorage(task_input.value);
      task_input.value = "";
      if(tasks_array.length > 3){
         search_tasks.style.visibility = "visible";
      }
   }
});


// add event listener for Tasks Dive
tasks.addEventListener('click', e => {
   if (e.target.classList.contains('task-delete')) {

      let stored_tasks = JSON.parse(localStorage.getItem('tasks'));
      let new_stored_array = stored_tasks.splice(-1, 1);
      tasks_array = stored_tasks;
      localStorage.setItem('tasks', JSON.stringify(stored_tasks));
      taskCount();
      e.target.parentElement.remove();
      if(tasks_array.length <= 3){
         search_tasks.style.visibility = "hidden"
      }

   }

   // check if the checkbox is checked 
   if (e.target.classList.contains('check-value')) {
      if (e.target.checked) {
         e.target.nextElementSibling.style.textDecoration = "line-through";
         isComplete("checked", e.target)

         //remain_tasks_num_inc_dec("dec");
         taskCount();

      } else {
         e.target.nextElementSibling.style.textDecoration = "none";
         isComplete("notchecked", e.target);
         // remain_tasks_num_inc_dec("inc");
         taskCount();
      }
   }

   // task label event handler 
   if (e.target.classList.contains('label')) {
      let getTasks = JSON.parse(localStorage.getItem("tasks"))
      if (e.target.style.textDecoration === "none" || e.target.style.textDecoration === "") {
         e.target.style.textDecoration = "line-through";
         //remain_tasks_num_inc_dec("dec");

         e.target.previousElementSibling.checked = true;
         getTasks.forEach(task => {
            if (task.title == e.target.textContent) {
               task.isComplete = true;
               localStorage.setItem('tasks', JSON.stringify(getTasks));
            }
         });
         taskCount();
      } else {
         e.target.style.textDecoration = "none";
         // remain_tasks_num_inc_dec("inc");
         e.target.previousElementSibling.checked = false;

         getTasks.forEach(task => {
            if (task.title == e.target.textContent) {
               task.isComplete = false;
               localStorage.setItem('tasks', JSON.stringify(getTasks));
            }
         });
         taskCount();
      }
   }
});

// get a random quote from the API endpint
const getQuote = () => {
   //const random = Math.round(Math.random() * 100);
   //fetch('https://type.fit/api/quotes')
   const request = fetch('https://api.quotable.io/random');
   request.then(response => {
         return response.json();
      })
      .then(data => {
         if (data.length <= 75) {
            localStorage.setItem('quote', data.content);
            localStorage.setItem('author', data.author);

            quote.textContent = "\"" + data.content + "\"";
            author.textContent = data.author;
         }
      })
      .catch(erro => {
         console.log(" Quote Promise did not resolve" + erro);
      });
};
window.addEventListener('load', ()=>{
   getQuote();
   getWeather();
});

setInterval(getQuote, 20000);


// Fetch lon and lat and temperature and icon from openweathermap API
const getWeather =()=>{
   const apiKey = "235e5901710717d10e54947b472fdd27";
   let lat, lon; 
   const city = "Kabul"
   fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=235e5901710717d10e54947b472fdd27`)
   .then(response =>{
   
      return response.json();
   })
   .then(data =>{
      console.log(data);
      lat = data[0].lat;
      lon = data[0].lon;
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=235e5901710717d10e54947b472fdd27`);
   }).then(res =>{
      return res.json();
   })
   .then(data =>{
      console.log(data);
      weatherIcon.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
      weatherContainer.style.visibility = "visible"
      cityName.textContent = data.name;
      temperature.textContent = data.main.temp;
   })
   .catch(err =>{
      console.log("Promise did not resolve" + err);
   })
  };
  

  const getColor = ()=>  {
   let body = document.querySelector('body');
   const colorPicker = new iro.ColorPicker("#color-picker", {
      width:130, color:"#fff"
   });

   colorPicker.on("color:change", function(color){
      body.style.backgroundColor = color.hexString;
   })
  }

  getColor();
