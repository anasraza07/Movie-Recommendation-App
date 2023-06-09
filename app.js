(async function () {
    const response = await fetch("./data.json");
    const movies = await response.json();
    // console.log(movies)

    const genreElem = document.getElementById("genre-select");
    const yearElem = document.getElementById("year-select");
    const langElem = document.getElementById("lang-select");
    const ratingElem = document.getElementById("rating-select");
    const moviesContainer = document.getElementById("movies-container");
    // const movieRow = document.getElementById("movie-row");


    // GENRES SETTING IN OPTIONS
    // function setOptions() { }
    // setOptions();
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
    // console.log(genresList)
    // const uniqueGenreList = [];
    // genresList.forEach(function (g) {
    // if (!uniqueGenreList.includes(g)) {
    //     uniqueGenreList.push(g);
    // }
    // });

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
    // const uniqueYearList = [];
    // yearList.forEach(function (g) {
    //     if (!uniqueYearList.includes(g)) {
    //         uniqueYearList.push(g);
    //     }
    // });
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
    // const uniqueLangList = [];
    // langList.forEach(function (l) {
    //     if (!uniqueLangList.includes(l)) {
    //         uniqueLangList.push(l);
    //     }
    // });
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
        // ratingList.push(val.vote_average);
    });
    // const uniqueRatingList = [];
    // ratingList.forEach(function (r) {
    //     if (!uniqueRatingList.includes(r)) {
    //         uniqueRatingList.push(r);
    //     }
    // });
    for (var i = 0; i < ratingList.length; i++) {
        const optionElem3 = document.createElement("option")
        optionElem3.innerHTML = ratingList[i];
        ratingElem.appendChild(optionElem3);
    }
    //     }
    //     window.addEventListener("load", setOptions());

    function displayResults(results) {
        moviesContainer.innerHTML = "";
        results.forEach(function (movie, ind) {
            // console.log(movieRow);
            const movieRow = document.createElement("div");
            // movieRow.classList = ["movie-row"];
            movieRow.setAttribute("id", "movie-row");
            ind++;
            movieRow.innerHTML = `
            <div class="bg-red w-6 flex hor-center" id="rank">${ind}</div>
            <div class="w-80" id="movie">
                <img src="https://image.tmdb.org/t/p/w45${movie.poster_path}" alt="loading...">
                <div id="description">
                    <div id="title">${movie.title}</div>
                    <div id="second-line">
                        <span id="certification">${movie.certification}</span>
                        <span id="genres">${((movie.genres).sort().join(", "))}</span>
                        <span>${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m</span>
                     </div>
                     </div>
                     </div>
                     <div class="bg-red w-6 flex hor-center" id="year">${new Date(movie.release_date).getFullYear()}</div>
                     `

            // const secondLine = document.getElementById("second-line");
            // const cert = document.getElementById("certification");
            // if (cert === null) {
            //     // console.log("null")
            //     // 
            //     // cert.innerHTML = "";
            //     // console.log(secondLine, cert)
            //     secondLine.removeChild(cert);
            // }
            // if (results.certification === undefined) {
            // console.log(cert.textContent);
            // // results.certification.remove();
            // }

            const hr = document.createElement("hr");
            moviesContainer.appendChild(movieRow);
            moviesContainer.appendChild(hr);
            // const first = document.createElement("div");
            // first.setAttribute("id", "anas")
            // movieRow.appendChild(first)
        })
    }


    function search() {
        const genreQuery = genreElem.value;
        const yearQuery = yearElem.value;
        const langQuery = langElem.value;
        const ratingQuery = ratingElem.value;
        const results = movies.filter(function (movie) {
            if ((genreQuery === "all" || movie.genres.toString().includes(genreQuery)) && (yearQuery === "all" || new Date(movie.release_date).getFullYear() == yearQuery) && (langQuery === "all" || movie.original_language === langQuery) && (ratingQuery === "all" || movie.vote_average.toString().includes(ratingQuery))) {
                return true;
            }
            // return genreQuery === "all" && yearQuery === "all" && langQuery === "all" && ratingQuery === "all" ||
            //     (movie.genres.toString().includes(genreQuery) && new Date(movie.release_date).getFullYear() == yearQuery && movie.original_language === langQuery && movie.vote_average == ratingQuery)
            // if(movie.certification === undefined){
            //     // console.log(new Array(movie.certification))
            //     console.log(true)
            // }
        })
        displayResults(results)
        //         // console.log(results1)
        // console.log(results);
    }
    // search();
    // document.addEventListener("load", search);    

    const allSelectInput = document.querySelectorAll(".user-select")

    allSelectInput.forEach((q) => {
        q.addEventListener("change", search)
    })
})();