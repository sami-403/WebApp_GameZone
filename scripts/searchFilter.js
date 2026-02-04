import { getGames } from "../server/requisicoes.js";


// Dados vindos da API
let games = [];

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
  // Estrutura compatível com o sistema de favoritos
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.innerHTML = `
    <img src="${game.path}" alt="${game.title}" data-id="${game.id}" data-img="${game.path}" />
  `;

  const info = document.createElement("div");
  info.classList.add("game-info");
  info.innerHTML = `<p>${game.title}</p>${game.price !== undefined ? `<p>R$ ${game.price}</p>` : ""}`;

  card.append(wrapper, info);
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
    const title = (game.title || "").toLowerCase();
    if (searchTerm && !title.includes(searchTerm.toLowerCase())) return false;

    if (platformFilter.length === 0) return true;

    // Normaliza plataformas (pode ser "PC" ou ["PC", "Console"])
    let platforms = [];
    if (Array.isArray(game.platforms)) {
      platforms = game.platforms.map(p => p.toString().toUpperCase());
    } else if (game.platform) {
      platforms = [game.platform.toString().toUpperCase()];
    } else if (game.platforms) { // Caso seja string única em 'platforms' por erro dbe dados
       platforms = [game.platforms.toString().toUpperCase()];
    }

    return platformFilter.every((pf) =>
      platforms.some((p) => p.includes(pf.toString().toUpperCase())),
    );
  });

  renderCatalogo(filtered);
}

// Ativa/Desativa filtro de plataforma no botão
function togglePlatform(platform, button) {
  button.classList.toggle("clicked");
  const normalized = platform.toString().toUpperCase();
  if (platformFilter.includes(normalized)) {
    platformFilter = platformFilter.filter((p) => p !== normalized);
  } else {
    platformFilter.push(normalized);
  }

  filterGames();
}

// Eventos de clique nos filtros
btnPC.addEventListener("click", () => togglePlatform("PC", btnPC));
btnConsole.addEventListener("click", () =>
  togglePlatform("Console", btnConsole),
);
btnPortatil.addEventListener("click", () =>
  togglePlatform("Portátil", btnPortatil),
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

// Inicialização: buscar dados da API
getGames()
  .then((data) => {
    games = data;
    renderCatalogo(games);
  })
  .catch((e) => {
    console.error(e);
    games = [];
    renderCatalogo(games);
  });
