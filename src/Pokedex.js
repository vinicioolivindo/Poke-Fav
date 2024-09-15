export class Pokemons{
  static search(namePokemon){
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`

    return fetch(endpoint)
    .then(pokemon => pokemon.json())
    .then(data => {
      const infos = {
          id: data.id,
          name: data.name.split(' ').map(letra => letra[0].toUpperCase()+letra.slice(1)).join(' '),
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
    

    this.entries = [];
    this.myTeam = []
  }
  async add(namePokemon){
    const pokemon = await Pokemons.search(namePokemon)

    console.log(pokemon);
    this.entries = [pokemon,...this.entries]
    this.update()
  }
}

export class PokedexView extends Pokedex {
  constructor(root) {
    super(root);
    this.lista = this.root.querySelector(".showPokemons ul");
    
    this.update();
    this.onSearch();
  }

  onSearch(){
    const btnSearch = this.root.querySelector('#input button')
    btnSearch.onclick = () => {
      const { value } = this.root.querySelector('#search-poke')
      
      this.add(value)
    }
  }

  update() {
    this.removeAllPokemons();
    const nonePokemons = this.root.querySelector('.showPokemons ul')
    if(this.entries.length == 0){
      nonePokemons.classList.add('noneSearch')
    }else{
      nonePokemons.classList.remove('noneSearch')
    }

    this.entries.forEach((info) => {

      const item = this.createPokemon();

      item.querySelector(".info p").textContent = `Nº00${info.id}`;
      item.querySelector(".info h3").textContent = `${info.name}`;
      item.querySelector(".info .type span").textContent = `${info.type}`;
      item.querySelector(".img-container img").src = `${info.image}`;

      this.lista.append(item);
    });
  }
  createPokemon() {
    let item = document.createElement("li");
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
