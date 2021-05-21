const { add } = require('../src/math/math')

test('Hello Word Test', () => {

})

// test('async', (done) => {
//     setTimeout(() => {
//         expect(2).toBe(2)
//         done()
//     },2000)
// })

test('add', (done) => {
    const addResult = add(5, 6).then((sum) => {

        expect(sum).toBe(11)
        done() 

    }).catch((e) => {
        throw new Error('Sum is wrong')
    })
})

test('add await', async () => {
    const addResult = await add(5, 6)

    expect(addResult).toBe(11)
})
