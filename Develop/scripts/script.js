// Sélection de l'icône du menu.
const menuIcon = document.getElementById('btn_hamb');

// Fonction pour gérer le clic sur l'icône du menu.
function toggleMenu() {
  // Sélection de l'ensemble de la liste du menu.
  const menuList = document.querySelector('.list');

  // Si l'écran est moins grand que 1080px..
  if (window.innerWidth <= 1080) {
    // Ajout de la classe .menu_toggle pour afficher le menu.
    menuList.classList.toggle('menu_toggle');
  }
}


// Ajout d'un gestionnaire d'événements pour le clic sur l'icône du menu.
menuIcon.addEventListener('click', toggleMenu);
