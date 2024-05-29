// Fonction pour mode responsive au-dessous de 768px, qui fait apparaître le menu quand on clique sur l'icône burger
function editNav() {
  let navbar = document.getElementById("myTopnav");
  if (navbar.className === "topnav") {
    navbar.className += " responsive";
    console.log("Class 'responsive' added");
  } else {
    navbar.className = "topnav";
    console.log("Class 'responsive' removed");
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


