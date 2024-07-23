// Functions
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ` + (isRead ? "read" : "not read yet");
  };
}

function displayBooks() {
  for (let book of myLibrary) {
    // Create book div
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    // Title
    const bookTitle = document.createElement("div");
    bookTitle.classList.add("title");
    bookTitle.textContent = "Title: " + book.title;
    bookCard.appendChild(bookTitle);
    // Author
    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("author");
    bookAuthor.textContent = "Author: " + book.author;
    bookCard.appendChild(bookAuthor);
    // Pages
    const bookPages = document.createElement("div");
    bookPages.classList.add("pages");
    bookPages.textContent = "Number of Pages: " + book.pages;
    bookCard.appendChild(bookPages);
    // Read Div
    const bookReadDiv = document.createElement("div");
    bookReadDiv.classList.add("read-div");
    // Read label
    const bookReadLabel = document.createElement("label");
    bookReadLabel.setAttribute("for", "read");
    bookReadLabel.textContent = "Read: ";
    bookReadDiv.appendChild(bookReadLabel);
    // Read checkbox
    const bookReadCheckbox = document.createElement("input");
    bookReadCheckbox.setAttribute("type", "checkbox");
    bookReadCheckbox.setAttribute("id", "read");
    bookReadCheckbox.setAttribute("name", "read");
    bookReadCheckbox.checked = book.isRead;
    bookCard.style.borderLeftColor = book.isRead ? "green" : "#0284c7";
    bookReadDiv.appendChild(bookReadCheckbox);

    bookCard.appendChild(bookReadDiv);
    // Remove button
    const bookRemoveBtn = document.createElement("button");
    bookRemoveBtn.classList.add("remove-btn");
    bookRemoveBtn.setAttribute("type", "button");
    bookRemoveBtn.textContent = "Remove Book";
    bookCard.appendChild(bookRemoveBtn);
    // Append book div to books section
    booksDiv.appendChild(bookCard);
  }
}

// function addBookToLibrary() {
//   // do stuff here
// }

// Variables
const myLibrary = [];
// Testing
var book1 = new Book("Testing", "Ayman Talaat", "230", false);
var book2 = new Book("The very long title you don't want", "Anas Talaat", "90", true);
myLibrary.push(book1);
myLibrary.push(book2);

const booksDiv = document.querySelector(".books");



displayBooks();


