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
        itemCategory: 'Game',      // category (movie, book, game)
        itemCompletion: 'Completed',    // completed, planned, dropped
        itemRating: 9,         // 0-10 scale
        itemFav: false,        // simple bool
        itemEditMode: false    // toggle for edit mode
    }
]

let listTitle = 'My Media List'

// ENDPOINT 1 - SEND THE ENTIRE LIST
app.get('/api/getMedia', (req, res) => {
    res.send(mediaList) // just give them the list
})

// ENDPOINT 2 - ACCEPT A NEW LIST ITEM
app.post('/api/postMedia', (req, res) => {
    mediaList.push(req.body) // put the new item in
    res.send(mediaList) // send back the updated
})

// ENDPOINT 3 - SWITCH AN ITEM INTO EDIT MODE 
app.put('/api/editMedia/:id', (req, res) => {
    const givenIndex = req.params.id; // get the index from url parameter
    let changedItem = mediaList[givenIndex]
    changedItem.itemEditMode = true
    mediaList.splice(givenIndex, 1, changedItem) // splice the new one in

    res.send(mediaList); // send back updated list
})

// ENDPOINT 4 - SPLICE AN EDITED ITEM IN (and remove edit mode)
app.post('/api/sendMedia/:id', (req, res) => {
    const givenIndex = req.body.index; // get the index from url parameter
    let changedItem = req.body
    changedItem.itemEditMode = false // take it out of edit mode
    if (mediaList[givenIndex].itemFav === true) {
        changedItem.itemFav = true
    }
    mediaList.splice(givenIndex, 1, changedItem) // splice the new one in

    res.send(mediaList) // send back updated list
})

// ENDPOINT 5 - TOGGLE FAVORITE
app.put('/api/favMedia/:id', (req, res) => {
    const givenIndex = req.params.id;
    let itemToChange = mediaList[givenIndex]
    if (itemToChange.itemFav) {
        itemToChange.itemFav = false
    } else {
        itemToChange.itemFav = true
    }
    mediaList.splice(givenIndex, 1, itemToChange)

    res.send(mediaList)
})

// ENDPOINT 6 - DELETE AN ITEM
app.delete('/api/delMedia/:id', (req, res) => {
    const givenIndex = parseInt(req.params.id);
    if(mediaList[givenIndex]){
        mediaList.splice(givenIndex, 1)
        res.send(mediaList)
     } else {
         res.status(400).json({error: "Item not found"})
     }
})

// ENDPOINT 7 - RETURN A LIST SORTED BY RATING (high-low)
app.get('/api/sortByRating', (req, res) => {
    let sortedList = [...mediaList] // Create a copy of media list
    sortedList.sort((a,b) => b.itemRating - a.itemRating)
    res.send(sortedList)
});

// ENDPOINT 8 - RETURN A LIST SORTED BY TITLE (A-Z)
app.get('/api/sortByTitle', (req,res) => {
    let sortedList = [...mediaList] // Create a copy of media list so original doesn't get sorted
    sortedList.sort((a,b) => a.itemTitle.localeCompare(b.itemTitle))
    res.send(sortedList)
    console.log(sortedList)
})

// ENDPOINT 9 - RETURN A LIST SORTED BY FAVORITES
app.get('/api/sortByFav', (req,res) => {
    let sortedList = [...mediaList] // Create a copy of media list so original doesn't get sorted
    sortedList.sort((a,b) => b.itemFav - a.itemFav)
    res.send(sortedList)
})

// ENDPOINT 10 - UPDATE LIST TITLE
app.put('/api/updateListTile', (req,res) => {
    let newListTitle = req.body.newListTitle;
    if(newListTitle && typeof newListTitle === "string") {
        // If we have received a valid string as newListTile, then update listTile
        listTitle = newListTitle;
        res.send({ status: 'success', message: 'List Title updated successfully' });
    } else {
        // If no valid string received, send an error response.
        res.status(400).send({ status: 'error', message: 'Invalid request format' });
    }
})

// ENDPOINT 11 - GET LIST TITLE
app.get('/api/getListTitle', (req,res) => {
    res.send({ listTitle: listTitle })
})

// Now actually start the server

app.listen(port, () => {
    console.log(`Final Project Backend listening on port ${port}`)
})