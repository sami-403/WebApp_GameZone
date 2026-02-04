import { getGames, createGame, updateGame, deleteGame } from "../server/requisicoes";

const gameContainer = document.querySelector('.jogos-principal');

let games = [];

getGames()
  .then(data => {
    games = data.filter(game => game?.indie === true);
    renderGames(games, gameContainer);
  })
  .catch(e => console.error(e));

let genreFilter = [];

const filterOptions = document.querySelectorAll('.dispositivos button');
filterOptions.forEach((button) => {
    button.addEventListener('click', () => {
        console.log('Botao clicado')
        const genre = button.textContent.toUpperCase();
        button.classList.toggle('clicked');
        if(genreFilter.includes(genre)){
            genreFilter = genreFilter.filter(g => g !== genre);
        }
        else{
            genreFilter.push(genre);
        }
        let gamesToRender = [];

        for(let i = 0; i < games.length; i++){
            let temTodosOsAtributos = true;
            for(let k = 0; k < genreFilter.length; k++){
                temTodosOsAtributos *= games[i].platforms.includes(genreFilter[k])
            }
            if (temTodosOsAtributos) gamesToRender.push(games[i]);
        }
        
        gameContainer.innerHTML = '';
        renderGames(gamesToRender, gameContainer);
    })
})

const createGameCard = (title, imgPath, starsToPlace, id) => {
    const gameCard = document.createElement('div');
    gameCard.classList.add('gameCard');
    gameCard.id = id;

    const image = document.createElement('img')
    image.src = imgPath;
    image.alt = title

    const upperLayer = document.createElement('div')
    upperLayer.classList.add('upperLayer')

    const stars = document.createElement('div')
    const selectedStarPath = 'img/star-icons/selected-star.png'
    const unselected = 'img/star-icons/unselected-star.png'

    renderStars(starsToPlace, stars, selectedStarPath, unselected)
    stars.classList.add('stars-container')

    gameCard.append(image)
    gameCard.append(upperLayer)
    gameCard.append(stars)
    return gameCard;
}

const renderGames = (gamesList, divToPlace) => {
    divToPlace.innerHTML = "";
    gamesList = gamesList.sort((a, b) => b.stars - a.stars);
    
    gamesList.forEach(game => {
        const gameCard = createGameCard(game.title, game.path, game.stars, game.id);
        divToPlace.appendChild(gameCard);
    })
}

if (games.length) renderGames(games, gameContainer)

function renderStars(qtdStars, divToRender, selectedStarPath, unselectedStarPath) {
    for(let i = 1; i <= 5; i++){
        let starPath = (i > qtdStars) ? unselectedStarPath : selectedStarPath
        const star = document.createElement('img')
        star.classList.add('star')
        star.src = starPath
        divToRender.append(star)
    }
}

gameContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("star")) return;

    const star = e.target;
    const parent = star.parentElement;
    const children = Array.from(parent.children)
    const index = children.indexOf(star) + 1;
    const gameCard = parent.parentElement;

    for (let i = 0; i < games.length; i++) {
        if (games[i].id == gameCard.id) {
            games[i].stars = index;
            renderGames(games, gameContainer); 
        }
    }
});