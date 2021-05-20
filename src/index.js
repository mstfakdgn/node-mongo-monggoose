const express = require("express");
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

const app = express();
const port = process.env.PORT || 3000;

//// Example middleware
// app.use((req,res,next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are temproraly disabled')
//   } else {
//     next()
//   }
// })

// // Meantenance Middleware
// app.use((req,res, next) => {
//   res.status(503).send('Under Maintenance')
// })

//use request body
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
  console.log("Server is up on port" + port);
});
