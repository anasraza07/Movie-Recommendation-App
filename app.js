(async function () {
    const response = await fetch("./data.json");
    const movies = await response.json();

    const genreElem = document.getElementById("genreSelect");
    const yearElem = document.getElementById("yearSelect");
    const langElem = document.getElementById("langSelect");
    const ratingElem = document.getElementById("ratingSelect");

    const tableElem = document.getElementById("tableBody");

    movies.forEach(function (m) {
        const optionElem = document.createElement("option")
        optionElem.innerHTML = `${m.genres.toString()}`;
        genreElem.appendChild(optionElem);

        const optionElem1 = document.createElement("option")
        optionElem1.innerHTML = `${new Date(m.release_date).getFullYear()}`;
        yearElem.appendChild(optionElem1);

        const optionElem2 = document.createElement("option")
        optionElem2.innerHTML = `${m.original_language}`;
        langElem.appendChild(optionElem2);

        const optionElem3 = document.createElement("option")
        optionElem3.innerHTML = `${m.vote_average}`;
        ratingElem.appendChild(optionElem3);

    });

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
            td1.innerHTML = `<div class="movie-data">${movie.title}</div>`
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
            // console.log(allSelection)
            return (movie.genres.toString().includes(genreQuery) && new Date(movie.release_date).getFullYear() === yearQuery)
            // return true;
            // console.log(results)
            // return true;
            // || movie.genres.toString().includes(genreQuery)) return true;
            // return genreQuery === "all" || yearQuery === "all" || langQuery === "all" ||
            //     ratingQuery === "all";
            // && movie.genres.toString().includes(genreQuery) && movie.release_date.includes(yearQuery)))
        })
        displayResults(results)
    }
    search();
    // const allSelection = document.getElementsByClassName("user-select");
    // allSelection.addEventListener("change", search)

    // if (genreElem === "all" && yearElem === "all" && langElem === "all" &&
    //     ratingElem === "all") {

})(); 