/////////// POUR OUVRIR LA MODALE AVEC LES BOUTONS. /////////////////
// Variable qui sélectionne tous les boutons existants pour ouvrir la modale.
const modalBtn = document.querySelectorAll(".modal-btn");
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fonction pour ouvrir la modale.
function launchModal() {
  // Sélection de l'ensemble du bloc qui contient la modale.
  const modalbg = document.querySelector(".bground"); 
  modalbg.style.display = "block";
}
////////////// POUR FERMER LA MODALE AVEC LA CROIX. ////////////////////
// Variable qui sélectionne l'élément de fermeture de la Modale, ici, la croix.
const closeBtn = document.querySelector(".close");
// Fonction pour fermer la modale avec la croix.
function closeModal() {
  // Sélection du fond sur lequel s'affiche la Modale.
  const modalbg = document.querySelector(".bground"); 
  modalbg.style.display = "none";
}
// Ajout du gestionnaire d'événements pour fermer la modale.
closeBtn.addEventListener("click", closeModal);




/////////////////////// FORMULAIRE ///////////////////////////
// Sélectionne l'ensemble du formulaire pour gérer la soumission de celui-ci en fin de code.
const form = document.querySelector('form[name="reserve"]');
console.log("Formulaire sélectionné:", form);

////// MÉTHODE SPÉCIFIQUE POUR LES MESSAGES D'ERREUR ///////
// Sélection tous les éléments avec la classe "formData" du formulaire pour leur appliquer le style prédéfini dans le fichier CSS.
const formData = document.querySelectorAll(".formData");
console.log("Champs du formulaire sélectionnés:", formData);

// FONCTION DE VALIDATION POUR CHAQUE CHAMP
// La fonction validateField (appelée à plusieurs reprises dans la fonction "validateField") prend trois arguments : 
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
////////////////// FONCTION DE VALIDATION DU FORMULAIRE ///////////////////
// validateForm : Cette fonction empêche la soumission par défaut du formulaire, puis valide chaque champ.
function validateForm(event) {
  // Empêche le navigateur de réagir à la validation du formulaire,ici, je gère moi-même le comportement de mon formulaire.
  event.preventDefault()
  console.log("Validation du formulaire commencée"); 
  // Initialise une variable isFormValid à true. Elle sera utilisée pour vérifier si le formulaire est valide à la fin du code du formulaire.
  let isFormValid = true;

  // VALIDATION DU PRÉNOM
  // Sélectionne le parent de l'élément avec l'id 'first'.
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


  // VALIDATION DU NOM
  // Sélectionne le parent de l'élément avec l'id 'last'.
  const lastNameField = document.getElementById('last').parentNode;
  // Valide le champ "Nom". Si la longueur de la valeur de l'élément avec l'id 'last' est inférieure à 2, affiche un message d'erreur.
  const isLastNameValid = validateField(
    lastNameField,
    document.getElementById('last').value.trim().length >= 2,
    "Le champ ne doit pas être vide et avoir au moins 2 caractères."
  );
  // Si le nom n'est pas valide, isFormValid est mis à false.
  if (!isLastNameValid) isFormValid = false;
  console.log("Validation nom:", isLastNameValid);

  // VALIDATION DE L'EMAIL
  // Sélectionne le parent de l'élément avec l'id 'email'.
  const emailField = document.getElementById('email').parentNode;
  const email = document.getElementById('email').value.trim();
  // Valide le champ "Email". Si l'email n'est pas valide, affiche un message d'erreur.
  const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+");
  const isEmailValid = validateField(
    emailField,
    emailRegex.test(email),
    "L'adresse email n'est pas valide."
  );
  // Si l'email n'est pas valide, isFormValid est mis à false.
  if (!isEmailValid) isFormValid = false;
  console.log("Validation email:", isEmailValid);


  // VALIDATION DATE DE NAISSANCE
  // Si l'âge calculé est en dehors de l'intervalle 18-100, affiche un message d'erreur.
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


  // VALIDATION DU NOMBRE DE TOURNOIS
  // Si la valeur n'est pas un nombre ou est vide, affiche un message d'erreur.
  const quantityField = document.getElementById('quantity').parentNode;
  const quantityValue = document.getElementById('quantity').value.trim();
  const isQuantityValid = validateField(
    quantityField,
    !isNaN(quantityValue) && quantityValue !== "" && Number(quantityValue) > 0,
    "Veuillez entrer un chiffre supérieur à zéro."
  );
// Ajout d'un écouteur d'événement input pour le champ de quantité pour forcer la valeur à 0 si une valeur négative est saisie.
  const quantityInput = document.getElementById('quantity');
  quantityInput.addEventListener('input', function() {
  if (quantityInput.value < 0) {
    quantityInput.value = 0;
  }
  });
  // Si la quantité n'est pas valide, isFormValid est mis à false.
  if (!isQuantityValid) isFormValid = false;
  console.log("Validation quantité:", isQuantityValid);



   // VALIDATION LORSQU'UNE VILLE EST SÉLECTIONNÉE
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
   // Valide le champ "Location". Si aucune ville n'est pas sélectionnée, affiche un message d'erreur.
   if (!validateField(locationContainer, isLocationValid, "Veuillez choisir une ville.")) isFormValid = false;


  // VALIDATION CONDITIONS D'UTILISATION
  const checkboxField = document.getElementById('checkbox1').parentNode;
  const isCheckboxValid = document.getElementById('checkbox1').checked;
  // Si la case n'est pas cochée, affiche un message d'erreur.
  if (!validateField(checkboxField, isCheckboxValid, "Veuillez accepter les conditions d'utilisation.")) isFormValid = false;
  console.log("Validation conditions générales:", isCheckboxValid);

  
  //// Soumet le formulaire si toutes les validations sont réussies et ouvre la SuccessModale en appelant la fonction "showSuccessModal()". ////
  if (isFormValid) {
    showSuccessModal(); 
  }
  console.log("Formulaire valide:", isFormValid);
}

