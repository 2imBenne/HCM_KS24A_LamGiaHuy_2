let bookList = [
    {
        name: "Book 1",
        author: "ABC",
        year: '1999',
        bookType:'fiction'
    },
    {
        name: "Book 2",
        author: "XYZ",
        year: '1968',
        bookType:'comedy'
    }
]


const tbodyEL = document.querySelector('tbody');
const nameInput = document.getElementById('name');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const bookTypeInput = document.getElementById('bookType');
const addBtn = document.querySelector('.btn.btn-primary');

renderData();

function renderData() {
    let dataHTML =``;

    for(let i = 0; i < bookList.length; i++){
        dataHTML += `
        <tr>
            <td>${bookList[i].name}</td>
            <td>${bookList[i].author}</td>
            <td>${bookList[i].year}</td>
            <td>${bookList[i].bookType}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editBook(${i})">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="deleteBook(${i})">Xoá</button>
            </td>
        </tr>
        `
    }
    tbodyEL.innerHTML = dataHTML

}

function addBook() {
    const inputs = [
        { element: nameInput, message: "Không được để trống!" },
        { element: authorInput, message: "Không được để trống!" },
        { element: yearInput, message: "Phải là năm hợp lệ!" },
        { element: bookTypeInput, message: "Không được để trống!" }
    ];

    let isValid = true;

    inputs.forEach(input => {
        let errorElement = input.element.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            input.element.parentElement.appendChild(errorElement);
        }

        if (input.element === yearInput) {
            const yearValue = input.element.value.trim();
            if (yearValue === '' || isNaN(yearValue) || parseInt(yearValue) >= 2026) {
                errorElement.textContent = input.message;
                isValid = false;
            } else {
                errorElement.textContent = '';
            }
        } else {
            if (input.element.value.trim() === '') {
                errorElement.textContent = input.message;
                isValid = false;
            } else {
                errorElement.textContent = '';
            }
        }
    });

    if (!isValid) return;

    const newBook = {
        name: nameInput.value.trim(),
        author: authorInput.value.trim(),
        year: yearInput.value.trim(),
        bookType: bookTypeInput.value.trim()
    };

    bookList.push(newBook);

    nameInput.value = '';
    authorInput.value = '';
    yearInput.value = '';
    bookTypeInput.value = '';

    renderData();
}


function deleteBook(index) {
    if (confirm("Bạn có chắc muốn xoá sách này không?")) {
        bookList.splice(index, 1);
        renderData();
    }
}

function editBook(index) {
    const book = bookList[index];
    nameInput.value = book.name;
    authorInput.value = book.author;
    yearInput.value = book.year;
    bookTypeInput.value = book.bookType;


    addBtn.textContent = "Cập nhật";
    addBtn.onclick = function () {
        bookList[index] = {
            name: nameInput.value.trim(),
            author: authorInput.value.trim(),
            year: yearInput.value.trim(),
            bookType: bookTypeInput.value.trim()
        };

        addBtn.textContent = "Thêm sách";
        addBtn.onclick = addBook;
        renderData();

        nameInput.value = '';
        authorInput.value = '';
        yearInput.value = '';
        bookTypeInput.value = '';
    }
}


const searchInputEl = document.querySelector('.searchInputEl');

searchInputEl.addEventListener('input', function () {
    const searchTerm = searchInputEl.value.trim().toLowerCase();

    const filteredBooks = bookList.filter(book => 
        book.name.toLowerCase().includes(searchTerm)
        
    );

    let dataHTML = ``;

    for (let i = 0; i < filteredBooks.length; i++) {
        dataHTML += `
        <tr>
            <td>${filteredBooks[i].name}</td>
            <td>${filteredBooks[i].author}</td>
            <td>${filteredBooks[i].year}</td>
            <td>${filteredBooks[i].bookType}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editBook(${bookList.indexOf(filteredBooks[i])})">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="deleteBook(${bookList.indexOf(filteredBooks[i])})">Xoá</button>
            </td>
        </tr>
        `;
    }

    tbodyEL.innerHTML = dataHTML;
});
