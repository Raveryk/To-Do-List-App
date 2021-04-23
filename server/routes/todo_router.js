const express = require('express');
const router = express.Router();

//Set up pool for DB connection
const pool = require('../modules/pool');


//GET request to retrieve tasks from DB
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "to-do";`;
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


//DELETE request to remove a task from client and DB


module.exports = router;