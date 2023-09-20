const SCROLL_THRESHOLD = 400;

const links = document.querySelectorAll("nav a");

const generatorSection = document.querySelector("section#generator");
const settingsSection = document.querySelector("section#settings");
const aboutSection = document.querySelector("section#about");


let activeLink = document.querySelector(".active");


function setActiveLink(link)
{
    activeLink.classList.remove("active");

    activeLink = link;
    activeLink.classList.add("active");
}


for (let link of links)
{
    link.addEventListener("click", () =>
    {
        if (activeLink !== link)
            setActiveLink(link);
    });
}


function checkIfElementVisible(el, threshold=0)
{
    const rect = el.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

    const above = rect.bottom - threshold < 0;
    const below = rect.top - viewHeight + threshold >= 0;

    return !above && !below;
}


document.addEventListener("scroll", event =>
{
    if (checkIfElementVisible(aboutSection, SCROLL_THRESHOLD))
    {
        const link = links[2];
        if (activeLink !== link)
            setActiveLink(link);
    }
    else if (checkIfElementVisible(settingsSection, SCROLL_THRESHOLD))
    {
        const link = links[1];
        if (activeLink !== link)
            setActiveLink(link);
    }
    else if (checkIfElementVisible(generatorSection, SCROLL_THRESHOLD))
    {
        const link = links[0];
        if (activeLink !== link)
            setActiveLink(link);
    }
});
