import { getGames, createGame, deleteGame, updateGame } from "../server/requisicoes.js";

const form = document.getElementById("addGameForm");
const gamesList = document.getElementById("gamesList");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const gameIdInput = document.getElementById("gameId");

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
            <div>
                <button class="manage-btn" style="background-color: #ffc107; color: black; margin-right: 5px;" onclick='editGame(${JSON.stringify(game).replace(/'/g, "&#39;")})'>Editar</button>
                <button class="delete-btn" data-id="${game.id}">Excluir</button>
            </div>
        `;
        
        gamesList.appendChild(div);
    });
}

// Make editGame available globally
window.editGame = (game) => {
    document.getElementById("title").value = game.title;
    document.getElementById("developer").value = game.developer;
    document.getElementById("releaseYear").value = game.releaseYear;
    document.getElementById("price").value = game.price || 0;
    document.getElementById("path").value = game.path;
    document.getElementById("platform").value = game.platforms ? game.platforms[0] : (game.platform || "PC");
    document.getElementById("about").value = game.about || "";
    gameIdInput.value = game.id;
    
    submitBtn.textContent = "Atualizar Jogo";
    cancelBtn.style.display = "inline-block";
    window.scrollTo(0, 0);
};

function resetForm() {
    form.reset();
    gameIdInput.value = "";
    submitBtn.textContent = "Salvar Jogo";
    cancelBtn.style.display = "none";
}

cancelBtn.addEventListener("click", resetForm);

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const id = gameIdInput.value;
    
    const gameData = {
        title: document.getElementById("title").value,
        developer: document.getElementById("developer").value,
        releaseYear: parseInt(document.getElementById("releaseYear").value),
        price: parseFloat(document.getElementById("price").value),
        path: document.getElementById("path").value,
        platform: document.getElementById("platform").value,
        platforms: [document.getElementById("platform").value], // For compatibility
        about: document.getElementById("about").value,
        stars: 0 // Default or preserve? For now default.
    };
    
    // Preserve ID if updating
    if (id) gameData.id = id;

    try {
        if (id) {
            await updateGame(id, gameData);
            alert("Jogo atualizado com sucesso!");
        } else {
            await createGame(gameData);
            alert("Jogo adicionado com sucesso!");
        }
        resetForm();
        loadGames();
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar jogo.");
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
