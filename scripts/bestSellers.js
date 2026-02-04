import { getGames } from "../server/requisicoes.js";
import { updateFavoriteButtons } from "./addfavorites.js";

const gameContainer = document.querySelector(".imagens-flex");
const btnSeeMore = document.querySelector(".botao-jogos");

let allGames = [];
let showAll = false;
const INITIAL_LIMIT = 4;

function renderBestSellers() {
  gameContainer.innerHTML = "";
  
  // Sort by stars (descending) as proxy for "best sellers"
  const sortedGames = allGames.sort((a, b) => (b.stars || 0) - (a.stars || 0));
  
  // Determine which games to show
  const visibleGames = showAll ? sortedGames : sortedGames.slice(0, INITIAL_LIMIT);

  visibleGames.forEach((game) => {
    const card = document.createElement("div");
    card.classList.add("gameCard");
    
    // Usar layout simples como na home ou favoritos
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.innerHTML = `
      <img src="${game.path}" alt="${game.title}" data-id="${game.id}" data-img="${game.path}" />
      <button class="favbutton">Favoritar</button>
    `;

    const info = document.createElement("div");
    info.classList.add("game-info");
    info.innerHTML = `<p>${game.title}</p>${game.price !== undefined ? `<p>R$ ${game.price}</p>` : ""}`;

    card.append(wrapper, info);
    gameContainer.appendChild(card);
  });
  
  updateFavoriteButtons();
  
  // Update button text
  if (btnSeeMore) {
    btnSeeMore.textContent = showAll ? "Mostrar menos" : "Ver todos os Jogos";
  }
}

// Add click listener for the button
if (btnSeeMore) {
    btnSeeMore.addEventListener("click", () => {
        showAll = !showAll;
        renderBestSellers();
    });
}

getGames()
  .then((data) => {
    allGames = data;
    renderBestSellers();
  })
  .catch((e) => console.error(e));
