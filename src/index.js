import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from "./fetchCountries"

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("#search-box"),
    list:document.querySelector(".country-list"),
    div:document.querySelector(".country-info"),
}

let name = "";
refs.input.addEventListener("input", debounce((readInputValue), DEBOUNCE_DELAY))


function readInputValue(){
    name = refs.input.value.trim() ;
    fetchCountries(name).then(data => createMarkup (data)).catch(error =>failturePromise(error))
}

function failturePromise(error){    
    refs.list.innerHTML="";
    refs.div.innerHTML="";
    Notiflix.Notify.failure( "Oops, there is no country with that name");
    console.log(error)
}

function createMarkup (data) {   
        refs.list.innerHTML="";
        refs.div.innerHTML="";
    if(data.length >= 10){  
    return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
}
    if(data.length <10 || data.length > 1){
    data.map(country =>{
        
      
        let markup = `<li class="counry-list__item"><img src=${country.flags.svg} class ="flag" > <h2 class="country__name">${country.name}</h2></li>`
        refs.list.insertAdjacentHTML("afterbegin",markup)

    })

    if(data.length === 1){
        data.map(country =>{
        let markup = `
        <ul class= "country__info">
          <li><h3>Capital:</h3> ${country.capital}</li>
          <li><h3>Population:</h3> ${country.population} people</li>
          <li><h3>Languages:</h3> ${country.languages.map(lang => {return ` ${lang.name}`})}</li>
        </ul>`
        refs.div.insertAdjacentHTML("afterbegin",markup)})
    }
    
}
}
