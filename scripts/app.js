const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')


const updateUI = (data) =>{
    console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather;
     // destructring data

    const {cityDets, weather} = data;
   
   
    details.innerHTML = `
    <div class="my-3">${weather.WeatherText}</div>
    <h5 class="my-3">${cityDets.EnglishName}</h5>   
    <h6 class="">${cityDets.AdministrativeArea.EnglishName}</h6>
    <h7 class="">${cityDets.Country.EnglishName}</h7> <br><br>
    <h8 class="">${weather.LocalObservationDateTime}</h8>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;c</span>
    </div>
    `;
// updating day and night and icons
    let icons = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', icons);
     let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'; // ternery operator

    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // } else{
    //     timeSrc = 'img/night.svg';
    // }
    time.setAttribute('src', timeSrc);
    icon.setAttribute('src', icons);
    
    // removing d-none
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) =>{
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    // return{
    //     cityDets: cityDets,
    //     weather: weather
    // };
   return {cityDets, weather};// object shot hand notation
};



cityForm.addEventListener('submit', e =>{
    // prevent default action
    e.preventDefault();

    // get city value

    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // setting city to local storrage
    localStorage.setItem('city', city);
});

// calling local storage city
if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}