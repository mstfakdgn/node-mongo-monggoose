require('../src/db/mongoose')
const User = require('../src/models/user.js')

// //60a2362c667b34869b70c7d6

// User.findByIdAndUpdate('60a2362c667b34869b70c7d6', {age:1}).then((user) => {
//     console.log(user);

//     return User.countDocuments({ age:1 })
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })

const updateAgeandCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age:age})
    const count = await User.countDocuments({age})

    return count
}

updateAgeandCount('60a23657573f1c8731aec5de', 5).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);

})