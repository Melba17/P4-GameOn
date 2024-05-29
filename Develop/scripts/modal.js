const formData = document.querySelectorAll(".formData");

// VARIABLES POUR LA MODALE
// Sélection du fond sur lequel s'affiche la Modale.
const modalbg = document.querySelector(".bground");
// Sélection du bouton unique pour ouvrir la modale.
const modalBtn = document.querySelector(".modal-btn");
// GESTIONNAIRE D'ÉVÈNEMENTS
// Ajout de l'événement click au bouton
modalBtn.addEventListener("click", launchModal);
// Fonction pour lancer la modale - elle change le style de l'élément modalbg pour le rendre visible en définissant sa propriété display à block.
// FONCTION POUR LANCER LA MODALE
function launchModal() {
  modalbg.style.display = "block";
}
// En résumé, la modale s'ouvre au clic parce que la fonction launchModal() est attachée à l'événement click du bouton via un gestionnaire d'événements. Lorsque le bouton avec la classe modal-btn est cliqué, l'événement click est déclenché. Comme la fonction launchModal a été assignée comme gestionnaire de cet événement, elle est automatiquement appelée. 

// Sélection de l'élément de fermeture de la Modale, ici, la croix.
const closeBtn = document.querySelector(".close");
// Ajout d'un gestionnaire d'événements pour écouter le clic sur la croix.
closeBtn.addEventListener("click", closeModal);
// Fonction pour fermer la modale.
function closeModal() {
  modalbg.style.display = "none";
}

