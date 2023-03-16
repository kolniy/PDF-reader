const $translateForm = document.querySelector("form");
const $fileInput = document.querySelector("#file-input");
const submitBtn = document.querySelector("#btn-submit");
const outPutParagraph = document.querySelector(".converted-text");

let uploadedImg = null;

// $fileInput.addEventListener("change", function () {
//   const file = this.files[0];
//   const reader = new FileReader();
//   uploadedImg = file;

//   reader.addEventListener("load", function () {
//     const imageDataUrl = reader.result;
//     let existingImage = imageContainer.querySelector("img");
//     if (existingImage) {
//       imageContainer.removeChild(existingImage);
//     }
//     const image = new Image();
//     image.src = imageDataUrl;
//     image.classList.add("img-fluid");
//     imageContainer.appendChild(image);
//   });

//   reader.readAsDataURL(file);
// });

$translateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  submitBtn.textContent = "Loading...";
  submitBtn.disabled = true;

  const formData = new FormData($translateForm);

  fetch("/api/v1/read/pdf", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json().then((data) => {
        submitBtn.textContent = "Read";
        outPutParagraph.textContent = data.text;
        submitBtn.disabled = false;
      });
    })
    .catch((err) => {
      console.log(err);
      alert("Error Reading that File...");
      submitBtn.textContent = "Read";
      submitBtn.disabled = false;
    });
});
