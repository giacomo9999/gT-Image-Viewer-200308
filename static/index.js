const image_gallery = document.querySelector(".image--container");
const image_container = document.querySelector(".image--selection");
const loading = `<h1 class="loader">Loading...</h1>`;

const showImages = () => {
  if (image_container.children.length === 0) {
    image_container.innerHTML = loading;
  }
  axios
    .get("http://localhost:3000/data")
    .then(imageUrlArray => {
      createImageGallery(imageUrlArray.data);
    })
    .catch(error => console.error(error));
};

const createImageGallery = images => {
  let output = "";
  image_gallery.innerHTML = `<img src="${images[0]}" class="animate-entrance image--gallery" alt="image description">`;
  setTimeout(() => {
    image_gallery.children[0].classList.remove("animate-entrance");
  }, 2000);
  images.forEach(image => {
    output += `<img src="${image}" alt="Image" class="image__item"/>`;
  });
  image_container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showImages);
