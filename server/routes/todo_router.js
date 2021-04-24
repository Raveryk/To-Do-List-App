const express = require('express');
const { query } = require('../modules/pool');
const router = express.Router();

//Set up pool for DB connection
const pool = require('../modules/pool');

//TODO LOOK INTO THIS TOMORROW!!!
// const moment = require('moment');


//GET request to retrieve tasks from DB
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "to-do" ORDER BY "due_date" DESC;`;
    pool.query(queryText).then(result => {
        //sending back result in an object
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error getting task', error)
        res.sendStatus(500);
    })
})



//POST request to add new task to the DB
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Added new task..', newTask);
//query text to talk to DB
    let queryText = `INSERT INTO "to-do" ("task", "due_date", "isComplete")
                    VALUES ($1, $2, $3);`;

    pool.query(queryText, [newTask.task, newTask.due_date, newTask.isComplete])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding task into DB..', error);
            res.sendStatus(500);
            
        })
    
})

//PUT request to update the task to show that it has been completed on client and DB
router.put('/:id', (req, res) => {
    //specifying which task to target...id
    let taskId = req.params.id;

    //id $1 refers to position in taskId array below
    let queryText = `UPDATE "to-do" SET "isComplete" = 'True' WHERE "id" = $1;`;

    pool.query(queryText, [taskId])
        .then(response => {
            console.log('You COMPLETED a task', response);
            res.sendStatus(201);    
        })
        .catch(error => {
            console.log('ERROR trying to update task', error);
            res.sendStatus(500);   
        })

})


//DELETE request to remove a task from client and DB
router.delete('/:id', (req, res) => {
    //specifying which task to target...id
    let taskId = req.params.id;
    console.log('Delete request Id', taskId);

    let queryText = `DELETE FROM "to-do" WHERE "id"=$1;`;
    pool.query(queryText, [taskId])
        .then(response => {
            console.log('You DELETED a task:', response);
            res.sendStatus(201); 
        })
        .catch(error => {
            console.log('ERROR deleting task:', error);
            res.sendStatus(500); 
        })
    
})

module.exports = router;