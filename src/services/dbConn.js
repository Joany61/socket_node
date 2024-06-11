const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.DB_URI || "mongodb+srv://rafanomezantsoa617:bnIguThJU0hcGUcd@cluster0.kjbiqad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  console.log('connection successful')
  console.log(process.env.DB_URI)
}).catch((e) => {
  console.log('error: ' + e)
})

module.exports = mongoose
