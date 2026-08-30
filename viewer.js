const params =
    new URLSearchParams(window.location.search);


const fileId =
    params.get("id");


const pdfViewer =
    document.getElementById("pdfViewer");


const viewerTitle =
    document.getElementById("viewerTitle");


const viewerBackButton =
    document.getElementById("viewerBackButton");


const openDriveButton =
    document.getElementById("openDriveButton");

const downloadButton =
    document.getElementById("downloadButton");


function findPDF(node, id) {

    if (!node) return null;


    if (

        node.type === "pdf" &&

        node.id === id

    ) {

        return node;

    }


    if (node.children) {

        for (const child of node.children) {

            const result =
                findPDF(child, id);


            if (result) return result;

        }

    }


    return null;

}


let selectedPDF = null;


Object.values(resources).forEach(section => {

    if (!selectedPDF) {

        selectedPDF =
            findPDF(section, fileId);

    }

});


if (!selectedPDF) {

    viewerTitle.textContent =
        "PDF not found";

}


else {

    viewerTitle.textContent =
        selectedPDF.name;


    const pdfURL =

        `https://drive.google.com/file/d/${selectedPDF.id}/preview`;


    pdfViewer.src =
        pdfURL;


        openDriveButton.addEventListener(

        "click",

        () => {

            window.open(

                `https://drive.google.com/file/d/${selectedPDF.id}/view`,

                "_blank"

            );

        }

    );


    downloadButton.addEventListener(

        "click",

        () => {

            window.open(

                `https://drive.google.com/uc?export=download&id=${selectedPDF.id}`,

                "_blank"

            );

        }

    );
}


viewerBackButton.addEventListener(

    "click",

    () => {

        history.back();

    }

);
