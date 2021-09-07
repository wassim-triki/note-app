export const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".fa-bars");
const navShrink = document.querySelector(".close-nav");
export const navbarToggle = () => {
  navToggle.addEventListener("click", () => {
    navbar.classList.add("slide-in");
  });
  navShrink.addEventListener("click", () => {
    navbar.classList.remove("slide-in");
  });
};
