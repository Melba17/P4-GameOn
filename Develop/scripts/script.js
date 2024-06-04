
// "DOMContentLoaded", code à exécuter une fois que le DOM est entièrement chargé et prêt à être manipulé, ce qui permet d'exécuter du code JavaScript au bon moment pour une meilleure expérience utilisateur.
document.addEventListener("DOMContentLoaded", function() {
  // Sélection de l'élément avec la classe 'icon'.
  let icon = document.querySelector(".topnav .icon");

  // Ajout d'un écouteur d'événement pour le clic.
  icon.addEventListener("click", editNav);
});
// Fonction qui fait apparaître le menu quand on clique sur l'icône burger.
function editNav() {
    // On récupère l'élément sur lequel on veut agir grâce à son Id.
    let navbar = document.getElementById("myTopnav");
    // Structure conditionnelle if/else pour tester selon certaines instructions.
    // Ici, si la class de notre bloc parent est "topnav"...
    if (navbar.className === "topnav") {
      //... alors on lui ajoute la class "responsive" (celle-ci est spécifiée dans le fichier CSS) - l'espace avant " responsive" est là pour assurer que cette classe soit ajoutée correctement, sans fusionner avec les autres classes donc on a 2 chaînes de caractères - Correctement séparées, les classes peuvent être utilisées indépendamment dans le CSS = basculement grâce au clic, on ouvre le menu.
      navbar.className += " responsive";
      // Test - On contrôle dans la console si la class "responsive" (ajoutée à la suite de la class "topnav") joue bien son rôle.
      console.log("Class 'responsive' added");
    } else {
      // Sinon, on ferme le menu (basculement grâce au clic). 
      navbar.className = "topnav";
      // Test - On contrôle dans la console si la class "responsive" a bien été supprimée donc retour à l'état initial.
      console.log("Class 'responsive' removed");
    }
  }
