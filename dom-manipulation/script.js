// Load quotes from local storage or initialize with default quotes
const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Inspiration" }
];

// Load last selected category filter from local storage
const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to populate the category filter dropdown
function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Extract unique categories
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset options

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Set the last selected category if it exists
    categoryFilter.value = lastSelectedCategory;
}

// Function to filter and display quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);
    
    displayQuotes(filteredQuotes);

    // Save the selected category to local storage
    localStorage.setItem('selectedCategory', selectedCategory);
}

// Function to display a list of quotes
function displayQuotes(quotesToDisplay) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    quotesToDisplay.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.innerHTML = `<p>"${quote.text}"</p><p><em>${quote.category}</em></p>`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Function to add a new quote to the array and update the DOM
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        saveQuotes(); // Save the updated quotes array to local storage
        populateCategories(); // Update categories dropdown
        filterQuotes(); // Apply the current filter
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
        populateCategories(); // Update categories dropdown
        filterQuotes(); // Apply the current filter
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Add event listener to the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to show a random quote
function showRandomQuote() {
    const filteredQuotes = document.getElementById('categoryFilter').value === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === document.getElementById('categoryFilter').value);

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>${randomQuote.category}</em></p>`;
}

// Initialize the application
populateCategories(); // Populate the category filter dropdown
filterQuotes(); // Apply the last selected filter
