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

formLogin?.addEventListener('submit', function(event){
    console.log(event);
    if(!this.value && !passWord.value){
        this.querySelector('.alert').innerText = 'required information';
        this.querySelector('.aler').innerText = 'required information';
        return false;
    }
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
tries();

const api = async function(){
    let inputApi = prompt('which user? ')
    const apiFetch = await fetch(`/api/${inputApi}`);
    let resAwait = await apiFetch.json();
    for(let uN in resAwait){
        console.log(resAwait)
        console.log(resAwait[uN]?.hash);
    };
    resAwait.forEach(rese=>{
        console.log(rese)
    });
    console.log(...resAwait.entries())
};
// api();
const obj = {
    david(){
        alert('hello, world')
    }
}
console.log(fetch())