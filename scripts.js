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

function displayBookCard(book, idx) {
  // Create book div
  const bookCard = document.createElement("div");
  bookCard.classList.add("book");
  bookCard.setAttribute("index", idx);

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

  // Read checkbox event
  bookReadCheckbox.addEventListener("click", () => {
    const currentBook = bookReadCheckbox.parentNode.parentNode;
    const currentBookIdx = currentBook.getAttribute("index");
    myLibrary[currentBookIdx].isRead = bookReadCheckbox.checked;
    currentBook.style.borderLeftColor = bookReadCheckbox.checked ? "green" : "#0284c7";
  });

  // Remove button
  const bookRemoveBtn = document.createElement("button");
  bookRemoveBtn.classList.add("remove-btn");
  bookRemoveBtn.setAttribute("type", "button");
  bookRemoveBtn.textContent = "Remove Book";
  bookCard.appendChild(bookRemoveBtn);

  // Append book div to books section
  booksDiv.appendChild(bookCard);
  
  // Remove book event
  bookRemoveBtn.addEventListener("click", () => {
    const currentBook = bookRemoveBtn.parentNode;
    // remove the book from myLibrary array
    const currentBookIdx = currentBook.getAttribute("index");
    myLibrary.splice(currentBookIdx, 1);
    // remove the bookCard's child elements
    while (currentBook.firstChild) {
      currentBook.removeChild(currentBook.lastChild);
    }
    // remove the bookCard itself
    currentBook.remove();
  });
}

function displayAllBooks() {
  // Remove all children elements of books div
  while (booksDiv.firstChild) {
    booksDiv.removeChild(booksDiv.lastChild);
  }

  for (var i = 0; i < myLibrary.length; i++) {
    displayBookCard(myLibrary[i], i);
  }
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
displayAllBooks();

// Event Listeners
// Add a new book event
addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});
// submit book form event
confirmBtn.addEventListener("click", (event) => {
  if (form.checkValidity()) {
    event.preventDefault();
    // create a new book object
    const newBook = new Book(
      titleInput.value, 
      authorInput.value, 
      pagesInput.value, 
      readInput.checked
    );
    // Add the book to MyLibrary array and display it
    myLibrary.push(newBook);
    displayAllBooks();
    
    // clear form data
    form.reset();
    dialog.close();
  }
});
// Close form event
closeBtn.addEventListener("click", () => {
  form.reset();
  dialog.close();
});