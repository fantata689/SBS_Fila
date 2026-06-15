const pageItems = document.querySelectorAll(".number > ul > li");

pageItems.forEach((item) => {
    item.addEventListener("click", (event) => {
        event.preventDefault();

        pageItems.forEach((pageItem) => {
            pageItem.classList.remove("active");
            pageItem.querySelector("a")?.classList.remove("number1");
        });

        item.classList.add("active");
    });
});
