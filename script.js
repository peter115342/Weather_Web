const weatherForm = document.querySelector('.weather-form');
const cityField = document.querySelector('.city-input');
const container = document.querySelector('.city-container');
const apiKey = "521c695c868847f8949a9802b319265c";

weatherForm.addEventListener('submit',  async (e) => {
e.preventDefault();
const city = cityField.value;

if(city) {
    try {
        const weatherData = await getWeather(city);
        displayWeather(weatherData);
    }
    catch(error) {
        displayError(error);
    }
}
    else{
        displayError('Please enter a city');
    }

});

async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    if(!response.ok) {
        throw new Error('City not found');
    }
    const data = await response.json();
    return data;
}

function displayWeather(data) {
const{
    name: city,
    main: {temp, humidity},
    weather: [{description, id}]} = data;
container.textContent = '';
container.style.display = 'flex';
const cityDisplay = document.createElement('p');
const tempDisplay = document.createElement('p');
const humidityDisplay = document.createElement('p');
const descriptionDisplay = document.createElement('p');
const weatherEmoji = document.createElement('p');


cityDisplay.textContent = city;
tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
humidityDisplay.textContent = `Humidity: ${humidity}%`;
descriptionDisplay.textContent = description;
weatherEmoji.textContent = getWeatherEmoji(id);

cityDisplay.classList.add('city-display');
tempDisplay.classList.add('temp-display');
humidityDisplay.classList.add('humidity-display');
descriptionDisplay.classList.add('description-display');
weatherEmoji.classList.add('weather-emoji');

container.appendChild(cityDisplay);
container.appendChild(tempDisplay);
container.appendChild(humidityDisplay);
container.appendChild(descriptionDisplay);
container.appendChild(weatherEmoji);

    let gradientColor;
    switch (true) {
        case (id < 300 && id >= 200):
            gradientColor = 'linear-gradient(to bottom, #000000, #434343)';
            break;
            case (id < 600 && id >= 300):
                gradientColor = 'linear-gradient(to bottom, #1e90ff, #00bfff)';
            break;
            case (id < 700 && id >= 600):
                gradientColor = 'linear-gradient(to bottom, #00bfff, #ffffff)';
            break;
            case (id < 800 && id >= 700):
                gradientColor = 'linear-gradient(to bottom, #808080, #c0c0c0)';
            break;
            case (id === 800):
                gradientColor = 'linear-gradient(to bottom, #ff8c00, #ffd700)';
            break;
            case (id < 810 && id >= 801):
                gradientColor = 'linear-gradient(to bottom, #808080, #c0c0c0)';
            break;
        default:
            gradientColor = 'linear-gradient(to bottom, #808080, #c0c0c0)';
    }
    container.style.background = gradientColor;


}

function getWeatherEmoji(weatherId){
switch(true){
case(weatherId < 300 && weatherId >= 200):
    return '⛈️';
    case(weatherId < 400 && weatherId >= 300):
    return '🌧️';
    case(weatherId < 600 && weatherId >= 500):
    return '🌧️';
    case(weatherId < 700 && weatherId >= 600):
    return '❄️';
    case(weatherId < 800 && weatherId >= 700):
    return '🌫️';
    case(weatherId === 800 ):
    return '☀️';
    case(weatherId < 810 && weatherId >= 801):
    return '☁️';
    default:
    return '🤷';
}
}

function displayError(message) {
const showError = document.createElement('p');
showError.textContent = message;
showError.classList.add('showError');

container.textContent = '';
container.style.display = 'flex';
container.appendChild(showError);
}