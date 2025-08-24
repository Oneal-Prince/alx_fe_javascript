
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


const mockApi = 'https://jsonplaceholder.typicode.com/posts'

async function fetchQuotesFromServer() {
  const mockApi = await fetch(mockApi)
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    }
      const serverQuotes = data.map(post => ({
        id: post.id,
        text: post.title,
        category: "Imported"
      }));

      mergeServerQuotes(serverQuotes); 
      console.error("Failed to fetch quotes from server:", error);

function postQuoteToServer(quote) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(quote)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Quote successfully posted to server:", data);
    notifyUser("Quote synced to server.");
  })
  .catch(error => {
    console.error("Error posting quote:", error);
  });
}
function syncQuotes() {
  console.log("🔄 Syncing quotes with server...");

  // Step 1: Fetch from server
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then(res => res.json())
    .then(serverData => {
      const serverQuotes = serverData.map(post => ({
        id: post.id,
        text: post.title,
        category: "Imported"
      }));

      // Step 2: Merge server quotes into local
      mergeServerQuotes(serverQuotes);

      // Step 3: POST any new local quotes not on server
      localQuotes.forEach(localQuote => {
        if (!serverQuotes.some(sq => sq.id === localQuote.id)) {
          postQuoteToServer(localQuote); // POST helper function
        }
      });

      notifyUser("Sync complete.");
    })
    .catch(error => {
      console.error("❌ Sync failed:", error);
      notifyUser("⚠️ Sync failed.");
    });
}

// Start syncing every 10 seconds
setInterval(() => {
  console.log("🔁 Checking for new quotes from server...");
  fetchQuotesFromServer();
}, 10000); // 10,000 ms = 10 seconds

function saveQuotesToLocalStorage() {
  localStorage.setItem("quotes", JSON.stringify(localQuotes));
}

function notifyUser(message, type = "info") {
  const note = document.getElementById("notification");
  if (!note) return;

  note.textContent = message;
  note.style.color = type === "error" ? "red" : type === "warning" ? "orange" : "green";

  setTimeout(() => {
    note.textContent = "";
  }, 5000); 
  notifyUser("Quotes synced with server!");
  notifyUser("Conflicts found — server data used.", "warning");
  notifyUser("Sync failed. Please try again.", "error");
  alert("Failed to import quotes: Invalid JSON format.");
}
