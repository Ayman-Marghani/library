const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ` + (isRead ? "read" : "not read yet");
  };
}

var book1 = new Book("Testing", "Ayman Talaat", "230", false);
var book2 = new Book("The very long title you don't want", "Anas Talaat", "90", true);
myLibrary.push(book1);
myLibrary.push(book2);


const booksDiv = document.querySelector(".books");

function displayBooks() {
  
}

// function addBookToLibrary() {
//   // do stuff here
// }
