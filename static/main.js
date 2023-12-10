// this is the main JavaScript file for the Final Project

// First, we need to establish an object structure for a media item
const mediaItem = {
    index: 0,              // to make life easier
    itemTitle: '',         // title as a string
    itemCategory: '',      // category (movie, book, game)
    itemRating: 0,         // 0-10 scale
    itemCompletion: '',    // completed, planned, dropped
    itemFav: false,        // simple bool
    itemEditMode: false    // toggle for edit mode
}

// next some data structures for the dropdowns (and their hookups)
let possibleCategories = ['Movie', 'Game', 'Book']
let possibleRatings = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
let possibleStates = ['Completed', 'Planned', 'Incomplete', 'Dropped']

let catDrop = document.getElementsByClassName("categorySelect")[0]
let ratDrop = document.getElementsByClassName("ratingSelect")[0]
let stateDrop = document.getElementsByClassName("statusSelect")[0]

// we need access to the media list element that all items go in
let mediaList = document.getElementsByClassName("mediaList")[0]

// BACKEND CONNECTION & INITIAL DISPLAY
fetch('/api/getMedia')
.then(res => res.json()) // convert the res string into a JSON object
.then(data => {
    console.log(data) // console log what we got
    displayList(data)
    fillDropdowns() // fill the dropdowns
})


// DISPLAY FUNCTION
function displayList (givenData) {
    // display the list of media items in its entirety
    givenData.forEach((item, index) => {
        let newItem // function scoped variable
        newItem = buildItem(item, index) // build the structure
        mediaList.appendChild(newItem) // append it to the DOM
    })

    console.log('displayList has executed')
}

// FILL DROPDOWNS FUNCTION
function fillDropdowns() {
    possibleCategories.forEach((category) => {
        let freshOption = document.createElement('option')
        freshOption.innerText = category
        catDrop.appendChild(freshOption)
    })
    possibleRatings.forEach((rating) => {
        let freshRat = document.createElement('option')
        freshRat.innerText = rating
        ratDrop.appendChild(freshRat)
    })
    possibleStates.forEach((state) => {
        let freshState = document.createElement('option')
        freshState.innerText = state
        stateDrop.appendChild(freshState)
    })
}

// BUILD STANDARD ITEM FUNCTION (include editable mode later)
function buildItem(givenItem, index) {
    // li containing: title, category, rating, completionstatus, favbutton, editbutton
    
    let freshLi = document.createElement('li')

    // now all the little parts
    let titleElement = document.createElement('h3')
    titleElement.className = 'itemTitle' // for css
    let categoryElement = document.createElement('span')
    categoryElement.className = 'itemCategory' // for css
    let completionElement = document.createElement('span')
    completionElement.className = 'itemCompletion' // for css
    let ratingElement = document.createElement('span')
    ratingElement.className = 'itemRating' // for css
    let favButton = document.createElement('button')
    favButton.className = 'favButton' // for css
    let editButton = document.createElement('button')
    editButton.className = 'editButton' // for css
    let delButton = document.createElement('button')
    delButton.className = 'delButton' // for css

    // now we need to put in the actual values
    titleElement.innerText = givenItem.itemTitle
    categoryElement.innerText = `Category: ${givenItem.itemCategory}`
    completionElement.innerText = `Status: ${givenItem.itemCompletion}`
    ratingElement.innerText = `Score: ${givenItem.itemRating}`
    favButton.innerText = '☆ Favorite'
    editButton.innerText = 'Edit'
    delButton.innerText = 'Delete'

    // now assemble and return the item
    freshLi.appendChild(titleElement)
    freshLi.appendChild(categoryElement)
    freshLi.appendChild(completionElement)
    freshLi.appendChild(ratingElement)
    freshLi.appendChild(favButton)
    freshLi.appendChild(editButton)
    freshLi.appendChild(delButton)
    freshLi.className = 'listItemCSS'
    return freshLi
}

// PACK ITEM FUNCTION
function packItem(currLen){
    // see what the user gave us
    let givenTitle = document.getElementsByClassName("titleInput")[0].value
    let chosenCategory = catDrop.value
    let chosenStatus = stateDrop.value
    let chosenRating = ratDrop.value
    // new object
    let freshItem = Object.create(mediaItem)
    // now assign properties
    freshItem.index = currLen
    freshItem.itemTitle = givenTitle
    freshItem.itemCategory = chosenCategory
    freshItem.itemCompletion = chosenStatus
    freshItem.itemRating = chosenRating
    // fav and edit mode should take care of themselves
    return freshItem
}

// PREP ITEM FUNCTION
async function prepItem(){
    let data = await fetch('/api/getMedia')
        .then(res => res.json()) // convert the res string into a JSON object

    let currentLength = data.length // how long is the array right now
    let itemToSend = packItem(currentLength)

    return itemToSend;
}

// ADD ITEM FUNCTION
async function addItem(){
    let toSend = await prepItem()
    let opts = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toSend)
    }

    fetch('/api/postMedia', opts).then(response => response.json())
  .then(data => console.log(data)) // log server response or handle it accordingly.
}


// EVENT LISTENERS

// add item button
document.getElementsByClassName("addItemButton")[0].addEventListener("click", addItem)