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

function notifyUser(message) {
  const note = document.getElementById("notification");
  note.textContent = message;
  setTimeout(() => {
    note.textContent = "";
  }, 5000);
}
startPeriodicFetch();