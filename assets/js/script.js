//----------------------------
//designate global variables
var submitBtn = $("#submitButton");
var movieCard = $(".card");
var navSelector = $("#genrePicker");
var cardholder = $("#cardholder");
var youtubeUrl = "https://www.googleapis.com/youtube/v3";
var youtubeApi = "api_key = AIzaSyBNt_y938eyIof4sZhdpK8D0a9CACz70xE";
var youtubeApiUrl = youtubeUrl + "/&" + youtubeApi;
var introPage = $("#intro-page");
var videoModal = $("#videoModal");
var h2El = $("#h2El");
var h3El = $("#h3El");
//TMBD variables
var apiKey = "api_key=e615b777f7066471620865b8f7eaf6ab";
var baseUrl = "https://api.themoviedb.org/3";
var apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
var imgUrl = "https://image.tmdb.org/t/p/w500";
// var cardholder = document.getElementById("cardholder");
//---------------------------

//--------------------------
//Movie Genre ID's
//--------------------------
// Action          28
// Adventure       12
// Animation       16
// Comedy          35
// Crime           80
// Documentary     99
// Drama           18
// Family          10751
// Fantasy         14
// History         36
// Horror          27
// Music           10402
// Mystery         9648
// Romance         10749
// Science Fiction 878
// TV Movie        10770
// Thriller        53
// War             10752
// Western         37
//---------------------------

//---------------------------
//call getMovies function
getMovies(apiUrl);
//---------------------------

//---------------------------
//create a function to fetch movies from TMBD api
function getMovies(url) {
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showMovies(data);
    });
}
//----------------------------

//----------------------------
//create a function to show movie info
function showMovies(data) {
  cardholder.innerHTML = "";
  console.log(data.results);
  data.results.forEach((movie) => {
    var { title, poster_path, overview } = movie;
    var movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <div class="card justify-content-center" style="min-height: 285px; width:575px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${
            imgUrl + poster_path
          }" class="rounded-start" alt="${title}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${overview}</p>
        </div>`;

    cardholder.append(movieEl);
  });
}
//---------------------------

//----------------------------
//select which elements will be hidden on initial page load
cardholder.hide();
//----------------------------

//----------------------------
//create a function to generate the movie cards based on the selected dropdown.
function generateCards() {
  //take the genre and grab the genre code to pull from database
  console.log(navSelector.value);

  cardholder.show();
}
//----------------------------

//-----------------------------
//create a function to generate a modal containing the movie trailer pulled from youtube api
function trailerModal() {
  //---------------------------
  var src = "https://www.youtube.com/embed/dQw4w9WgXcQ";
  $("#videoModal").modal("show");
  $("#videoModal iframe").attr("src", src);
}
//---------------------------
//add event listener to the movie card to run the trailerModal function to create a modal and display the youtube api corresponding movie trailer.
cardholder.on("click", function (event) {
  event.preventDefault();
  trailerModal();
});
//---------------------------

//---------------------------
//add event listener to the submit button on the top of the page to take the selected genre and run the generateCards function for that genre. Also will dynamically update the h2 and h3 text in the intro page when the submit button is clicked.
submitBtn.on("click", function (event) {
  event.preventDefault();
  generateCards();
  introPage.hide();
  document.getElementById("h2El").innerHTML =
    "Now showing random " + navSelector.value + " movies!";
  document.getElementById("h3El").innerHTML =
    "Click on a movie to pull up the movie trailer!";
});
//--------------------------

//---------------------
//Set fetch for youtube api
function getYTApi(youtubeUrl) {
  fetch(youtubeUrl).then(function (response) {
    console.log(response);
  });
}
