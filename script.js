const myLibrary = []; /* 空数组，用来装所有书*/

class Book {
    constructor(title, author, pages, read){
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    toggleRead(){
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read){
    const book = new Book(title, author,pages,read);
    myLibrary.push(book);
    return book;
}

function removeBook(id) {
    const index = myLibrary.findIndex((book) => book.id === id);
    if(index !== -1) {
        myLibrary.splice(index, 1);
    }
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
        card.dataset.id = book.id;

        const title = document.createElement("h2");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `by ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;

        const status = document.createElement("p");
        status.textContent = book.read ? "Read" : "Not Read yet";

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = book.read? "Mark as unread" : "Mark as read";
        toggleBtn.classList.add("toggle-btn");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn")

        card.append(title, author, pages, status, toggleBtn, removeBtn);
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

libraryContainer.addEventListener("click", (event) => {
    const card = event.target.closest(".card"); 
    /* event.target 实际被点到的元素，比如删除按钮*/
    /* .closest("card") 从被点的元素往上找，返回最近的.card */
    if(!card) return;

    const id = card.dataset.id;

    if(event.target.classList.contains("remove-btn")) {
        removeBook(id);
        displayBooks();
    }

    if(event.target.classList.contains("toggle-btn")) {
        const book = myLibrary.find((book) => book.id === id);
        book.toggleRead();
        displayBooks();
    }
});