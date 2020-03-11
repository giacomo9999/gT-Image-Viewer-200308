const big_image = document.querySelector(".big-image-display");
const thumbnail_grid = document.querySelector(".thumbnail-grid");
const loading = `<h1 class="loader">Loading...</h1>`;

const showImages = () => {
  if (thumbnail_grid.children.length === 0) {
    thumbnail_grid.innerHTML = loading;
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
  let graySource = images[0] + "?grayscale";
  big_image.innerHTML = `<img src="${graySource}" class="big-image" alt="image description">`;
  images.forEach(image => {
    output += `<img src="${image}" alt="Image" class="image__item"/>`;
  });
  thumbnail_grid.innerHTML = output;
};

const changeBigImage = e => {
  console.log("Changing Image...", e.target.src);
  const image = big_image.children[0];
  if (e.target.src) {
    image.src = e.target.src;
  }
};

document.addEventListener("DOMContentLoaded", showImages);
thumbnail_grid.addEventListener("click", changeBigImage);
