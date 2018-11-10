$(document).ready(function() {
var topics = ["bunny", "kitten", "puppy", "penguin", "panda", "hamster", "guinea pig", "hedgehog"];
var i = 0; // for API Query URL

console.log(topics)



function renderButtons(topics) {
	

	$("#buttons").empty();

	// using a loop that appends a button for each string in the array.
	// Looping through the array of itmes
	for (var i = 0; i < topics.length; i++) {

		// Then dynamicaly generating buttons for each item in the array.
		// This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
		var a = $("<button>");
		// Adding a class
		a.addClass("btn btn-primary btn-md category-btn");
		// Adding button type
		a.attr("type", "button");
		// Adding a data-attribute with a value of the animal at index i
		a.attr("data-input", topics[i]);
		// Providing the button's text with a value of the animal at index i
		a.text(topics[i]);
		// Adding the button to the HTML
		$("#buttons").append(a);
	}
}

	//Calling the function
	renderButtons(topics);
	generateGifs(topics, "bunny");

function generateGifs(topics, searchTerm){
	//Clear any existing gifs
	$("#gifs").empty();

	

	var limit = 30;

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=PqFZzVlZlHTAlN7pDjbq8lZv6EIqNU6S" + "&q=" + searchTerm + "&limit=" + limit;
    console.log(queryURL);

	// Perfoming an AJAX GET request to my queryURL
	$.ajax({
		url: queryURL,
		method: "GET"
	})

	// After the data from the AJAX request comes back
	.done(function(response) {

		var results = response.data;
		console.log(response);
		console.log(response.data);

		// Saving the image_original_url property
		for (var j = 0; j < limit; j++) {
	

			var stillImageUrl = results[j].images.original_still.url;
			var animateImageUrl = results[j].images.original.url;

			console.log(stillImageUrl);
			console.log(animateImageUrl);

			// Creating and storing an image tag
			var animalImage = $("<img>");

			// Setting the catImage src attribute to imageUrl
			animalImage.attr("src", stillImageUrl);
			animalImage.attr("alt", "animal image");
			animalImage.attr("width", "100%");
			animalImage.attr("height", "250px");
			animalImage.attr("data-still", stillImageUrl);
			animalImage.attr("data-animate", animateImageUrl);
			animalImage.attr("data-state", "still");
			animalImage.attr("class", "gif");
			
			// Add div and aaround image & rating

			var imageCropper = $("<div>");
			imageCropper.attr("class", "img-cropper")
			imageCropper.append(animalImage);

			var imageContainerDiv = $("<div>");
			imageContainerDiv.attr("class", "col-md-4")
			imageContainerDiv.append(imageCropper);
			imageContainerDiv.append("<p> Rating: " + results[j].rating + "</p>");

			$("#gifs").append(imageContainerDiv);
		}
			
		


		// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
		$(".gif").on("click", function() {
			
			var state = $(this).attr("data-state");
			
			if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
			} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
			}
		});
	});
}



// This function handles events where one button is clicked
$("#submit").on("click", function() {

	event.preventDefault();

	// This line will grab the text from the input box
	var searchTerm = $("#input").val().trim();

	console.log (searchTerm);

	topics.push(searchTerm);

	console.log (topics);

	console.log("new input = " + searchTerm);


	renderButtons(topics);
	$("#gifs").empty();
	generateGifs(topics, searchTerm);
	console.log (topics);

});



$(".category-btn").on("click", function(){
	event.preventDefault();
	var searchTerm = $(this).attr("data-input");
	generateGifs(topics, searchTerm)
});
});

