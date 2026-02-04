import { getGames } from "../server/requisicoes.js";
const gameContainer = document.querySelector('.jogos-principal');

let games = [];

getGames()
  .then(data => {
    games = data.filter(game => game.indie === true);
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

        // Updated filter logic for mixed data
        gamesToRender = games.filter(game => {
             if (genreFilter.length === 0) return true;
             
             let platforms = [];
             if (Array.isArray(game.platforms)) {
                  platforms = game.platforms.map(p => p.toUpperCase());
             } else if (game.platform) {
                  platforms = [game.platform.toUpperCase()];
             } else if (game.platforms) {
                  platforms = [game.platforms.toUpperCase()];
             }

             return genreFilter.every(gf => platforms.some(p => p.includes(gf)));
        });
        
        gameContainer.innerHTML = '';
        renderGames(gamesToRender, gameContainer);
    })
})

const createGameCard = (title, imgPath, starsToPlace, id) => {
    const gameCard = document.createElement('div');
    gameCard.classList.add('gameCard');
    gameCard.id = id;
    
    // Wrapper for consistency with other cards relative positioning
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative'; 

    const image = document.createElement('img')
    image.src = imgPath;
    image.alt = title
    // Add data attributes for favorites logic
    image.dataset.id = id;
    image.dataset.img = imgPath;
    
    wrapper.append(image);

    const upperLayer = document.createElement('div')
    upperLayer.classList.add('upperLayer')

    const stars = document.createElement('div')
    const selectedStarPath = 'img/star-icons/selected-star.png'
    const unselected = 'img/star-icons/unselected-star.png'

    renderStars(starsToPlace || 0, stars, selectedStarPath, unselected)
    stars.classList.add('stars-container')

    gameCard.append(wrapper)
    gameCard.append(upperLayer)
    gameCard.append(stars)
    return gameCard;
}

const renderGames = (gamesList, divToPlace) => {
    divToPlace.innerHTML = "";
    gamesList = gamesList.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    
    gamesList.forEach(game => {
        const gameCard = createGameCard(game.title, game.path, game.stars, game.id);
        divToPlace.appendChild(gameCard);
    })
}

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

    // Ideally this should update the server too, but for now we keep local update logic
    for (let i = 0; i < games.length; i++) {
        if (games[i].id == gameCard.id) {
            games[i].stars = index;
            renderGames(games, gameContainer); 
            // TODO: Call updateGame(game.id, { stars: index }) if server persistence is needed
        }
    }
});