const express = require('express');
const bodyParser = require('body-parser');
const toDoRouter = require('./routes/todo_router.js');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/todo', toDoRouter);

app.use(express.static('server/public'));


//Set up PORT 
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});