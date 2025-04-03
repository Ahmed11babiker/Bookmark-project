var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");

bookList = [];
if (localStorage.List != null) {
  bookList = JSON.parse(localStorage.List);
  display();
} else {
  bookList = [];
}

function addBook() {
  if (validatebookName() && validateURL()) {
    var singleBook = {
      name: bookmarkName.value,
      url: bookmarkURL.value,
    };

    bookList.push(singleBook);
    localStorage.setItem("List", JSON.stringify(bookList));
    restInput();
    display();
  } else {
    showAlert();
    restInput();
  }
}

//  restinput values
function restInput() {
  bookmarkName.value = "";
  bookmarkURL.value = "";
  bookmarkName.classList.remove("is-valid");
  bookmarkURL.classList.remove("is-valid");
}

// display data

function display() {
  var box = "";
  for (var i = 0; i < bookList.length; i++) {
    box += `
        <tr>
        <th scope="row">${i}</th>
        <td>${bookList[i].name}</td>
        <td><button onclick="window.open('${bookList[i].url}', '_blank')" class="btn btn-visit text-white fw-bold px-2 fs-6 id="submit"><i class="fa fa-eye px-1" aria-hidden="true"></i> Visit</button></td>
        <td><button onclick="deleteBook(${i})" class="btn btn-delete  text-white fw-bold px-2  fs-6" id="delete"><i class="fa-solid fa-trash-can px-1"></i>Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tableContent").innerHTML = box;
}

function deleteBook(index) {
  bookList.splice(index, 1);
  localStorage.setItem("List", JSON.stringify(bookList));
  display();
}

function validateURL() {
  let url = bookmarkURL.value;
  let error = document.getElementById("error");
  let pattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/.*)?$/;

  if (!pattern.test(url)) {
    bookmarkURL.classList.add("is-invalid");
    bookmarkURL.classList.remove("is-valid");
    error.classList.remove("d-none");
    return false;
  } else {
    bookmarkURL.classList.add("is-valid");
    bookmarkURL.classList.remove("is-invalid");
    error.classList.add("d-none");
    return true;
  }
}

function validatebookName() {
  text = bookmarkName.value.trim();
  let erroMsg = document.getElementById("errorMessage");
  var regx = /^[A-Z][a-z]{3,8}$/;
  //   if (bookList.includes(text)) {
  //     erroMsg.textContent = `"${text}" already exists. Please choose another name.`;
  // } else {
  //   erroMsg.textContent = ""; // Clear the error if valid
  // }
  if (regx.test(text)) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");
    erroMsg.classList.add("d-none");
    return true;
  } else {
    bookmarkName.classList.add("is-invalid");
    bookmarkName.classList.remove("is-valid");
    erroMsg.classList.remove("d-none");
    return false;
  }
}

function showAlert() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong !please enter a valid bookName or bookUrl",
    footer: '<a href="#">Why do I have this issue?</a>',
  });
}
