/*the data is coming from newsapi.org, on login ,the api key will be generated 
which is stored in api_key variable.

url is also there,we have just taken 
the part of url till query bcz we want to  get data accn to ourselves.

the response of the api is in the json format which we can see in the console or
on the newsapi.org,we will get the elements like title,image,url etc from here
which is used to manipulate the things.

*/



const api_key="d2699202a4404604944129714c0fbb20";
const url="https://newsapi.org/v2/everything?q=";


//load is an even listener,whenever the site gets loaded,it will fetch the news of India
//where India is a query
window.addEventListener('load',()=>fetchNews("India"));


//logo click
//it will reload the page i.e the basic news of India.
function reload(){
    window.location.reload();

}

/*this is async function,we need to wait till we get the response from the api */
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${api_key}`);//url is from the var url ,it should be in this form--"https://newsapi.org/v2/everything?q=tesla&from=2023-07-26&sortBy=publishedAt&apiKey=d2699202a4404604944129714c0fbb20"
    const data= await res.json();//we will get response in json format
    //console.log(data); you can see the data here

    bindData(data.articles);
}

//we need to clone the tempelate as many acticles we will get and append it 
//in the cards-container.
function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');//bcz we need to append here
    const newsCardTemplate=document.getElementById('template-news-card');//the template which we need to clone
    //if api is called multiple times,it will bind the data multiple times,so content will repeat
    //we stop it by this
    cardsContainer.innerHTML='';

    articles.forEach((article) => {
        //if article does't have image,it wont be displayed on the website
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true) ;//it creates copy of the template and returns the clone,true means deep cloning,means it will copy everything in the tempelate.
        fillDataInCard(cardClone,article);//to fill the data in card
        cardsContainer.appendChild(cardClone);
    });
}


function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');
    

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    

    const date=new Date(article.publishedAt).toLocaleString("en-US",{timezone:"Asia/Jakarta"});//to change the timezone
    newsSource.innerHTML=`${article.source.name}.${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    });//if we will click on any news,it will open in blank page 
}


//navbar 


let curSelectedItem=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedItem?.classList.remove('active');//adding and removing active class as needed
    curSelectedItem=navItem;
    curSelectedItem.classList.add('active');
}


//searchbar
const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;//if search button is clicked without any query it will return
    fetchNews(query);
    curSelectedItem.classList.remove('active');
    curSelectedItem=null;
})

