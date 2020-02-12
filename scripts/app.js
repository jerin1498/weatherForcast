const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')
const weatherForcast = new Forecast()


const updateUI = (data) =>{
    console.log(data);
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
    let icons = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', icons);
     let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc);
    icon.setAttribute('src', icons);
    
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};


cityForm.addEventListener('submit', e =>{
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    weatherForcast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    weatherForcast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}