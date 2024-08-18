(async () => {
  const response = await fetch("./data.json");
  const movies = await response.json();

  const genreElem = document.getElementById("select-genre");
  const yearElem = document.getElementById("select-year");
  const langElem = document.getElementById("select-lang");
  const ratingElem = document.getElementById("select-rating");
  const moviesContainer = document.getElementById("movies-container");

  // genres set
  let genresList = [];
  movies.forEach(function (movie) {
    for (var i = 0; i < movie.genres.length; i++) {
      const genre = movie.genres[i];
      cleanList(genresList, genre);
    }
  });
  createOptions(genresList, genreElem);

  // year set
  let yearList = [];
  movies.forEach((movie) => {
    const fullYear = new Date(movie.release_date).getFullYear();
    cleanList(yearList, fullYear, "descending");
  });
  createOptions(yearList, yearElem);

  // language set
  let langList = [];
  movies.forEach(function (movie) {
    const language = movie.original_language;
    cleanList(langList, language);
  });
  createOptions(langList, langElem);

  // rating set
  let ratingList = [];
  movies.forEach(function (val) {
    const roundedRating = Math.floor(val.vote_average);
    cleanList(ratingList, roundedRating);
  });
  createOptions(ratingList, ratingElem);

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

  const itemsPerPage = 10;
  let page = 1;
  let postCount = 1;
  let currentResults = [];

  function displayResults(startIndex, endIndex) {
    // moviesContainer.innerHTML = "";
    const resultsChunk = currentResults.slice(startIndex, endIndex);
    console.log(resultsChunk);
    if (resultsChunk.length === 0) {
      console.log(resultsChunk.length);
      moviesContainer.innerHTML = `
                <div class="no-data">No Data</div>
            `;
      moviesContainer.style.margin = "10px 20px";
      moviesContainer.style.display = "flex";
      moviesContainer.style.alignItems = "center";
      moviesContainer.style.justifyContent = "center";
      moviesContainer.style.height = "35vh";
      // return;
    } else {
      moviesContainer.style = "";
    }
    resultsChunk.forEach(function (movie, ind) {
      // console.log(movieRow);
      const movieRow = document.createElement("div");
      // movieRow.classList = ["movie-row"];
      // movie.classList = [""]
      movieRow.setAttribute("id", "movie-row");
      ind++;
      movieRow.innerHTML = `
                <div class="bg-red first flex hor-center" 
                    id="rank">${postCount++}</div>
                <div class="second" id="movie">
                    <img src="https://image.tmdb.org/t/p/w45${
                      movie.poster_path
                    }" alt="Movie Image">
                    <div id="description">
                        <div id="title">${movie.title}</div>
                        <div id="second-line">
                            <span id="certification">${
                              movie.certification || "Not available"
                            }</span>
                            <span id="genres">${movie.genres
                              .sort()
                              .join(", ")}</span>&#183 
                            <span>${Math.floor(movie.runtime / 60)}h ${
        movie.runtime % 60
      }m</span>
                        </div>
                        </div>
                        </div>
                        <div class="bg-red third flex hor-center" id="year">${new Date(
                          movie.release_date
                        ).getFullYear()}</div>
            `;

      // const hr = document.createElement("hr");
      moviesContainer.appendChild(movieRow);
      // moviesContainer.appendChild(hr);
    });
  }

  function loadMore() {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    displayResults(startIndex, endIndex);

    page++;

    if (endIndex >= currentResults.length || currentResults.length === 0) {
      window.removeEventListener("scroll", handleScroll);
    }
  }

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setTimeout(() => {
        console.log("I am at bottom");
        loadMore();
      }, 200);
    }
  };

  const initInfiniteScroll = () => {
    window.addEventListener("scroll", handleScroll);
  };

  function search() {
    const genreQuery = genreElem.value;
    const yearQuery = yearElem.value;
    const langQuery = langElem.value;
    const ratingQuery = ratingElem.value;

    currentResults = movies.filter(function (movie) {
      return (
        (genreQuery === "all" ||
          movie.genres.toString().includes(genreQuery)) &&
        (yearQuery === "all" ||
          new Date(movie.release_date).getFullYear() == yearQuery) &&
        (langQuery === "all" || movie.original_language === langQuery) &&
        (ratingQuery === "all" ||
          movie.vote_average.toString().includes(ratingQuery))
      );
    });
    // console.log("results", results)
    // displayResults(results, startIndex, endIndex)
    page = 1;
    postCount = 1;
    moviesContainer.innerHTML = "";

    loadMore();
    initInfiniteScroll();
  }
  search();

  initInfiniteScroll();
  // loadMore();

  const allSelectInput = document.querySelectorAll(".user-select");
  allSelectInput.forEach((q) => {
    q.addEventListener("change", search);
  });
})();
