import { getGames } from "../server/requisicoes.js";
import { updateFavoriteButtons } from "./addfavorites.js";

const gameCardsContainer = document.querySelector('.gameCardsContainer');
const body = document.querySelector('body');

let games = [];

const btnSeeMore = document.querySelector(".botao-jogos");
let showAll = false;
const INITIAL_LIMIT = 4;

getGames()
  .then(data => {
    // Filtra jogos que NÃO são indie
    games = data.filter(game => !game.indie);
    renderCards(games, gameCardsContainer);
    updateFavoriteButtons(); // Adiciona listeners após renderizar
  })
  .catch(e => console.error(e));

// Add click listener for the button
if (btnSeeMore) {
    btnSeeMore.addEventListener("click", () => {
        showAll = !showAll;
        renderCards(games, gameCardsContainer);
    });
}

function renderCards(games, container) {
    container.innerHTML = ""; // Limpa container antes de renderizar
    
    // Sort by release year
    const sortedGames = games.sort((a, b) => (a.releaseYear || 0) - (b.releaseYear || 0));
    
    // Determine which games to show
    const visibleGames = showAll ? sortedGames : sortedGames.slice(0, INITIAL_LIMIT);

    // Update button text
    if (btnSeeMore) {
        btnSeeMore.textContent = showAll ? "Mostrar menos" : "Ver todos os Jogos";
    }
    
    visibleGames.forEach(game => {
        const cardContainer = document.createElement('div')
        cardContainer.style.position = "relative"
        cardContainer.classList.add("gameCard"); // Consistency

        cardContainer.innerHTML = `
            <img src="${game.path}" data-id="${game.id}" data-img="${game.path}"></img>
            <button class="favbutton">Favoritar</button>
        `
        const seeMoreButton = document.createElement('button')
        seeMoreButton.innerText = 'Veja mais'
        seeMoreButton.classList.add('seeMoreButton')
        seeMoreButton.addEventListener('click', (event) => {
            removeOverlay();
            createOverlay();
            
            // Handle platforms being array or string
            let platforms = "Não informado";
            if (Array.isArray(game.platforms)) {
                platforms = game.platforms.join(", ");
            } else if (game.platform) {
                platforms = game.platform;
            } else if (game.platforms) {
                platforms = game.platforms;
            }

            const seeMoreCard = document.createElement('div')
            seeMoreCard.classList.add("seeMoreCard");

            seeMoreCard.innerHTML = `
                <h2 class="seeMoreCardTitle">${game.title}</h2>
                <p class="seeMoreCardDeveloper"><b>Developer:</b> ${game.developer || "Desconhecido"}</p>
                <p class="seeMoreCardYear"><b>Ano:</b> ${game.releaseYear || "N/A"}</p>
                <p class="seeMoreCardPlatforms"><b>Plataformas:</b> 
                    ${platforms}
                </p>
                <p class="seeMoreCardAbout">${game.about || "Sem descrição disponível."}</p>
                <p class="seeMoreCardPrice"><b>Preço:</b> ${game.price ? `R$ ${game.price}` : "Grátis"}</p>
                <button class="seeMoreCloseBtn">Entendi</button>
            `;

            document.querySelector('.overlayScreen').append(seeMoreCard);
            seeMoreCard.querySelector(".seeMoreCloseBtn").addEventListener("click", removeOverlay)

        })

        cardContainer.append(seeMoreButton)

        container.append(cardContainer);
    })
    
    updateFavoriteButtons(); // Ensure updated items get correct status
}

function createOverlay() {
    const overlayContainer = document.createElement('div')
    overlayContainer.classList.add('overlayScreen')
    body.append(overlayContainer)    
}

function removeOverlay() {
    const overlays = document.querySelectorAll('.overlayScreen')
    if(overlays.length > 0) {
        overlays.forEach(over => {
            over.remove()
        })
    }
}