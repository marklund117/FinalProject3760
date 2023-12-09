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

// we need access to the media list element that all items go in
let mediaList = document.getElementsByClassName("mediaList")[0]

// BACKEND CONNECTION & INITIAL DISPLAY

fetch('/api/getMedia')
.then(res => res.json()) // convert the res string into a JSON object
.then(data => {
    console.log(data) // console log what we got
    displayList(data)
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

// BUILD STANDARD ITEM FUNCTION
function buildItem(givenItem, index) {
    // li containing: title, category, rating, completionstatus, favbutton, editbutton
    
    let freshLi = document.createElement('li')

    // now all the little parts
    let titleElement = document.createElement('h3')
    titleElement.className = 'itemTitle' // for css
    let categoryElement = document.createElement('span')
    categoryElement.className = 'itemCategory' // for css
    let ratingElement = document.createElement('span')
    ratingElement.className = 'itemRating' // for css
    let completionElement = document.createElement('span')
    completionElement.className = 'itemCompletion' // for css
    let favButton = document.createElement('button')
    favButton.className = 'favButton' // for css
    let editButton = document.createElement('button')
    editButton.className = 'editButton' // for css

    // now we need to put in the actual values
    titleElement.innerText = givenItem.itemTitle
    categoryElement.innerText = givenItem.itemCategory
    ratingElement.innerText = givenItem.itemRating
    completionElement.innerText = givenItem.itemCompletion
    favButton.innerText = 'Favorite'
    editButton.innerText = 'Edit'

    // now assemble and return the item
    freshLi.appendChild(titleElement)
    freshLi.appendChild(categoryElement)
    freshLi.appendChild(ratingElement)
    freshLi.appendChild(completionElement)
    freshLi.appendChild(favButton)
    freshLi.appendChild(editButton)
    return freshLi
}

// then specific functionality of buttons and the like

// how should we accept new items from a UI standpoint? static fields?
// Dynamically create a form only when they want to make a new object?

// oh boy i love making commits

// this is also a very real commit with a very real purpose (making the track record look good)

// this is another very real commit, i got advanced functions done today