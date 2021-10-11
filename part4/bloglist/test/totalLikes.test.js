const totalLikes = require('../utils/list_helper').totalLikes

describe('total Likes' , () => {

    test('no elements' , () => {
        expect(totalLikes([])).toBe(0)
    })

    test('one element' , () => {
        expect(totalLikes([
            {
            title:'testtitle',
            author:'hello',
            url:'spepec',
            likes:22
            }
        
        ])).toBe(22)
    })

    test('multiple elements' , () => {
        expect(totalLikes([
            {
            title:'testtitle',
            author:'hello',
            url:'spepec',
            likes:22
            },
            {
            title:'testtitle',
            author:'hello',
            url:'spepec',
            likes:55
            },
            {
            title:'testtitle',
            author:'hello',
            url:'spepec',
            likes:33
            }
        
        ])).toBe(110)
    })


    
})