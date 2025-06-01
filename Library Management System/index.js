const form = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const list = document.getElementById("list");
const search = document.getElementById("search");
const clearBtn = document.getElementById("clear");

let books = JSON.parse(localStorage.getItem("books")) || [];

function save() {
  localStorage.setItem("books", JSON.stringify(books));
}

function render(filter = "") {
  list.innerHTML = "";

  books
    .filter(book =>
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.author.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach(book => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><button class="delete" data-id="${book.id}">Delete</button></td>
      `;

      list.appendChild(row);
    });

  document.querySelectorAll(".delete").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = e.target.getAttribute("data-id");
      books = books.filter(book => book.id !== id);
      save();
      render(search.value);
    })
  );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title && author) {
    books.push({
      id: Date.now().toString(),
      title,
      author
    });

    save();
    render(search.value);
    form.reset();
  }
});

search.addEventListener("input", () => {
  render(search.value);
});

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all books?")) {
    books = [];
    save();
    render();
  }
});

render();
