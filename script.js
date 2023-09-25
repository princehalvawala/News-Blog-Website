const API_KEY = "5385b717a7ff69e9f499004d3888cd91";
const url_p1 = "https://gnews.io/api/v4/search?q="
const url_p2 ="&lang=en&country=in&max=10&apikey=";




function fetchNews(query)
{
    
    url = `${url_p1}${query}${url_p2}${API_KEY}`
    fetch(url)
    .then(function (response) {
        return response.json();
        
    })
    .then(function (data) {
        bindData(data.articles)
        //articles = data.articles;

        //for (i = 0; i < articles.length; i++) {
        // articles[i].title
        //console.log("Title: " + articles[i]['title']);
        // articles[i].description
        //console.log("Description: " + articles[i]['description']);
        // You can replace {property} below with any of the article properties returned by the API.
        // articles[i].{property}
        // console.log(articles[i]['{property}']);

        // Delete this line to display all the articles returned by the request. Currently only the first article is displayed.
        //break;
        //}
    });
}
window.addEventListener("load",() => fetchNews("India"));

function  reload() {
     window.location.reload();
}

// async function fetchNews(query) {
//     const res = await fetch(`${url_p1}${query}${url_p2}${API_KEY}`);
//     const data = await res.json();
//     bindData(data.articles);
// }

function bindData(articles) {
    

    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');


     cardsContainer.innerHTML = "";

     articles.forEach(article => {
        // if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone,article);


        cardsContainer.appendChild(cardClone);

     });
 


}

 function fillDataInCard(cardClone, article){
    // alert("idhar pouch gaya")
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.image;
    
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{

        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date} `;

    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(article.url,"_blank");
    })
}


let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById('search-button'); 
const searchText = document.getElementById('search-text');


searchButton.addEventListener('click',() => {
     const query = searchText.value;
     if(!query) return;
     fetchNews(query);
     curSelectedNav?.classList.remove("active");
     curSelectedNav = null;
 })
