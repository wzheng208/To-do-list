const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoListRouter = require('./routes/todoListRouter');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/mern-todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to DB'))
  .catch(console.error);

app.use("/", express.static(path.resolve(__dirname, "/style.scss")));

if (process.env.NODE_ENV) {
  app.use('/', express.static(path.join(__dirname, '../dist')));
}

app.use('/api', todoListRouter);

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) =>
res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start app on port
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
  
module.exports = app;