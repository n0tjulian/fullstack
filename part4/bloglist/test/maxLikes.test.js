const totalLikes = require('../utils/list_helper').maxLikes

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
        
        ])).toEqual({
            title:'testtitle',
            author:'hello',
            url:'spepec',
            likes:22
            })
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
        
        ])).toEqual({
            title:'testtitle',
            author:'hello',
            url:'spepec',
            likes:55
            })
    })


    
})