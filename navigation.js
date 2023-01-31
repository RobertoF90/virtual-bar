const navBtn = document.querySelector(".nav__mobile");
const navLinksContainer = document.querySelector(".nav__links");
const overlay = document.querySelector(".overlay");

const navLinks = document.querySelectorAll(".nav__links--link");

navLinks.forEach((l) => l.addEventListener("click", scrollTo));

function scrollTo(e) {
  e.preventDefault();
  document
    .querySelector(`.section__${e.target.dataset.id}`)
    .scrollIntoView({ behavior: "smooth" });
  navigation();
}

const navigation = (e) => {
  navLinksContainer.classList.toggle("active");
  overlay.classList.toggle("hidden");
};

overlay.addEventListener("click", navigation);

navBtn.addEventListener("click", navigation);
