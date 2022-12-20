const mongoose = require('mongoose');
const Schema = mongoose.Schema 

const AuthorSchema = new Schema({
    _AuthorId: Schema.Types.ObjectId, 
    first_name: String,
    last_name: String, 

    //this following line is saying the type field book will
    //...contain an array of book id's and it will be associated
    //...with the collection "Book"
    books: [{type: Schema.Types.ObjectId, ref: "Book"}], 
})

const AuthorModel = new mongoose.model("Author", AuthorSchema)

module.exports = AuthorModel; 