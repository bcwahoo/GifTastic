$(document).ready(function() {
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
    $("#rap-buttons").empty();

    for (var loop = 0; loop < artists.length; loop++) {
      var topBtn = $('<button class="btn btn-success">');

      topBtn.addClass("rap-button");
      topBtn.attr("data-name", artists[loop]);
      topBtn.text(artists[loop]);
      $("#rap-buttons").append(topBtn);
    }
  }

  // Adding click event listen listener to all buttons
  $(document).on("click", ".rap-button", function() {
    $("#a-display").empty();
    $(".rap-button").removeClass("active");
    $(this).addClass("active");

    var artGif = $(this).attr("data-name");
    console.log(artGif);

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      artGif +
      "&api_key=jIvi6w2Fe9qAQkZtycr302I612DQsfqM&limit=10";

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
          var gifRow = $('<div class="row">');

          for (var loop = 0; loop < results.length; loop++) {
            var gifCard = $('<div class="card col-sm-5">');
            var rating = results[loop].rating;
            rating = rating.toUpperCase();

            var imageAnimateName = results[loop].images.fixed_height.url;
            var imageStillName = results[loop].images.fixed_height_still.url;
            var p = $('<h5 class="card-title mx-auto">').text(
              "Rating: " + rating
            );
            var rapperImage = $('<img class="card-img-top">');

            rapperImage.attr("data-state", "still");
            rapperImage.attr("src", imageStillName);
            rapperImage.attr("data-still", imageStillName);
            rapperImage.attr("data-animate", imageAnimateName);
            rapperImage.addClass("rapper-pic");

            gifCard.append(p);
            gifCard.append(rapperImage);
            gifRow.append(gifCard);
          }

          $("#a-display").append(gifRow);
        }
      });
  });

  //Freeze Image
  $(document).on("click", ".rapper-pic", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  //Create Buttons
  $("#add-artist").on("click", function(event) {
    event.preventDefault();
    var newArtist = $("#artist-input").val().trim();

    if (newArtist.length > 2) {
      artists.push(newArtist);
    }

    giveMeButtons(artists, "rap-button", "#rap-buttons");
  });

  giveMeButtons(artists, "rap-button", "#rap-buttons");
});
