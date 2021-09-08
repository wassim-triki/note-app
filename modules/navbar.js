export const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".toggle-btn");

export function determineNavState() {
  if (navToggle.classList.contains("close-nav")) {
    navbar.classList.remove("slide-in");
    navToggle.classList.remove("close-nav");
  } else {
    navbar.classList.add("slide-in");
    navToggle.classList.add("close-nav");
  }
}

export const navbarToggle = () => {
  navToggle.addEventListener("click", determineNavState);
};
