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
              $gifRow.append($gifSpan);
          }
          $("#gif-display").prepend($gifRow);
      }

      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var loop = 0; loop < results.length; loop++) {

        // Creating and storing a div tag
        var animalDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[loop].rating);

        // Creating and storing an image tag
        var animalImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", results[loop].images.fixed_height.url);

        // Appending the paragraph and image tag to the animalDiv
        animalDiv.append(p);
        animalDiv.append(animalImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(animalDiv);
      }
    });
});






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
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var loop = 0; loop < results.length; loop++) {

          // Creating and storing a div tag
          var animalDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var animalImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(p);
          animalDiv.append(animalImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(animalDiv);
        }
      });
  });
