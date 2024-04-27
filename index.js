const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  to log requests
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});




// Error-handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

app.use((req, res, next) => {
  const requestStart = new Date();
  console.log(`Request received at ${requestStart}`);

  // Continue to the next middleware 
  next();
});
app.get('/', (req, res) => {
  res.send('Welcome! If you want to access any of the routes, please use the URL: /users, /meals, or /comments');
});

// Routes
const usersRouter = require('./routes/users');
const mealsRouter = require('./routes/meals');
const commentsRouter = require('./routes/comments');

app.use('/us*ers', usersRouter);
app.use('/meals', mealsRouter);
app.use('/comments', commentsRouter);

// Serve static files
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});