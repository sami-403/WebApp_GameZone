import { games } from "./lancamentosGameData.js";
import { addFavorite } from "./addfavorites.js";

const gameCardsContainer = document.querySelector('.gameCardsContainer')
let addId = 10;
function renderCards(games, container) {
    const sortedGames = games.sort((a, b) => a.releaseYear - b.releaseYear)
    sortedGames.forEach(game => {
        const cardContainer = document.createElement('div')
        cardContainer.style.position = "relative"
        cardContainer.innerHTML = `
            <img src="${game.path}" class="gameCard" style="display: block; height:100%;"></img>
            <button class="favbutton" data-id="${addId}" data-img="${game.path}"></button>
        `
        cardContainer.style.backgroundImage = `url(${game.path})`

        const seeMoreButton = document.createElement('button')
        seeMoreButton.innerText = 'Veja mais'
        seeMoreButton.classList.add('seeMoreButton')
        seeMoreButton.addEventListener('click', (event) => {
            removeOverlay();
            createOverlay();
        })

        cardContainer.append(seeMoreButton)

        container.append(cardContainer);
        ++addId;
    })
}

function createOverlay() {
    const overlayContainer = document.createElement('div')
    overlayContainer.classList.add('overlayScreen')
}

function removeOverlay() {
    const overlays = document.querySelectorAll('.overlayScreen')
    if(overlays.length > 0) {
        overlays.forEach(over => {
            over.remove()
        })
    }
}

renderCards(games, gameCardsContainer);
addFavorite()