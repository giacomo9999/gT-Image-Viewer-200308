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
let showOnlyLargerImages = false;

let bigImageSrc = "https://picsum.photos/id/12/300/200";
let bigImageWidth = "300px";
let bigImageHeight = "200px";

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

  if (showOnlyLargerImages) {
    console.log("Showing only big images...");
    images = images.filter(
      image =>
        Number(image.split("/")[5]) > 100 || Number(image.split("/")[6]) > 100
    );
  }

  bigImageHeight = bigImageSrc.split("/")[5] + "px";
  bigImageWidth = bigImageSrc.split("/")[6] + "px";
  console.log("buildImage--Big Image Stats: ", bigImageHeight, bigImageWidth);

  big_image.innerHTML = `<img src="${bigImageSrc +
    colorSetting}" width=${bigImageWidth + "px"} height=${bigImageHeight +
    "px"} class="big-image" alt="image description"/>`;

  images.forEach(image => {
    output += `<img src="${image +
      colorSetting}" alt="Image" class="image__item"/>`;
  });

  thumbnail_grid.innerHTML = output;
  console.log(thumbnail_grid);
};

const changeBigImage = e => {
  console.log("cBI Changing Image...", e.target.src);

  bigImageHeight = e.target.src.split("/")[5] + "px";
  bigImageWidth = e.target.src.split("/")[6] + "px";

  const image = big_image.children[0];

  if (e.target.src) {
    // image.src = e.target.src;
    big_image.children[0].src = e.target.src;

    // big_image.children[0].innerHTML = `<img src="${bigImageSrc}" width=${bigImageWidth} height=${bigImageHeight} class="big-image" alt="image description"/>`;
  }
};

// Set global variable and inner text for "Minimum Image Size"
const toggleMinImageSize = () => {
  showOnlyLargerImages = !showOnlyLargerImages;
  console.log(
    "'Show Only Big Images' setting toggled to",
    showOnlyLargerImages
  );
  showImages();
  showOnlyLargerImages === true
    ? (imageSizeToggler.innerHTML =
        "Displaying Thumbs Only For Images Larger Than 100x100")
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
