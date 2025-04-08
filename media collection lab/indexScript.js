import {book} from './apiVersionScript.js';

const fakeBooks = [
    {
        title: "The Great Gatsby",
        author_name: ["F. Scott Fitzgerald"],
        first_publish_year: 1925,
        cover_i: 123456,
        subject: ["Fiction", "Classic"],
        isbn: ["9780743273565"]
    },
    {
        title: "To Kill a Mockingbird",
        author_name: ["Harper Lee"],
        first_publish_year: 1960,
        cover_i: 654321,
        subject: ["Fiction", "Classic"],
        isbn: ["9780061120084"]
    },
    {
        title: "Pride and Prejudice",
        author_name: ["Jane Austen"],
        first_publish_year: 1813,
        cover_i: 345678,
        subject: ["Fiction", "Romance"],
        isbn: ["9780141439518"]
    }
];

const books = book.fromJSON(fakeBooks);
books[0].imgURL = "./imgs/fakeBook0.png";
books[1].imgURL = "./imgs/fakeBook1.png";
books[2].imgURL = "./imgs/fakeBook2.png";

document.getElementById("bookCollection").innerHTML = "";

books[0].addBookElement();
books[1].addBookElement();
books[2].addBookElement();