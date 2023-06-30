// Array of cities
const cities = ['London', 'New York', 'Paris', 'Tokyo', 'Sydney', 'Rome', 'Cairo', 'Moscow', 'Dubai', 'Rio de Janeiro'];
// Function to fetch temperature for a city
async function fetchTemperature(city) {
  const apiKey = '9cff733aee57cb05b63dd4f731c46bc4';
  try {
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
  result.innerHTML = `
    <p>City: ${city}</p>
    <p>Guess: ${guess}</p>
    <p>Temperature: ${temperature}°C</p>
  `;
  const mainSection = document.getElementById('main_section');
  mainSection.appendChild(result);
}
// Function to handle the guess
function handleGuess() {
  const input = document.querySelector('.second_section input');
  const guess = parseInt(input.value);
  input.value = '';
  const city = cities[Math.floor(Math.random() * cities.length)];
  fetchTemperature(city)
    .then(temperature => {
      const isCorrect = checkGuess(guess, temperature);
      updateDisplay(city, guess, temperature, isCorrect);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
// Add event listener to the "Check" button
const checkButton = document.querySelector('button');
checkButton.addEventListener('click', handleGuess);
// Function to set the city name in the HTML
function setCityName(city) {
    const cityNameElement = document.querySelector('.second_section p');
    cityNameElement.textContent = city;
  }
  // Update the setCityName function call with a random city
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  setCityName(randomCity);
  // Function to update the city name based on guess result
function updateCityName(isCorrect) {
    const cityNameElement = document.querySelector('.second_section p');
    cityNameElement.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
  }

  function handleGuess() {
    const input = document.querySelector('.second_section input');
    const guess = parseInt(input.value);
    input.value = '';
    const city = cities[Math.floor(Math.random() * cities.length)];
    fetchTemperature(city)
      .then(temperature => {
        const isCorrect = checkGuess(guess, temperature);
        updateDisplay(city, guess, temperature, isCorrect);
        updateCityName(isCorrect);
        setTimeout(() => {
          const nextCity = cities[Math.floor(Math.random() * cities.length)];
          setCityName(nextCity);
        }, 2000); // Delay for 2 seconds before displaying the next city name
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }