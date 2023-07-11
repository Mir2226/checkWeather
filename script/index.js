// Array of cities
const cities = ['London', 'New York', 'Paris', 'Tokyo', 'Sydney', 'Rome', 'Cairo', 'Moscow', 'Dubai', 'Rio de Janeiro'];
let guessedCities = 0; // Counter for the number of guessed cities
let correctGuesses = 0; // Counter for the number of correct guesses
// Function to fetch temperature for a city
async function fetchTemperature(city) {
  const apiKey = '9cff733aee57cb05b63dd4f731c46bc4';
  try {
    // Fetch temperature data from OpenWeatherMap API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    const temperature = data.main.temp;
    return temperature;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
// Function to check the user's guess
function checkGuess(guess, temperature) {
  const deviation = Math.abs(guess - temperature);
  const maxDeviation = 5;
  if (deviation <= maxDeviation) {
    return true; // Correct guess
  } else {
    return false; // Incorrect guess
  }
}
// Function to update the display
function updateDisplay(city, guess, temperature, isCorrect) {
  const result = document.createElement('div');
  result.className = isCorrect ? 'correct' : 'incorrect';
  // Set the HTML content of the result div
  result.innerHTML = `
    <p>City: ${city}</p>
    <p>Guess: ${guess}</p>
    <p>Temperature: ${temperature}°C</p>
  `;
  const mainSection = document.getElementById('main_section');
  // Append the result div to the main section of the HTML
  mainSection.appendChild(result);
}
// Function to handle the guess
function handleGuess() {
  const input = document.querySelector('.second_section input');
  const guess = parseInt(input.value);
  input.value = '';
  const cityNameElement = document.querySelector('.second_section p');
  // Get the current city name from the HTML
  const city = cityNameElement.textContent;
  // Fetch the temperature for the current city
  fetchTemperature(city)
    .then(temperature => {
      // Check if the guess is correct
      const isCorrect = checkGuess(guess, temperature);
      // Update the display based on the guess result
      updateDisplay(city, guess, temperature, isCorrect);
      // Update the counters
      guessedCities++;
      if (isCorrect) {
        correctGuesses++;
      }
      // Check if the game is over
      if (guessedCities === 5) {
        // Determine the result of the game
        let gameResult;
        let emoji;
        if (correctGuesses >= 3) {
          gameResult = 'You won!';
          emoji = '&#127941';
        } else if (correctGuesses < 4) {
          gameResult = 'You lost!';
          emoji = '&#10060';
        } else {
          gameResult = "It's a tie!";
        }
        // Display the game result and emoji
        const result = document.createElement('div');
        result.innerHTML = `<h2>${gameResult} ${emoji}</h2>`;
        const mainSection = document.getElementById('main_section');
        mainSection.appendChild(result);
        // Disable the input and check button
        input.disabled = true;
        checkButton.disabled = true;
      } else {
        // Select a new random city for the next round
        const nextCity = cities[Math.floor(Math.random() * cities.length)];
        // Update the city name in the HTML
        setCityName(nextCity);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
// Function to set the city name in the HTML
function setCityName(city) {
  const cityNameElement = document.querySelector('.second_section p');
  // Set the text content of the city name element
  cityNameElement.textContent = city;
}
// Update the city name in the HTML with a random city
const randomCity = cities[Math.floor(Math.random() * cities.length)];
setCityName(randomCity);
// Add event listener to the "Check" button
const checkButton = document.querySelector('button');
checkButton.addEventListener('click', handleGuess);