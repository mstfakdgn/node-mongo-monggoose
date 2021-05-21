const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a<0 || b<0) {
               return reject('These are negative')
            }
            resolve(a+b)
        }, 2000)
    }) 
}

module.exports = {
    add
}