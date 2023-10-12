'use strict';

//selectors here
const input = document.querySelector('.kol');
const btns = document.querySelectorAll('.btn');
const passWord = document.querySelector('.passWord');
const productPrice = document.querySelectorAll('.product_price_list');
const formLogin = document.querySelector('.form');

input?.addEventListener('input', async function(e){
    let response = await fetch(`/search?q=${this.value}`);
    let searchList = await response.json();
    let html = '';
    for (let s in searchList) {
        let title = searchList[s].title.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
        html += `<li class="li"><a class="anchor" href="/view/${title}">${title}</a></li>`;
        }
    document.querySelector('.ul').innerHTML = html;
});

btns?.forEach((...btn)=>{
    btn[0].addEventListener('click', function(){
      this.innerHTML++;
  });
});


// console.log(productPrice?.__proto__);
productPrice?.forEach(function(price){
    console.log(Number(price.innerText));

});

const tries = async function(){
    const responses = await fetch(`/view/Mens%20Sports%20T-shirts+Pants%20Suit(white)`);
    console.log(await responses.__proto__);
    console.log(await responses)
};

const api = async function(){
    let inputApi = await prompt('which user? ')
    const apiFetch = await fetch(`/api/${inputApi}`);
    const resAwait = await apiFetch.json();
    const [first, second] = resAwait;
    // return first, second;
};

api()

