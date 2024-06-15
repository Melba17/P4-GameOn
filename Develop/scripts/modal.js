/////////// POUR OUVRIR LA MODALE AVEC LES BOUTONS. /////////////////
// Variable qui sélectionne tous les boutons existants pour ouvrir la modale.
const modalBtn = document.querySelectorAll(".modal-btn");

// Fonction pour ouvrir la modale.
function launchModal() {
  // je demande à la variable de rendre l'ensemble de la modale visible.
  modalbg.style.display = "block";
}
// On reprend la variable liste des boutons à laquelle on applique la méthode "forEach" qui va parcourir la liste des boutons auxquels est ajouté un écouteur d'événement qui déclenche la fonction launchModal lorsque l'élément est cliqué.
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


// Sélection de l'ensemble du bloc html qui contient la modale.
const modalbg = document.querySelector(".bground"); 

////////////// POUR FERMER LA MODALE AVEC LA CROIX. ////////////////////
// Variable qui sélectionne l'élément de fermeture de la Modale, ici, la croix.
const closeBtn = document.querySelector(".close");
// Fonction pour fermer la modale avec la croix.
function closeModal() {
  // je demande à la variable de cacher la modale.
  modalbg.style.display = "none";
}
// Ajout du gestionnaire d'événements pour fermer la modale.
closeBtn.addEventListener("click", closeModal);




/////////////////////// FORMULAIRE ///////////////////////////
// Variable qui sélectionne l'ensemble du formulaire.
const form = document.querySelector('form[name="reserve"]');
////// On reprend cette variable à laquelle on ajoute l'écouteur d'événement "submit" lorsque l'utilisateur soumet le formulaire en cliquant sur le bouton "c'est parti !" et on appelle la fonction validateForm pour tester simultanément l'ensemble des champs. 
form.addEventListener('submit', validateForm);

////// ASPECT DES MESSAGES D'ERREUR ///////
// Sélection de tous les éléments/blocs ayant la classe "formData" du formulaire pour appliquer 1 style css prédéfini aux différents messages d'erreur le moment venu.
const formData = document.querySelectorAll(".formData");


// PRINCIPE DE BASE POUR LA GESTION DES MESSAGES D'ERREUR
// La fonction validateField prend trois arguments : 
// - field : l'élément à valider.
// - condition : une condition booléenne à remplir.
// - errorMessage : le message d'erreur à afficher si la condition est fausse.

