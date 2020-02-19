require('dotenv').config();

const express = require('express');
const request = require('superagent');
const app = express();
// const darkSky = require('./data/darksky.json');
const port = process.env.PORT || 3000;


const cors = require('cors');
app.use(cors());

let lat;
let lng;

// location route
app.get('/location', async (req, res, next) => {
    try {

        const location = req.query.search;
        const URL = (`https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}=${location}&format=json`);
        const cityData = await request.get(URL);

        const firstResult = cityData.body[0];

        // update the state of the lat and long for global scope
        lat = firstResult.lat;
        lng = firstResult.lon;

        res.json(
            {
                formatted_query: firstResult.display_name,
                latitude: lat,
                longitude: lng
            });
    } catch (err) {
        next(err);
    }
});

// weather route
app.get('/weather', async (req, res, next) => {
    try {

        const portlandWeather = await getWeatherData(lat, lng);

        res.json(portlandWeather);

    } catch (err) {
        next(err);
    }
});


// function to map through the weather data based on latitude and longitude coordinates
const getWeatherData = async (lat, lng) => {
    const URL = (`https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${lng}`);
    const weather = await request.get(URL);

    return weather.body.daily.data.map(forecast => {
        return {
            forecast: forecast.summary,
            time: new Date(forecast.time * 1000)
        };
    });
};


// 404 catch all
app.get('*', (req, res) => res.send('404 error buddy!!!!!!'));


// has to go into it's own index.js file for testing later
app.listen(port, () => {
    console.log('<-----------blast off!---------------->');

});

// module.exports = {
//     app, };
