const cardContainer = document.querySelector(".card__container");
const reviewsContainer = document.querySelector(".recensioni__container");

let cards = [];
let reviews = [];

async function getData() {
  const res = await fetch("./src/data/data.json");
  const data = await res.json();
  Object.values(data).forEach((p) => cards.push(p));
  cards.reverse();
}

async function getReviews() {
  const res = await fetch("./src/data/reviews.json");
  const data = await res.json();
  Object.values(data).forEach((r) => reviews.push(r));
  reviews.reverse();
  console.log(reviews);
}

const init = async function () {
  await getData();
  await getReviews();
  generateMarkup();
  generateReviewsMarkup();
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
                   <button class="btn card--btn">Riscuoti il bonus</button>
                </a>
             </div>
        `;

    cardContainer.insertAdjacentHTML("afterbegin", markup);
  });
};

const generateReviewsMarkup = () => {
  reviews.forEach((r) => {
    const markup = ` <div class="card card--recensioni">
    <div class="card__container card__logo">
      <picture
        ><img src="${r.logo}" alt="Logo"
      /></picture>
      <h3>${r.name}</h3>
    </div>
    <ul class="card__container">
    ${r.reviews
      .map((review) => `<li><i class="fa-solid fa-star"></i>${review}</li>`)
      .join("")}
    </ul>

    </div>
    
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${
      r.video
    }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `;

    reviewsContainer.insertAdjacentHTML("afterbegin", markup);
  });
};

init();
