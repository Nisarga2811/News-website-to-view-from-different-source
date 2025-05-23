const bbcBtn=document.getElementById("bbc");
const searchBtn= document.getElementById("searchBtn");
const newsQuery=document.getElementById("newsQuery")
const newsType=document.getElementById("newsType")
const newsdetails=document.getElementById("newsdetails")

//array
var newsDataArray=[];
//apis
const API_KEY= "222271da5e6e4dbba719dcb6076aa07a"
const HEADLINES_NEWS="https://newsapi.org/v2/top-headlines?sources=the-hindu&apiKey=222271da5e6e4dbba719dcb6076aa07a"
const SEARCH_NEWS = "https://newsapi.org/v2/everything?sources=the-hindu&q="

window.onload = function() {
    newsType.innerHTML="<h4>Headlines</h4>";
    fetchHeadlines();
};



searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();
});

const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS);
    newsDataArray = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchQueryNews=async()=>{
    if(newsQuery.value==null){
        return;
    }

    const response= await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
    newsDataArray=[];
    if(response.status>=200 && response.status <300){
        const myJson= await response.json();
        newsDataArray=myJson.articles;
    }
    else{
        console.log(response.status, response.statusText);
    }
    displayNews();
}

function displayNews(){
newsdetails.innerHTML="";

    if(newsDataArray.length ==0){
        newsdetails.innerHTML = "<h5>No data found</h5>"
        return;
    }
    newsDataArray.forEach(news => {
var date=news.publishedAt.split("T")

        var col =document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2";

        var card=document.createElement('div');
        card.className="p-2";

        var image= document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardbody=document.createElement('div');

        var newsHeadling= document.createElement('h5');
        newsHeadling.className="card-title";
        newsHeadling.innerHTML=news.title;

        var dateHeading=document.createElement('h6');
        dateHeading.className="text-primary";
        dateHeading.innerHTML=date[0];

        var description =document.createElement('p');
        description.className="text-muted";
        description.innerHTML=news.description;

        var link =document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target","_blank");
        link.href=news.url;
        link.innerHTML="Read more..."


        cardbody.appendChild(newsHeadling);
        cardbody.appendChild(dateHeading);
        cardbody.appendChild(description);
        cardbody.appendChild(link)

        card.appendChild(image);
        card.appendChild(cardbody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
}