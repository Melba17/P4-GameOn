///////////// ICÔNE BURGER/MENU //////////////////
// Sélection de l'icône du menu. Variable en dehors de la fonction car reste accessible dans tout le script. On peut donc la réutiliser au besoin sans avoir à la redéfinir. Elle reste également une référence statique à un élément spécifique du DOM et donc n'a pas besoin d'être recalculée chaque fois que la fonction est exécutée.
const menuIcon = document.getElementById("btn_hamb");

// Ajout d'un gestionnaire d'événements pour le clic sur l'icône avec l'appel de la fonction toggleMenu ci-dessous.
menuIcon.addEventListener("click", toggleMenu);



// Fonction de basculement pour gérer le clic sur l'icône du menu.
function toggleMenu() {
  // Console.log placé à l'intérieur de la fonction car c'est là que se produisent les actions et modifications interactives, donc ici on s'assure qu'il s'exécute uniquement lorsque l'utilisateur clique sur l'icône, et non qu'il s'exécute au chargement de la page si on le plaçait en dehors de la fonction.
  console.log("L'icône du menu a été cliquée.");

  // Sélection de l'ensemble de la liste du menu.
  const menuList = document.querySelector(".list");

  // Si l'écran est moins grand que 1080px..
  if (window.innerWidth <= 1080) {
    // et si la balise ul ne contient pas la classe "menu_toggle", en plus de la classe .list...
    if (!menuList.classList.contains("menu_toggle")) {
      // ..alors on l'ajoute, donc on ouvre le menu.
      menuList.classList.add("menu_toggle");
      // test pour voir dans la console si l'action fonctionne bien.
      console.log("Classe menu_toggle ajoutée.");
    } else {
      // Sinon, on la supprime, donc on ferme le menu.
      menuList.classList.remove("menu_toggle");
      // test pour voir dans la console si l'action fonctionne bien.
      console.log("Classe menu_toggle supprimée.");
    }
  }
}

