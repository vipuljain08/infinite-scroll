const imageContainer = document.getElementById("image--container");

let photosArray = [];
let ready = true;
let totalImages = 0;
let imagesLoaded = 0;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function checkImageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
  }
}

function loadImages() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // create <a> element to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, { href: photo.links.html, target: "_blank" });

    // create <img> for image
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", checkImageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

const apiKey = "2fx3UH4pIerH7pOU08alkDEhCGUq3dTgQTJi53d3FKk";
let count = 5;
let unsplashApi = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getImages() {
  try {
    const response = await fetch(unsplashApi);
    photosArray = await response.json();
    console.log(photosArray);
    loadImages();
  } catch (error) {
    console.log(`Something is wrong ${error}`);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY > document.body.offsetHeight - 100 &&
    ready
  ) {
    ready = false;
    getImages();
  }
});

getImages();