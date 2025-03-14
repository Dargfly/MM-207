"use strict"
if("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../sw.js")
}

//  Dialog System ----------------------------------------------------------
const dialog = document.getElementById("dialog");
const titleDialog = document.getElementById("titleDialog");
const textDialog = document.getElementById("textDialog");
const btnCloseDialog = document.getElementById("btnCloseDialog");

function dialogMessage(title, message) {
  titleDialog.innerText = title;
  textDialog.innerText = message;

  dialog.showModal();
}

btnCloseDialog.addEventListener("click", () => {
  dialog.close();
});