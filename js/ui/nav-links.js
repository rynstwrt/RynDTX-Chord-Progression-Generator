const links = document.querySelectorAll("nav a");
let activeLink = document.querySelector(".active");


for (let link of links)
{
    link.addEventListener("click", () =>
    {
        if (link === activeLink)
            return;

        activeLink.classList.remove("active");

        activeLink = link;
        activeLink.classList.add("active");
    });
}