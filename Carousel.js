import * as bootstrap from "bootstrap";
import { favourite } from "./index.js";

export function createCarouselItem(imgSrc, breed) {
  const template = document.querySelector("#carouselItemTemplate");
  const clone = template.content.firstElementChild.cloneNode(true);
  const infoDump = document.getElementById("infoDump");

  const img = clone.querySelector("img");
  img.src = imgSrc;
  img.alt = breed.name;

  const title = clone.querySelector(".card-title");
  title.textContent = breed.name;

  const description = clone.querySelector(".card-text");
  description.textContent = breed.description;

  clone.querySelector("#origin").innerHTML = `<strong>Origin:</strong> ${breed.origin}`;
  clone.querySelector("#temperament").innerHTML = `<strong>Temperament:</strong> ${breed.temperament}`;
  clone.querySelector("#life-span").innerHTML = `<strong>Life span:</strong> ${breed.life_span}`;
  const favBtn = clone.querySelector(".favourite-button");
  let togglefavouriteColor = true;
  favBtn.addEventListener("click", () => {
    favourite(breed.id);
    togglefavouriteColor = !togglefavouriteColor;
    favBtn.style.color = togglefavouriteColor ? "lightpink" : "red";
  });

  clone.addEventListener("mouseover", () => {
    infoDump.innerHTML = '';
    infoDump.innerHTML = `
    <h2>Extra Information:</h2>
    <h3>${breed.name}</h3>
    <p>${breed.description}</p>
    <iframe src="${breed.wikipedia_url}" title="${breed.name}"></iframe>
    `;
  });

  return clone;
}

export function clear() {
  const carousel = document.querySelector("#carouselInner");
  while (carousel.firstChild) {
    carousel.removeChild(carousel.firstChild);
  }
}

export function appendCarousel(element) {
  const carousel = document.querySelector("#carouselInner");

  const activeItem = document.querySelector(".carousel-item.active");
  if (!activeItem) element.classList.add("active");

  carousel.appendChild(element);
}

export function start() {
  const multipleCardCarousel = document.querySelector(
    "#carouselExampleControls"
  );
  if (window.matchMedia("(min-width: 768px)").matches) {
    const carousel = new bootstrap.Carousel(multipleCardCarousel, {
      interval: false
    });
    const carouselWidth = $(".carousel-inner")[0].scrollWidth;
    const cardWidth = $(".carousel-item").width();
    let scrollPosition = 0;
    $("#carouselExampleControls .carousel-control-next").unbind();
    $("#carouselExampleControls .carousel-control-next").on(
      "click",
      function () {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
          scrollPosition += cardWidth;
          $("#carouselExampleControls .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      }
    );
    $("#carouselExampleControls .carousel-control-prev").unbind();
    $("#carouselExampleControls .carousel-control-prev").on(
      "click",
      function () {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth;
          $("#carouselExampleControls .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      }
    );
  } else {
    $(multipleCardCarousel).addClass("slide");
  }
}