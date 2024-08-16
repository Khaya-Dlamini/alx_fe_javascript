// Mock server endpoint
const serverEndpoint = 'https://jsonplaceholder.typicode.com/posts';

// Function to simulate fetching quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverEndpoint);
        const serverQuotes = await response.json();
        
        // Convert server quotes to the format used in the application
        const formattedQuotes = serverQuotes.map(quote => ({
            text: quote.title,
            category: 'Server Category' // Assuming a single category for server quotes
        }));

        return formattedQuotes;
    } catch (error) {
        console.error('Error fetching quotes from server:', error);
        return [];
    }
}

// Function to simulate posting new quotes to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(serverEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: quote.text,
                body: quote.category,
                userId: 1
            })
        });

        return await response.json();
    } catch (error) {
        console.error('Error posting quote to server:', error);
    }
}

// Function to periodically fetch quotes and sync with local storage
async function syncWithServer() {
    const syncQuotes = await fetchQuotesFromServer();
    
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    
    const mergedQuotes = resolveConflicts(localQuotes, syncQuotes);
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
    
    displayNotification('Quotes have been synced with the server.');
    filterQuotes();
}

// Function to resolve conflicts between local and server data
function resolveConflicts(localQuotes, syncQuotes) {
    // Here, server data takes precedence
    const serverTexts = syncQuotes.map(quote => quote.text);

    const mergedQuotes = localQuotes.filter(quote => !serverTexts.includes(quote.text))
                                     .concat(syncQuotes);

    return mergedQuotes;
}

// Function to display notifications to the user
function displayNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Initialize the application with server sync
async function initializeApp() {
    await syncWithServer(); // Initial sync with the server
    populateCategories();
    filterQuotes();

    // Periodic sync every 5 minutes
    setInterval(syncWithServer, 5 * 60 * 1000);
}

// Initialize the application on page load
initializeApp();

// Override the addQuote function to post to the server
async function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        populateCategories();
        filterQuotes();
        clearFormInputs();
        
        // Post the new quote to the server
        await postQuoteToServer(newQuote);
        displayNotification('Quotes synced with server! new ones added');
    } else {
        alert('Please fill out both fields.');
    }
}
