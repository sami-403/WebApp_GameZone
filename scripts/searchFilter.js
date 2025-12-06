// Lista de jogos (Dados)
const games = [
  {
    id: 1,
    title: "Tomb Raider",
    platform: "PC",
    price: 180,
    path: "../img/tomb_raider.jpg",
  },
  {
    id: 2,
    title: "Street Fighter IV",
    platform: "Console",
    price: 120,
    path: "img/SFIVcover (1).jpg",
  },
  {
    id: 3,
    title: "Zelda The Legend of Zelda",
    platform: "PC",
    price: 200,
    path: "img/71mDA8PIXeL._AC_UF1000,1000_QL80_ (1).jpg",
  },
  {
    id: 4,
    title: "Sonic Mania",
    platform: "Portátil",
    price: 80,
    path: "img/Sonic_Mania_capa (1).png",
  },
  {
    id: 5,
    title: "Disco Elysium",
    platform: "PC",
    price: 120,
    path: "img/7b7d20d1-9772-40c4-bf23-236cdc3388b1.jpg",
  },
  {
    id: 6,
    title: "Bayonetta",
    platform: "Console",
    price: 150,
    path: "img/Bayonetta (Video Game) Font.jpg",
  },
  {
    id: 7,
    title: "Celeste",
    platform: "PC",
    price: 90,
    path: "img/celeste.jpg",
  },
  {
    id: 8,
    title: "Cuphead",
    platform: "PC",
    price: 120,
    path: "img/cuphead-cover.jpg",
  },
  {
    id: 9,
    title: "Call of Duty: Black Ops III",
    platform: "Console",
    price: 180,
    path: "img/da4d0bfa-e9b8-492d-80bf-08aa25f54cea.jpg",
  },
  {
    id: 10,
    title: "DOOM",
    platform: "PC",
    price: 130,
    path: "img/doom-cover.jpg",
  },
  {
    id: 11,
    title: "Final Fantasy VII Advent Children",
    platform: "Console",
    price: 160,
    path: "img/Final Fantasy VII_ Advent Children.jpg",
  },
  {
    id: 12,
    title: "Super Mario Galaxy",
    platform: "Console",
    price: 200,
    path: "img/Game_ Super Mario Galaxy.jpg",
  },
  {
    id: 13,
    title: "Minecraft",
    platform: "PC",
    price: 99,
    path: "img/Minecraft.jpg",
  },
  {
    id: 14,
    title: "Night in the Woods",
    platform: "Portátil",
    price: 80,
    path: "img/nightInTheWoods.jpg",
  },
  {
    id: 15,
    title: "OneShot",
    platform: "PC",
    price: 50,
    path: "img/oneShot.jpg",
  },
  {
    id: 16,
    title: "Pokémon Sword",
    platform: "Portátil",
    price: 200,
    path: "img/Pokemon Sword - Nintendo Switch (European Version) $51_91.jpg",
  },
  {
    id: 17,
    title: "Dragon Ball Sparking! Zero",
    platform: "Console",
    price: 250,
    path: "img/Portada Oficial Dragón Ball Sparking Zero.jpg",
  },
  {
    id: 18,
    title: "Sonic the Hedgehog (2006)",
    platform: "Console",
    price: 100,
    path: "img/Sonic the Hedgehog (jogo eletrônico de 2006) – Wikipédia, a enciclopédia livre.jpg",
  },
];

// Elementos do DOM
const gameContainer = document.querySelector(".imagens-flex");
const btnPC = document.querySelectorAll(".dispositivos .botao")[0];
const btnConsole = document.querySelectorAll(".dispositivos .botao")[1];
const btnPortatil = document.querySelectorAll(".dispositivos .botao")[2];
const btnTodos = document.querySelector(".botao-jogos");
const searchInputs = document.querySelectorAll(".searchInput"); // Pega input Mobile e Desktop

// Variáveis de controle
let platformFilter = [];
let searchTerm = "";
let showAll = false;

// Cria o HTML do card do jogo
function createGameCard(game) {
  const card = document.createElement("div");
  card.classList.add("gameCard");

  const img = document.createElement("img");
  img.src = game.path;
  img.alt = game.title;
  img.width = 250;
  img.height = 322;

  const info = document.createElement("div");
  info.classList.add("game-info");
  info.innerHTML = `<p>${game.title}</p><p>R$ ${game.price}</p>`;

  card.append(img, info);
  return card;
}

// Renderiza os jogos na tela (controla limite de 4 ou todos)
function renderCatalogo(list) {
  gameContainer.innerHTML = "";

  const visible = showAll ? list : list.slice(0, 4);

  visible.forEach((game) => gameContainer.appendChild(createGameCard(game)));

  btnTodos.textContent = showAll ? "Mostrar menos" : "Ver todos os Jogos";
}

// Aplica filtros de plataforma e busca simultaneamente
function filterGames() {
  const filtered = games.filter((game) => {
    const matchesPlatform =
      platformFilter.length === 0 || platformFilter.includes(game.platform);

    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesPlatform && matchesSearch;
  });

  renderCatalogo(filtered);
}

// Ativa/Desativa filtro de plataforma no botão
function togglePlatform(platform, button) {
  button.classList.toggle("clicked");

  if (platformFilter.includes(platform)) {
    platformFilter = platformFilter.filter((p) => p !== platform);
  } else {
    platformFilter.push(platform);
  }

  filterGames();
}

// Eventos de clique nos filtros
btnPC.addEventListener("click", () => togglePlatform("PC", btnPC));
btnConsole.addEventListener("click", () =>
  togglePlatform("Console", btnConsole)
);
btnPortatil.addEventListener("click", () =>
  togglePlatform("Portátil", btnPortatil)
);

// Botão "Ver todos"
btnTodos.addEventListener("click", () => {
  showAll = !showAll;
  filterGames();
});

// Evento de busca (Sincroniza inputs do PC e Mobile)
searchInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    searchInputs.forEach((i) => (i.value = searchTerm)); // Atualiza o outro input
    filterGames();
  });
});

// Inicialização
renderCatalogo(games);
