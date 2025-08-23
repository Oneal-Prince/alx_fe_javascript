// Periodic fetch from mock server (simulating real-time sync)
function startPeriodicFetch() {
  setInterval(fetchQuotesFromServer, 10000); // every 10 seconds
}

// Fetch from simulated API (e.g. JSONPlaceholder)
function fetchQuotesFromServer() {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then(response => response.json())
    .then(serverData => {
      const serverQuotes = serverData.map(post => ({
        id: post.id,
        text: post.title,
        category: "Imported"
      }));

      // Simulate conflict resolution (server wins)
      mergeServerQuotes(serverQuotes);
    })
    .catch(error => console.error("Server fetch failed:", error));
}
function mergeServerQuotes(serverQuotes) {
  let updated = false;

  serverQuotes.forEach(serverQuote => {
    const localIndex = localQuotes.findIndex(q => q.id === serverQuote.id);
    
    if (localIndex === -1) {
      localQuotes.push(serverQuote); // new quote from server
      updated = true;
    } else if (localQuotes[localIndex].text !== serverQuote.text) {
      // Conflict: server wins
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
