const { errorMonitor } = require("events");
const { errorHandler } = require("../helpers/error_handler");
const book = require("../schemas/book");
const mongoose = require("mongoose");
const { STATUS_CODES } = require("http");

const addBook = async (req, res) => {
    try {
        const {title, author, pages, price, publish_date, publisher_id, type_id} = req.body;
        const oldBook = await book.findOne({title})
        if(oldBook) {
            return res.status(400).send({message: "Bunday kitob allaqachon mavjud!"})
        }
        const newBook = book ({title, author, pages, price, publish_date, publisher_id, type_id});
        console.log(newBook);
        await newBook.validate()
        await newBook.save();
    } catch (error) { 
        errorHandler(res, error)
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await book.find()
        res.send(books);
    } catch (error) {
        errorHandler(res, error)
    }
}

const getBookById =async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("Incorrect Object ID")
        }
         const books = await book.findById(req.params.id)
         if(!book) {
            return res.status(400).send("Bunday kitob topilmadi")
         }
         res.send({books});
    } catch (error) {
        errorHandler(res, error);
    }
}

const updateBookById = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("Incorrect Object ID")
        }
        const {title, author, pages, price} = req.body
        const updated_book = await book.findByIdAndUpdate(
            req.params.id,
            {
                title,
                author, 
                pages,
                price
            },
            {new: true}
        );
        if(!updated_book) {
            return res.status(400).send("Bunday kitob topilmadi!    ")
        }
        res.status(400).send({
            statusCode: 200,
            message: "Kitob muvaffaqiyatli o'zgartirildi!",
            date: updated_book,
        }
        )
    } catch (error) {
        errorHandler(res, error)
    }
}

const deleteBookById = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send("Incorrect Object ID")
        }
        const deleted_book = await book.findByIdAndDelete(req.params.id);
        if(!deleted_book) {
            return res.status(400).send("Book not found")
        }
        res.status(200).send({
            statusCode: 200,
            message: "Book successfully deleted!",
            date: deleted_book
        });
    } catch (error) {
        errorHandler(res, error);
    }
}



module.exports = {
    addBook,
    getBooks,
    getBookById,
    updateBookById,
    deleteBookById
}