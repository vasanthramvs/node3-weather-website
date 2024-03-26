const path = require('path')
const express = require ('express')
const hbs = require ('hbs')
const geoCode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')
const { error } = require('console')
//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')  //assume i named the folder as templates instead of views
const partialsPath = path.join(__dirname,'../templates/partials')
//it has to be named as 'views' for views directory, coz node sees default as views
//if u change directory name then we need to as -->> see 10th line and then 16th line

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    //res.render('index')
    res.render('index', {
        title: 'Weather App',
        name: 'Vasanth'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Vasanth'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'Help page needs to be updated.',
        title: 'Help',
        name: 'Vasanth'
    })
})


// app.get('', (req, res)=>{
//     //res.send('Hello Express!')
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res)=>{
//     //res.send('Help Page')
//     res.send({
//         name: 'Vasanth',
//         age: 25
//     })
// })

// app.get('/about', (req,res)=>{
//     //res.send('About page')
//     res.send([
//         {
//             name:'Vasanth'
//         },
//         {
//             name:'Batman'
//         }
//     ])
// })

app.get('/weather', (req,res)=>{
    //res.send('Your weather')
    if (!req.query.address) {
        return res.send ({
            error: 'Please provide the address'
        })
    }
    geoCode (req.query.address, (error, {latitude, longitude, location}={})=>{
        if (error) {
            return res.send ({error})
        }

        forecast (latitude, longitude, (error, forecastData)=> {
            if (error) {
                return res.send ({error})
            }

            res.send ({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send ({
    //     forecast: 'Rainy',
    //     location: 'India',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send ({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    //res.send('Help article not found')
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Vasanth'
    })
})

app.get('*', (req, res)=>{
    //res.send('404 Error')
    res.render('404',{
        title: '404',
        errorMessage: '404 Error',
        name: 'Vasanth'
    })
})

//  app.listen(3000, ()=>{
    app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})