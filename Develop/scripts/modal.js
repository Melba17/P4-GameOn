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


// FORMULAIRE
// Sélectionne le formulaire ayant l'attribut name="reserve".
const form = document.querySelector('form[name="reserve"]');
console.log("Formulaire sélectionné:", form);
// Sélectionne tous les éléments avec la classe "formData".
const formData = document.querySelectorAll(".formData");
console.log("Champs du formulaire sélectionnés:", formData);

// Fonction de validation pour chaque champ
// La fonction validateField prend trois arguments : 
// - field : l'élément à valider
// - condition : une condition booléenne
// - errorMessage : le message d'erreur à afficher si la condition est fausse
// Si la condition est fausse, elle ajoute les attributs data-error et data-error-visible à l'élément field et renvoie false.
// Si la condition est vraie, elle supprime les attributs data-error et data-error-visible de l'élément field et renvoie true.
function validateField(field, condition, errorMessage) {
  console.log("Validation du champ:", field, "Condition:", condition);
  if (!condition) {
    field.setAttribute('data-error', errorMessage);
    field.setAttribute('data-error-visible', 'true');
    console.log("Erreur ajoutée:", errorMessage);
    return false;
  } else {
    field.removeAttribute('data-error');
    field.removeAttribute('data-error-visible');
    console.log("Champ validé:", field);
    return true;
  }
}
// validateForm : Cette fonction empêche la soumission par défaut du formulaire, puis valide chaque champ :
// Prénom : Vérifie que le champ a au moins 2 caractères et n'est pas vide.
// Nom : Vérifie que le champ a au moins 2 caractères et n'est pas vide.
// Email : Vérifie que l'email est dans un format valide.
// Date de naissance : Vérifie que l'âge est entre 18 et 100 ans.
// Nombre de tournois : Vérifie que la valeur est un nombre et n'est pas vide.
// Tournoi : Vérifie qu'une option est sélectionnée.
// Conditions générales : Vérifie que la checkbox est cochée.
function validateForm(event) {
  // Empêche la soumission du formulaire jusqu'à ce que tous les champs soient validés.
  event.preventDefault()
  console.log("Validation du formulaire commencée"); 
  // Initialise une variable isFormValid à true. Elle sera utilisée pour vérifier si le formulaire est valide.
  let isFormValid = true;
   // Sélectionne le parent de l'élément avec l'id 'first'.
  // Ici, Valide le champ Prénom.
  const firstNameField = document.getElementById('first').parentNode;
  // Valide le champ "Prénom". Si la longueur de la valeur de l'élément avec l'id 'first' est inférieure à 2, affiche un message d'erreur.
  const isFirstNameValid = validateField(
    firstNameField,
    document.getElementById('first').value.trim().length >= 2,
    "Le champ ne doit pas être vide et avoir au moins 2 caractères."
  );
  // Si le prénom n'est pas valide, isFormValid est mis à false.
  if (!isFirstNameValid) isFormValid = false;
  console.log("Validation prénom:", isFirstNameValid);


  // Sélectionne le parent de l'élément avec l'id 'last'.
  // Ici, Valide le champ Nom.
  const lastNameField = document.getElementById('last').parentNode;
  // Valide le champ Nom.
  // Valide le champ "Nom". Si la longueur de la valeur de l'élément avec l'id 'last' est inférieure à 2, affiche un message d'erreur.
  const isLastNameValid = validateField(
    lastNameField,
    document.getElementById('last').value.trim().length >= 2,
    "Le champ ne doit pas être vide et avoir au moins 2 caractères."
  );
  // Si le nom n'est pas valide, isFormValid est mis à false.
  if (!isLastNameValid) isFormValid = false;
  console.log("Validation nom:", isLastNameValid);

  // Valide le champ Email.
  // Sélectionne le parent de l'élément avec l'id 'email'.
  // Ici, Valide le champ Email.
  const emailField = document.getElementById('email').parentNode;
  const email = document.getElementById('email').value.trim();
  // Valide le champ "Email". Si l'email n'est pas valide, affiche un message d'erreur.
  const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+");
  const isEmailValid = validateField(
    emailField,
    emailRegex.test(email),
    "L'adresse email n'est pas valide"
  );
  // Si l'email n'est pas valide, isFormValid est mis à false.
  if (!isEmailValid) isFormValid = false;
  console.log("Validation email:", isEmailValid);


  // Valide le champ "Date de naissance". Si l'âge calculé est en dehors de l'intervalle 18-100, affiche un message d'erreur.
  const birthdateField = document.getElementById('birthdate').parentNode;
  const birthdate = new Date(document.getElementById('birthdate').value);
  const age = new Date().getFullYear() - birthdate.getFullYear();
  const isBirthdateValid = validateField(
    birthdateField,
    age >= 18 && age <= 100,
    "Vous devez avoir au moins 18 ans / Maximum 100 ans."
  );
  // Si la date de naissance n'est pas valide, isFormValid est mis à false.
  if (!isBirthdateValid) isFormValid = false;
  console.log("Validation date de naissance:", isBirthdateValid, "Âge:", age);


  // Valide le champ Nombre de tournois.
  // Si la valeur n'est pas un nombre ou est vide, affiche un message d'erreur.
  const quantityField = document.getElementById('quantity').parentNode;
  const isQuantityValid = validateField(
    quantityField,
    !isNaN(document.getElementById('quantity').value) && document.getElementById('quantity').value.trim() !== "",
    "Veuillez nous donner un chiffre"
  );
  // Si la quantité n'est pas valide, isFormValid est mis à false.
  if (!isQuantityValid) isFormValid = false;
  console.log("Validation quantité:", isQuantityValid);



   // Valide le champ Tournoi.
   const locationFields = document.querySelectorAll('input[name="location"]');
   let isLocationValid = false;
   locationFields.forEach(field => {
     if (field.checked) isLocationValid = true;
   });
   console.log("Validation ville sélectionnée:", isLocationValid);
// Vérifie si au moins un des champs "Location" est sélectionné.
   let locationContainer = null;
   let currentElement = locationFields[0];
   while (currentElement) {
     if (currentElement.parentNode.classList.contains('formData')) {
       locationContainer = currentElement.parentNode;
       break;
     }
     // Trouve le conteneur du champ "Location".
     currentElement = currentElement.parentNode;
   }
   // Valide le champ "Location". Si aucune ville n'est sélectionnée, affiche un message d'erreur.
   if (!validateField(locationContainer, isLocationValid, "Veuillez choisir une ville")) isFormValid = false;


  // Valide la checkbox des conditions générales
  const checkboxField = document.getElementById('checkbox1').parentNode;
  const isCheckboxValid = document.getElementById('checkbox1').checked;
  // Si la case n'est pas cochée, affiche un message d'erreur.
  if (!validateField(checkboxField, isCheckboxValid, "Veuillez accepter les conditions d'utilisation")) isFormValid = false;
  console.log("Validation conditions générales:", isCheckboxValid);

  // Soumet le formulaire si toutes les validations sont réussies.
  if (isFormValid) {
    showSuccessModal(); 
  }
  // Cela permet de voir le résultat de la validation dans la console juste avant la soumission du formulaire.
  console.log("Formulaire valide:", isFormValid);
}

