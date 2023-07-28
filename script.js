$(() => {
    let accordion_state = false;
    async function fetchData(url) {
        const req = await fetch(url);
        return req.json();
    }
    const factList = $(".factItem");
    factsNumbering();
    invertedItem();
    factList.each(async (_, item) => {
        $(item).click(function () {
            accordionControl(item);
            if (accordion_state && !$(item).hasClass("fetched")) catsFetch(item)
        });
    });
    function factsNumbering() {
        $(".factNumber").each(function (i, item) {
            $(item).html((i + 1).toString().padStart(2, '0'));
        });
    };

    function accordionControl(item) {
        const accordion = $(item).find(".accordion__content")
        if (accordion.hasClass("accordion__open")) {
            accordion_state = false
            $(item).find(".factIcon i").attr("class", "fa-solid fa-plus");
            accordion.removeClass("accordion__open");
        } else {
            accordion_state = true
            $('.accordion__content').removeClass('accordion__open');
            $(".factIcon i").attr("class", "fa-solid fa-plus");
            $(item).find(".factIcon i").attr("class", "fa-solid fa-minus");
            accordion.addClass("accordion__open");
        }
    };

    async function catsFetch(item) {
        const { fact } = await fetchData("https://catfact.ninja/fact");
        const img = await fetchData("https://api.thecatapi.com/v1/images/search");
        const accordion_text = $(item).find(".accordion__content__desc > p");
        const accordion_img = $(item).find(".accordion__content__img");
        $(item).addClass("fetched");
        accordion_text.html(fact);
        accordion_img.attr("src", img[0].url);
        accordion_img[0].onload = () => {
            accordion_img.next().addClass("d-none");
            accordion_img.removeClass("d-none");
        }
    }

    function invertedItem() {
        factList.eq(-1).hover(function () {
            $(".logo__container").removeClass("inverted");
            $(".logo__container").find("img:last-child").removeClass("d-none");
            $(".logo__container").find("img:first-child").addClass("d-none");
        }, function () {
            $(".logo__container").addClass("inverted");
            $(".logo__container").find("img:last-child").addClass("d-none");
            $(".logo__container").find("img:first-child").removeClass("d-none");
        });
    }

})
