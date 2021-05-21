const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_URL, {
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