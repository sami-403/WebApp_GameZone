document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("fav-list");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.length === 0) {
        list.innerHTML = "<p>Sem favoritos</p>";
        return;
    }
    favorites.forEach(game => {
        const item = document.createElement("div");
        item.classList.add("fav-item");
        item.innerHTML = `<div style="position: relative"><img src="${game.img}" data-id="${game.id}"> <button class="favbutton">Remover</button></div>`;
        list.appendChild(item);
    });
    list.addEventListener("click", function (event) {
        if (event.target.classList.contains("favbutton")) {
            const item = event.target.parentElement;
            const id = item.querySelector("img").dataset.id;
            favorites = favorites.filter(fav => fav.id !== id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            item.parentElement.remove();
            if (favorites.length === 0) {
                list.innerHTML = "<p>Sem favoritos</p>";
            }
        }
    });
});