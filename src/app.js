const flashcardContainer = document.getElementById('flashcard-container');
const nextButton = document.getElementById('next-button');

let currentIndex = -1; // Start with an invalid index to ensure the first card is random
let flashcards = [];

fetch('/flashcard-app/src/data/words.json') // Updated path
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Fetched data:', data); // Debugging line
    flashcards = data.words.map((pair, index) => {
      console.log(`Processing pair ${index}:`, pair); // Debugging line

      // Create the flashcard container
      const flashcard = document.createElement('div');
      flashcard.classList.add('flashcard');

      // Create the word element
      const wordElement = document.createElement('div');
      wordElement.classList.add('word'); // Add the 'word' class
      wordElement.innerText = pair.language1;

      // Create the example sentence element
      const exampleElement = document.createElement('div');
      exampleElement.classList.add('example'); // Add the 'example' class
      exampleElement.innerText = pair.example_1;

      // Add click event to toggle between languages
      flashcard.addEventListener('click', () => {
        if (wordElement.innerText === pair.language1) {
          wordElement.innerText = pair.language2;
          exampleElement.innerText = pair.example_2;
        } else {
          wordElement.innerText = pair.language1;
          exampleElement.innerText = pair.example_1;
        }
      });

      // Append the word and example sentence to the flashcard
      flashcard.appendChild(wordElement);
      flashcard.appendChild(exampleElement);

      return flashcard;
    });

    console.log('Flashcards array:', flashcards); // Debugging line
    displayRandomFlashcard(); // Display the first random flashcard
  })
  .catch(error => console.error('Error fetching the word pairs:', error));

// Event listener for the "Next" button
nextButton.addEventListener('click', () => {
  displayRandomFlashcard();
});

// Function to display a random flashcard
function displayRandomFlashcard() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * flashcards.length);
  } while (newIndex === currentIndex); // Ensure the new index is different from the current one

  currentIndex = newIndex; // Update the current index
  displayFlashcard(currentIndex);
}

// Function to display a specific flashcard by index
function displayFlashcard(index) {
  flashcardContainer.innerHTML = '';
  flashcardContainer.appendChild(flashcards[index]);
}