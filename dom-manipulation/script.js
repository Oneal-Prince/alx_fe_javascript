

const quotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "Inspiration" },
  { text: "Life is short, and it's up to you to make it sweet.", category: "Life" }
];


const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");


function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p><strong>"${quote.text}"</strong></p>
    <p><em>Category:</em> ${quote.category}</p> `;
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both quote text and category.");
    return;
  }


  quotes.push({ text, category });


  textInput.value = "";
  categoryInput.value = "";

  
  quoteDisplay.innerHTML = `
    <p><strong>"${text}"</strong></p>
    <p><em>Category:</em> ${category}</p>
  `;
}
function createAddQuoteForm() {
  const formContainer = document.getElementById("addQuoteForm");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.placeholder = "Enter quote text";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter category";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Quote";
  addBtn.addEventListener("click", addQuote);

  formContainer.appendChild(textInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addBtn);
}



newQuoteBtn.addEventListener("click", showRandomQuote);
