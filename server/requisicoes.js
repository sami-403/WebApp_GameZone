const BASE_URL = "http://localhost:3000/games";

export function getGames() {
  return fetch(BASE_URL).then(res => res.json());
}

export async function createGame(game) {
  const games = await getGames();

  if (games.some(g => g.id === game.id)) {
    throw new Error("ID já existe");
  }

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(game)
  });

  return response.json();
}

export function updateGame(id, game) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(game)
  }).then(res => res.json());
}

export function deleteGame(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
}