// showSuccessModal() : Cette fonction est appelée lorsque le formulaire est valide. Elle sélectionne la fenêtre modale de succès à l'aide de document.querySelector, puis définit son style display à 'flex' pour l'afficher. Ensuite, elle imprime un message dans la console pour indiquer que la fenêtre modale de succès est affichée.
function showSuccessModal() {
  // Fonction de réinitialisation du formulaire (prédéfini plus bas).
  resetForm();
  // Sélectionne la modale principale
  const mainModal = document.querySelector('.bground');
  // Masque la modale principale
  mainModal.style.display = 'none';

  const successModal = document.querySelector('.modal_success');
  successModal.style.display = 'flex';
  console.log("Fenêtre modale de succès affichée");
}

// hideSuccessModal() : Cette fonction est appelée lorsque le bouton "Fermer" dans la fenêtre modale de succès est cliqué. Elle sélectionne à nouveau la fenêtre modale de succès, puis définit son style display à 'none' pour la masquer. Ensuite, elle imprime un message dans la console pour indiquer que la fenêtre modale de succès est masquée.
function hideSuccessModal() {
  const successModal = document.querySelector('.modal_success');
  successModal.style.display = 'none';
  console.log("Fenêtre modale de succès masquée");
}
// Ajoute un écouteur d'événement (gestionnaire d'événement) pour la soumission du formulaire qui appelle la fonction validateForm.
form.addEventListener('submit', validateForm);
console.log("Écouteur de soumission de formulaire ajouté");

// closeModalButton.addEventListener('click', hideSuccessModal) : Cet événement écoute les clics sur le bouton "Fermer" de la fenêtre modale de succès. Lorsque le bouton est cliqué, la fonction hideSuccessModal() est appelée pour masquer la fenêtre modale.
const closeModalButton = document.querySelector('.modal_success .btn-submit');
    closeModalButton.addEventListener('click', hideSuccessModal);
    console.log("Écouteur de clic sur le bouton de fermeture de la modale ajouté");

// Avec ces différentes fonctions, lorsqu'on clique sur le bouton "C'est parti", chaque champ sera soit validé soit un message d'erreur approprié sera affiché sous le champ concerné si les critères ne sont pas respectés.
// Avec l'ajout des concole.log à chaque étape clé du processus de validation, un message s'affichera dans la console, ce qui vous aide à comprendre comment et quand chaque partie du code est exécutée.

// Remise à zéro du formulaire lors de la soumission réussie.
function resetForm() {
  document.getElementById('first').value = '';
  document.getElementById('last').value = '';
  document.getElementById('email').value = '';
  document.getElementById('birthdate').value = '';
  document.getElementById('quantity').value = '';
  document.querySelectorAll('input[name="location"]').forEach(input => input.checked = false);
  document.getElementById('checkbox1').checked = false;
}


