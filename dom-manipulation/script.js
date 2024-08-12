const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Inspiration" }
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><em>${randomQuote.category}</em></p>`;
}

function addQuote() {
    const createElement = document.getElementById('newQuoteText').value;
    const appendChild = document.getElementById('newQuoteCategory').value;
    
    if (createElement && appendChild) {
        const createAddQuoteForm = { text: createElement, category: appendChild };
        quotes.push(createAddQuoteForm);
        showRandomQuote(); 
        clearFormInputs();
    } else {
        alert('Please fill out both fields.');
    }
}

function clearFormInputs() {
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

showRandomQuote();
