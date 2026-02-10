import { getGames, createGame, deleteGame } from "../server/requisicoes.js";

const form = document.getElementById("addGameForm");
const gamesList = document.getElementById("gamesList");

async function loadGames() {
    try {
        const games = await getGames();
        renderList(games);
    } catch (error) {
        console.error("Erro ao carregar jogos:", error);
        gamesList.innerHTML = "<p>Erro ao carregar jogos. Verifique se o servidor está rodando.</p>";
    }
}

function renderList(games) {
    gamesList.innerHTML = "";
    // Show newest first
    const sorted = games.reverse(); 
    
    sorted.forEach(game => {
        const div = document.createElement("div");
        div.classList.add("game-list-item");
        
        div.innerHTML = `
            <div class="game-info-mini">
                <img src="${game.path}" alt="${game.title}" onerror="this.src='img/default.jpg'">
                <div>
                    <strong>${game.title}</strong><br>
                    <small>ID: ${game.id}</small>
                </div>
            </div>
            <button class="delete-btn" data-id="${game.id}">Excluir</button>
        `;
        
        gamesList.appendChild(div);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const newGame = {
        title: document.getElementById("title").value,
        developer: document.getElementById("developer").value,
        releaseYear: parseInt(document.getElementById("releaseYear").value),
        price: parseFloat(document.getElementById("price").value),
        path: document.getElementById("path").value,
        platform: document.getElementById("platform").value,
        platforms: [document.getElementById("platform").value], // For compatibility
        about: document.getElementById("about").value,
        stars: 0
    };

    try {
        await createGame(newGame);
        alert("Jogo adicionado com sucesso!");
        form.reset();
        loadGames();
    } catch (error) {
        console.error("Erro ao adicionar:", error);
        alert("Erro ao adicionar jogo.");
    }
});

gamesList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        if (confirm("Tem certeza que deseja excluir este jogo?")) {
            try {
                await deleteGame(id);
                loadGames();
            } catch (error) {
                console.error("Erro ao excluir:", error);
                alert("Erro ao excluir jogo.");
            }
        }
    }
});

// Initial Load
document.addEventListener("DOMContentLoaded", loadGames);
