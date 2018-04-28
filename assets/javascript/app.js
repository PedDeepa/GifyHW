
var sports = ["Bowling", "Golf", "Basketball", "hockey", "Soccer"];

// Creates sport buttons when the page loads so the user has some choices to pick from.
createsportButtons();


// When the button with the ID of addsport is clicked, a new variable is saved as the value that the user entered
// with the excess spaces trimmed off. This value is then pushed to the end of the sports array and the createsportButtons
// function is called to redraw the buttons. This button is a submit type so this block returns false to prohibit the page
// from reloading.
$('#addsport').on('click', function() {
    var sportEntered = $('#sportInput').val().trim();
    sports.push(sportEntered);
    $('#sportInput').val('');
    createsportButtons();

    return false;
});

// This on click event is structured differently from how we have been doing it so that elements created after the DOM has
// loaded can be manipulated.
$(document.body).on('click', '.button-list', function() {
    // Creates a variable and assigns the value to the name of the sport clicked/
    var sportClicked = $(this).data('sport');
    // Creates a variable to hold the query string for the Giphy API request and adds the aniamls name to the query string.
    var query = 'https://api.giphy.com/v1/gifs/search?q=' + sportClicked + '&limit=10&api_key=dc6zaTOxFJmzC';

    // Empties the sports element so new gifs are loaded in on each click of an sports button.
    $('#sports').empty();


    // Makes an AJAX request using the query string outlined above.
    $.ajax({
        url: query,
        method: 'GET'
            // Performs this anonymous function when the request is recieved back from the API.
    }).done(function(response) {
        // Creates a new variable and assigns its value to the responses JSON data object.
        var results = response.data;

        // Runs a for loop for the number of recieved results. 
        
       
        for (i = 0; i < results.length; i++) {
            if (results[i].rating.toUpperCase() !== "G")
            {
            }
            else {
            // Creates a new variable and assigns a div with a class of col-md-4 to it.
            var newGif = $('<div class="userSport">');
            // Creates a new variable and assigns a rating from the response to it.
            var rating = results[i].rating.toUpperCase();
            // Creates a new variable and assigns a paragraph to it with the HTML of the gifs rating.
            var p = $('<p>').html('Rating: ' + rating);
            // Adds the text-center class to the p variable.
            p.addClass('text-center');
            // Creates a new variable and assigns a img.
            var img = $('<img>');

            // Adds a src to the img variable of the gifs still image.
            img.attr('src', results[i].images.fixed_height_small_still.url);
            // Adds a data attribute to the img variable of the gifs still image.
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            // Adds a data attribute to the img variable of the gif.
            img.attr('data-animate', results[i].images.fixed_height_small.url);
            // Adds a data attribute to the img variable of the gifs state.
            img.attr('data-clicked', 'still');
            // Adds a classes to the img variable.
            img.addClass('gif-margin gif center-block panel');

            // Appends the p and img variables to the newGif variable.
            newGif.append(p);
            newGif.append(img);
            // Appends the newGif variable to the element with the sports ID.
            $('#sports').append(newGif);
        }
        
    }
    });
});

// When a element with a gif class is clicked, the img src link for the element that was clicked is replaced with either the 
// sported gif or still img and the data-clicked value is changed to the corresponding value of what the img is doing.
// This on click event is structured differently from how we have been doing it so that elements created after the DOM has
// loaded can be manipulated.
$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');

    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
    }
});

// This function is responsible for creating the clickable buttons of sport names. When the fuction is called the sportButtons
// div is emptied and then a for loop interates through the values stored in the sports array. At each value the block creates a
// button with the classes btn, btn-primary and button-list. A custom data attribute with the value of the arrays index value is also
// stored on the button and the arrays index value is written to the buttons HTML. This button is then appended to the sportButtons
// element.
function createsportButtons() {
    $('#sportButtons').empty();

    for (var i = 0; i < sports.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-sport', sports[i]).html(sports[i]);
        $('#sportButtons').append(button);
    }
}
