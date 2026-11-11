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

const libraryContainer = document.querySelector("#library");

function displayBooks() {
    libraryContainer.textContent = ""; /* 清空容器内容 */

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `by ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;

        const status = document.createElement("p");
        status.textContent = book.read ? "Read" : "Not Read yet";

        card.append(title, author, pages, status);
        libraryContainer.appendChild(card);
    });
}

displayBooks();

const newBookBtn = document.querySelector("#new-book-btn");
const dialog = document.querySelector("#book-dialog");
const form = document.querySelector("#book-form");
const cancelBtn = document.querySelector("#cancel-btn");

newBookBtn.addEventListener("click", () =>{
    dialog.showModal(); /* 以模态方式打开： 背景变暗， 后面点不到， 按 esc会关闭*/
});

cancelBtn.addEventListener("click", () =>{
    dialog.close();
});

dialog.addEventListener("close", () => {
    form.reset();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const author = document.querySelector("#author").value.trim();
    const pages = Number(document.querySelector("#pages").value());
    const read = document.querySelector("#read").checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();

    dialog.close();
});