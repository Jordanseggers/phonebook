const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://mongoTrain:${password}@cluster0.r1xpz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

const Contact = mongoose.model('Contact', contactSchema)

if (!process.argv[3]) {
  console.log('phonebook:')
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
    date: new Date(),
  })
  
  contact.save().then(result => {
    console.log('contact saved!')
    mongoose.connection.close()
  })
}

