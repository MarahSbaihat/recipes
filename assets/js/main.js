var myRecipes = [];
var links = document.querySelectorAll('.nav-link');
for(var i=0; i<links.length; i++){
    links[i].addEventListener('click',function(e){
        getRecipes(e.target.text);
    });
}

getRecipes('pizza');

getRecipes();
async function getRecipes(meal){
    var response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    var data = await response.json();
    myRecipes = data.recipes;
    // console.log(myRecipes);
    displayData();
}

function displayData(){
    var result = ``;
    for (var i=0; i<myRecipes.length; i++){
        result+=`
        <div class="col-md-3">
        <div class="data">
            <h4 class"heading">${myRecipes[i].title}</h4>
            <img class="w-100 h-75" src="${myRecipes[i].image_url}" />
            <a data-bs-toggle="modal" data-bs-target="#recipeModal" class="btn btn-outline-dark mt-1" onclick="openDetails(${myRecipes[i].recipe_id})">Details</a>
        </div>
        </div>
        `;
    }
    document.getElementById('data').innerHTML=result;
}

async function openDetails(recipe_id){
    console.log(recipe_id)
    var response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipe_id}`);
    var result = await response.json();
    var recipeDetails = result.recipe;
    console.log(recipeDetails);
    var ingredients = recipeDetails.ingredients;
    var list =  ``;
    for(var i=0; i<ingredients.length; i++){
        list+=`<li>${ingredients[i]}</li>`
    }
    var data = `
        <h3>${recipeDetails.title}</h3>
        <img class="w-100" src="${recipeDetails.image_url}" />
        <h4>the ingredients is :</h4>
        <ul>${list}</ul>
        <h6>the rank is ${recipeDetails.social_rank}</h6>
    `;
    document.getElementById('recipeData').innerHTML = data ;
}
