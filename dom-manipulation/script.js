
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


function generateQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    document.getElementById("quoteDisplay").textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").textContent = `"${quote.text}" — [${quote.category}]`;

  quoteDisplay.innerHTML = `
    <p><strong>"${quote.text}"</strong></p>
    <p><em>Category:</em> ${quote.category}</p> `;

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();
  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  alert("Quote added successfully!");
  

  const newQuote = { text, category };
  quotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));

}

let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  "The best way to get started is to quit talking and begin doing.",
  "Don't let yesterday take up too much of today."
];

// Load last viewed quote from session storage
if (sessionStorage.getItem("lastQuote")) {
  document.getElementById("quoteDisplay").innerText = sessionStorage.getItem("lastQuote");
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function addQuote() {
  const newQuote = document.getElementById("newQuote").value.trim();
  if (newQuote) {
    quotes.push(newQuote);
    saveQuotes();
    document.getElementById("newQuote").value = '';
    alert("Quote added!");
  } else {
    alert("Please enter a quote.");
  }
}

function showRandomQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quoteDisplay").innerText = randomQuote;

  // Store last viewed quote in session storage
  sessionStorage.setItem("lastQuote", randomQuote);
}

// EXPORT quotes as JSON file
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// IMPORT quotes from uploaded JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        throw new Error("Invalid JSON format");
      }
    } catch (err) {
      alert("Failed to import: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Motivation" },
  { text: "I'm not arguing, I'm just explaining why I'm right.", category: "Humor" }
];

// Save and load last selected filter
const lastSelectedCategory = localStorage.getItem("selectedCategory") || "all";
document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  document.getElementById("categoryFilter").value = lastSelectedCategory;
  filterQuotes();
});

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuote").value.trim();
  const category = document.getElementById("newCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories();
    filterQuotes();

    document.getElementById("newQuote").value = '';
    document.getElementById("newCategory").value = '';
    alert("Quote added!");
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Show a random quote (from all quotes or filtered)
function showRandomQuote() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  if (randomQuote) {
    document.getElementById("quoteDisplay").innerText = `${randomQuote.text} [${randomQuote.category}]`;
    sessionStorage.setItem("lastQuote", randomQuote.text);
  } else {
    document.getElementById("quoteDisplay").innerText = "No quotes in this category.";
  }
}

// Populate category filter dropdown
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];

  // Preserve selected value
  const currentValue = select.value;

  select.innerHTML = '<option value="all">All Categories</option>';
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });

  // Restore selected value if it still exists
  if (uniqueCategories.includes(currentValue)) {
    select.value = currentValue;
  }
}

// Filter and display quotes
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  const display = document.getElementById("quoteDisplay");
  if (filtered.length > 0) {
    display.innerText = filtered.map(q => `${q.text} [${q.category}]`).join('\n\n');
  } else {
    display.innerText = "No quotes available in this category.";
  }
}

// Export quotes as JSON file
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from uploaded JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      } else {
        throw new Error("Invalid JSON format.");
      }
    } catch (err) {
      alert("Failed to import: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
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
