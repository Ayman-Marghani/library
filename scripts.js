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

function displayBookCard(book) {
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

function displayBooks() {
  // booksDiv.innerHtml = ""; // search for another way

  for (let book of myLibrary) {
    displayBookCard(book);
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Variables
const myLibrary = [];

const booksDiv = document.querySelector(".books");
const addBookBtn = document.querySelector(".add-btn");

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const closeBtn = document.querySelector(".close-btn");
const confirmBtn = document.querySelector(".confirm-btn");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#no-of-pages");
const readInput = document.querySelector("#read");

// Display all books
displayBooks();

// Event Listeners
addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  if (form.checkValidity()) {
    event.preventDefault();
    // create a new book object
    var newBook = new Book(
      titleInput.value, 
      authorInput.value, 
      pagesInput.value, 
      readInput.checked
    );
    // clear form data
    form.reset();
    // Add the book to MyLibrary array and display it
    addBookToLibrary(newBook);
    displayBookCard(newBook);

    dialog.close();
  }
});

closeBtn.addEventListener("click", () => {
  form.reset();
  dialog.close();
});

// Remove button for each book
// Read button for each book

