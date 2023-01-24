const cardContainer = document.querySelector(".card__container");

let cards = [];

async function getData() {
  const res = await fetch("./src/data/data.json");
  const data = await res.json();
  Object.values(data).forEach((p) => cards.push(p));
  cards.reverse();
}

const init = async function () {
  await getData();
  generateMarkup();
};

const generateMarkup = () => {
  cards.forEach((c) => {
    let stars = [];
    if (c.valutazione.split("").length > 1) {
      stars.push("<i class='fa-solid fa-star-half'></i>");
      for (let i = 0; i < c.valutazione - 1; i++) {
        stars.unshift("<i class='fa-solid fa-star'></i>");
      }
    } else {
      for (let i = 0; i < c.valutazione; i++) {
        stars.unshift("<i class='fa-solid fa-star'></i>");
      }
    }

    let tipi = {
      Calcio: '<i class="fa-regular fa-futbol"></i>',
      Cani: '<i class="fa-solid fa-dog"></i>',
      CaniReali: '<i class="fa-solid fa-dog"></i>',
      Cavalli: '<i class="fa-solid fa-horse"></i>',
    };

    const markup = `
        <div class="card card--comparazioni">
                <div class="card__container">
                  <picture><img src="${c.logo}" alt="Logo" /></picture>
                    <h3>${c.website}</h3>
                    <div>${stars.join("")}</div>
                </div>
                  <ul class="card__container">
                    ${
                      c.tipi
                        ? c.tipi
                            .map(
                              (t) =>
                                `<li class="card__element"> ${tipi[t]} ${t}</li>`
                            )
                            .join("")
                        : "<li></li>"
                    }
             
                  </ul>
                  <ul class="card__container">
                    <p>BONUS BENVENUTO</p>
                    <h4>${c.bonus}</h4>
                    <div>${c.bonusExtra}</div>
                  </ul>
                <a href="${c.link}" target="_blank">
                   <button class="btn card--btn">Visita Sito</button>
                </a>
             </div>
        `;

    cardContainer.insertAdjacentHTML("afterbegin", markup);
    console.log(stars);
  });
};

init();
