export class Pokemons {
  static search(namePokemon) {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`

    return fetch(endpoint)
      .then(pokemon => pokemon.json())
      .then(data => {
        const infos = {
          id: data.id,
          name: data.name.split(' ').map(letra => letra[0].toUpperCase() + letra.slice(1)).join(' '),
          type: data.types.map(typeName => typeName.type.name),
          image: data.sprites.front_default,
        }
        return infos
      })
  }
}

export class Pokedex {
  constructor(root) {
    this.root = document.querySelector(root);


    this.entrie = {};
    this.myTeam = []
  }
  async add(namePokemon) {
    const pokemon = await Pokemons.search(namePokemon)

    this.entrie = pokemon;
    this.showSearch()
    this.addToTeam()
  }
}

export class PokedexView extends Pokedex {
  constructor(root) {
    super(root);
    this.lista = this.root.querySelector(".showPokemons ul");

    this.showSearch();
    this.onSearch();
  }

  onSearch() {
    const btnSearch = this.root.querySelector('#input button')
    btnSearch.onclick = () => {
      const { value } = this.root.querySelector('#search-poke')
      this.add(value.toLowerCase())
    }
  }
  addToTeam() {
    const btnAdd = this.root.querySelector('.addToTeam')
    btnAdd.onclick = () => {
      this.myTeam = [this.entrie, ...this.myTeam]
      this.showMyTeam()
      console.log(this.myTeam);
    }

  }

  showMyTeam() {
    const myTeamList = this.root.querySelector('.myTeam ul')
    myTeamList.append(this.createPokemon())
  }

  showSearch() {
    this.removeAllPokemons();

    const nonePokemons = this.root.querySelector('.showPokemons ul')
    if (Object.keys(this.entrie).length === 0) {
      nonePokemons.classList.add('noneSearch')
    } else {
      nonePokemons.classList.remove('noneSearch')

      this.lista.append(this.createPokemon());
      this.addToTeam()
    }
  }
  createPokemon() {
    const item = document.createElement("li");
    item.innerHTML = `
            <div class="info">
                <p></p>
                <h3></h3>
                <div class="type water">
                  <i class="ph-bold ph-drop"></i>
                  <span></span>
                </div>
            </div>
            <div class="img-container">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/8.png"
                  alt=""
                />
                <button class="addToTeam"><i class="ph-bold ph-heart"></i></button>
            </div>
        `;
    item.querySelector(".info p").textContent = `Nº${this.entrie.id.toString().padStart(3, '0')}`;
    item.querySelector(".info h3").textContent = `${this.entrie.name}`;
    item.querySelector(".info .type span").textContent = `${this.entrie.type}`;
    item.querySelector(".img-container img").src = `${this.entrie.image}`;
    return item

  }
  removeAllPokemons() {
    this.lista.querySelectorAll("li").forEach((item) => {
      item.remove();
    });
  }
}
