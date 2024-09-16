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
    const type = item.querySelectorAll('.info .type span')
    console.log(type);

    const colorBg = item.querySelector('.img-container')
    type.forEach(tp => {
      switch (true) {
        case tp.classList.contains('fire'):
          colorBg.style.backgroundColor = 'red';
          tp.style.backgroundColor = 'red';
          break;
        case tp.classList.contains('water'):
          colorBg.style.backgroundColor = 'blue';
          tp.style.backgroundColor = 'blue';
          break;
        case tp.classList.contains('grass'):
          colorBg.style.backgroundColor = 'green';
          tp.style.backgroundColor = 'green';
          break;
        case tp.classList.contains('electric'):
          colorBg.style.backgroundColor = 'yellow';
          tp.style.backgroundColor = 'yellow';
          tp.style.color = 'black';  // Para que o texto fique visível
          break;
        case tp.classList.contains('ice'):
          colorBg.style.backgroundColor = 'lightblue';
          tp.style.backgroundColor = 'lightblue';
          break;
        case tp.classList.contains('fighting'):
          colorBg.style.backgroundColor = 'brown';
          tp.style.backgroundColor = 'brown';
          break;
        case tp.classList.contains('poison'):
          colorBg.style.backgroundColor = 'purple';
          tp.style.backgroundColor = 'purple';
          break;
        case tp.classList.contains('ground'):
          colorBg.style.backgroundColor = 'sandybrown';
          tp.style.backgroundColor = 'sandybrown';
          break;
        case tp.classList.contains('flying'):
          colorBg.style.backgroundColor = 'skyblue';
          tp.style.backgroundColor = 'skyblue';
          break;
        case tp.classList.contains('psychic'):
          colorBg.style.backgroundColor = 'pink';
          tp.style.backgroundColor = 'pink';
          break;
        case tp.classList.contains('bug'):
          colorBg.style.backgroundColor = 'olive';
          tp.style.backgroundColor = 'olive';
          break;
        case tp.classList.contains('rock'):
          colorBg.style.backgroundColor = 'gray';
          tp.style.backgroundColor = 'gray';
          break;
        case tp.classList.contains('ghost'):
          colorBg.style.backgroundColor = 'indigo';
          tp.style.backgroundColor = 'indigo';
          break;
        case tp.classList.contains('dragon'):
          colorBg.style.backgroundColor = 'darkslateblue';
          tp.style.backgroundColor = 'darkslateblue';
          break;
        case tp.classList.contains('dark'):
          colorBg.style.backgroundColor = 'black';
          tp.style.backgroundColor = 'black';
          tp.style.color = 'white';  // Para que o texto fique visível
          break;
        case tp.classList.contains('steel'):
          colorBg.style.backgroundColor = 'lightgray';
          tp.style.backgroundColor = 'lightgray';
          break;
        case tp.classList.contains('fairy'):
          colorBg.style.backgroundColor = 'lightpink';
          tp.style.backgroundColor = 'lightpink';
          break;
        default:
          colorBg.style.backgroundColor = '';
          tp.style.backgroundColor = '';
          break;
      }tp
    })
    
  }
}
