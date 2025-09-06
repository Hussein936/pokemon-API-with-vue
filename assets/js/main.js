const apiLink = "https://pokeapi.co/api/v2/pokemon/";

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There is an error");
        return null; 
    }
}

async function searchPokemon() {
    const inputField = document.querySelector(".searchPoke");
    const nameOfPoke = inputField.value;

    const newUrl = `${apiLink}${nameOfPoke}`;
    const newData = await fetchData(newUrl);
    console.log(newData);

    document.querySelector(".name").innerText = newData.name;
    document.querySelector(".num").innerText = `#${newData.id}`;
    document.querySelector(".sprite").setAttribute("src", newData.sprites.front_default);
    document.querySelector(".he-we").innerHTML = `<span>Ht ${newData.height / 10}m · Wt ${newData.weight / 10}kg</span>`;

    const typesContainer = document.querySelector(".types");
    typesContainer.innerHTML = "";

    newData.types.forEach(typeInfo => {
        const spanTypes = document.createElement('span');
        spanTypes.classList.add('badge', `type-${typeInfo.type.name}`);
        spanTypes.innerText = typeInfo.type.name;
        typesContainer.appendChild(spanTypes);
    });

}

document.querySelector("#getPoke").addEventListener("click", searchPokemon);