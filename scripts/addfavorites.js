import { renderFavoritesList } from "./favorites.js";

// Função para atualizar o texto de TODOS os botões na tela
export function updateFavoriteButtons() {
    const buttons = document.querySelectorAll(".favbutton");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    buttons.forEach(btn => {
        const game = btn.parentElement.querySelector("img");
        if (!game) return;
        const id = game.dataset.id;
        const isFav = favorites.some(item => String(item.id) === String(id));
        
        btn.textContent = isFav ? "Favoritado" : "Favoritar";
        // Opcional: Adicionar classe para estilização diferente quando favoritado
        if (isFav) btn.classList.add("favorited");
        else btn.classList.remove("favorited");
    });
}

// Inicializa o listener de CLICK (Event Delegation) no documento
// Deve ser chamado apenas uma vez na aplicação (ou verifica flag)
let isListenerAttached = false;

export function initFavoritesListener() {
    if (isListenerAttached) return;
    isListenerAttached = true;

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("favbutton")) {
            const btn = e.target;
            const game = btn.parentElement.querySelector("img");
            if (!game) return;

            const addgame = { id: game.dataset.id, img: game.dataset.img };
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            
            const exists = favorites.some(item => String(item.id) === String(addgame.id));

            if (!exists) {
                favorites.push(addgame);
            } else {
                favorites = favorites.filter(item => String(item.id) !== String(addgame.id));
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
            
            // Atualiza visualmente todos os botões imediatamente
            updateFavoriteButtons();
            
            // Se houver uma lista de favoritos na página, atualiza ela também
            if (typeof renderFavoritesList === "function") {
                renderFavoritesList();
            }
        }
    });
}

// Auto-init se importado (Garante que o listener exista)
initFavoritesListener();
