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
    console.log(givenData)
}

// FILL DROPDOWNS FUNCTION
function fillDropdowns() {
    possibleCategories.forEach((category) => {
        let freshOption = document.createElement('option')
        freshOption.innerText = category
        catDrop.appendChild(freshOption)
    })
    possibleStates.forEach((state) => {
        let freshState = document.createElement('option')
        freshState.innerText = state
        stateDrop.appendChild(freshState)
    })
    possibleRatings.forEach((rating) => {
        let freshRat = document.createElement('option')
        freshRat.innerText = rating
        ratDrop.appendChild(freshRat)
    })
}

// BUILD ITEM FUNCTION (both modes)
function buildItem(givenItem, index) {
    // li containing: title, category, rating, completionstatus, favbutton, editbutton
    
    let freshLi = document.createElement('li')
    let editButton = document.createElement('button')
    editButton.className = 'editButton'

    if (givenItem.itemEditMode === true) {
    // EDITMODE now all the little parts
    let titleElement = document.createElement('input')
    titleElement.type = 'text'
    titleElement.className = 'itemTitle' // for css
    titleElement.id = 'eTitle' // for sending
    let categoryElement = document.createElement('select')
    categoryElement.className = 'itemCategory' // for css
    categoryElement.id = 'eCat' // for sending
    possibleCategories.forEach((category) => {
        let freshOption = document.createElement('option')
        freshOption.innerText = category
        if(category === givenItem.itemCategory){
            freshOption.selected = true
        }
        categoryElement.appendChild(freshOption)
    })
    let completionElement = document.createElement('select')
    completionElement.className = 'itemCompletion' // for css
    completionElement.id = 'eComp' // for sending
    possibleStates.forEach((state) => {
        let freshOption = document.createElement('option')
        freshOption.innerText = state
        if(state === givenItem.itemCompletion){
            freshOption.selected = true
        }
        completionElement.appendChild(freshOption)
    })
    let ratingElement = document.createElement('select')
    ratingElement.className = 'itemRating' // for css
    ratingElement.id = 'eRating' // for sending
    possibleRatings.forEach((rating) => {
        let freshRat = document.createElement('option')
        freshRat.innerText = rating
        if(rating.toString() === ((givenItem.itemRating).toString())){
            freshRat.selected = true
        }
        ratingElement.appendChild(freshRat)
    })

    // EDITMODE now we need to put in the actual values
    titleElement.value = givenItem.itemTitle
    // edit button is unique
    editButton.innerText = 'Save'

    // create buttons that do not change
    let favButton = document.createElement('button')
    if (givenItem.itemFav) {
        favButton.id = 'favActive' // for css if ACTIVE
    }
    favButton.className = 'favButton' // for css
    let delButton = document.createElement('button')
    delButton.className = 'delButton' // for css
    // assign values
    favButton.innerText = '☆ Favorite'
    delButton.innerText = 'Delete'

    // DATASET STUFF
    favButton.dataset.num = index
    editButton.dataset.num = index
    delButton.dataset.num = index

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
    } else {
    // STATIC now all the little parts
    let titleElement = document.createElement('h3')
    titleElement.className = 'itemTitle' // for css
    let categoryElement = document.createElement('span')
    categoryElement.className = 'itemCategory' // for css
    let completionElement = document.createElement('span')
    completionElement.className = 'itemCompletion' // for css
    let ratingElement = document.createElement('span')
    ratingElement.className = 'itemRating' // for css

    // STATIC now we need to put in the actual values
    titleElement.innerText = givenItem.itemTitle
    categoryElement.innerText = `Category: ${givenItem.itemCategory}`
    completionElement.innerText = `Status: ${givenItem.itemCompletion}`
    ratingElement.innerText = `Score: ${givenItem.itemRating}`
    // edit button is unique
    editButton.innerText = 'Edit'

    // create buttons that do not change
    let favButton = document.createElement('button')
    if (givenItem.itemFav) {
        favButton.id = 'favActive' // for css if ACTIVE
    }
    favButton.className = 'favButton' // for css
    let delButton = document.createElement('button')
    delButton.className = 'delButton' // for css
    // assign values
    favButton.innerText = '☆ Favorite'
    delButton.innerText = 'Delete'

    // DATASET STUFF
    favButton.dataset.num = index
    editButton.dataset.num = index
    delButton.dataset.num = index

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

// PREP EDITED ITEM
function prepEditedItem(index){
    let givenTitle = document.getElementById('eTitle').value
    let givenCategory = document.getElementById('eCat').value
    let givenCompletion = document.getElementById('eComp').value
    let givenRating = document.getElementById('eRating').value

    let editedItem = Object.create(mediaItem)

    editedItem.index = index
    editedItem.itemTitle = givenTitle
    editedItem.itemCategory = givenCategory
    editedItem.itemCompletion = givenCompletion
    editedItem.itemRating = givenRating

    return editedItem
}

// SAVE EDITED ITEM
function saveEditedItem(index){
    let toSend = prepEditedItem(index)
    let opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(toSend)
    }

    fetch('/api/sendMedia/' + index, opts).then(response => response.json())
    .then(data => displayList(data)) // re-display

}

// FAVORITE ITEM
function favItem(index){
    let opts = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    fetch('/api/favMedia/' + index, opts)
      .then(response => response.json())
      .then(data => displayList(data)); // re-display updated list

}

// DELETE ITEM
function delItem(index){
    let opts = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }

    fetch('/api/delMedia/' + index, opts)
      .then(response => response.json())
      .then(data => displayList(data)); // re-display updated list

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
            saveEditedItem(index) // save the data and take it back out of edit mode
        }
        else { // if it's not in edit mode yet...
            editItem(index) // put it in edit mode
        }
    }
})

// favorite button
document.querySelector(".mediaList").addEventListener("click", async event => {
    let targetElement = event.target;
    // check if the clicked element is a button with the class name favButton
    if(targetElement.className === 'favButton') {
        let index = targetElement.dataset.num;
        favItem(index);
    }
})

// Delete Button
document.querySelector(".mediaList").addEventListener("click", async event => {
    let targetElement = event.target;
    // check if the clicked element is a button with the class name delButton
    if(targetElement.className === 'delButton') {
        let index = targetElement.dataset.num;
        delItem(index);
    }
})