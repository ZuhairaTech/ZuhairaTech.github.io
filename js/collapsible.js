// window.addEventListener("load", function () {
//     console.log("Collapsible script loaded!");

//     const collapsibles = document.querySelectorAll(".collapsible");
//     const contents = document.querySelectorAll(".content");

//     // Force reset all .content sections on load
//     contents.forEach(content => {
//         content.style.maxHeight = null;
//     });

//     collapsibles.forEach(button => {
//         console.log("Collapsible button found:", button);

//         button.addEventListener("click", function () {
//             console.log("Collapsible button CLICKED");
//             this.classList.toggle("active");

//             const content = this.nextElementSibling;

//             if (content) {
//                 if (content.style.maxHeight) {
//                     content.style.maxHeight = null;
//                 } else {
//                     content.style.maxHeight = content.scrollHeight + "px";
//                 }
//             }
//         });
//     });
// });


window.addEventListener("load", function () {
    console.log("Collapsible script loaded!");

    const collapsibles = document.querySelectorAll(".collapsible");
    console.log(`Found ${collapsibles.length} collapsible buttons`);

    collapsibles.forEach(button => {
        console.log("Collapsible button found:", button);

        button.addEventListener("click", function () {
            console.log("Collapsible button CLICKED");
            this.classList.toggle("active");
            const content = this.nextElementSibling;

            if (content) {
                console.log("Content found:", content);
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            } else {
                console.log("No content found for:", button);
            }
        });
    });
});
