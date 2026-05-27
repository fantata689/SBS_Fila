document.addEventListener("DOMContentLoaded", () => {
    const modalContainer = document.querySelector(".modal_container");
    const modal = modalContainer?.querySelector(".modal");
    const closeButton = modalContainer?.querySelector(".close_btn");
    const modalImage = modalContainer?.querySelector(".image_section img");
    const shopItems = document.querySelectorAll(".information3_section .slide_container > li");

    if (!modalContainer || !modal || !closeButton) {
        return;
    }

    const openModal = (image) => {
        if (image && modalImage) {
            modalImage.src = image.src;
            modalImage.alt = image.alt;
        }

        modalContainer.classList.add("active");
        modalContainer.setAttribute("aria-hidden", "false");
    };

    const closeModal = () => {
        modalContainer.classList.remove("active");
        modalContainer.setAttribute("aria-hidden", "true");
    };

    shopItems.forEach((item) => {
        item.addEventListener("click", () => {
            openModal(item.querySelector("img"));
        });
    });

    closeButton.addEventListener("click", closeModal);

    modalContainer.addEventListener("click", (event) => {
        if (event.target === modalContainer) {
            closeModal();
        }
    });
});
