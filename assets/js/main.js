/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* validamos si la constante existe */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* validamos si la constante existe */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // cuando hacemos click en nav__link, borramos la clase show-menu
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // Cuando el scroll sea mayor que 50 viewport height, agregamos la clase scroll-header al tag header
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // Cuando el scroll sea mayor que 200 viewport height, agregamos la clase show-scroll al tag a con la clase scroll-top
  if (this.scrollY >= 200) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*=============== THEME ===============*/
function changeTheme() {
  const themeButton = document.getElementById("theme-button");
  const themeIcon = document.getElementById("theme-button__icon");
  const lightTheme = "light-theme";
  const iconTheme = "ri-sun-fill";

  // Obtenemos el tema actual del storage
  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");

  // Obtenemos el tema actual que tiene la interfaz validando la clase dark-theme
  const getCurrentTheme = () => (document.body.classList.contains(lightTheme) ? "light-theme" : "dark-theme");
  const getCurrentIcon = () => (themeIcon.classList.contains(iconTheme) ? "ri-sun-fill" : "ri-moon-fill");

  // Validamos si el usuario eligió un tema previamente
  if (selectedTheme) {
    // Si se cumple la validación, preguntamos cuál fue el problema para saber si activamos o desactivamos el dark theme
    document.body.classList[selectedTheme === "light-theme" ? "add" : "remove"](lightTheme);
    themeIcon.classList[selectedIcon === "ri-sun-fill" ? "add" : "remove"](iconTheme);
  } else {
    // Si no hay tema seleccionado (primera visita), establecemos el tema claro por defecto
    document.body.classList.add(lightTheme);
    themeIcon.classList.add(iconTheme);
    // Aseguramos que el ícono de luna no esté presente si estamos estableciendo el sol por defecto
    themeIcon.classList.remove("ri-moon-fill"); // Aunque iconTheme es ri-sun-fill, es bueno ser explícito.
    localStorage.setItem("selected-theme", "light-theme");
    localStorage.setItem("selected-icon", "ri-sun-fill");
  }

  // Activamos / desactivamos el tema manualmente con el botón
  themeButton.addEventListener("click", () => {
    // Agregamos o quitamos el dark / icon theme
    document.body.classList.toggle(lightTheme);
    themeIcon.classList.toggle(iconTheme);

    // Guardamos el tema y el icono actual que eligió el usuario
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  });
}

changeTheme();

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  distance: "60px",
  duration: 1000,
  delay: 0,
  reset: false,
});

sr.reveal(`.home__header, .section__title`, { delay: 600 });
sr.reveal(`.home__footer`, { delay: 700 });
sr.reveal(`.home__img`, { delay: 900, origin: "top" });

sr.reveal(`.sponsor__img, .products__card, .footer__logo, .footer__content, .footer__copy`, {
  origin: "top",
  interval: 100,
});
sr.reveal(`.specs__data, .gaming__animate`, { origin: "left", interval: 100 });
sr.reveal(`.specs__img, .gaming__img`, { origin: "right" });
sr.reveal(`.case__img`, { origin: "top" });
sr.reveal(`.case__data`);
