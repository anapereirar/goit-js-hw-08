// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Descrito en la documentación
import SimpleLightbox from "simplelightbox";
// Importación adicional de estilos
import "simplelightbox/dist/simple-lightbox.min.css";

// new SimpleLightbox('.some-element a', { /* options */ });

const galleryContainer = document.querySelector(".gallery");

const galleryMarkup = galleryItems
  .map(
    (item) =>
      `<div class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      alt="${item.description}"
    />
  </a>
</div>`
  )
  .join("");

galleryContainer.insertAdjacentHTML("afterbegin", galleryMarkup);
galleryContainer.addEventListener("click", (event) => event.preventDefault());

//Uso de la librería SimpleLightbox
let gallery = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

console.log(galleryItems);
