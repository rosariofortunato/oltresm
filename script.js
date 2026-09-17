document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.classList.add("js");

  const sezioni = document.querySelectorAll(".osserva");

  if (!("IntersectionObserver" in window)) {
    sezioni.forEach(function (sezione) {
      sezione.classList.add("visibile");
    });

    return;
  }

  const osservatore = new IntersectionObserver(
    function (elementi) {
      elementi.forEach(function (elemento) {
        if (elemento.isIntersecting) {
          elemento.target.classList.add("visibile");
          osservatore.unobserve(elemento.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  sezioni.forEach(function (sezione) {
    osservatore.observe(sezione);
  });
});
