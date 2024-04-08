document.addEventListener('DOMContentLoaded', function () {
  const jokesButton = document.getElementById('jokes-button');
  const quotesButton = document.getElementById('quotes-button');
  const contentText = document.getElementById('content-text');

  jokesButton.addEventListener('click', async () => {
    contentText.textContent = 'Fetching a joke...';
    const joke = await fetchJoke();
    contentText.textContent = joke;
  });

  quotesButton.addEventListener('click', async () => {
    contentText.textContent = 'Fetching a quote...';
    const quote = await fetchQuote();
    contentText.textContent = quote;
  });
});

// Function to fetch a joke from JokeAPI
async function fetchJoke() {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
    const data = await response.json();
    return data.joke;
  } catch (error) {
    console.error('Error fetching joke:', error);
    return 'Failed to fetch joke.';
  }
}

// Function to fetch a quote from Quotable API
async function fetchQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return 'Failed to fetch quote.';
  }
}

