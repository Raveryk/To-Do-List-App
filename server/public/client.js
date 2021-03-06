
$(document).ready(onReady) 




function onReady() {
    console.log('jQuery is working!!');
    // click handlers to add new task
    $('#task-btn').on('click', addTask);
    // to mark a task as complete
    $('#task-view').on('click', '.task-complete', completeTaskHandler);
    // to delete a task
    $('#task-view').on('click', '.task-delete', deleteTaskHandler)

    textCount();
    getTasks();
    
};


// Function to count text for task input field.
function textCount() { //Heavily relied on this code at this link: https://www.codeply.com/go/s0F9Iz38yn/bootstrap-textarea-with-character-count-_-bootstrap-3
    let textMax = 35;
    $('#countText').html('0/' + textMax);

    $('#task-input').keyup(function() {
        let textLength = $('#task-input').val().length;
        let textRemaining = textMax - textLength;

        $('#countText').html(textLength + '/' + textMax);
    })
}



/// function to grab input elements from DOM inputs
function addTask() {
    console.log('Add task button clicked.');
    

    let newTask = {
        task: $('#task-input').val(),
        due_date: $('#date-input').val(),
        isComplete: 'false'
    };
    // Sends input values to the DB
    saveTask(newTask);
    
}


//GET ajax call
function getTasks() {
    console.log('In getTasks');
    $('#task-view').empty();

    $.ajax({
        type: 'GET',
        url: '/to-do'
    }).then(response => {
        console.log(response);
        renderToDom(response);
    }).catch(error => {
        console.log('error in GET call', error);
    });
    
}

function renderToDom(taskArray) {
//variable to grab the current day/time --- I sliced the string to only show month and day -- couldn't figure out formatting.
    let timeStamp = new Date().toISOString();
    //loop through response array to GET all tasks
    for( let job of taskArray ) {

        if( job.isComplete == true) {

            $('#task-view').append(`<tr class="task-row">
                <td class="task-column"><div class="col-md-6">${job.task}</div></td>
                <td><div class="col-md-6">${job.due_date.slice(5,10)}</div></td>
                <td><div class="col-md-12">on ${timeStamp.slice(5,10)}</div></td>
                <td><div class="col-md-10"></div></td>
                <td><button class="task-delete btn btn-outline-danger btn-sm btn-responsive" data-id="${job.id}">Delete</button></td>
                </tr>`);
            $('.task-row').css('text-decoration', 'line-through').css('color', 'green');
            } else {
            $('#task-view').append(`<tr>
                <td class="task-column"><div class="col-md-6">${job.task}</div></td>
                <td><div class="col-md-6">${job.due_date.slice(5,10)}</div></td>
                <td><div class="col-md-12">${job.isComplete}</div></td>
                <td><button class="task-complete btn btn-outline-success btn-sm btn-responsive" data-id="${job.id}">Completed</button></td>
                <td><button class="task-delete btn btn-outline-danger btn-sm btn-responsive" data-id="${job.id}">Delete</button></td>
            </tr>`);
       
            }
    }
 //end loop
}


//POST ajax call
function saveTask(newTask) {
    console.log('In saveTask', newTask);
    
    $.ajax({
        type: 'POST',
        url: '/to-do',
        data: newTask
    }).then(response => {
        console.log('Response from server', response);
        getTasks();
    }).catch(error => {
        console.log('There was an error during ajax POST call', error);
        alert('Unable to add task. Please try again later.');   
    })
}


//PUT ajax call
function completeTask(taskId) {
    $.ajax({
        method: 'PUT',
        url: `/to-do/${taskId}`,
        data: taskId
    })
    .then(response => {
        console.log('You updated a task!');
        //display updated tasks
        getTasks();     
    })
    .catch(error => {
        console.log('Error updating task', error);   
    })
}

// function to target specific task to mark as complete
function completeTaskHandler() {
     let timeStamp = new Date().toISOString();
    //Sweet Alert to notify user that they have completed a task.
     swal({
        title: "Completed Task!",
        text: `GREAT JOB!!! You completed the task on ${timeStamp.slice(5,10)}!`,
        icon: "success",
        })
        .then(response => {
            completeTask($(this).data("id")); 
          });
}


//DELETE ajax call -
function deleteTask(taskId) {
    $.ajax({
        method: 'DELETE',
        url: `/to-do/${taskId}`
    })
    .then(response => {
        console.log('You DELETED a task!');
        //Display updated tasks
        getTasks();
    })
    .catch(error => {
        console.log('Something went wrong trying to Delete the task', error);    
    })
}

//Handler to run delete task function on targeted item -- also added Sweet Alert confirmation.
function deleteTaskHandler() {
    swal({
        title: "Delete Task",
        text: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((task) => {
        if (task) {
          swal("Your task has been deleted!", {
            icon: "success",
          });
          deleteTask($(this).data("id"))
        } else {
          swal("Your task has NOT been deleted!");
        }
      });
};



