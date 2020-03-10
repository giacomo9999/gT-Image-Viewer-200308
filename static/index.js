console.log("Index.js here....");

const image_gallery = document.querySelector("image--container");
const image_container = document.querySelector(".image--selection");
const loading = `<h1 class="loader">Loading...</h1>`;

const showImages = () => {
  if (image_container.children.length === 0) {
    image_container.innerHTML = loading;
  }
  axios
    .get("http://localhost:3000/data")
    .then(imageUrlArray => {
      console.log("Data in...", imageUrlArray.data);
      createImageGallery(imageUrlArray.data);
    })
    .catch(error => console.error(error));
};

const createImageGallery = images => {
  console.log("Create Image Gallery here with the data...", images);
};

document.addEventListener("DOMContentLoaded", showImages);
