(async function () {
    const response = await fetch("./data.json");
    const movies = await response.json();

    const genreElem = document.getElementById("genre-select");
    const yearElem = document.getElementById("year-select");
    const langElem = document.getElementById("lang-select");
    const ratingElem = document.getElementById("rating-select");
    const moviesContainer = document.getElementById("movies-container");

    // GENRES SETTING IN OPTIONS
    let genresList = [];
    movies.forEach(function (val) {
        for (var i = 0; i < val.genres.length; i++) {
            if (!genresList.includes(val.genres[i])) {
                genresList.push(val.genres[i]);
                genresList.sort();
                // uniqueGenreList.push(g);
            }
        }
    });

    for (var i = 0; i < genresList.length; i++) {
        const optionElem = document.createElement("option");
        optionElem.innerHTML = `${genresList[i]}`;
        genreElem.appendChild(optionElem);
    }

    // YEAR SETTING IN OPTIONS
    let yearList = [];
    movies.forEach(function (val) {
        const fullYear = new Date(val.release_date).getFullYear();
        if (!yearList.includes(fullYear)) {
            yearList.push(fullYear);
            yearList.sort((a, b) => b - a);
        }
    });

    for (var i = 0; i < yearList.length; i++) {
        const optionElem1 = document.createElement("option");
        optionElem1.innerHTML = yearList[i];
        yearElem.appendChild(optionElem1);
    }

    // LANG SETTING IN OPTIONS
    let langList = [];
    movies.forEach(function (val) {
        if (!langList.includes(val.original_language)) {
            langList.push(val.original_language);
            langList.sort();
        }
    });

    for (var i = 0; i < langList.length; i++) {
        const optionElem2 = document.createElement("option")
        optionElem2.innerHTML = langList[i]
        langElem.appendChild(optionElem2);
    }

    // RATING SETTING IN OPTIONS
    let ratingList = [];
    movies.forEach(function (val) {
        const round = Math.floor(val.vote_average);
        if (!ratingList.includes(round)) {
            ratingList.push(round);
            ratingList.sort();
        }
    });

    for (var i = 0; i < ratingList.length; i++) {
        const optionElem3 = document.createElement("option")
        optionElem3.innerHTML = ratingList[i];
        ratingElem.appendChild(optionElem3);
    }

    const itemsPerPage = 10;
    let page = 1;
    let postCount = 1;
    let currentResults = [];

    function displayResults(startIndex, endIndex) {
        // moviesContainer.innerHTML = "";
        const resultsChunk = currentResults.slice(startIndex, endIndex);
        console.log(resultsChunk)
        if (resultsChunk.length === 0) {
            console.log(resultsChunk.length)
            moviesContainer.innerHTML = `
                <div class="no-data">No Data</div>
            `
            moviesContainer.style.margin = "10px 20px"
            moviesContainer.style.display = "flex"
            moviesContainer.style.alignItems = "center"
            moviesContainer.style.justifyContent = "center"
            moviesContainer.style.height = "35vh"
            // return;
        } else {
            moviesContainer.style = "";
        }
        resultsChunk.forEach(function (movie, ind) {
            // console.log(movieRow);
            const movieRow = document.createElement("div");
            // movieRow.classList = ["movie-row"];
            movieRow.setAttribute("id", "movie-row");
            ind++;
            movieRow.innerHTML = `
            <div class="bg-red w-6 flex hor-center" id="rank">${postCount++}</div>
            <div class="w-80" id="movie">
                <img src="https://image.tmdb.org/t/p/w45${movie.poster_path}" alt="loading...">
                <div id="description">
                    <div id="title">${movie.title}</div>
                    <div id="second-line">
                        <span id="certification">${movie.certification || "Not available"}</span>
                        <span id="genres">${((movie.genres).sort().join(", "))}</span>
                        <span>${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m</span>
                     </div>
                     </div>
                     </div>
                     <div class="bg-red w-6 flex hor-center" id="year">${new Date(movie.release_date).getFullYear()}</div>
                     `

            const hr = document.createElement("hr");
            moviesContainer.appendChild(movieRow);
            moviesContainer.appendChild(hr);

        })

    }

    function loadMore() {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;

        displayResults(startIndex, endIndex)

        page++;

        if (endIndex >= currentResults.length || currentResults.length === 0) {
            window.removeEventListener("scroll", handleScroll)
        }
    }

    const handleScroll = () => {
        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
            setTimeout(() => {
                console.log("I am at bottom");
                loadMore();
            }, 200)
        }
    }

    const initInfiniteScroll = () => {
        window.addEventListener("scroll", handleScroll)
    }

    function search() {
        const genreQuery = genreElem.value;
        const yearQuery = yearElem.value;
        const langQuery = langElem.value;
        const ratingQuery = ratingElem.value;

        currentResults = movies.filter(function (movie) {
            if ((genreQuery === "all" || movie.genres.toString().includes(genreQuery)) && (yearQuery === "all" || new Date(movie.release_date).getFullYear() == yearQuery) && (langQuery === "all" || movie.original_language === langQuery) && (ratingQuery === "all" || movie.vote_average.toString().includes(ratingQuery))) {
                return true;
            }
        })
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

    const allSelectInput = document.querySelectorAll(".user-select")
    allSelectInput.forEach((q) => {
        q.addEventListener("change", search)
    })
})();
