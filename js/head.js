document.addEventListener("DOMContentLoaded", function () {
    // Append head content safely
    document.head.insertAdjacentHTML("beforeend", `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Portfolio</title>
        <link rel="stylesheet" type="text/css" href="../css/form.css" />
        <link rel="stylesheet" type="text/css" href="../css/mainstyles.css" />
        <link rel="stylesheet" type="text/css" href="../css/listing.css" />
        ${checkCSSFile("../css/card.css")}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://code.jquery.com/jquery-3.6.4.min.js" defer></script>
    `);
});

// Helper function to check if card.css exists before adding it
function checkCSSFile(filePath) {
    var request = new XMLHttpRequest();
    request.open("HEAD", filePath, false);
    request.send();
    return request.status === 404 ? "" : `<link rel="stylesheet" type="text/css" href="${filePath}" />`;
}
