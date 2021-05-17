require('../src/db/mongoose')
const Task = require('../src/models/task.js')

// //60a2452da175809eadf664dc

// Task.findByIdAndRemove('60a2452da175809eadf664dc').then((task) => {
//     console.log(task);

//     return Task.countDocuments({ completed: false})
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })

const deleteAndCount = async (id) => {

    const task = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({ completed: false})

    return count 
}

deleteAndCount('60a25a3b5cf827c233b4e2b9').then((task) => {
    console.log(task);
}).catch((e) => {
    console.log(task);
})