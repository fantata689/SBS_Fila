const heroSection = document.querySelector(".hero_section");

if (heroSection) {
    const heroVideo = heroSection.querySelector("video");
    const heroSource = heroVideo?.querySelector("source");
    const heroImage = heroSection.querySelector(".hero_image");
    const prevButton = heroSection.querySelector(".hero_arrow.prev");
    const nextButton = heroSection.querySelector(".hero_arrow.next");
    const pagination = heroSection.querySelector(".hero_pagination");

    if (heroVideo && heroSource && heroImage && prevButton && nextButton && pagination) {
        const heroSlides = [
            {
                type: "video",
                src: "//www.fila.co.kr/cdn/shop/videos/c/vp/40ed1433d6f740edae9171f7a3066c3a/40ed1433d6f740edae9171f7a3066c3a.HD-1080p-7.2Mbps-83835070.mp4?v=0",
                poster: "//www.fila.co.kr/cdn/shop/files/preview_images/40ed1433d6f740edae9171f7a3066c3a.thumbnail.0000000000_1100x.jpg?v=1778488149"
            },
            {
                type: "video",
                src: "//www.fila.co.kr/cdn/shop/videos/c/vp/ea83f4b6065045a980dc43953e0665cc/ea83f4b6065045a980dc43953e0665cc.HD-1080p-7.2Mbps-82823302.mp4?v=0",
                poster: ""
            },
            {
                type: "image",
                src: "//www.fila.co.kr/cdn/shop/files/01_22.png?v=1776674301&width=2000"
            }
        ];
        let activeHeroIndex = 0;
        let imageTimerId;

        const updateHeroPagination = () => {
            pagination.querySelectorAll("button").forEach((button, index) => {
                button.classList.toggle("active", index === activeHeroIndex);
            });
        };

        const showHeroSlide = (nextIndex) => {
            clearTimeout(imageTimerId);
            activeHeroIndex = (nextIndex + heroSlides.length) % heroSlides.length;
            const slide = heroSlides[activeHeroIndex];

            // Start fade out for both
            heroVideo.classList.add("fade");
            heroImage.classList.add("fade");

            setTimeout(() => {
                if (slide.type === "video") {
                    heroImage.style.display = "none";
                    heroVideo.style.display = "block";
                    heroSource.src = slide.src;
                    heroVideo.poster = slide.poster || "";
                    heroVideo.loop = false; // Ensure video doesn't loop so 'ended' fires
                    heroVideo.load();
                    
                    heroVideo.oncanplay = () => {
                        heroVideo.play().catch(() => {});
                        heroVideo.classList.remove("fade");
                        heroVideo.oncanplay = null;
                    };
                } else {
                    heroVideo.style.display = "none";
                    heroVideo.pause();
                    heroImage.style.display = "block";
                    heroImage.src = slide.src;
                    
                    heroImage.onload = () => {
                        heroImage.classList.remove("fade");
                        // Image slides stay for 5 seconds then move next (loops to 0 if last)
                        imageTimerId = setTimeout(() => {
                            showHeroSlide(activeHeroIndex + 1);
                        }, 5000);
                        heroImage.onload = null;
                    };
                }
            }, 500);

            updateHeroPagination();
        };

        // Auto-advance when video ends
        heroVideo.addEventListener("ended", () => {
            showHeroSlide(activeHeroIndex + 1);
        });

        // Initialize pagination but remove the 5s interval timer
        heroSlides.forEach((_, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.setAttribute("aria-label", `${index + 1}번째 영상 보기`);
            button.addEventListener("click", () => {
                showHeroSlide(index);
            });

            pagination.append(button);
        });

        prevButton.addEventListener("click", () => {
            showHeroSlide(activeHeroIndex - 1);
        });

        nextButton.addEventListener("click", () => {
            showHeroSlide(activeHeroIndex + 1);
        });

        updateHeroPagination();
        // restartHeroTimer() removed to favor video 'ended' event

    }
}

const trendingSection = document.querySelector(".trending_section");

if (trendingSection) {
    const categoryItems = trendingSection.querySelectorAll("div > ul > li");
    const productLists = Array.from(trendingSection.children).filter((child) => child.tagName === "UL");
    const prevBtn = trendingSection.querySelector(".arrow_button_container .arrow_button:first-child");
    const nextBtn = trendingSection.querySelector(".arrow_button_container .arrow_button:last-child");

    let activeIndex = 0;

    const showProductList = (index) => {
        activeIndex = (index + categoryItems.length) % categoryItems.length;

        categoryItems.forEach((item, i) => {
            const isActive = i === activeIndex;
            const button = item.querySelector("button");

            item.classList.toggle("active", isActive);

            if (button) {
                button.setAttribute("aria-pressed", String(isActive));
            }
        });

        productLists.forEach((list, i) => {
            list.classList.toggle("active", i === activeIndex);
        });
    };

    categoryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            showProductList(index);
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            showProductList(activeIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            showProductList(activeIndex + 1);
        });
    }

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
const information3Container = document.querySelector(".information3_section .slide_container");

if (information3Items.length > 0 && information3Section && information3Container) {
    // 순차적 등장을 위한 인덱스 설정
    information3Items.forEach((item, index) => {
        item.style.setProperty("--item-index", index);
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    information3Container.classList.add("is-visible");
                    // 한 번 등장하면 관찰 중지 (선택 사항)
                    // observer.unobserve(entry.target);
                } else {
                    information3Container.classList.remove("is-visible");
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(information3Section);
    } else {
        information3Container.classList.add("is-visible");
    }
}

