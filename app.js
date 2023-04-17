(async function () {
    const response = await fetch("./data.json");
    const movies = await response.json();

    const genreElem = document.getElementById("genreSelect");
    const yearElem = document.getElementById("yearSelect");
    const langElem = document.getElementById("langSelect");
    const ratingElem = document.getElementById("ratingSelect");
    const btnElem = document.getElementById("btn");
    const tableElem = document.getElementById("tableBody");

    // GENRES SETTING IN OPTIONS
    function setOptions() {
        let genresList = [];
        movies.forEach(function (val) {
            for (var i = 0; i < val.genres.length; i++) {
                genresList.push(val.genres[i]);
            }
        });
        // console.log(genresList)
        const uniqueGenreList = [];
        genresList.forEach(function (g) {
            if (!uniqueGenreList.includes(g)) {
                uniqueGenreList.push(g);
            }
        });

        for (var i = 0; i < uniqueGenreList.length; i++) {
            const optionElem = document.createElement("option");
            optionElem.innerHTML = `${uniqueGenreList[i]}`;
            genreElem.appendChild(optionElem);
        }

        // YEAR SETTING IN OPTIONS
        let yearList = [];
        movies.forEach(function (val) {
            yearList.push(new Date(val.release_date).getFullYear());
        });
        const uniqueYearList = [];
        yearList.forEach(function (g) {
            if (!uniqueYearList.includes(g)) {
                uniqueYearList.push(g);
            }
        });
        for (var i = 0; i < uniqueYearList.length; i++) {
            const optionElem1 = document.createElement("option");
            optionElem1.innerHTML = uniqueYearList[i];
            yearElem.appendChild(optionElem1);
        }

        // LANG SETTING IN OPTIONS
        let langList = [];
        movies.forEach(function (val) {
            langList.push(val.original_language);
        });
        const uniqueLangList = [];
        langList.forEach(function (l) {
            if (!uniqueLangList.includes(l)) {
                uniqueLangList.push(l);
            }
        });
        for (var i = 0; i < uniqueLangList.length; i++) {
            const optionElem2 = document.createElement("option")
            optionElem2.innerHTML = uniqueLangList[i]
            langElem.appendChild(optionElem2);
        }

        // RATING SETTING IN OPTIONS
        let ratingList = [];
        movies.forEach(function (val) {
            ratingList.push(val.vote_average);
        });
        const uniqueRatingList = [];
        ratingList.forEach(function (r) {
            if (!uniqueRatingList.includes(r)) {
                uniqueRatingList.push(r);
            }
        });
        for (var i = 0; i < uniqueRatingList.length; i++) {
            const optionElem3 = document.createElement("option")
            optionElem3.innerHTML = uniqueRatingList[i];
            ratingElem.appendChild(optionElem3);
        }
    }
    window.addEventListener("load", setOptions());
    function displayResults(results) {
        tableElem.innerHTML = ""
        results.forEach(function (movie, ind) {
            ind++;
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.innerHTML = ind;
            tr.appendChild(td);
            tableElem.appendChild(tr)
            const td1 = document.createElement("td");
            td1.innerHTML = `
            <div class="movie-td">
                <div class="img-div">
                    <img src="https://image.tmdb.org/t/p/w45${movie.poster_path}" alt="loading...">
                </div>
                <div class="description">
                    <div id="movie-title">${movie.title}</div>
                    <div class="lastLine">
                        <div id="certi">${movie.certification}</div>
                        <div>${movie.genres.join(", ")}</div>
                    </div>
                </div>
            </div>
            `
            tr.appendChild(td1);
            const date = new Date(movie.release_date);
            const year = date.getFullYear();
            const td2 = document.createElement("td");
            td2.innerHTML = year;
            tr.appendChild(td2);
        })
        // console.log(tableElem)
    }

    function search() {
        const genreQuery = genreElem.value;
        const yearQuery = yearElem.value;
        const langQuery = langElem.value;
        const ratingQuery = ratingElem.value;
        const results = movies.filter(function (movie) {
            return genreQuery === "all" && yearQuery === "all" && langQuery === "all" && ratingQuery === "all" ||
                (movie.genres.toString().includes(genreQuery) && new Date(movie.release_date).getFullYear() == yearQuery && movie.original_language === langQuery && movie.vote_average == ratingQuery)
        })
        displayResults(results)
        // console.log(results1)
    }

    // search();
    // const allSelection = document.getElementsByClassName("user-select");

    btn.addEventListener("click", search)
})(); 