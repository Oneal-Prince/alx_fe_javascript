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

// Call it on page load or setInterval
fetchQuotesFromServer(); // Optional: wrap in setInterval for periodic fetch
function mergeServerQuotes(serverQuotes) {
  let updated = false;

  serverQuotes.forEach(serverQuote => {
    const localIndex = localQuotes.findIndex(q => q.id === serverQuote.id);
    
    if (localIndex === -1) {
      localQuotes.push(serverQuote); // new quote from server
      updated = true;
    } else if (localQuotes[localIndex].text !== serverQuote.text) {
      
      localQuotes[localIndex] = serverQuote;
      updated = true;
    }
  });

  if (updated) {
    notifyUser("Quotes updated from server (conflicts resolved).");
    updateCategoryOptions();
    renderLastViewedQuote();
  }
}
function notifyUser(message) {
  const note = document.getElementById("notification");
  note.textContent = message;
  setTimeout(() => {
    note.textContent = "";
  }, 5000);
}
startPeriodicFetch();