import { updateFavoriteButtons } from "./addfavorites.js";

export function renderFavoritesList() {
    const list = document.getElementById("fav-list");
    if (!list) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    list.innerHTML = ""; // Clear current list

    if (favorites.length === 0) {
        list.innerHTML = "<p>Sem favoritos</p>";
        return;
    }

    favorites.forEach(game => {
        const item = document.createElement("div");
        item.classList.add("fav-item");
        item.classList.add("gameCard");
        item.innerHTML = `<div style="position: relative"><img src="${game.img}" data-id="${game.id}"> <button class="remove-fav-button">Remover</button></div>`;
        list.appendChild(item);
    });
}

// Initial render
document.addEventListener("DOMContentLoaded", renderFavoritesList);

// Logic to handle removal click (delegated)
const list = document.getElementById("fav-list");
if (list) {
    list.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-fav-button")) {
            const item = event.target.closest(".fav-item");
            const img = item.querySelector("img");
            const id = img.dataset.id;
            
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            favorites = favorites.filter(fav => String(fav.id) !== String(id));
            localStorage.setItem("favorites", JSON.stringify(favorites));
            
            renderFavoritesList(); // Re-render list
            updateFavoriteButtons(); // Sync other buttons on page
        }
    });
}