// Artist Button

var artists = [
  "Biggie",
  "Wu-Tang",
  "Timbaland",
  "Meek Miilz",
  "Beanie Sigel",
  "Papoose",
  "Rick Ross",
  "Jay-Z",
  "DMX"
];

function giveMeButtons() {
  $("#button-display").empty();

  for (var loop = 0; loop < artists.length; loop++) {
    
    var topBtn = $("<button>");

    topBtn.addClass("btn btn-primary btn-sm");

    topBtn.attr("data-name", artists[loop]);

    topBtn.text(artists[loop]);

    $("#button-display").append(topBtn);
  }
}

$("#add-artist").on("click", function(event) {
  event.preventDefault();

  var artist = $("#artist-input").val().trim();

  artists.push(artist);

  giveMeButtons();
});

giveMeButtons();

//Freeze Image
function setImageStatus() {
  var state = $(this).attr("data-state");
  if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
  }
  else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
  }
}

 // Adding click event listen listener to all buttons
 $("#button-display").on("click", function() {
  // Grabbing and storing the data-animal property value from the button
  var artGif = $(this).attr("data-name");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    artGif + "&api_key=jIvi6w2Fe9qAQkZtycr302I612DQsfqM&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  // After data comes back from the request
  .then(function(response) {
    console.log(queryURL);
    console.log(response);
    var results = response.data;
    if (results.length > 0) {
        var $gifRow = $('<div class="row">');
        for (var loop = 0; loop < results.length; loop++) {
            var rating = results[loop].rating;
            rating = rating.toUpperCase();
            var imageAnimateName = results[loop].images.fixed_height.url;
            var imageStillName = results[loop].images.fixed_height_still.url;
            var $gifSpan = $('<span class="col-sm-4">');
            var $p = $('<p style="padding-top: 40px">').text("Rating: " + rating);
            var rapperImage = $("<img>");
            rapperImage.addClass("gif");
            rapperImage.attr("data-state", "still");
            rapperImage.attr("src", imageStillName);
            rapperImage.attr("data-still", imageStillName);
            rapperImage.attr("data-animate", imageAnimateName);
            $gifSpan.append($p);
            $gifSpan.append(rapperImage);
            $gifRow.append($gifSpan);}

        $("#gif-display").prepend($gifRow);
        }
      });
    })
