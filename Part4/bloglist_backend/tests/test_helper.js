const Blog = require('../models/blog')
const User = require('../models/user')

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const testUsers = [
    {
        "name": "Nivedh Krishna",
        "username": "Nivedh",
        "password": "krish"
    },
    {
        name: "Aswhin Kumar",
        username: 'Ashwin',
        password: 'Ashhh12'
    }
]

const testBlogList0 = [
    {
         title: 'React patterns',
        author: 'Michael Johnson',
        url: 'https://reactpatterns.com/',
    },
    {
        title: 'Harmful Diseases',
        author: 'Edsger Walt',
        url:'http://harmfuldiseasesbyWalt.in/',
    },
    {
       title: 'Reduction on Iron',
        author: 'Hetmeyer',
        url: 'http://ironissues.com/',
    },
 { 
        title: 'First class tests',
        author: 'Mangesh Iyer',
        url: 'http://blog.aboutclasstest/com',
    },
]

const testBlogList1 = [
    {title: 'Beautiful Disaster',
        author: 'Mangesh Iyer',
        url:'http://blog.disasterwonders.com/',
    },
    {
        title: 'War Ends',
        author: 'Robert C. Martin',
        url: 'http://blog.war.com/',
    }
]


module.exports = {
    blogsInDb, usersInDb, testUsers, testBlogList0, testBlogList1
}
