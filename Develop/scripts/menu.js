// ICÔNE BURGER/MENU
// Sélection de l'icône du menu. Variable en dehors de la fonction car reste accessible dans tout le script (ou dans tout le bloc de portée dans lequel elle est définie). On peut donc la réutiliser sans avoir à la redéfinir. Elle reste également une référence statique à un élément spécifique du DOM et donc n'a pas besoin d'être recalculée chaque fois que la fonction est exécutée.
const menuIcon = document.getElementById("btn_hamb");

// Fonction de basculement pour gérer le clic sur l'icône du menu.
function toggleMenu() {
  // Console.log placé à l'intérieur de la fonction car c'est là que se produisent les actions et modifications interactives, donc ici on s'assure qu'il s'exécute uniquement lorsque l'utilisateur clique sur l'icône, et non qu'il s'exécute au chargement de la page si on le plaçait en dehors de la fonction.
  console.log("L'icône du menu a été cliquée.");

  // Sélection de l'ensemble de la liste du menu.
  const menuList = document.querySelector(".list");

  // Si l'écran est moins grand que 1080px..
  if (window.innerWidth <= 1080) {
    // Ajout de la classe .menu_toggle pour basculer vers l'affichage du menu.
    menuList.classList.toggle("menu_toggle");
  }
  // Affichage dans la console pour vérifier l'état du menu ce qui permet de savoir que l'interface utilisateur a été modifiée en réponse à l'interaction de l'utilisateur.
  console.log("Classe menu_toggle ajoutée ou supprimée.");
}


// Ajout d'un gestionnaire d'événements pour le clic sur l'icône avec l'appel de la fonction toggleMenu ci-dessus.
menuIcon.addEventListener("click", toggleMenu);
// Pas de console.log parce que cette ligne de code ne produit pas une action observable à ce moment précis, mais associe simplement une fonction à un événement futur, néanmoins on pourrait en mettre un pour confirmer que l'association de l'événement a bien été effectuée avec console.log("Gestionnaire d'événement ajouté pour le clic sur l'icône "du menu.");
