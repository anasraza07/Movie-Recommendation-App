(async () => {
  const response = await fetch("./data.json");
  const movies = await response.json();

  const genreElem = document.getElementById("select-genre");
  const yearElem = document.getElementById("select-year");
  const langElem = document.getElementById("select-lang");
  const ratingElem = document.getElementById("select-rating");
  const moviesContainer = document.getElementById("movies-container");

  // set genre options
  let genresList = [];
  movies.forEach(function (movie) {
    for (var i = 0; i < movie.genres.length; i++) {
      const genre = movie.genres[i];
      cleanList(genresList, genre);
    }
  });
  createOptions(genresList, genreElem);

  // set year options
  let yearList = [];
  movies.forEach((movie) => {
    const fullYear = new Date(movie.release_date).getFullYear();
    cleanList(yearList, fullYear, "descending");
  });
  createOptions(yearList, yearElem);

  // set language options
  let langList = [];
  movies.forEach(function (movie) {
    const language = movie.original_language;
    cleanList(langList, language);
  });
  createOptions(langList, langElem);

  // set rating options
  let ratingList = [];
  movies.forEach((movie) => {
    const rating = movie.vote_average === 8 ? "8.0" : movie.vote_average;
    cleanList(ratingList, rating);
  });
  createOptions(ratingList, ratingElem);

  /*
  sbse pehle chalta hai search function
  aur scroll event pr handleScroll attach hojaata hai
  phr search func loadMore ko call krta hai
  loadMore displayResult ko call krta hai
  */

  function createOptions(list, parentElem) {
    list.forEach((item) => {
      const optionElem = document.createElement("option");
      optionElem.innerHTML = item;
      parentElem.appendChild(optionElem);
    });
  }

  function cleanList(list, value, sort = "ascending") {
    if (!list.includes(value)) {
      list.push(value);
      if (sort !== "descending") list.sort();
      else {
        list.sort((a, b) => b - a);
      }
    }
  }

  let postCount = 1;
  function displayResult(startIndex, endIndex) {
    const resultsChunk = currentResults.slice(startIndex, endIndex);
    // console.log(resultsChunk);

    if (resultsChunk.length === 0) {
      moviesContainer.innerHTML = `
        <div class="no-data">No Data</div>`;
      return;
    }

    resultsChunk.forEach((movie) => {
      const movieRow = document.createElement("div");
      movieRow.setAttribute("id", "movie-row");
      movieRow.innerHTML = `
                <div class="bg-red first flex hor-center" id="rank">
                  ${postCount++}
                </div>
                <div class="second" id="movie">
                  <img src="https://image.tmdb.org/t/p/w45${movie.poster_path}" alt="Movie Image">
                  <div id="description">
                    <div id="title">${movie.title}</div>
                    <div id="second-line">
                      <span id="certification">
                        ${movie.certification || "Not available"}
                      </span>
                      <span id="genres">
                      ${movie.genres.sort().join(", ")}
                      </span>
                      <span id="dot-entity">&#183;</span>
                      <span id="movie-duration">${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m
                      </span>
                    </div>
                  </div>
                </div>
                <div class="bg-red third flex hor-center" id="year">
                  ${new Date(movie.release_date).getFullYear()}
                </div>
      `;
      moviesContainer.appendChild(movieRow);
    });
  }

  // pagination
  let page = 1;
  const itemsPerPage = 10;
  function loadMore() {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    displayResult(startIndex, endIndex);
    page++;

    if (endIndex >= currentResults.length || currentResults.length === 0) {
      window.removeEventListener("scroll", handleScroll);
    }
  }

  window.addEventListener("scroll", handleScroll);
  function handleScroll() {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setTimeout(() => loadMore(), 300);
    }
  };

  let currentResults = [];
  function search() {
    const genreQuery = genreElem.value;
    const yearQuery = yearElem.value;
    const langQuery = langElem.value;
    const ratingQuery = ratingElem.value;

    currentResults = movies.filter((movie) => {
      return (
        (genreQuery === "all" ||
          movie.genres.toString().includes(genreQuery)) &&
        (yearQuery === "all" ||
          new Date(movie.release_date).getFullYear() == yearQuery) &&
        (langQuery === "all" || movie.original_language === langQuery) &&
        (ratingQuery === "all" || movie.vote_average == ratingQuery)
      );
    });
    // console.log(currentResults);
    document.querySelector('#js-search-results')
      .innerHTML = `Movies: ${currentResults.length < 10 && currentResults.length !== 0 ? '0' + currentResults.length : currentResults.length}`;

    page = 1;
    postCount = 1;
    moviesContainer.innerHTML = "";

    loadMore();
  }
  search();

  const allSelectInput = document.querySelectorAll(".user-select");
  allSelectInput.forEach((q) => {
    q.addEventListener("change", search);
  });
})();
