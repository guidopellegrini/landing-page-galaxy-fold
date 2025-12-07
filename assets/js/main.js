/**
 * @file main.js
 * @description Archivo principal de JavaScript para la Landing Page de Galaxy Fold 4.
 * Contiene la lógica para el menú de navegación, scroll, cambio de tema y animaciones.
 */

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

/**
 * Acción para ocultar el menú de navegación en dispositivos móviles.
 * Elimina la clase 'show-menu' del menú de navegación cuando se hace clic en un enlace.
 * @returns {void} No retorna ningún valor.
 */
function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // cuando hacemos click en nav__link, borramos la clase show-menu
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
/**
 * Cambia el estilo del encabezado (header) al hacer scroll.
 * Añade la clase 'scroll-header' si el desplazamiento vertical es mayor o igual a 50 píxeles.
 * @returns {void} No retorna ningún valor.
 */
function scrollHeader() {
  const header = document.getElementById("header");
  // Cuando el scroll sea mayor que 50 viewport height, agregamos la clase scroll-header al tag header
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SHOW SCROLL UP ===============*/
/**
 * Muestra u oculta el botón "scroll up" (volver arriba) basado en la posición de desplazamiento.
 * Añade la clase 'show-scroll' si el desplazamiento vertical es mayor o igual a 200 píxeles.
 * @returns {void} No retorna ningún valor.
 */
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // Cuando el scroll sea mayor que 200 viewport height, agregamos la clase show-scroll al tag a con la clase scroll-top
  if (this.scrollY >= 200) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*=============== THEME ===============*/
/**
 * Inicializa y gestiona la funcionalidad de cambio de tema (claro/oscuro).
 * Maneja la persistencia del tema seleccionado utilizando localStorage.
 * @returns {void} No retorna ningún valor.
 */
function changeTheme() {
  const themeButton = document.getElementById("theme-button");
  const themeIcon = document.getElementById("theme-button__icon");
  const lightTheme = "light-theme";
  const iconTheme = "ri-sun-fill";

  // Obtenemos el tema actual del storage
  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");

  /**
   * Obtiene el tema actual aplicado a la interfaz.
   * Verifica si el body tiene la clase 'light-theme'.
   * @returns {string} Retorna "light-theme" si la clase está presente, de lo contrario "dark-theme".
   */
  const getCurrentTheme = () => (document.body.classList.contains(lightTheme) ? "light-theme" : "dark-theme");

  /**
   * Obtiene el icono actual del botón de tema.
   * Verifica si el icono tiene la clase 'ri-sun-fill'.
   * @returns {string} Retorna "ri-sun-fill" si la clase está presente, de lo contrario "ri-moon-fill".
   */
  const getCurrentIcon = () => (themeIcon.classList.contains(iconTheme) ? "ri-sun-fill" : "ri-moon-fill");

  // Validamos si el usuario eligió un tema previamente
  if (selectedTheme) {
    // Si se cumple la validación, preguntamos cuál fue el problema para saber si activamos o desactivamos el dark theme
    document.body.classList[selectedTheme === "light-theme" ? "add" : "remove"](lightTheme);
    themeIcon.classList[selectedIcon === "ri-sun-fill" ? "add" : "remove"](iconTheme);
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

/**
 * Resalta el enlace del menú de navegación correspondiente a la sección visible en la ventana.
 * Itera sobre todas las secciones con ID y verifica si la posición actual de scroll cae dentro de la sección.
 * @returns {void} No retorna ningún valor.
 */
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
