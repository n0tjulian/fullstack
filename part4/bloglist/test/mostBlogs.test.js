const totalLikes = require('../utils/list_helper').mostBlogs

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
            author:'hello',
            blogs:1
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
            },
            {
            title:'testtitle',
            author:'nothello',
            url:'spepec',
            likes:33
            },
            {
            title:'testtitle',
            author:'nothello2',
            url:'spepec',
            likes:33
            },
            {
            title:'testtitle',
            author:'nothello',
            url:'spepec',
            likes:33
            },
            {
            title:'testtitle',
            author:'nothello',
            url:'spepec',
            likes:33
            },
            {
            title:'testtitle',
            author:'nothello',
            url:'spepec',
            likes:33
            }
        
        ])).toEqual({
            author:'nothello',
            blogs:4
            })
    })


    
})