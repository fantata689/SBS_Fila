const heroSection = document.querySelector(".hero_section");

if (heroSection) {
    const heroVideo = heroSection.querySelector("video");
    const heroSource = heroVideo?.querySelector("source");
    const prevButton = heroSection.querySelector(".hero_arrow.prev");
    const nextButton = heroSection.querySelector(".hero_arrow.next");
    const pagination = heroSection.querySelector(".hero_pagination");

    if (heroVideo && heroSource && prevButton && nextButton && pagination) {
        const currentVideo = {
            src: heroSource.getAttribute("src"),
            poster: heroVideo.getAttribute("poster"),
        };
        const heroSlides = [
            currentVideo,
            {
                ...currentVideo,
                poster: "image/fila.webp",
            },
            {
                ...currentVideo,
                poster: "image/fila2.webp",
            },
        ];
        let activeHeroIndex = 0;
        let heroTimerId;

        const updateHeroPagination = () => {
            pagination.querySelectorAll("button").forEach((button, index) => {
                button.classList.toggle("active", index === activeHeroIndex);
            });
        };

        const showHeroSlide = (nextIndex) => {
            activeHeroIndex = (nextIndex + heroSlides.length) % heroSlides.length;
            const slide = heroSlides[activeHeroIndex];

            heroVideo.classList.add("fade");

            window.setTimeout(() => {
                heroSource.src = slide.src;
                heroVideo.poster = slide.poster;
                heroVideo.load();
                heroVideo.play().catch(() => {});
                heroVideo.classList.remove("fade");
            }, 200);

            updateHeroPagination();
        };

        const restartHeroTimer = () => {
            window.clearInterval(heroTimerId);
            heroTimerId = window.setInterval(() => {
                showHeroSlide(activeHeroIndex + 1);
            }, 5000);
        };

        heroSlides.forEach((_, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.setAttribute("aria-label", `${index + 1}번째 영상 보기`);
            button.addEventListener("click", () => {
                showHeroSlide(index);
                restartHeroTimer();
            });

            pagination.append(button);
        });

        prevButton.addEventListener("click", () => {
            showHeroSlide(activeHeroIndex - 1);
            restartHeroTimer();
        });

        nextButton.addEventListener("click", () => {
            showHeroSlide(activeHeroIndex + 1);
            restartHeroTimer();
        });

        updateHeroPagination();
        restartHeroTimer();
    }
}

const trendingSection = document.querySelector(".trending_section");

if (trendingSection) {
    const categoryItems = trendingSection.querySelectorAll("div > ul > li");
    const productLists = Array.from(trendingSection.children).filter((child) => child.tagName === "UL");

    const showProductList = (activeIndex) => {
        categoryItems.forEach((item, index) => {
            const isActive = index === activeIndex;
            const button = item.querySelector("button");

            item.classList.toggle("active", isActive);

            if (button) {
                button.setAttribute("aria-pressed", String(isActive));
            }
        });

        productLists.forEach((list, index) => {
            list.classList.toggle("active", index === activeIndex);
        });
    };

    categoryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            showProductList(index);
        });
    });

    showProductList(0);
}

const information3Button = document.querySelector(".information3_section > button");

if (information3Button) {
    const showInformation3Button = () => {
        information3Button.classList.add("is-visible");
    };

    const hideInformation3Button = () => {
        information3Button.classList.remove("is-visible");
    };

    if ("IntersectionObserver" in window) {
        const information3ButtonObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    showInformation3Button();
                } else {
                    hideInformation3Button();
                }
            });
        }, {
            threshold: 0.4,
        });

        information3ButtonObserver.observe(information3Button);
    } else {
        showInformation3Button();
    }
}

const information3Items = document.querySelectorAll(".information3_section .slide_container > li");
const information3Section = document.querySelector(".information3_section");

if (information3Items.length > 0 && information3Section) {
    information3Items.forEach((item, index) => {
        item.style.setProperty("--item-index", index);
    });

    const showInformation3Items = () => {
        information3Items.forEach((item) => {
            item.classList.add("is-visible");
        });
    };

    const hideInformation3Items = () => {
        information3Items.forEach((item) => {
            item.classList.remove("is-visible");
        });
    };

    if ("IntersectionObserver" in window) {
        const information3ItemObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    showInformation3Items();
                } else {
                    hideInformation3Items();
                }
            });
        }, {
            threshold: 0.2,
        });

        information3ItemObserver.observe(information3Section);
    } else {
        showInformation3Items();
    }
}
