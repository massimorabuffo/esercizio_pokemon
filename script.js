const getPokemon = async () => {
    const result = await fetch("https://pokeapi.co/api/v2/pokemon/")
    const dataJSON = await result.json()
   return dataJSON;
   console.log(dataJSON);

}
getPokemon()

function createLoading() {
    const element = document.createElement("div")
    element.innerHTML= "loading"
    element.setAttribute("id","loading")
    element.classList.add("title")
    const body = document.getElementsByTagName("body")
    body[0].prepend(element)
    // console.log(body[0]);
}

const renderData = async () =>{
    createLoading();
    try{
        const pokemonName= await getPokemon()
       const selectPokemon= createSelect(pokemonName.results)
        // console.log(pokemonName);
        const loading = document.getElementById("loading")
        loading.classList.add("invisibile")
        const body = document.getElementsByTagName("body")
        body[0].prepend(selectPokemon);
        catchEvent();
    }catch(error){
        console.error(error)
    }
}
renderData()

const createSelect = (arrPokemon) =>{
    const select= document.createElement("select")
    arrPokemon.forEach(element => {
      const option = document.createElement("option")
      option.setAttribute("value", element.name )
      option.textContent= element.name
      select.append(option)
    });
    return select
}

const getPokemonDetails = async (name) => {
    try{
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = result.json();
    return data;
    } catch (error){
        console.error(error);
    }
}

const catchEvent = () => {
   const select = document.querySelector("select");
   select.addEventListener("change", async (e) => {
    const pokemonValue = e.target.value;
    const pokemonDetails = await getPokemonDetails(pokemonValue);
    if(pokemonDetails){
        const pokemonImg = pokemonDetails.sprites.front_default
        console.log(pokemonImg)
        const img = document.createElement("img");
        img.setAttribute("src", pokemonImg);
        const body = document.getElementsByTagName("body");
        console.log(body[0])
        body[0].append(img);
        }
    // console.log(pokemonDetails);
    return pokemonDetails;
   })
   
}


