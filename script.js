const pulsanteMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principale");

if (pulsanteMenu && menu) {
  pulsanteMenu.addEventListener("click", () => {
    const aperto = menu.classList.toggle("aperto");

    pulsanteMenu.classList.toggle("aperto", aperto);
    pulsanteMenu.setAttribute("aria-expanded", String(aperto));
    pulsanteMenu.setAttribute(
      "aria-label",
      aperto ? "Chiudi il menu" : "Apri il menu"
    );
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("aperto");
      pulsanteMenu.classList.remove("aperto");
      pulsanteMenu.setAttribute("aria-expanded", "false");
      pulsanteMenu.setAttribute("aria-label", "Apri il menu");
    });
  });
}

const sezioni = document.querySelectorAll(".osserva");

if ("IntersectionObserver" in window) {
  document.body.classList.add("animazioni-attive");

  const osservatore = new IntersectionObserver(
    (elementi, observer) => {
      elementi.forEach((elemento) => {
        if (elemento.isIntersecting) {
          elemento.target.classList.add("visibile");
          observer.unobserve(elemento.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  sezioni.forEach((sezione) => {
    osservatore.observe(sezione);
  });
}
