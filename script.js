const TYPES = [
  "normal","fire","water","electric","grass","ice","fighting","poison",
  "ground","flying","psychic","bug","rock","ghost","dragon",
  "dark","steel","fairy"
];

const type1 = document.getElementById("type1");
const type2 = document.getElementById("type2");
const results = document.getElementById("results");

TYPES.forEach(type=>{
    let o=document.createElement("option");
    o.value=type;
    o.textContent=type.charAt(0).toUpperCase()+type.slice(1);
    type1.appendChild(o);

    let o2=o.cloneNode(true);
    type2.appendChild(o2);
});

document.getElementById("searchBtn").onclick=async()=>{

    results.innerHTML="Loading...";

    const t1=type1.value;
    const t2=type2.value;

    if(!t1){
        results.innerHTML="Select at least one type.";
        return;
    }

    const url=`https://pokeapi.co/api/v2/type/${t1}`;
    const data=await fetch(url).then(r=>r.json());

    let pokemon=data.pokemon.map(p=>p.pokemon.name);

    if(t2){

        let data2=await fetch(`https://pokeapi.co/api/v2/type/${t2}`).then(r=>r.json());

        let second=new Set(data2.pokemon.map(p=>p.pokemon.name));

        pokemon=pokemon.filter(x=>second.has(x));
    }

    results.innerHTML=
        "<h3>"+pokemon.length+" Pokémon Found</h3><br>"+
        pokemon.join("<br>");
};