const explorerList =
    document.getElementById("explorerList");

const pageTitle =
    document.getElementById("pageTitle");

const breadcrumb =
    document.getElementById("breadcrumb");

const backButton =
    document.getElementById("backButton");


const params =
    new URLSearchParams(window.location.search);


const sectionKey =
    params.get("section") || "cisce";


let currentNode =
    resources[sectionKey];


let navigationStack = [

    {

        node: currentNode,

        name: currentNode.name

    }

];


function renderExplorer() {

    explorerList.innerHTML = "";


    pageTitle.textContent =
        currentNode.name;


    breadcrumb.textContent =
        navigationStack

            .map(item => item.name)

            .join(" › ");


    if (!currentNode.children ||
        currentNode.children.length === 0) {


        explorerList.innerHTML = `

            <div class="file-item">

                <div class="file-info">

                    <div class="file-name">

                        No resources added yet

                    </div>

                </div>

            </div>

        `;

        return;

    }


    currentNode.children.forEach(item => {


        const element =
            document.createElement("button");


        element.className =
            "file-item";


        if (item.type === "folder") {

            element.innerHTML = `

                <div class="file-icon">

                    <i class="fa-solid fa-folder"></i>

                </div>


                <div class="file-info">

                    <div class="file-name">

                        ${item.name}

                    </div>


                    <div class="file-type">

                        Folder

                    </div>

                </div>


                <div class="file-arrow">

                    <i class="fa-solid fa-chevron-right"></i>

                </div>

            `;


            element.addEventListener(

                "click",

                () => {

                    currentNode = item;


                    navigationStack.push({

                        node: item,

                        name: item.name

                    });


                    renderExplorer();

                }

            );

        }


        else if (item.type === "pdf") {

            element.innerHTML = `

                <div class="file-icon">

                    <i class="fa-solid fa-file-pdf"></i>

                </div>


                <div class="file-info">

                    <div class="file-name">

                        ${item.name}

                    </div>


                    <div class="file-type">

                        PDF Document

                    </div>

                </div>


                <div class="file-arrow">

                    <i class="fa-solid fa-chevron-right"></i>

                </div>

            `;


            element.addEventListener(

                "click",

                () => {

                    window.location.href =

                        `viewer.html?id=${encodeURIComponent(item.id)}`;

                }

            );

        }


        explorerList.appendChild(element);

    });

}


backButton.addEventListener(

    "click",

    () => {


        if (navigationStack.length > 1) {


            navigationStack.pop();


            currentNode =
                navigationStack[
                    navigationStack.length - 1
                ].node;


            renderExplorer();

        }

        else {

            window.location.href =
                "index.html";

        }

    }

);


renderExplorer();
