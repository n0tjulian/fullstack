const totalLikes = require('../utils/list_helper').authorWithMostLikes

describe('Author with the most total likes across all authored blogs' , () => {

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
            },
            {
            title:'testtitle',
            author:'newauthor',
            url:'spepec',
            likes:111
            },
            {
            title:'testtitle',
            author:'newauthor',
            url:'spepec',
            likes:30
            }
        
        ])).toEqual({
            author:'newauthor',
            likes:141
            })
    })


    
})