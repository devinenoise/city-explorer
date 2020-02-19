const express = require('express');
const request = require('superagent');
const app = express();
const darkSky = require('./data/darksky.json');
const port = process.env.PORT || 3000;
const geoData = require('./data/geo.json');
const cors = require('cors');


app.use(cors);

app.get('/location/', (request, respond) => {
    const cityData = geoData.results[0];

    respond.json(
        {
            formatted_query: cityData.formatted_address,
            latitude: cityData.geometry.location.lat,
            longitude: cityData.geometry.location.lng
        });
});

app.get('/weather/', (request, respond) => {
    const portlandWeather = getWeatherData(/*lat, long*/);
    
    respond.json(portlandWeather);
    
});

const getWeatherData = (lat, long) => {
    return darkSky.daily.data.map(forecast => {
        return {
            forecast: forecast.summary,
            time: new Date(forecast.time)
        }
    })
}




// has to go into it's own index.js file for testing later
app.listen(port, () => {
    console.log('<-----------blast off!---------------->');

});

app.get('*', (req, res) => res.send('404 error buddy!!!!!!'));


// module.exports = {
//     app, };
