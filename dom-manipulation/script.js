
function startPeriodicFetch() {
  setInterval(fetchQuotesFromServer, 10000); // every 10 seconds
}

// Fetch from simulated API (e.g. JSONPlaceholder)
function fetchQuotesFromServer() {
  fetch("https://stub.muindetuva.com/public-api")
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
