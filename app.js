/* =========================
   THEME
========================= */

const themeButton =
    document.getElementById("themeButton");


function loadTheme() {

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "light") {

        document.body.classList.add("light");

    }

}


loadTheme();


if (themeButton) {

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("light");


        const isLight =
            document.body.classList.contains("light");


        localStorage.setItem(

            "theme",

            isLight ? "light" : "dark"

        );

    });

}

/* =========================
   SEARCH
========================= */

const searchOverlay =
    document.getElementById("searchOverlay");

const searchInput =
    document.getElementById("searchInput");

const searchResults =
    document.getElementById("searchResults");

const searchButton =
    document.getElementById("searchButton");

const explorerSearchButton =
    document.getElementById("explorerSearchButton");

const closeSearch =
    document.getElementById("closeSearch");


function openSearch() {

    if (!searchOverlay) return;


    searchOverlay.classList.add("active");


    setTimeout(() => {

        searchInput.focus();

    }, 100);

}


function closeSearchOverlay() {

    if (!searchOverlay) return;


    searchOverlay.classList.remove("active");


    searchInput.value = "";


    searchResults.innerHTML = "";

}


if (searchButton) {

    searchButton.addEventListener(

        "click",

        openSearch

    );

}


if (explorerSearchButton) {

    explorerSearchButton.addEventListener(

        "click",

        openSearch

    );

}


if (closeSearch) {

    closeSearch.addEventListener(

        "click",

        closeSearchOverlay

    );

}


/* =========================
   FIND ALL PDFs
========================= */

function getAllPDFs(node, path = []) {

    let files = [];


    if (!node) return files;


    if (node.type === "pdf") {

        files.push({

            ...node,

            path

        });

    }


    if (node.children) {

        node.children.forEach(child => {

            files = files.concat(

                getAllPDFs(

                    child,

                    [...path, node.name]

                )

            );

        });

    }


    return files;

}


function searchAllResources(query) {

    let allFiles = [];


    Object.values(resources).forEach(section => {

        allFiles = allFiles.concat(

            getAllPDFs(section)

        );

    });


    return allFiles.filter(file =>

        file.name

            .toLowerCase()

            .includes(query.toLowerCase())

    );

}


/* =========================
   DISPLAY SEARCH
========================= */

if (searchInput) {

    searchInput.addEventListener(

        "input",

        () => {

            const query =
                searchInput.value.trim();


            if (!query) {

                searchResults.innerHTML = "";

                return;

            }


            const results =
                searchAllResources(query);


            if (results.length === 0) {

                searchResults.innerHTML = `

                    <div class="search-result">

                        No resources found.

                    </div>

                `;

                return;

            }


            searchResults.innerHTML =
                results.map(file => `

                    <div
                        class="search-result"
                        onclick="openPDF('${file.id}')"
                    >

                        <strong>

                            📄 ${file.name}

                        </strong>

                        <small>

                            ${file.path.join(" › ")}

                        </small>

                    </div>

                `).join("");

        }

    );

}


/* =========================
   OPEN PDF
========================= */

function openPDF(id) {

    window.location.href =
        `viewer.html?id=${encodeURIComponent(id)}`;

}
