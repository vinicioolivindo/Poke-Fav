export class Pokedex {
  constructor(root) {
    this.root = document.querySelector(root);
    

    this.entries = [
        {
          id: 7,
          name: "Squirtle",
          type: "Water",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/7.png",
        },
        {
            id: 8,
            name: "Squirtle",
            type: "Wartortle",
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/8.png",
          },
      ];
      this.myTeam = [
        
      ]
  }
}

export class PokedexView extends Pokedex {
  constructor(root) {
    super(root);
    this.lista = this.root.querySelector(".showPokemons ul");
    
    this.update();
  }

  update() {
    this.removeAllPokemons();

    this.entries.forEach((info) => {

      const item = this.createPokemon();

      item.querySelector(".info p").textContent = `Nº00${info.id}`;
      item.querySelector(".info h3").textContent = `${info.name}`;
      item.querySelector(".info span").textContent = `${info.type}`;
      item.querySelector(".img-container img").src = `${info.image}`;

      this.lista.append(item);
    });
  }
  createPokemon() {
    let item = document.createElement("li");
    item.innerHTML = `
            <div class="info">
                <p>Nº008</p>
                <h3>Wartortle</h3>
                <span class="water"></span>
            </div>
            <div class="img-container">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/8.png"
                  alt=""
                />
            </div>
        `;
    return item;
  }
  removeAllPokemons() {
    this.lista.querySelectorAll("li").forEach((item) => {
      item.remove();
    });
  }
}
