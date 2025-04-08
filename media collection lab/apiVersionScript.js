export class book {
    #title;
    #author;
    #year;
    #imgURL;
    #isbn;
    #subject;
    #domElement;

    //constructor
    // The constructor initializes the properties of the book object.
    constructor(title, author, year, imgURL, isbn, subject) {
        this.#isbn = isbn;
        this.#subject = subject;
        this.#imgURL = imgURL;
        this.#title = title;
        this.#author = author;
        this.#year = year;
    }
    
    //getters and setters
    get title() {
        return this.#title;
    }

    get author() {
        return this.#author;
    }

    get year() {
        return this.#year;
    }

    get imgURL() {
        return this.#imgURL;
    }

    get isbn() {
        return this.#isbn;
    }

    get subject() {
        return this.#subject;
    }

    set title(title) {
        this.#title = title;
    }

    set author(author) {
        this.#author = author;
    }

    set year(year) {
        if (year < 0) {
            this.#year = `${Math.abs(year)} BCE`; // Convert negative years to BCE format
        } else {
            this.#year = year;
        }
    }

    set imgURL(imgURL) {
        this.#imgURL = imgURL;
    }

    set isbn(isbn) {
        try {
            if (Array.isArray(isbn) && isbn.length >= 3) {
                this.#isbn = isbn;
            } else {
                throw new Error("ISBN must be an array with at least 3 elements.");
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    set subject(subject) {
        try {
            if (Array.isArray(subject) && subject.length >= 3) {
                this.#subject = subject;
            } else {
                throw new Error("Subject must be an array with at least 3 elements.");
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }
    
    //helper methods
    // This method returns a dom element representing the book object.
    addBookElement() {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.style.clear = "both";
        bookElement.innerHTML = `
            <img src="${this.#imgURL}" class="book-cover" style="float: left; margin-right: 10px; margin-bottom: 10px;"">
            <h2>${this.#title}</h2>
            <p>${this.#author}</p>
            <p>${this.#year}</p>
            <label>ISBN: </label> <select id="isbnDisplay"></select>
            <br>
            <label>Subject: </label> <select id="subjectDisplay"></select>
        `;
        // Create a select element for ISBN
        const isbnSelect = bookElement.querySelector("#isbnDisplay");
        this.#isbn.forEach(isbn => {
            const option = document.createElement("option");
            option.value = isbn;
            option.textContent = isbn;
            isbnSelect.appendChild(option);
        });
        // Create a select element for Subject
        const subjectSelect = bookElement.querySelector("#subjectDisplay");
        this.#subject.forEach(subject => {
            const option = document.createElement("option");
            option.value = subject;
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });
        document.getElementById("bookCollection").appendChild(bookElement);
        this.#domElement = bookElement;
    }

    // This method returns a string representation of the book object.
    toString() {
        return `${this.#title} by ${this.#author}, published in ${this.#year} it includes subjects such as ${this.#subject[0]}, ${this.#subject[1]}, and ${this.#subject[2]}. It can be found by such ISBNs as the following ${this.#isbn[0]}, ${this.#isbn[1]}, and ${this.#isbn[2]}.`;
    }

    // Factory method to create book objects from a JSON object or an array of JSON objects
    static fromJSON(json) {
        if (Array.isArray(json)) {
            // If the input is an array, map each item to a new book instance
            return json.map(item => {
                let temp = new book(
                    item.title,
                    item.author_name ? item.author_name[0] : "Unknown Author",
                    item.first_publish_year || "Unknown Year",
                    `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`,
                    item.subject ? item.subject : "Unknown Subject",
                    item.isbn ? item.isbn : "Unknown ISBN"
                );
                temp.addBookElement(); // Add the book element to the DOM
                return temp; // Return the book instance
            });
        } else {
            // If the input is a single object, create a single book instance
            let temp = new book(
                json.title,
                json.author_name ? json.author_name[0] : "Unknown Author",
                json.first_publish_year || "Unknown Year",
                `https://covers.openlibrary.org/b/id/${json.cover_i}-M.jpg`
            );
            temp.addBookElement(); // Add the book element to the DOM;
            return [temp]; // Return an array with the single book instance
        }
}
}

let searchQuery = "Science Fiction"; // Set the search query for the Open Library API
let pageLimit = 25; // Set the number of books to fetch per page
let pageNumber = 1; // Set the page number to fetch
// This function fetches data from the Open Library API and prints it to the console.
let dataOut;
async function fetchData() {
    try {
        console.log("Fetching data..."); // Log when the data fetching starts
        const apiResponse = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&fields=author_name,title,first_publish_year,cover_i,subject,isbn&limit=${pageLimit}&page=${pageNumber}`);
        dataOut = await apiResponse.json();
        console.log("Data fetched:", dataOut); // Log the fetched data
        parseData(dataOut); // Parse the fetched data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const currentLoadedBooks = [];

function parseData(dataOut) {
    if (dataOut && dataOut.docs) {
        console.log("parsing data..."); // Log when the data parsing starts
        // Clear the currentLoadedBooks array
        currentLoadedBooks.length = 0;

        // Populate the array with new book instances
        const newBooks = book.fromJSON(dataOut.docs);
        currentLoadedBooks.push(...newBooks); // Add new books to the array

        // Update the page number options
        let pageCount = Math.ceil(dataOut.numFound / pageLimit); // Calculate the total number of pages
        const pageNumber = document.getElementById('pageNumber');
        const options = [];
        for (let i = 0; i < pageCount; i++) {
            const option = document.createElement('option');
            option.value = i + 1;
            option.textContent = i + 1;
            options.push(option);
        }
        pageNumber.replaceChildren(...options); // Replace the page number options in the select element
    }
}

window.addEventListener("load", function() {
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", function(event) {
        console.log("Form submitted"); // Log when the form is submitted
        event.preventDefault(); // Prevent the default form submission
        const searchInput = document.getElementById("searchInput").value; // Get the search input value
        const pageToDisplay = document.getElementById("pageNumber").value; // Get the selected page number
        const numResultsToDisplay = document.getElementById("numResults").value; // Get the selected page limit 
        searchQuery = searchInput; // Update the search query
        pageNumber = parseInt(pageToDisplay); // Update the page number
        pageLimit = parseInt(numResultsToDisplay); // Update the page limit
        // Clear the book collection and reset the page number options
        document.getElementById("bookCollection").innerHTML = ""; 
        fetchData(); // Fetch data from the Open Library API with the new search query
        console.log("Data fetched"); // Log when the data is fetched
    });
    fetchData(); // Fetch data when the page loads
});
