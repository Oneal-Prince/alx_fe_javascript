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

function notifyUser(message) {
  const note = document.getElementById("notification");
  note.textContent = message;
  setTimeout(() => {
    note.textContent = "";
  }, 5000);
}
startPeriodicFetch();