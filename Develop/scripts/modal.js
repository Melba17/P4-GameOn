// VARIABLES POUR LA MODALE
// Sélection du fond sur lequel s'affiche la Modale.
const modalbg = document.querySelector(".bground");
// Sélection des boutons pour ouvrir la modale.
const modalBtn = document.querySelectorAll(".modal-btn");
// Sélection de l'élément de fermeture de la Modale, ici, la croix.
const closeBtn = document.querySelector(".close");

// GESTIONNAIRES D'ÉVÈNEMENTS
// Ajout de l'événement click aux boutons
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Ajout d'un gestionnaire d'événements pour écouter le clic sur la croix.
closeBtn.addEventListener("click", closeModal);

// FONCTION POUR OUVRIR LA MODALE 
// Fonction pour lancer la modale - elle change le style de l'élément modalbg pour le rendre visible en définissant sa propriété display à block.
// En résumé, la modale s'ouvre au clic parce que la fonction launchModal() est attachée à l'événement click du bouton via un gestionnaire d'événements. Lorsque le bouton avec la classe modal-btn est cliqué, l'événement click est déclenché. Comme la fonction launchModal a été assignée comme gestionnaire de cet événement, elle est automatiquement appelée.
function launchModal() {
  modalbg.style.display = "block";
}


// FONCTION POUR FERMER LA MODALE
function closeModal() {
  modalbg.style.display = "none";
}


// Sélection des éléments du formulaire sur lesquels on veut agir.
const formData = document.querySelectorAll(".formData");



  "Entrez au moins 2 caractères"
  
  let regex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+")
  

