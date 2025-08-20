
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "Success is not final, failure is not fatal.", category: "Motivation" }
];

const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
if (lastQuote) {
  document.getElementById("quoteDisplay").textContent = `"${lastQuote.text}" — [${lastQuote.category}]`;
}


function generateQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").textContent = `"${quote.text}" — [${quote.category}]`;


  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}


function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please enter both quote and category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  alert("Quote added successfully!");
}

function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}


function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        const validQuotes = importedQuotes.filter(q => q.text && q.category);
        quotes = [...quotes, ...validQuotes];
        localStorage.setItem("quotes", JSON.stringify(quotes));
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid format. Please upload a JSON array of quote objects.");
      }
    } catch (err) {
      alert("Error reading file.");
    }
  };
  reader.readAsText(file);
}


document.getElementById("newQuote").addEventListener("click", generateQuote);
