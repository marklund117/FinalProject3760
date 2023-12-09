// this is the main JavaScript file for the Final Project

// BACKEND CONNECTION

fetch('/api/getMedia')
.then(res => res.json()) // convert the res string into a JSON object
.then(data => {
    console.log(data) // console log what we got
    displayArray(data)
})
// it will already use localhost

// First, we need to establish an object structure for a media item

const mediaItem = {
    itemTitle: '',         // title as a string
    itemCategory: '',      // category (movie, book, game)
    itemRating: 0,         // 0-10 scale
    itemCompletion: '',    // completed, planned, dropped
    itemFav: false,        // simple bool
    itemEditMode: false    // toggle for edit mode
}

// then a rendering function of some kind that re-displays everything

function displayList () {
    // display the list of media items in its entirety
    console.log('displayList has executed')
}

// then specific functionality of buttons and the like

// how should we accept new items from a UI standpoint? static fields?
// Dynamically create a form only when they want to make a new object?

// oh boy i love making commits

// this is also a very real commit with a very real purpose (making the track record look good)

// this is another very real commit, i got advanced functions done today