// Load quotes from local storage or initialize with default quotes
const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Inspiration" }
];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Store the last viewed quote in session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>${randomQuote.category}</em></p>`;
}

// Function to add a new quote to the array and update the DOM
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        saveQuotes(); // Save the updated quotes array to local storage
        showRandomQuote(); // Optionally display the new quote or a random one
        clearFormInputs();
    } else {
        alert('Please fill out both fields.');
    }
}

// Helper function to clear the input fields after adding a quote
function clearFormInputs() {
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
}

// Function to export quotes as a JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // Save the updated quotes array to local storage
        alert('Quotes imported successfully!');
        showRandomQuote(); // Optionally display a quote after import
    };
    fileReader.readAsText(event.target.files[0]);
}

// Add event listener to the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Show a random quote on page load
showRandomQuote();
