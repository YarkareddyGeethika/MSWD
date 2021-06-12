const mongoose = require('mongoose')
const n = process.argv.length

if (n < 3) {
    console.log('You must give 3 or 5 arguments!')
    process.exit(1)
} else if (n === 4) {
    console.log('You must give 3 or 5 arguments!')
    process.exit(1)
} else {

  
    const contactSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Contact = mongoose.model('Contact', contactSchema)
    
    
    const callbackShow = persons => {
        console.log('PHONEBOOK')
        persons.forEach(element => {
            console.log(`${element.name}: ${element.number}`)
        })
        mongoose.connection.close()
    }

  
    const callbackAdd = response => {
        console.log(`Added ${response.name} (number ${response.number}) to phonebook!`)
        mongoose.connection.close()
    }

    const password = process.argv[2]
    const dbname = 'phonebook'
    const url =`mongodb+srv://sindhu:<password>@cluster0.olyw6.mongodb.net/exerciseDB?retryWrites=true&w=majority`
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    if (n === 3) {
        Contact.find({}).then(callbackShow)
    } else {

        const contact = new Contact({ name: process.argv[3], number: process.argv[4] })
        contact.save().then(callbackAdd)
    }

}
