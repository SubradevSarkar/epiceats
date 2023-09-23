"use strict";

const baseUrl = window.location.origin;
const query = new URLSearchParams(window.location.search);

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
