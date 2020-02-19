const express = require('express');
// const request = require('superagent');
const app = express();
const darkSky = require('./data/darksky.json');
const port = 3000;
const geoData = require('./data/geo.json');

const cors = require('cors');
app.use(cors());

// let lat;
// let lng;

app.get('/location/', (req, res) => {
    // const location = request.query.search;

    // console.log('using location. . . .', location);

    // update the state of the lat and long for global scope
    // lat = cityData.geometry.location.lat;
    // lng = cityData.geometry.location.lng;

    const cityData = geoData.results[0];

    res.json(
        {
            formatted_query: cityData.formatted_address,
            latitude: cityData.geometry.location.lat,
            longitude: cityData.geometry.location.lng
        });
});

app.get('/weather/', (req, res) => {
    const portlandWeather = getWeatherData(/*lat, long*/);
    res.json(portlandWeather);
    

});

const getWeatherData = (/*lat, long*/) => {
    return darkSky.daily.data.map(forecast => {
        return {
            forecast: forecast.summary,
            time: new Date(forecast.time * 1000)
        };
    });
};


// has to go into it's own index.js file for testing later
app.listen(port, () => {
    console.log('<-----------blast off!---------------->');

});

app.get('*', (req, res) => res.send('404 error buddy!!!!!!'));


// module.exports = {
//     app, };
