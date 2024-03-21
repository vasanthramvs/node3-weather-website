// es6 shorthand destructuring

const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=15c2323abb02a122bc61e63073772f31&query='+latitude+','+longitude+'&units=f'

    request({url, json:true}, (error, {body})=>{
        if (error) {
            callback('Unable to connect weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is curently "+ body.current.temperture + " degrees out there. There's a " + body.current.feelslike + "% chances of rain.")
        }
    })

}

module.exports=forecast

// const request = require('request')
// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.weatherstack.com/current?access_key=15c2323abb02a122bc61e63073772f31&query='+latitude+','+longitude+'&units=f'

//     request({url:url, json:true}, (error, response)=>{
//         if (error) {
//             callback('Unable to connect weather service', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, response.body.current.weather_descriptions[0] + ". It is curently "+ response.body.current.temperture + " degrees out there. There's a " + response.body.current.feelslike + "% chances of rain.")
//         }
//     })

// }

// module.exports=forecast