function validateField(field, condition, errorMessage) {
  // Si la condition est fausse, elle ajoute les attributs data-error et data-error-visible à l'élément "field" en question et renvoie false dans la console et déclenche également le CSS qui y est rattaché.
  if (!condition) {
    field.setAttribute('data-error', errorMessage);
    field.setAttribute('data-error-visible', 'true');
    return false;
  } // Si la condition est vrai/bonne, elle supprime les attributs data-error et data-error-visible de l'élément field et renvoie true dans la console.
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
  // Initialise une variable isFormValid à true. Elle sera utilisée pour vérifier si le formulaire est valide à la fin du code du formulaire une fois que tous les champs sont corectement remplis.
  let isFormValid = true;

  // VALIDATION DES CHAMPS NOM ET PRÉNOM
  // Cette variable déclare une fonction fléchée qui prend trois arguments : fieldName: l'ID du champ de saisie à valider / minLength: la longueur minimale que la valeur du champ doit avoir et le message d'erreur spécifique.
  // - errorMessage: le message d'erreur à afficher si la validation échoue.
  const validateName = (fieldName, minLength, errorMessage) => {
    // Récupère le bloc parent où se trouve l'ID du champ nom ou prénom.
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
    if (!isValid) {
      isFormValid = false;
    }
    // Affiche dans la console l'Id du champ en question et le résultat de la validation pour le champ spécifié "true" ou "false"
    console.log(`Validation ${fieldName}:`, isValid);
  };
  // Activation de la fonction pour le champ avec l'Id 'first'(Prénom) avec un minimum de 2 caractères et le message d'erreur à afficher.
  validateName('first', 2, "Le champ doit contenir au moins 2 lettres / les chiffres ne sont pas autorisés.");
  // Idem mais pour l'Id 'last'(Nom).
  validateName('last', 2, "Le champ doit contenir au moins 2 lettres / Les chiffres ne sont pas autorisés.");

  ////// Les fonctions suivantes ont le même principe de test mais avec une condition définie spécifique pour le champ en question. //////////

  // VALIDATION DE L'EMAIL
  const validateEmail = () => {
    const field = document.getElementById('email').parentNode;
    const email = document.getElementById('email').value.trim();
    // Création d'une nouvelle expression régulière (regex) pour valider le format de l'adresse email.
    const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+");

  const isValid = validateField(
    field,
    // Condition de validation : vérifie si la valeur entrée par l'utilisateur respecte le format défini dans la regexp.
    emailRegex.test(email),
    "L'adresse email n'est pas valide."
  );
  if (!isValid) {
    isFormValid = false;
  }
  console.log("Validation email:", isValid);
}
// Activation de la fonction.
  validateEmail();


  // VALIDATION DATE DE NAISSANCE
  const validateBirthdate = () => {
    const field = document.getElementById('birthdate').parentNode;
    // Récupère la valeur du champ d'entrée avec l'ID 'birthdate' et la convertit en objet Date. Cela permet de manipuler la date plus facilement.
    const birthdate = new Date(document.getElementById('birthdate').value);
    // Test de Calcul de l'âge de l'utilisateur en soustrayant l'année de naissance de l'année actuelle.
    // new Date().getFullYear() correspond à l'année actuelle.
    // Reprise de la variable/objet "birthdate" créé précédemment qui donne l'année de naissance saisie par l'utilisateur.
    // La différence entre ces deux années donne l'âge de l'utilisateur.
    const age = new Date().getFullYear() - birthdate.getFullYear();
    const isValid = validateField(
      field,
       // Ici, condition de validation = l'âge doit être compris entre 18 et 100 ans.
      age >= 18 && age <= 100,
      "Vous devez avoir au moins 18 ans / Maximum 100 ans."
    );
    if (!isValid) {
      isFormValid = false;
    }
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

    if (!isValid) {
      isFormValid = false;
    }
    console.log("Validation quantité:", isValid);
  };

  validateQuantity();

   // VALIDATION LORSQU'UNE VILLE EST SÉLECTIONNÉE
   // Variable structurée un peu différemment par rapport aux autres fonctions de validation. Au lieu de vérifier directement le champ de saisie individuel, elle contrôle une liste d'options (boutons radio) et fournit un message d'erreur si aucune option est cochée. Approche logique car les boutons radio n'offrent qu'un seul choix parmi plusieurs options.
   const validateLocation = () => {
    // Récupère la liste des éléments DOM ayant un attribut "name" égal à "location".
    const locationFields = document.querySelectorAll('input[name="location"]');
    // Récupère le premier élément de cette liste avec [0] / recherche l'élément parent qui a la classe CSS "formData" dans le DOM avec la méthode .closest ()
    const locationContainer = locationFields[0].closest('.formData');
    // Initialise à "false" une variable concernant l'ensemble des options puisqu'au départ rien n'est coché.
    let isLocationValid = false;
    // Utilisation d'une boucle "for" pour vérifier si un champ est coché.
    // on initialise le compteur à 0; on parcourt l'ensemble de la liste; on passe à l'option/bouton radio suivant en incrémentant. On répète la boucle tant qu'on a pas trouvé d'option cochée.
    for (let i = 0; i < locationFields.length; i++) {
        if (locationFields[i].checked) {
            isLocationValid = true;
            break; // On sort de la boucle dès qu'on a trouvé un champ coché.
        }
    }
   
    const isValid = validateField(locationContainer, isLocationValid, "Veuillez choisir une ville.")

    if (!isValid) {
      isFormValid = false;
    }

     console.log("Validation ville sélectionnée:", isLocationValid)
  };

  validateLocation();


  // VALIDATION CONDITIONS D'UTILISATION
  const validateConditions = () => {
    const checkboxField = document.getElementById('checkbox1').parentNode;
    // Obtient simplement l'état de vérification de la case à cocher (checked) et l'utilise comme validation interne à la fonction.
    const isCheckboxValid = document.getElementById('checkbox1').checked;
    
    const isValid = validateField(checkboxField, isCheckboxValid, "Veuillez accepter les conditions d'utilisation.")

    if (!isValid) {
      isFormValid = false;
    }
    console.log("Validation conditions générales:", isCheckboxValid);
  };

  validateConditions();
  

  //// Soumet le formulaire si toutes les validations sont réussies et ouvre la SuccessModale en appelant la fonction "showSuccessModal()". ////
  if (isFormValid) {
    showSuccessModal(); 
  }
  console.log("Formulaire valide:", isFormValid);
}




/////////////////////// SUCCESS MODALE /////////////////////////
// Variable qui récupère le bloc contenant la SuccessModale.
const successModal = document.querySelector('.modal_success');

// POUR OUVERTURE
// Cette fonction est appelée lorsque le formulaire est valide. 
function showSuccessModal() {
  // j'appelle à nouveau ma variable modalbg(bloc formulaire) pour la rendre invisible.
  modalbg.style.display = 'none';
  // Sélection du bloc qui contient la SuccessModale pour la rendre visible.
  successModal.style.display = 'flex';
  // Fonction de réinitialisation du formulaire (prédéfini au-dessous).
  console.log("Fenêtre modale de succès affichée");
  // Remise à zéro du formulaire.
  resetForm();
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
// Ajout d'un écouteur d'évènement au bouton.
closeModalButton.addEventListener('click', hideSuccessModal);


// POUR FERMETURE AVEC LA CROIX
// Sélection de la croix de fermeture de la SuccessModale.
const closeSuccessX = document.querySelector(".modal_success .close");
// Ajout d'un écouteur d'évènement à la croix.
closeSuccessX.addEventListener("click", hideSuccessModal);

// FONCTION UTILISÉE PAR LES 2 ÉLÉMENTS (BOUTON/CROIX).
function hideSuccessModal() {
  // La SuccesModale devient invisible.
  successModal.style.display = 'none';
  console.log("Fenêtre modale de succès masquée");
}



////// Ajout des concole.log à des étapes clé du processus de validation, un message s'affiche dans la console qui aide à comprendre comment et quand chaque partie du code est exécutée. ////////




