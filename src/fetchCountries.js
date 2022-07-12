
import Notiflix from 'notiflix';

  function fetchCountries(name, callback){
    fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages `).then((response) => {
      
       if(response.status === 404){
        Notiflix.Notify.failure("Oops, there is no country with that name");
        refs.list.innerHTML="";
        refs.div.innerHTML="";
       return Promise.reject("404")
       }; return response.json()}).then(data => callback(data))                  
}



 const refs = {
    input: document.querySelector("#search-box"),
    list:document.querySelector(".country-list"),
    div:document.querySelector(".country-info"),
}

export {fetchCountries, refs}