// Global Variables
const big_image = document.querySelector(".big-image-display");
const thumbnail_grid = document.querySelector(".thumbnail-grid");
const greyScaleToggler = document.querySelector(".greyscale-toggler");
const imageSizeToggler = document.querySelector(".image-size-toggler");

greyScaleToggler.innerHTML = "Toggle Greyscale: OFF";
imageSizeToggler.innerHTML = "Display ALL Images";

// HTML "loading"  message for thumbnail grid
const loading = `<h1 class="loader">Loading...</h1>`;

let greyScaleOn = false;
let showOnlyBigImages = false;

// Make GET request to server.js and call buildImageGallery function (which renders thumbnails to screen)
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

// Filter/modify thumbnail URLs for size and greyscale settings and
// create concatenated "output" string; assign "output" to innerHTML of thumbnail grid
const buildImageGallery = images => {
  let output = "";
  let colorSetting = greyScaleOn === true ? "?grayscale" : "";

  if (showOnlyBigImages) {
    console.log("Showing only big images...");
    images = images.filter(
      image =>
        Number(image.split("/")[5]) > 100 || Number(image.split("/")[6]) > 100
    );
  }

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

// Set global variable and inner text for "Minimum Image Size"
const toggleMinImageSize = () => {
  showOnlyBigImages = !showOnlyBigImages;
  console.log("'Show Only Big Images' setting toggled to", showOnlyBigImages);
  showImages();
  showOnlyBigImages === true
    ? (imageSizeToggler.innerHTML =
        "Displaying Only Images Larger Than 100x100")
    : (imageSizeToggler.innerHTML = "Displaying ALL Images");
};

// Set global variable and inner text for "Is Greyscale On?"
const toggleGreyscale = () => {
  greyScaleOn = !greyScaleOn;
  console.log("Greyscale setting toggled to", greyScaleOn);
  showImages();
  greyScaleOn === true
    ? (greyScaleToggler.innerHTML = "Display in Greyscale: ON")
    : (greyScaleToggler.innerHTML = "Display in Greyscale: OFF");
};

// Event Listeners
document.addEventListener("DOMContentLoaded", showImages);
thumbnail_grid.addEventListener("click", changeBigImage);
greyScaleToggler.addEventListener("click", toggleGreyscale);
imageSizeToggler.addEventListener("click", toggleMinImageSize);
