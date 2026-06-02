//your code here
const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg",
];

const imageTags = document.querySelectorAll("img");

const duplicateIndex = Math.floor(Math.random() * images.length);

const finalImages = [...images, images[duplicateIndex]];

finalImages.sort(() => Math.random() - 0.5);

imageTags.forEach((img, index) => {
  img.src = finalImages[index];
  img.className = `img${index + 1}`;
});

const reset = document.querySelector("#reset");
const verify = document.querySelector("#verify");
const success = document.createElement("p");
const fail = document.createElement("p");


imageTags.forEach((img) => {
  img.addEventListener("click", (e) => {
    img.classList.add("selected");
    if (document.querySelectorAll(".selected").length == 2) {
      verify.style.display = "inline";
      verify.addEventListener("click", verifyFunc);
    } else if (document.querySelectorAll(".selected").length >= 1) {
      reset.style.display = "inline";
      reset.addEventListener("click", resetfunc);
      verify.style.display = "none";
    }
  });
});

function resetfunc() {
  imageTags.forEach((img) => {
    if (img.classList.contains("selected")) {
      img.classList.remove("selected");
    }

    if (document.querySelectorAll(".selected").length == 0) {
      reset.style.display = "none";
      verify.style.display = "none";
      success.innerHTML = '';
      fail.innerHTML = '';
    }
  });
}

function verifyFunc() {
  const selected = document.querySelectorAll(".selected");
  console.log(selected);
  console.log(selected[0].currentSrc,selected[1].currentSrc);

  if (selected[0].currentSrc == selected[1].currentSrc) {
    success.innerHTML="You are a human. Congratulations!";
    document.querySelector("main").appendChild(success);
  } else {
    fail.innerHTML="We can't verify you as a human. You selected the non-identical tiles.";
    document.querySelector("main").appendChild(fail);
  }
}
