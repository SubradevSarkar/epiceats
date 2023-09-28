"use strict";

const baseUrl = window.location.origin;
const redirect = (url) => window.location.replace(`${url}`);
const query = new URLSearchParams(window.location.search);

const showToastMessage = async ({ message, type }) => {
  const toastLive = elementId("liveToast");
  const toastBody = selector(".toast-body");
  const toast = new bootstrap.Toast(toastLive);

  const toastType = {
    success: "text-bg-success",
    danger: "text-bg-danger",
    warning: "text-bg-warning",
  };

  // const toastType = {
  //   success: "#198754",
  //   danger: "#dc3545",
  //   warning: "#ffc107",
  // };

  if (type && type !== "success") {
    toastLive.classList.remove(toastType["success"]);
    toastLive.classList.add(toastType[type]);
    // toastLive.style.backgroundColor = color;
  } else if (!toastLive.classList.contains(toastType["success"])) {
    toastLive.classList.add("text-bg-success");
    for (let key in toastType) {
      if (key !== "success") {
        toastLive.classList.remove(toastType[key]);
      }
    }
  }
  // else {
  //   bgColor(toastType["success"]);
  // }

  toastBody.innerText = message || toastBody.innerText;
  toast.show();
};
const preloader = document.getElementById("preloader");
window.addEventListener("load", () => {
  preloader.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  let ingredientList = selector(".ingredientList");
  let ingredientDiv = allSelector(".ingredientDiv")[0];
  let addIngredientsBtn = elementId("addIngredientsBtn");

  // add ingredients items at recipe submit =================================================================
  if (addIngredientsBtn) {
    addIngredientsBtn.addEventListener("click", function () {
      let newIngredients = ingredientDiv.cloneNode(true);
      let input = newIngredients.getElementsByTagName("input")[0];
      input.value = "";
      ingredientList.appendChild(newIngredients);
    });
  }
});
