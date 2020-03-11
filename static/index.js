const big_image = document.querySelector(".big-image-display");
const thumbnail_grid = document.querySelector(".thumbnail-grid");
const greyScaleToggler = document.querySelector(".greyscale-toggler");
greyScaleToggler.innerHTML = "Toggle Greyscale: OFF";
const loading = `<h1 class="loader">Loading...</h1>`;
let greyScaleOn = false;

const showImages = () => {
  if (thumbnail_grid.children.length === 0) {
    thumbnail_grid.innerHTML = loading;
  }
  axios
    .get("http://localhost:3000/data")
    .then(imageUrlArray => {
      buildImageGallery(imageUrlArray.data);
    })
    .catch(error => console.error(error));
};

const buildImageGallery = images => {
  let output = "";
  let colorSetting = greyScaleOn === true ? "?grayscale" : "";
  big_image.innerHTML = `<img src="${images[0] +
    colorSetting}" class="big-image" alt="image description">`;
  images.forEach(image => {
    output += `<img src="${image +
      colorSetting}" alt="Image" class="image__item"/>`;
  });
  thumbnail_grid.innerHTML = output;
  console.log(thumbnail_grid);
};

const changeBigImage = e => {
  console.log("Changing Image...", e.target.src);
  const image = big_image.children[0];
  if (e.target.src) {
    image.src = e.target.src;
  }
};

const toggleGreyscale = () => {
  greyScaleOn = !greyScaleOn;
  console.log("Greyscale setting toggled to", greyScaleOn);
  showImages();
  greyScaleOn === true
    ? (greyScaleToggler.innerHTML = "Toggle Greyscale: ON")
    : (greyScaleToggler.innerHTML = "Toggle Greyscale: OFF");
};

document.addEventListener("DOMContentLoaded", showImages);
thumbnail_grid.addEventListener("click", changeBigImage);
greyScaleToggler.addEventListener("click", toggleGreyscale);
