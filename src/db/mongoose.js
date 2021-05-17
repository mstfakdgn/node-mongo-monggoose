const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false
})



// const sampleTask = new Task({
//     description: 'Sample Mongoose Description',
// })

// sampleTask.save().then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log('Error: ', error);
// })