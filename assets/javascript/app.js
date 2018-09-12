$(document).ready(function () {
    var topics = ["350z", "Corvette", "camaro", "Mustang",
        "Shelby Cobra", "Porsche 911", "Ferrari", "Lamborghini"];

    function setupButtons() {
        $("#buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var gifBtn = $("<button>");
            gifBtn.addClass("car-button loadCarsBtn car-button-color");
            gifBtn.attr("data-car", topics[i]);
            gifBtn.text(topics[i]);
            $("#buttons").append(gifBtn);
            $(".loadCarsBtn").on("click",loadGifs);
        }
    }

     function loadGifs() {
        $("#gifs-appear-here").empty();
        var car = $(this).attr("data-car");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            car + "&api_key=Pv6itvzT69S952NyCxexRD5cp8cigF6K&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var carImage = $("<img>");
                    carImage.attr("src", results[i].images.fixed_height_still.url);
                    //add attributes data-still data-animate,data-state
                    carImage.attr("data-still", results[i].images.fixed_height_still.url);
                    carImage.attr("data-animate", results[i].images.fixed_height.url);
                    carImage.attr("data-state", "still");
                    //add class gif
                    carImage.addClass("gif");
                    gifDiv.prepend(p);
                    gifDiv.prepend(carImage);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
                    $(".gif").on("click", gifStillAnimated);
            });
    }

    function gifStillAnimated() {
        var state = $(this).attr("data-state");
        console.log(this);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    $("#add-car").on("click", function () {
        event.preventDefault();
        var newText = $("#car-input").val();

        if (newText.trim() === "") { return }
        topics.push(newText);
        setupButtons();
    });
    setupButtons();
});