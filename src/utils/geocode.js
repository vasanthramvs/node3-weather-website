// es6 object destructuring
const request = require('request')
const geoCode = (address, callback)=>{
    const url = 'https:api.mapbox.com/'+encodeURIcomponent(address) //dont give simply +address+ in url, for url use encodeURIcomponent so it will take as url structure such as %2f, %3f

    request({url, json:true}, (error, {body})=>{
        if (error){
            callback('Unable to find location', undefined)
        } else if (body.features.length===0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[1].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode


// const request = require('request')
// const geoCode = (address, callback)=>{
//     const url = 'https:api.mapbox.com/'+encodeURIcomponent(address) //dont give simply +address+ in url, for url use encodeURIcomponent so it will take as url structure such as %2f, %3f

//     request({url:url, json:true}, (error, response)=>{
//         if (error){
//             callback('Unable to find location', undefined)
//         } else if (response.body.features.length===0) {
//             callback('Unable to find location. Try another search', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: response.body.features[0].center[1],
//                 longitude: response.body.features[1].center[0],
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }

// module.exports=geoCode