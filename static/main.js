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

// BACKEND CONNECTION & INITIAL DISPLAY

fetch('/api/getMedia')
.then(res => res.json()) // convert the res string into a JSON object
.then(data => {
    console.log(data) // console log what we got
    displayList(data)
})

function displayList (givenData) {
    // display the list of media items in its entirety
    givenData.forEach((item, index) => {

    })
    console.log('displayList has executed')
}

// then specific functionality of buttons and the like

// how should we accept new items from a UI standpoint? static fields?
// Dynamically create a form only when they want to make a new object?

// oh boy i love making commits

// this is also a very real commit with a very real purpose (making the track record look good)

// this is another very real commit, i got advanced functions done today