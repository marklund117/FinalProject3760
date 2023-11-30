// this is the main JavaScript file for the Final Project

// First, we need to establish an object structure for a media item

const mediaItem = {
    itemTitle: '',         // title as a string
    itemCategory: '',      // category (movie, book, game)
    itemRating: 0,         // 0-10 scale
    itemCompletion: '',    // completed, planned, dropped
    itemFav: false,        // simple bool
    itemEditMode: false    // toggle for edit mode
}

// then we need an array to hold all media items

let itemArray = []

// then a rendering function of some kind that re-displays everything

// then specific functionality of buttons and the like