/////////// POUR OUVRIR LA MODALE AVEC LES BOUTONS. /////////////////
// Variable qui sélectionne tous les boutons existants pour ouvrir la modale.
const modalBtn = document.querySelectorAll(".modal-btn");
// On reprend la variable des boutons à laquelle on applique la méthode "forEach" qui va parcourir la liste des boutons auxquels est ajouté un écouteur d'événement qui déclenche la fonction launchModal lorsque l'élément est cliqué.
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

// FONCTION DE VALIDATION DE L'ENSEMBLE DU FORMULAIRE
// La fonction validateField (appelée à plusieurs reprises dans la fonction "validateField") prend trois arguments : 
// - field : l'élément à valider dans un bloc parent
// - condition : une condition booléenne
// - errorMessage : le message d'erreur à afficher si la condition est fausse
// En bref, cette fonction détermine si le formulaire complet est valide et s'il peut être soumis ou non. 
function validateField(field, condition, errorMessage) {
  // Si la condition est fausse, elle ajoute les attributs data-error et data-error-visible à l'élément "field" en question et renvoie false, ce qui est visible dans le DOM et déclenche également le CSS qui y est rattaché.
  if (!condition) {
    field.setAttribute('data-error', errorMessage);
    field.setAttribute('data-error-visible', 'true');
    return false;
  } // Si la condition est vraie, elle supprime les attributs data-error et data-error-visible de l'élément field et renvoie true.
    else {
    field.removeAttribute('data-error');
    field.removeAttribute('data-error-visible');
    return true;
  }
}
////////////////// FONCTION DE VALIDATION DU FORMULAIRE CHAMP PAR CHAMP ///////////////////
function validateForm(event) {
  // Empêche le navigateur de réagir à la validation du formulaire (bouton "C'est parti !"),ici, je gère moi-même le comportement du formulaire.
  event.preventDefault()
  // Initialise une variable isFormValid à true. Elle sera utilisée pour vérifier si le formulaire est valide à la fin du code du formulaire.
  let isFormValid = true;

  // VALIDATION DES CHAMPS NOM ET PRÉNOM
  // Cette variable déclare une fonction fléchée "validateName" qui prend trois arguments : 
  // - fieldName: l'ID du champ de saisie à valider
  // - minLength: la longueur minimale que la valeur du champ doit avoir
  // - errorMessage: le message d'erreur à afficher si la validation échoue
  const validateName = (fieldName, minLength, errorMessage) => {
    // Récupère l'élément DOM parent (.parentNode) du champ d'entrée dont l'ID est "fieldName", conteneur qui va afficher le message d'erreur.
    const field = document.getElementById(fieldName).parentNode;
    // Récupère la valeur du champ d'entrée, la méthode trim() supprime les espaces blancs éventuels.
    const value = document.getElementById(fieldName).value.trim();
    // Appelle la fonction validateField définit plus tôt qui reprend le principe des trois arguments à prendre en compte pour la validation :
  // field = l'élément parent du champ à valider
  // La condition de validation = la longueur de la valeur doit être supérieure ou égale à minLength ET la valeur doit contenir uniquement des lettres (expression régulière /^[a-zA-Z]+$/)
  // errorMessage = le message d'erreur à afficher si la validation échoue
  // ce qui donnera un résultat "true" ou "false".
    const isValid = validateField(
    field,
    value.length >= minLength && /^[a-zA-Z]+$/.test(value),
    errorMessage
  );
    // Si isValid est false (la validation a échoué), la variable globale isFormValid est définie à false. Cela signifie que le formulaire contient au moins une erreur de validation.
    if (!isValid) isFormValid = false;
    // Affiche dans la console le résultat de la validation pour le champ spécifié "true" ou "false"
    console.log(`Validation ${fieldName}:`, isValid);
  };
  // Appelle la fonction validateName pour valider le champ avec l'ID 'first'(Prénom) avec un minmum de 2 caractères et le messaged'erreur à afficher.
  validateName('first', 2, "Le champ doit contenir au moins 2 lettres / les chiffres ne sont pas autorisés.");
  // Idem mais pour l'ID 'last'(Nom).
  validateName('last', 2, "Le champ doit contenir au moins 2 lettres / Les chiffres ne sont pas autorisés.");

  ////// Les fonctions suivantes ont le même principe de base mais sont adaptées à des types de champs différents et à des critères de validation spécifiques. //////////

  // VALIDATION DE L'EMAIL
  const validateEmail = () => {
    const field = document.getElementById('email').parentNode;
    const email = document.getElementById('email').value.trim();
    // Création d'une nouvelle expression régulière (regex) pour valider le format de l'adresse email / Objet de comparaison.
    const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+");
  const isValid = validateField(
    field,
    // Condition de validation : vérifie si l'email respecte le format défini par la regex.
    emailRegex.test(email),
    "L'adresse email n'est pas valide."
  );
  if (!isValid) isFormValid = false;
  console.log("Validation email:", isValid);
}
// Appelle la fonction validateEmail pour valider le champ d'entrée avec l'ID 'email'.
  validateEmail();


  // VALIDATION DATE DE NAISSANCE
  const validateBirthdate = () => {
    const field = document.getElementById('birthdate').parentNode;
    // Récupère la valeur du champ d'entrée avec l'ID 'birthdate' et la convertit en objet Date. Cela permet de manipuler la date plus facilement.
    const birthdate = new Date(document.getElementById('birthdate').value);
    // Test de Calcul de l'âge de l'utilisateur en soustrayant l'année de naissance de l'année actuelle.
    // new Date().getFullYear() correspond à l'année actuelle : new Date() crée un objet Date représentant la date et l'heure actuelles.
    // getFullYear() extrait l'année complète de cet objet Date.
    // Reprise de la variable/objet créé précédemment qui reprend la valeur saisie par l'utilisateur.
    // La différence entre ces deux années donne l'âge de l'utilisateur.
    const age = new Date().getFullYear() - birthdate.getFullYear();
    const isValid = validateField(
      field,
       // Ici, condition de validation = l'âge doit être compris entre 18 et 100 ans.
      age >= 18 && age <= 100,
      "Vous devez avoir au moins 18 ans / Maximum 100 ans."
    );
    if (!isValid) isFormValid = false;
    // Affiche dans la console le résultat de la validation de la date de naissance et l'âge calculé.
    console.log("Validation date de naissance:", isValid, "Âge:", age);
  };
  validateBirthdate();


  // VALIDATION DU NOMBRE DE TOURNOIS
  const validateQuantity = () => {
    const field = document.getElementById('quantity').parentNode;
    const quantityValue = document.getElementById('quantity').value.trim();
    //
    const isValid = validateField(
      field,
      // ! = l'inverse de NaN = Not a Number / !== "" veut dire que le champ n'est pas vide donc test de validation du champ car vérifie que la valeur est un nombre, qu'elle n'est pas vide, et qu'elle est supérieure à zéro.
      !isNaN(quantityValue) && quantityValue !== "" && Number(quantityValue) > 0,
      "Veuillez entrer un chiffre supérieur à zéro."
    );
    if (!isValid) isFormValid = false;
    console.log("Validation quantité:", isValid);
  };
  validateQuantity();

   // VALIDATION LORSQU'UNE VILLE EST SÉLECTIONNÉE
   // Variable structurée un peu différemment par rapport aux autres fonctions de validation. Au lieu de vérifier directement le champ de saisie individuel, elle vérifie l'ensemble des champs de saisie de lieu (boutons radio) et fournit un message d'erreur si aucun champ n'est sélectionné. Cette approche est logique car les boutons radio n'offrent qu'un seul choix parmi plusieurs options.
   const validateLocation = () => {
    // Récupère la liste des éléments DOM ayant un attribut "name" égal à "location".
    const locationFields = document.querySelectorAll('input[name="location"]');
    // Récupère le premier élément de cette liste avec [0] / recherche l'élément parent qui a la classe CSS "formData" dans le DOM avec la méthode .closest ()
    const locationContainer = locationFields[0].closest('.formData');
    // L'instruction utilise la méthode Array.from() pour convertir la NodeList locationFields en un tableau ordinaire, puis utilise la méthode Array.some() pour vérifier si au moins un des champs de saisie de lieu est sélectionné.
    // field => est une fonction fléchée qui prend l'argument", ici nommé "field" qui représente chaque élément du tableau sur lequel la méthode some() est appelée.
    // field.checked fait référence à la propriété "checked" donc contrôle si un des boutons est bien coché.
    const isLocationValid = Array.from(locationFields).some(field => field.checked);
    
    // Appelle la fonction validateField avec trois arguments dont locationContainer : le conteneur autour des champs de saisie de lieu / isLocationValid : un booléen indiquant si au moins un champ de saisie est coché.
    if (!validateField(locationContainer, isLocationValid, "Veuillez choisir une ville.")) isFormValid = false;
    console.log("Validation ville sélectionnée:", isLocationValid);
  };
  validateLocation();

  // VALIDATION CONDITIONS D'UTILISATION
  const validateConditions = () => {
    // Récupére le conteneur parent de la case à cocher au lieu de la case à cocher elle-même.
    const checkboxField = document.getElementById('checkbox1').parentNode;
    // Obtient simplement l'état de vérification de la case à cocher (checked) et l'utilise comme validation interne à la fonction.
    const isCheckboxValid = document.getElementById('checkbox1').checked;
    // Si la case à cocher n'est pas cochée, un message d'erreur est affiché. Contrairement aux autres fonctions qui ajoutent des attributs ou des messages d'erreur à un élément spécifique du formulaire, celui-ci affiche simplement un message d'erreur général.
    if (!validateField(checkboxField, isCheckboxValid, "Veuillez accepter les conditions d'utilisation.")) isFormValid = false;
    // Affiche le résultat de la validation dans la console, comme les autres fonctions.
    console.log("Validation conditions générales:", isCheckboxValid);
  };
  validateConditions();
  

  
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




////// Ajout des concole.log à des étapes clé du processus de validation, un message s'affiche dans la console qui aide à comprendre comment et quand chaque partie du code est exécutée. ////////




