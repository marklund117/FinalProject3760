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
    mediaList.innerHTML = '' // clear the list before we display
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

    // DATASET STUFF
    editButton.dataset.num = index
    delButton.dataset.num = index

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
  .then(data => displayList(data)) // re-display
  let toClear = document.getElementsByClassName("titleInput")[0]
  toClear.value = '' // clear the value out
}

// CHECK ITEM MODE FUNCTION
async function checkMode(index) {
    const response = await fetch('/api/getMedia');
    const data = await response.json();

    if (data[index].itemEditMode === true) {
        return true;
    } else {
        return false;
    }
}

// TOGGLE AN ITEM INTO EDIT MODE
function editItem(index){
    fetch('/api/editMedia/' + index, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
         },
         body: ''
     }).then(response => response.json())
       .then(data => displayList(data)) // re display
       console.log(`Attempted to switch item at index ${index} into edit mode.`)
}

// TOGGLE AN ITEM OUT OF EDIT MODE
function saveItem(index){
    fetch('/api/saveMedia/' + index, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
         },
         body: ''
     }).then(response => response.json())
       .then(data => displayList(data)) // re display
       console.log(`Attempted to switch item at index ${index} out of edit mode.`)
}


// EVENT LISTENERS

// add item button
document.getElementsByClassName("addItemButton")[0].addEventListener("click", addItem)

// edit/save item button
document.querySelector(".mediaList").addEventListener("click", async event => {
    let targetElement = event.target
    // check if the clicked element is a button with the class name editButton
    if(targetElement.className === 'editButton') {
        let index = targetElement.dataset.num
        let isEditModeOn = await checkMode(index)
        console.log(`checkmode returned ${isEditModeOn}`)
        if (isEditModeOn) { // if the item is already in edit mode...
            saveItem(index) // save the data and take it back out of edit mode
        }
        else { // if it's not in edit mode yet...
            editItem(index) // put it in edit mode
        }
    }
})