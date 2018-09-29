var basketballArr =["Kevin Durant","Wrussel Westbrook","Kobe Bryant",
"Shaquille O'Neal","Tim Duncan","Magic Johnson","Wilt Chamberlain",
"Larry Bird","Kareem Abdul-Jabbar"];





function renderButtons(){

$(".button-view").empty();
    for (var i = 0; i <basketballArr.length; i++){
        var newButton = $("<button>");
        newButton.addClass("basketballArr btn-default");
        newButton.attr("data-name", basketballArr[i]);
        newButton.text(basketballArr[i]);
        $(".buttons-view").append(newButton);
    }
};





$("#add-basketballArr").on("click", function (event) {
    event.preventDefault();
    var basketballArr = $("#basketballArr-input").val().toLowerCase().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + basketballArr + "&api_key=NOPRxGVvDs9OHa7WjAWpeYi4zJyPEoji";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

        if (response.data.length == 0) {
            alert("No Gifs found for topic");
        }
        else if (basketballArr.indexOf(basketballArr) != -1) {
            alert("Topic already exists");
        }
        else {
            basketballArr.push(basketballArr);
            renderButtons();
        }

    });
});

function displayGifs () {
    var basketballArr = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + basketballArr + "&api_key=NOPRxGVvDs9OHa7WjAWpeYi4zJyPEoji";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      console.log(response);

      $(".gifs-view").empty();
      for (var i = 0; i < response.data.length; i++) {
          var gifDiv = $("<div>");
          gifDiv.addClass("gifDiv");
          gifDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");

          var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
          gifImage.addClass("gif");

          var imageDiv = $("<div>");
          imageDiv.addClass("play");
          imageDiv.attr("data-state", "still");
          imageDiv.attr("data-name", basketballArr);
          imageDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
          imageDiv.attr("data-animate",response.data[i].images.fixed_height.url)
          
          $(imageDiv).append(gifImage);
          $(gifDiv).append(imageDiv);
          $(".gifs-view").append(gifDiv);
      }

    });
}

function playGif () {

    if ($(this).attr("data-state") == "still") {
        $(this).html("<img src='" + $(this).attr("data-animate") + "'>");
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).html("<img src='" + $(this).attr("data-still") + "'>");
        $(this).attr("data-state", "still");
    }

};


$(document).on("click", ".basketballArr", displayGifs);
$(document).on("click", ".play", playGif);

renderButtons();


