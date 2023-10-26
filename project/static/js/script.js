'use strict';

class LoginUser{
    constructor(yun){
        this.email = yun
    }
}
//selectors here
const input = document.querySelector('.kol');
const btns = document.querySelectorAll('.btn');
const passWord = document.querySelector('.passWord');
const productPrice = document.querySelectorAll('.product_price_list');
const formLogin = document.querySelector('.form');
const re = document.querySelector('.re')

input?.addEventListener('input', async function(e){
    history.pushState(null, this.value, `/search?q=${this.value}`);
    let response = await fetch(`/search?q=${this.value}`);
    let searchList = await response.json();
    let html = '';
    for (let s in searchList){
        let title = searchList[s].title.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
        html += `<li class="li"><a class="anchor" href="/view/${title}">${title}</a></li>`;
        console.log(new LoginUser(searchList[s].title))
        }
    document.querySelector('.ul').innerHTML = html;
});

btns?.forEach((...btn)=>{
    console.log(btn)
    btn[0].addEventListener('click', function(){
      this.innerHTML++;
  });
});


productPrice?.forEach((price)=>{
    console.log(Number(price.innerText));

});

const api = async function(){
    let inputApi = await prompt('which user? ')
    const apiFetch = await fetch(`/api/${inputApi}`);
    const resAwait = await apiFetch.json();
    const [...rest] = resAwait;
    console.log(...rest)
};


re?.addEventListener('click', async function() {
    console.log(this)
    const rety = await fetch('/api/lol/kol', {
        method: 'POST',
        body: JSON.stringify(
            {
                [`guh${6+8}`]: "gyuh",
                jik: "gyhw"
            }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // if(await rety.redirected){
    //     window.location.href = rety.url;
    // }
    console.log(await rety)
});

