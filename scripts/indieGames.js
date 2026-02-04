let games = [
    {
        title: "Celeste",
        developer: "Maddy Makes Games",
        releaseYear: 2018,
        platforms : ["PC", "CONSOLE"],
        stars: 3,
        path: "img/celeste.jpg",
        id: 1,
        indie: true
    },
    {
        title: "Night in the Woods",
        developer: "Infinite Fall",
        releaseYear: 2017,
        platforms : ["PC", "CONSOLE"],
        stars: 2,
        path: "img/nightInTheWoods.jpg",
        id: 2,
        indie: true
    },
    {
        title: "One shot",
        developer: "Eliza Velasquez, Night School Studio",
        releaseYear: 2016,
        platforms : ["PC", "CONSOLE"],
        stars: 5,
        path: "img/oneShot.jpg",
        id: 3,
        indie: true
    },
    {
        title: "The whitchs house",
        developer: "Fummy",
        releaseYear: 2012,
        platforms : ["PC"],
        stars: 0,
        path: "img/theWithchsHouse.jpg",
        id: 4,
        indie: true
    }
];

const gameContainer = document.querySelector('.jogos-principal');

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
    // const starIconPath = (starsToPlace == 0) ? '../img/star-icons/unselected-star.png' : '../img/star-icons/selected-star.png'
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
    //só pra ordenar msm, mas pode tirar se quiser
    
    gamesList.forEach(game => {
        const gameCard = createGameCard(game.title, game.path, game.stars, game.id);
        divToPlace.appendChild(gameCard);
    })
}

renderGames(games, gameContainer)


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