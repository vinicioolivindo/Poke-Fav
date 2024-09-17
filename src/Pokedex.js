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
    this.myTeam = [];
    this.load();
  }

  load() {
    const storedEntries = JSON.parse(localStorage.getItem('@pokemons-myTeam:'));
    this.myTeam = Array.isArray(storedEntries) ? storedEntries : [];
  }

  save() {
    localStorage.setItem('@pokemons-myTeam:', JSON.stringify(this.myTeam));
  }

  async add(namePokemon) {
    const pokemon = await Pokemons.search(namePokemon);

    if (pokemon === null) {
      alert('Pokémon não encontrado, verifique o nome');
      return;
    }

    this.entrie = pokemon;
    this.showSearch();
    this.addToTeam();
  }
}

export class PokedexView extends Pokedex {
  constructor(root) {
    super(root);
    this.lista = this.root.querySelector(".showPokemons ul");

    this.showSearch();
    this.onSearch();
    this.showMyTeam(); // Mostrar os Pokémon salvos quando a página é carregada
  }

  onSearch() {
    const btnSearch = this.root.querySelector('#input button');
    btnSearch.onclick = () => {
      const { value } = this.root.querySelector('#search-poke');
      this.add(value.toLowerCase());
    };
  }

  addToTeam() {
    const btnAdd = this.root.querySelector('.addToTeam');
    btnAdd.onclick = () => {
      try{
        const pokemonExistInTeam = this.myTeam.find(pokemon => pokemon.name === this.entrie.name)
        if(pokemonExistInTeam){
          throw new Error('Este Pokemon ja esta em seu time')
        }
        this.myTeam = [this.entrie, ...this.myTeam];
        this.showMyTeam();
        this.save();
      } catch(error){
        alert(error.message)
      }
    };
  }

  showMyTeam() {
    const myTeamList = this.root.querySelector('.myTeam ul');
    myTeamList.innerHTML = ''; // Limpar a lista antes de adicionar

    if (this.myTeam.length === 0) {
      myTeamList.classList.add('teamEmpty');
    } else {
      myTeamList.classList.remove('teamEmpty');
    }

    this.myTeam.forEach(pokemon => {
      const item = this.createPokemonFromData(pokemon);
      myTeamList.append(item);
      item.querySelector('.img-container').style.background = 'none'
    });
  }

  showSearch() {
    this.removeAllPokemons();

    const nonePokemons = this.root.querySelector('.showPokemons ul');
    if (Object.keys(this.entrie).length === 0) {
      nonePokemons.classList.add('noneSearch');
    } else {
      nonePokemons.classList.remove('noneSearch');

      this.lista.append(this.createPokemon());
      this.addToTeam();
    }
  }

  createPokemon() {
    const item = document.createElement("li");
    item.innerHTML = `
            <div class="info">
                <p></p>
                <h3></h3>
                <div class="type "></div>
            </div>
            <div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/8.png" alt="" />
                <button class="addToTeam"><i class="ph-bold ph-heart"></i></button>
            </div>
        `;
    item.querySelector(".info p").textContent = `Nº${this.entrie.id.toString().padStart(3, '0')}`;
    item.querySelector(".info h3").textContent = `${this.entrie.name}`;

    this.entrie.type.forEach(tp => {
      const spanType = document.createElement('span');
      spanType.textContent = tp;
      spanType.classList.add(tp);
      item.querySelector('.info .type').append(spanType);
    });
    item.querySelector(".img-container img").src = `${this.entrie.image}`;
    this.toogleType(item);
    return item;
  }

  createPokemonFromData(pokemon) {
    const item = document.createElement("li");
    item.innerHTML = `
            <div class="info">
                <p>Nº${pokemon.id.toString().padStart(3, '0')}</p>
                <h3>${pokemon.name}</h3>
                <div class="type "></div>
            </div>
            <div class="img-container">
                <img src="${pokemon.image}" alt="" />
            </div>
        `;
    pokemon.type.forEach(tp => {
      const spanType = document.createElement('span');
      spanType.textContent = tp;
      spanType.classList.add(tp);
      item.querySelector('.info .type').append(spanType);
    });
    this.toogleType(item);
    return item;
  }

  removeAllPokemons() {
    this.lista.querySelectorAll("li").forEach((item) => {
      item.remove();
    });
  }

  toogleType(item) {
    const types = item.querySelectorAll('.info .type span');
    const bg = item.querySelector('.img-container');

    const typeColors = {
      fire: 'red',
      water: 'blue',
      grass: 'green',
      electric: 'yellow',
      ice: 'lightblue',
      fighting: 'brown',
      poison: 'purple',
      ground: 'sandybrown',
      flying: 'skyblue',
      psychic: 'pink',
      bug: 'olive',
      rock: 'gray',
      ghost: 'indigo',
      dragon: 'darkslateblue',
      dark: 'black',
      steel: 'lightgray',
      fairy: 'lightpink'
    };

    if (types.length > 0) {
      const firstType = types[0].classList[0];
      bg.style.backgroundColor = typeColors[firstType] || '';
    }

    types.forEach(tp => {
      const type = tp.classList[0];
      tp.style.backgroundColor = typeColors[type] || '';
      if (type === 'electric') tp.style.color = 'black';
      if (type === 'dark') tp.style.color = 'white';
    });
  }
}
