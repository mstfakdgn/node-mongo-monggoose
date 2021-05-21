const express = require("express");
const userRouter = require("./routers/user.js");
const taskRouter = require("./routers/task.js");
const multer = require("multer");

const app = express();
const port = process.env.PORT;

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
app.use(userRouter);
app.use(taskRouter);

const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith(".pdf")) {
      return cb(new Error("Please uplaod a PDF"));
    }
    cb(undefined, true);
  },
});

app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
