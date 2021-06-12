const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const url = process.env.MONGODB_URI
console.log('Connecting to', url)
mongoose.set('useFindAndModify', false)
var uniqueValidator = require('mongoose-unique-validator')


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB')
    }).catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })


const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minlength: 3 },
    number: { type: String, required: true, minlength: 8 }
})
contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)