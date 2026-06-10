// SEARCH BOOKS
function searchBooks() {

  let input =
  document.getElementById("searchInput")
  .value.toLowerCase();

  let books =
  document.querySelectorAll(".book-card");

  books.forEach(book => {

    let text =
    book.innerText.toLowerCase();

    if(text.includes(input)){
      book.style.display = "block";
    }

    else{
      book.style.display = "none";
    }

  });

}



// FILTER BOOKS
function filterBooks(category){

  let books =
  document.querySelectorAll(".book-card");

  books.forEach(book => {

    if(category === "all"){

      book.style.display = "block";
    }

    else if(book.dataset.category === category){

      book.style.display = "block";
    }

    else{

      book.style.display = "none";
    }

  });

}



// ISSUE / RETURN BOOK
function toggleIssue(button){

  let card =
  button.parentElement;

  let status =
  card.querySelector(".status");

  let issueDate =
  card.querySelector(".issue-date");

  let returnDate =
  card.querySelector(".return-date");

  let fine =
  card.querySelector(".fine");

  let student =
  card.querySelector(".student-name");

  let copies =
  card.querySelector(".copies");



  // ISSUE BOOK
  if(status.innerText === "Available"){

    // STUDENT NAME CHECK
    if(student.value.trim() === ""){

      alert("Please Enter Student Name");

      return;
    }

    // COPIES CHECK
    let availableCopies =
    parseInt(copies.innerText);

    if(availableCopies <= 0){

      alert("No Copies Available");

      return;
    }


    // DATE
    let today =
    new Date();

    let dueDate =
    new Date();

    dueDate.setDate(
      today.getDate() + 7
    );


    // FORMAT
    let issue =
    today.toLocaleDateString();

    let returnD =
    dueDate.toLocaleDateString();


    // STATUS
    status.innerText = "Issued";

    status.classList.remove("text-success");

    status.classList.add("text-danger");


    // DATES
    issueDate.innerHTML =
    "<strong>Issue Date:</strong> "
    + issue;

    returnDate.innerHTML =
    "<strong>Return Date:</strong> "
    + returnD;


    // REDUCE COPIES
    copies.innerText =
    availableCopies - 1;


    // SAVE RETURN DATE
    card.setAttribute(
      "data-return",
      dueDate
    );

    let issuedBooks =
JSON.parse(localStorage.getItem("issuedBooks")) || [];

issuedBooks.push({
    book: card.querySelector(".card-title").innerText,
    student: student.value,
    issueDate: issue,
    returnDate: returnD
});

localStorage.setItem(
    "issuedBooks",
    JSON.stringify(issuedBooks)
);


    // BUTTON
    button.innerText =
    "Return Book";

    button.classList.remove(
      "btn-success"
    );

    button.classList.add(
      "btn-danger"
    );

  }



  // RETURN BOOK
  else{

    let dueDate =
    new Date(
      card.getAttribute(
        "data-return"
      )
    );

    let today =
    new Date();


    // DIFFERENCE
    let difference =
    Math.floor(

      (today - dueDate)

      /

      (1000 * 60 * 60 * 24)

    );


    // FINE
    let totalFine = 0;

    if(difference > 0){

      totalFine =
      difference * 10;

      fine.innerHTML =
      "Late Fine: ₹"
      + totalFine;

    }

    else{

      fine.innerHTML =
      "No Fine";

    }



    // STATUS
    status.innerText =
    "Available";

    status.classList.remove(
      "text-danger"
    );

    status.classList.add(
      "text-success"
    );



    // INCREASE COPIES
    let availableCopies =
    parseInt(copies.innerText);

    copies.innerText =
    availableCopies + 1;



    // BUTTON
    button.innerText =
    "Issue Book";

    button.classList.remove(
      "btn-danger"
    );

    button.classList.add(
      "btn-success"
    );

  }

}
// OPEN / CLOSE CHAT

function toggleChat(){

  let chatbot =

  document.getElementById("chatbotBox");


  if(chatbot.style.display === "flex"){

    chatbot.style.display = "none";

  }

  else{

    chatbot.style.display = "flex";

  }

}




// AI CHATBOT

function askAI(){

  let input =

  document.getElementById("userInput");

  let message = input.value;

  let chatBody =

  document.getElementById("chatBody");


  if(message.trim() === "") return;



  // USER MESSAGE

  let userDiv =

  document.createElement("div");

  userDiv.className = "user-message";

  userDiv.innerText = message;

  chatBody.appendChild(userDiv);



  // BOT REPLY

  let botDiv =

  document.createElement("div");

  botDiv.className = "bot-message";



  let reply = "";


  if(message.toLowerCase().includes("science")){

    reply =
    "📚 Recommended Book: Science Basics";

  }

  else if(message.toLowerCase().includes("python")){

    reply =
    "💻 Recommended Book: Python Programming";

  }

  else if(message.toLowerCase().includes("history")){

    reply =
    "🏛️ Recommended Book: World History";

  }

  else if(message.toLowerCase().includes("fine")){

    reply =
    "💰 Late fine is ₹10 per day.";

  }

  else if(message.toLowerCase().includes("technology")){

    reply =
    "🖥️ Recommended Book: Web Development";

  }

  else{

    reply =
    "🤖 Please ask about books, categories or fees.";

  }



  setTimeout(() => {

    botDiv.innerText = reply;

    chatBody.appendChild(botDiv);

    chatBody.scrollTop = chatBody.scrollHeight;

  }, 500);



  input.value = "";


}
function logout() {

    localStorage.removeItem("userRole");
    localStorage.removeItem("studentName");

    window.location.href = "login.html";
}

window.onload = function () {

    let role = localStorage.getItem("userRole");

    if (role === "admin") {
        document.getElementById("welcomeUser").innerHTML =
        '<span class="badge bg-danger">Admin</span>';
    } else {
        document.getElementById("welcomeUser").innerHTML =
        '<span class="badge bg-primary">Student</span>';
    }
};

function showIssuedBooks(){

    let container =
    document.getElementById("issuedBooksList");

    if(!container) return;

    let books =
    JSON.parse(localStorage.getItem("issuedBooks")) || [];

    let html = "";

    books.forEach(book=>{

        html += `
        <div class="card p-3 mb-2">
            <h5>${book.book}</h5>
            <p>Student: ${book.student}</p>
            <p>Issue Date: ${book.issueDate}</p>
            <p>Return Date: ${book.returnDate}</p>
        </div>
        `;
    });

    container.innerHTML = html;
}

showIssuedBooks();