////// On appelle la variable "form" (définit en début de code) à laquelle on ajoute un écouteur d'événement pour le bouton "c'est parti !" (avec l'attribut "submit") qui appelle la fonction validateForm (la plus grosse fonction) lorsque celui-ci est correctement rempli. /////////
form.addEventListener('submit', validateForm);
console.log("Écouteur de soumission de formulaire ajouté");




/////////////////////// SUCCESS MODALE /////////////////////////
// Variable qui récupère le bloc contenant la SuccessModale.
const successModal = document.querySelector('.modal_success');

// POUR OUVERTURE
// Cette fonction est appelée lorsque le formulaire est valide. 
function showSuccessModal() {
  // Fonction de réinitialisation du formulaire (prédéfini au-dessous).
  resetForm();
  // Sélectionne la modale principale...
  const mainModal = document.querySelector('.bground');
  // ...pour la rendre invisible.
  mainModal.style.display = 'none';
  // Sélection du bloc qui contient la SuccessModale...
  successModal.style.display = 'flex';
  // ... pour la rendre visible
  console.log("Fenêtre modale de succès affichée");
}

// REMISE À ZÉRO DU FORMULAIRE LORSQUE VALIDATION RÉUSSIE
function resetForm() {
  document.getElementById('first').value = '';
  document.getElementById('last').value = '';
  document.getElementById('email').value = '';
  document.getElementById('birthdate').value = '';
  document.getElementById('quantity').value = '';
  document.querySelectorAll('input[name="location"]').forEach(input => input.checked = false);
  document.getElementById('checkbox1').checked = false;
}

// POUR FERMETURE AVEC LE BOUTON
// Variable qui sélectionne le bouton de fermeture de la SuccessModale.
const closeModalButton = document.querySelector('.modal_success .btn-submit');
// Fonction qui décrit comment fermer la SuccessModale.
function hideSuccessModal() {
  // La SuccesModale devient invisible.
  successModal.style.display = 'none';
  console.log("Fenêtre modale de succès masquée");
}
closeModalButton.addEventListener('click', hideSuccessModal);
console.log("Écouteur de clic sur le bouton de fermeture de la modale ajouté");

// POUR FERMETURE AVEC LA CROIX
// Sélection de la croix de fermeture de la SuccessModale.
const closeSuccessX = document.querySelector(".modal_success .close")
// FONCTION POUR FERMER LA MODALE DE SUCCÈS À L'AIDE DU BOUTON.
closeSuccessX.addEventListener("click", hideSuccessModal);




////// Avec l'ajout des concole.log à chaque étape clé du processus de validation, un message s'affichera dans la console qui aide à comprendre comment et quand chaque partie du code est exécutée. ////////




