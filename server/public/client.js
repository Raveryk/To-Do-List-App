
$(document).ready(onReady) 

function onReady() {
    console.log('jQuery is working!!');
    // TODO set up click handlers
};



//GET ajax call


//POST ajax call
function saveTask(newTask) {
    console.log('In saveTask', newTask);
    
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: newTask,
    }).then(response => {
        console.log('Response from server', response);
        //AppendToDom function
    }).catch(error => {
        console.log('There was an error during ajax POST call', error);
        alert('Unable to add task. Please try again later.');   
    })
}


//PUT ajax call


//DELETE ajax call


//AppendToDom
