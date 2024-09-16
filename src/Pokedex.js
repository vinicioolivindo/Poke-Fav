export class Pokemons {
  static async search(namePokemon) {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Pokémon não encontrado');
      }

      const data = await response.json();
      const infos = {
        id: data.id,
        name: data.name.split(' ').map(letra => letra[0].toUpperCase() + letra.slice(1)).join(' '),
        type: data.types.map(typeName => typeName.type.name),
        image: data.sprites.front_default,
      };
      return infos;
    } catch (error) {
      console.error(error.message);
      return null;  // Retorna null se o Pokémon não for encontrado ou se ocorrer um erro
    }
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

    if (pokemon === null) {
      alert('Pokemon nao encontrado, verifique o nome')
    }
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
    this.showMyTeam()
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
    if (this.myTeam.length === 0) {
      myTeamList.classList.add('teamEmpty')
    } else {
      myTeamList.classList.remove('teamEmpty')
    }
    const pokemonAddToTeam = this.createPokemon()
    pokemonAddToTeam.querySelector('.img-container').style.background = 'none'
    myTeamList.append(pokemonAddToTeam)
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
                <div class="type ">
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
    this.entrie.type.forEach(tp => {
      const spanType = document.createElement('span');
      spanType.textContent = tp;
      spanType.classList.add(tp); // Adiciona a classe correspondente ao tipo
      item.querySelector('.info .type').append(spanType);
    });
    item.querySelector(".img-container img").src = `${this.entrie.image}`;
    this.toogleType(item)
    return item

  }
  removeAllPokemons() {
    this.lista.querySelectorAll("li").forEach((item) => {
      item.remove();
    });
  }
  toogleType(item) {
    const types = item.querySelectorAll('.info .type span');
    const bg = item.querySelector('.img-container');
    let colorBg = '';  // Variável para armazenar a cor de fundo

    const firstType = types[0].classList[0];
      switch (firstType) {
        case 'fire':
          colorBg = 'red';
          break;
        case 'water':
          colorBg = 'blue';
          break;
        case 'grass':
          colorBg = 'green';
          break;
        case 'electric':
          colorBg = 'yellow';
          break;
        case 'ice':
          colorBg = 'lightblue';
          break;
        case 'fighting':
          colorBg = 'brown';
          break;
        case 'poison':
          colorBg = 'purple';
          break;
        case 'ground':
          colorBg = 'sandybrown';
          break;
        case 'flying':
          colorBg = 'skyblue';
          break;
        case 'psychic':
          colorBg = 'pink';
          break;
        case 'bug':
          colorBg = 'olive';
          break;
        case 'rock':
          colorBg = 'gray';
          break;
        case 'ghost':
          colorBg = 'indigo';
          break;
        case 'dragon':
          colorBg = 'darkslateblue';
          break;
        case 'dark':
          colorBg = 'black';
          break;
        case 'steel':
          colorBg = 'lightgray';
          break;
        case 'fairy':
          colorBg = 'lightpink';
          break;
        default:
          colorBg = ''; // Cor padrão se nenhum tipo for encontrado
          break;
      }

      // Aplica a cor de fundo ao img-container
      bg.style.backgroundColor = colorBg;

    // Ajusta a cor de fundo para todos os tipos
    types.forEach(tp => {
      tp.style.backgroundColor = colorBg;
      if (firstType === 'electric') {
        tp.style.color = 'black';  // Ajuste especial para o tipo 'dark'
      }
    });
  }
}
