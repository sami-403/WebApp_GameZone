document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".favbutton");
    function updatebtn() {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        buttons.forEach(btn => {
            const game = btn.parentElement.querySelector("img");
            const id = game.dataset.id;
            const isFav = favorites.some(item => item.id === id);
            if (isFav) {
                btn.textContent = "Favoritado";
            } else {
                btn.textContent = "Favoritar";
            }
        });
    }
    updatebtn();
    buttons.forEach(btn => {
        btn.addEventListener("click", function () {
            const game = btn.parentElement.querySelector("img");
            const addgame = { id: game.dataset.id, img: game.dataset.img };
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const verifyid = favorites.some(item => item.id === addgame.id);
            if (!verifyid) {
                favorites.push(addgame);
            } else {
                favorites = favorites.filter(item => item.id !== addgame.id);
            }
            localStorage.setItem("favorites", JSON.stringify(favorites));
            updatebtn();
        });
    });
});
