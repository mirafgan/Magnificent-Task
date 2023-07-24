async function fetchData(url) {
    const req = await fetch(url);
    return req.json();
}
const factList = $(".factList div.factDesription");
factList.each(async (i, item) => {
    const { fact } = await fetchData("https://catfact.ninja/fact")
    $(item).append(": " + `<span>${fact}</span>`)
})