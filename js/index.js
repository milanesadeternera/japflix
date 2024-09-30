const URL="https://japceibal.github.io/japflix_api/movies-data.json"
let movieData=[];
document.addEventListener("DOMContentLoaded", async ()=>{

    //cargo elementos
    await fetch(URL)
        .then(response =>{ return response.json()})
        .then(data => { movieData = data})
        .catch(error => {console.log("Error cargando info")});

    //console.log(movieData);
    //event listener botón
    document.getElementById("btnBuscar").addEventListener("click", buscar);

    //mostrar algo en pantalla automático.
    buscar();

});

function buscar(){
    let search = document.getElementById("inputBuscar").value.toLowerCase();
    let movies = [];
    if(search != ''){
        movies = movieData.filter((movie) => 
            movie.title.toLowerCase().includes(search) ||
            movie.tagline.toLowerCase().includes(search) ||
            movie.overview.toLowerCase().includes(search) || 
            movie.genres.some( genre => genre.name.toLowerCase().includes(search))
        );
    }
    console.log("coincidencias:")
    console.log(movies);
    displayMovies(movies);
}



function displayMovies(movies){
    let content = "";
    movies.forEach(movie => {
        content += `
            <li class="button list-group-item cursor-active d-flex justify-content-between align-items-start" onclick="offcanvas(${movie.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMovie" aria-controls="offcanvasTop">
            <div class="ms-2 me-auto">
              <div  class="fw-bold">${movie.title}</div>
              <p id="tagline" class="fw-lighter">${movie.tagline}</p>
            </div>`;

        //estrellas
            for(i=1; i<=5 ; i++){
                if(Math.round(movie.vote_average/2)<=i){
                    //estrella color
                    content += `<span class="badge text-bg-primary rounded-pill star">★</span>`;
                }else{
                    content += `<span class="badge text-bg-primary rounded-pill star checked">★</span>`;
                }
            }
        content +=`</li>`;
        document.getElementById("lista").innerHTML = content;
    });
}

function offcanvas(movieId){
    movie = movieData.find((movie) => movie.id == movieId);

    document.getElementById("offcanvasMovieLabel").innerHTML = movie.title;
    document.getElementById("offcanvasMovieOverview").innerHTML = movie.overview;
    let genres= movie.genres.map(genre => genre.name);
    document.getElementById("offcanvasMovieGenre").innerHTML = genres.join(" - ");

    //dropmenu
    document.getElementsByClassName("dropdown-menu")[0].innerHTML = `
              <li><a class="dropdown-item"><p>Year:</p><p>${movie.release_date.split("-")[0]}</p></a></li>
              <li><a class="dropdown-item"><p>Runtime:</p><p>${movie.runtime} mins</p></a></li>
              <li><a class="dropdown-item"><p>Budget:</p><p>$${movie.budget}</p></a></li>
              <li><a class="dropdown-item"><p>Revenue:</p><p>$${movie.revenue}</p></a></li>
    `;

    console.log(movie)
}