const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')
const User = require('../models/user')

const initialBlogs = [

        {title:'testtitle',
        author:'nothello',
        url:'spepec',
        likes:33},

        {title:'testtitle2',
        author:'nothello',
        url:'spepec',
        likes:33},

        {title:'testtitle3',
        author:'nothello',
        url:'spepec',
        likes:33}
  ]

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
    console.log(response)
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('id is defined' , async () => {
    const blogs = await api.get('/api/blogs')
    blogs.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })

})

test('an a user with an invalid username cannot be added, returns a 400 error', async () => {
    const newUser = {
        username:'j',
        password:'123456',
        name:'julian baker'
    }
    await api.post('/api/users').send(newUser).expect(400)
})

test('a user with an invalid password cannot be added' , async () => {
    const newUser = {
        username:'hellothisisValid',
        password:'1',
        name:'not serious'
    }

    await api.post('/api/users').send(newUser).expect(400)
})

test('a blog can be posted' , async () => {
    const newBlog = {
        title:'not another day in heaven',
        author: 'its showtime',
        url:'www.ppppd',
        likes:55
    }

    await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/)

    const blogsAfterAdding = await Blog.find({})
    expect(blogsAfterAdding).toHaveLength(initialBlogs.length+1)

    const titles = blogsAfterAdding.map(blog => blog.title)
    expect(titles).toContain('not another day in heaven')
})


test('a blog can be deleted' , async() => {
    const blogsBeforeDeletion = await Blog.find({})
    const blogToDelete = blogsBeforeDeletion[0]
    
    //check success response of deleting the blog
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAfterDeletion = await Blog.find({})

    //check length of the resulting array
    expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length-1)

    const blogsAfterDeletionTitles = blogsAfterDeletion.map(blog => blog.title)

    //check that the resulting database entries does not contain the blog that was deleted (done by checking the title)
    expect(blogsAfterDeletionTitles).not.toContain(blogToDelete.title)
})

test('a blogs likes can be changed using PUT http method' , async () => {
    const blogsToChange = await Blog.find({})
    const blogToChange = blogsToChange[0]

    blogToChange.likes = 3005
    const blogAfterChangingAfterPushing = await api.put(`/api/blogs/${blogToChange.id}`).send(blogToChange)

    //expect the object returned and the newly altered object created to match on likes
    const blogsAfterChange = await Blog.find({})
    const blogAfterChange = blogsAfterChange[0]
    //expect the object returned from the PUT request and the blogToChange initially not to match on likes
    expect(blogAfterChange.likes).toEqual(3005)


})

test('a blog with no likes defaults its likes to 0' , async () => {
    const newBlog = {
        title:'not another day in heaven',
        author: 'its showtime',
        url:'www.ppppd',
    }

    const noLikeBlog = await api.post('/api/blogs').send(newBlog)
    expect(noLikeBlog.body.likes).toEqual(0)
})

// test('an invalid blog returns a 400 bad request' , async () => {
//     const newBlog = {
//         author:'a fake author hehe',
//         likes:55
//     }

//     await api.post('/api/blogs').send(newBlog).expect(400)
   
    
// })

