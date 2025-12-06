import { games } from "./lancamentosGameData.js";
import { addFavorite } from "./addfavorites.js";

const body = document.querySelector('body')
const gameCardsContainer = document.querySelector('.gameCardsContainer')
let addId = 10;
function renderCards(games, container) {
    const sortedGames = games.sort((a, b) => a.releaseYear - b.releaseYear)
    sortedGames.forEach(game => {
        const cardContainer = document.createElement('div')
        cardContainer.style.position = "relative"
        cardContainer.style.marginLeft = '10px'
        cardContainer.style.marginRight = '10px'

        cardContainer.innerHTML = `
            <img src="${game.path}" class="gameCard" style="display: block; height:100%;"  data-id="${addId}" data-img="${game.path}"></img>
            <button class="favbutton"></button>
        `
        const seeMoreButton = document.createElement('button')
        seeMoreButton.innerText = 'Veja mais'
        seeMoreButton.classList.add('seeMoreButton')
        seeMoreButton.addEventListener('click', (event) => {
            removeOverlay();
            createOverlay();
            const seeMoreCard = document.createElement('div')
            seeMoreCard.classList.add("seeMoreCard");

            seeMoreCard.innerHTML = `
                <h2 class="seeMoreCardTitle">${game.title}</h2>
                <p class="seeMoreCardDeveloper"><b>Developer:</b> ${game.developer}</p>
                <p class="seeMoreCardYear"><b>Ano:</b> ${game.releaseYear}</p>
                <p class="seeMoreCardPlatforms"><b>Plataformas:</b> 
                    ${game.platforms.join(", ")}
                </p>
                <p class="seeMoreCardAbout">${game.about}</p>
                <button class="seeMoreCloseBtn">Entendi</button>
            `;

            document.querySelector('.overlayScreen').append(seeMoreCard);
            seeMoreCard.querySelector(".seeMoreCloseBtn").addEventListener("click", removeOverlay)

        })

        cardContainer.append(seeMoreButton)

        container.append(cardContainer);
        ++addId;
    })
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

renderCards(games, gameCardsContainer);

setTimeout(() => {
    addFavorite();
}, 0);