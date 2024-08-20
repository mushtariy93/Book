const express = require("express");

const {updateMany} = require("../schemas/book");
const { addBook, getBooks, getBookById, updateBookById, deleteBookById } = require("../controllers/book.controller");

const router = express.Router();

router.post("/add", addBook);
router.get("/", getBooks);
router.patch("/update/:id", updateBookById)
router.delete("/delete/:id", deleteBookById)
router.get("/:id", getBookById)

module.exports = router;