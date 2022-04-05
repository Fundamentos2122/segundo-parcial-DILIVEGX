

// Diego Eugenio Saldívar Narváez

const keyListIng = "ingredientes";
const keyListRec = "recetas";
const ingrediente = document.getElementById("ingredient-name");
const ingList = document.getElementById("ingredient-temp-list");
const area = document.getElementById("view");
const areag = document.getElementById("views");
const areaex = document.getElementById("extended");
const title = document.getElementById("tit");
const title1 = document.getElementById("tit1");
const btn = document.getElementById("btns");


document.addEventListener("DOMContentLoaded", function(){
//localStorage.clear();
paintRec();
areaex.style.display = "none";
    title.style.display = "none";
    btn.style.display = "none";
})



function getIngs(){
    let list=JSON.parse(localStorage.getItem(keyListIng));

    if(list===null)
        return[];
    else
        return list;
}

function paintIng(){
    let list = getIngs();

    let html = '';

    for(var i=0;i<list.length;i++){
    html += `<li class="[ bg-white color-gray ]" id="${list[i].id}">
    ${list[i].text}
    <button class="close" type="button" onclick="deleteIng(${list[i].id})">X</button>
    </li>`;
    }
    ingList.innerHTML=html;
}

function getRecs(){
    let list=JSON.parse(localStorage.getItem(keyListRec));

    if(list===null)
        return[];
    else
        return list;
}

function paintRec(){
    let list = getRecs();

    let html = '';

    for(var i=0;i<list.length;i++){
    html += `<div class="[ card ] [ bg-secondary color-white ] [ radius shadow ]" id="${list[i].id}">
    <img src="${list[i].url}" alt="">
    <div class="[ flow ]">
        <h5>${list[i].name}</h5>
        <div class="[ flex ]" data-state="justify-between">
            <button class="[ btn ]" data-state="white" onclick="getRecipe(${list[i].id})">Ver</button>
            <button class="[ btn ]" data-state="warning" onclick="deleteRecipe(${list[i].id})">Eliminar</button>
        </div>
    </div>
</div>`;
    }
    area.innerHTML=html;
}

function deleteIng(id){
    let list = getIngs();

    list = list.filter(i=>i.id!==id);

    localStorage.setItem(keyListIng, JSON.stringify(list));

    let ing = document.getElementById(id);

    ing.remove();
}

function addr(){
    let name = document.getElementById("name");
    let url = document.getElementById("url");
    let desc = document.getElementById("desc");

    let rec={
        id: Date.now(),
        name: name.value,
        url: url.value,
        desc: desc.value,
        ings: getIngs()
    };

    let list = getRecs();


    list.push(rec);


    localStorage.setItem(keyListRec, JSON.stringify(list));
}

function guardaringrediente(){
    let ing={
        id: Date.now(),
        text: ingrediente.value
    };

    let list = getIngs();


    list.push(ing);


    localStorage.setItem(keyListIng, JSON.stringify(list));

    paintIng();
}

function deleteRecipe(id){
    let list = getRecs();

    list = list.filter(i=>i.id!==id);

    localStorage.setItem(keyListRec, JSON.stringify(list));

    let rec = document.getElementById(id);

    rec.remove();
}

function getRecipe(id){

    areag.style.display = "none";
    title1.style.display = "none";
    areaex.style.display = "block";
    title.style.display = "block";
    btn.style.display = "block";

    let list = getRecs();

    let html = '';

    for(var i=0;i<list.length;i++){
    if(id==list[i].id){
    html = `<div class="recipe-img">
    <img src="${list[i].url}" alt="">
</div>
<div class="[ recipe-info ] [ flow ]">
    <h2>${list[i].name}</h2>
    <div class="[ text-justify ]">${list[i].desc}</div>
    <h5>Ingredientes</h5>
    <ul class="[ recipe-ing ] [ flex ]" data-state="wrap">
        <li>${list[i].ings}</li>
    </ul>
</div>`;}
    }

    areaex.innerHTML=html;
}

function paintRecipeList(){
    areag.style.display = "block";
    title1.style.display = "block";
    areaex.style.display = "none";
    title.style.display = "none";
    btn.style.display = "none";
}

