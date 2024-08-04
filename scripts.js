// Classes
class Book {
  constructor (title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor () {
    this.libraryArr = [];
  }

  get length() {
    return this.libraryArr.length;
  }

  addBookToLibrary(book) {
    this.libraryArr.push(book);
  }

  getBookByIdx(idx) {
    return this.libraryArr[idx];
  }

  removeBook(idx) {
    this.libraryArr.splice(idx, 1);
  }
}

class DisplayController {
  constructor(library) {
    this.myLibrary = library;
    
    this.booksDiv = document.querySelector(".books");
    this.addBookBtn = document.querySelector(".add-btn");
    
    this.dialog = document.querySelector("dialog");
    this.form = document.querySelector("form");
    this.closeBtn = document.querySelector(".close-btn");
    this.confirmBtn = document.querySelector(".confirm-btn");
    
    this.titleInput = document.querySelector("#title");
    this.authorInput = document.querySelector("#author");
    this.pagesInput = document.querySelector("#no-of-pages");
    this.readInput = document.querySelector("#read");
  }
  
    displayBookCard(book, idx) {
    // Create a book card
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
    
    // Number of pages
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
    
    // Read checkbox event listener
    bookReadCheckbox.addEventListener("click", () => {
      const currentBook = bookReadCheckbox.parentNode.parentNode;
      const currentBookIdx = currentBook.getAttribute("index");
      this.myLibrary.getBookByIdx(currentBookIdx).isRead = bookReadCheckbox.checked;
      currentBook.style.borderLeftColor = bookReadCheckbox.checked ? "green" : "#0284c7";
    });
    
    // Remove button
    const bookRemoveBtn = document.createElement("button");
    bookRemoveBtn.classList.add("remove-btn");
    bookRemoveBtn.setAttribute("type", "button");
    bookRemoveBtn.textContent = "Remove Book";
    bookCard.appendChild(bookRemoveBtn);
    
    // Append the book card to books div
    this.booksDiv.appendChild(bookCard);
    
    // Remove book event listener
    bookRemoveBtn.addEventListener("click", () => {
      const currentBook = bookRemoveBtn.parentNode;
      // remove the book from myLibrary array
      const currentBookIdx = currentBook.getAttribute("index");
      this.myLibrary.removeBook(currentBookIdx);
      // remove the bookCard's child elements
      while (currentBook.firstChild) {
        currentBook.removeChild(currentBook.lastChild);
      }
      // remove the bookCard itself
      currentBook.remove();
    });
  }
  
  displayAllBooks() {
    // Remove all children elements of books div
    while (this.booksDiv.firstChild) {
      this.booksDiv.removeChild(this.booksDiv.lastChild);
    }
    
    for (let i = 0; i < this.myLibrary.length; i++) {
      this.displayBookCard(this.myLibrary.getBookByIdx(i), i);
    }
  }

  initEventListeners() {
    // Add a new book event
    this.addBookBtn.addEventListener("click", () => {
      this.dialog.showModal();
    });
    // Submit book form event
    this.confirmBtn.addEventListener("click", (event) => {
      if (this.form.checkValidity()) {
        event.preventDefault();
        // create a new book object
        const newBook = new Book(
          this.titleInput.value, 
          this.authorInput.value, 
          this.pagesInput.value, 
          this.readInput.checked
        );
        // Add the book to MyLibrary array and display it
        this.myLibrary.addBookToLibrary(newBook);
        this.displayAllBooks();
        
        // clear form data
        this.form.reset();
        this.dialog.close();
      }
    });
    // Close form event
    this.closeBtn.addEventListener("click", () => {
      this.form.reset();
      this.dialog.close();
    });
  }
}

// Main code
const library = new Library();
const displayController = new DisplayController(library);
displayController.initEventListeners();
displayController.displayAllBooks();