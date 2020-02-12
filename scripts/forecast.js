class Forecast{
    constructor(){
        this.key = 'IgBiwZyJh5E8E2njihaAAxRx1YnZ1HuG';
        this.weatherApi = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    }

    async updateCity(city){
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);

       return {cityDets, weather};
    }

    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
    
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }

    async getWeather(id){
        const query =  `${id}?apikey=${this.key}`;
    
        const response = await fetch(this.weatherApi + query);
        const data = await response.json();
        return data[0];
    }
}
