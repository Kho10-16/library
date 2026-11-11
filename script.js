const myLibrary = []; /* 空数组，用来装所有书*/

function Book(title, author, pages, read){
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.");
    }
    this.id = crypto.randomUUID(); /*给这本书生成一个随机且唯一的id*/
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    const book = new Book(title, author,pages,read);
    myLibrary.push(book);
    return book;
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);

console.log(myLibrary);