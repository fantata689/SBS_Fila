const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
    const head = accordion.querySelector(".head");

    if (!head) {
        return;
    }

    head.addEventListener("click", () => {
        accordion.classList.toggle("active");
    });
});

const sizeButtons = document.querySelectorAll(".accordion.size > .body > button");

sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        sizeButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");
    });
});
