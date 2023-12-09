// using express for our API instead of HTTP
const express = require('express')
const app = express()
const port = 8002 // the example used 3000 but I like this one

app.use(express.static('static')) // statically serves everything in the static folder (determines what the internet can access)

// body parser stuff
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// now, data structure - with one pre-filled item

let mediaList = [
    {
        index: 0,
        itemTitle: 'Armored Core 6',         // title as a string
        itemCategory: 'game',      // category (movie, book, game)
        itemRating: 9,         // 0-10 scale
        itemCompletion: 'completed',    // completed, planned, dropped
        itemFav: false,        // simple bool
        itemEditMode: false    // toggle for edit mode
    }
]

// ENDPOINT 1 - SEND THE ENTIRE LIST
app.get('/api/getMedia', (req, res) => {
    res.send(mediaList) // just give them the list
})

// Now actually start the server

app.listen(port, () => {
    console.log(`Final Project Backend listening on port ${port}`)
})