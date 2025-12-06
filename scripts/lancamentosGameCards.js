import { games } from "./lancamentosGameData.js";

const gameCardsContainer = document.querySelector('.gameCardsContainer')

function renderCards(games) {
    const sortedGames = games.sort((a, b) => a.releaseYear - b.releaseYear)
    sortedGames.forEach(game => {
        const cardContainer = document.createElement('div')
        cardContainer.style.backgroundImage = `url(${game.path})`

        // const favoriteButton = document.createElement('button');
        // favoriteButton.innerText = 'Favoritar'
        // favoriteButton.onclick = `${() => {
        //     //favorite
        //     //funcao de Allan
        // }}`

        const seeMoreButton = document.createElement('button')
        seeMoreButton.addEventListener('click', (event) => {
            
        })
    })
}

function createOverlay() {
    const overlayContainer = document.createElement('div')
    overlayContainer.classList.add('overlayScreen')
}

function removeOverlay() {
    const overlays = document.querySelectorAll('.overlayScreen')
    overlays.forEach(over => {
        over.remove()
    })
}