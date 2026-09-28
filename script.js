const pulsanteMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu-principale");

if (pulsanteMenu && menu) {
  pulsanteMenu.addEventListener("click", () => {
    const aperto = menu.classList.toggle("aperto");

    pulsanteMenu.classList.toggle("aperto", aperto);
    pulsanteMenu.setAttribute("aria-expanded", String(aperto));
    pulsanteMenu.setAttribute(
      "aria-label",
      aperto ? "Chiudi il menu" : "Apri il menu",
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
      threshold: 0.12,
    },
  );

  sezioni.forEach((sezione) => {
    osservatore.observe(sezione);
  });
}

const caroselloRecensioni = document.querySelector(".carosello-recensioni");
const contenitoreRecensioni = document.querySelector(".griglia-recensioni");
const recensioni = document.querySelectorAll(".recensione-slide");

const frecciaPrecedente = document.querySelector(
  ".freccia-recensioni.precedente",
);

const frecciaSuccessiva = document.querySelector(
  ".freccia-recensioni.successiva",
);

const indicatoriRecensioni = document.querySelectorAll(
  ".indicatore-recensione",
);

if (
  caroselloRecensioni &&
  contenitoreRecensioni &&
  recensioni.length > 0 &&
  frecciaPrecedente &&
  frecciaSuccessiva
) {
  let recensioneAttiva = 0;
  let scorrimentoAutomatico;
  let posizioneInizialeTocco = 0;

  const movimentoRidotto = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const mostraRecensione = (indice) => {
    recensioneAttiva = (indice + recensioni.length) % recensioni.length;

    contenitoreRecensioni.style.transform = `translateX(-${
      recensioneAttiva * 100
    }%)`;

    recensioni.forEach((recensione, posizione) => {
      recensione.setAttribute(
        "aria-hidden",
        String(posizione !== recensioneAttiva),
      );
    });

    indicatoriRecensioni.forEach((indicatore, posizione) => {
      const attivo = posizione === recensioneAttiva;

      indicatore.classList.toggle("attivo", attivo);
      indicatore.setAttribute("aria-current", String(attivo));
    });
  };

  const fermaScorrimentoAutomatico = () => {
    window.clearInterval(scorrimentoAutomatico);
  };

  const avviaScorrimentoAutomatico = () => {
    fermaScorrimentoAutomatico();

    if (!movimentoRidotto) {
      scorrimentoAutomatico = window.setInterval(() => {
        mostraRecensione(recensioneAttiva + 1);
      }, 7000);
    }
  };

  const cambiaRecensione = (direzione) => {
    mostraRecensione(recensioneAttiva + direzione);
    avviaScorrimentoAutomatico();
  };

  frecciaPrecedente.addEventListener("click", () => {
    cambiaRecensione(-1);
  });

  frecciaSuccessiva.addEventListener("click", () => {
    cambiaRecensione(1);
  });

  indicatoriRecensioni.forEach((indicatore) => {
    indicatore.addEventListener("click", () => {
      mostraRecensione(Number(indicatore.dataset.indice));
      avviaScorrimentoAutomatico();
    });
  });

  caroselloRecensioni.setAttribute("tabindex", "0");

  caroselloRecensioni.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      cambiaRecensione(-1);
    }

    if (evento.key === "ArrowRight") {
      evento.preventDefault();
      cambiaRecensione(1);
    }
  });

  caroselloRecensioni.addEventListener(
    "mouseenter",
    fermaScorrimentoAutomatico,
  );

  caroselloRecensioni.addEventListener(
    "mouseleave",
    avviaScorrimentoAutomatico,
  );

  caroselloRecensioni.addEventListener("focusin", fermaScorrimentoAutomatico);

  caroselloRecensioni.addEventListener("focusout", avviaScorrimentoAutomatico);

  caroselloRecensioni.addEventListener(
    "touchstart",
    (evento) => {
      posizioneInizialeTocco = evento.changedTouches[0].clientX;
      fermaScorrimentoAutomatico();
    },
    {
      passive: true,
    },
  );

  caroselloRecensioni.addEventListener(
    "touchend",
    (evento) => {
      const posizioneFinaleTocco = evento.changedTouches[0].clientX;
      const distanza = posizioneFinaleTocco - posizioneInizialeTocco;

      if (Math.abs(distanza) > 45) {
        cambiaRecensione(distanza > 0 ? -1 : 1);
      } else {
        avviaScorrimentoAutomatico();
      }
    },
    {
      passive: true,
    },
  );

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      fermaScorrimentoAutomatico();
    } else {
      avviaScorrimentoAutomatico();
    }
  });

  mostraRecensione(0);
  avviaScorrimentoAutomatico();
}
