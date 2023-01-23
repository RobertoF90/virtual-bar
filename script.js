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
      stars.push("half");
      for (let i = 0; i < c.valutazione - 1; i++) {
        stars.unshift("⭐");
      }
    } else {
      for (let i = 0; i < c.valutazione; i++) {
        stars.unshift("⭐");
      }
    }

    const markup = `
        <div class="card">
                <div>
                  <picture><img src="" alt="Logo" /></picture>
                  <div>
                    <h3>${c.website}</h3>
                    <div>${stars.join("")}</div>
                  </div>
                </div>
                <div>
                  <ul>
                    ${
                      c.tipi
                        ? c.tipi.map((t) => `<li>icona ${t}</li>`).join("")
                        : "<li></li>"
                    }
             
                  </ul>
                </div>
                <div>
                  <ul>
                    <p>BONUS BENVENUTO</p>
                    <h4>${c.bonus}</h4>
                    <div>${c.bonusExtra}</div>
                  </ul>
                </div>
                <button class="btn card--btn">Visita Sito</button>
              </div>
        `;

    cardContainer.insertAdjacentHTML("afterbegin", markup);
    console.log(stars);
  });
};

init();
