'use strict';

//selectors here
const input = document.querySelector('.kol');
const btns = document.querySelectorAll('.btn');
const passWord = document.querySelector('.passWord');
const productPrice = document.querySelectorAll('.product_price_list');
const formLogin = document.querySelector('.form');
const re = document.querySelector('.re')
const total = document.querySelector('.total')
const minusAll = document.querySelectorAll('.minus')
const plusAll = document.querySelectorAll('.plus')
const quantitySize = document.querySelectorAll('.quantity')

input?.addEventListener('keyup', async function(e) {
    let response = await fetch(`/search?q=${this.value}`);
    let searchList = await response.json();
    let html = '';
    searchList.flatMap(obj => {
        let title = obj?.title?.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('%20', ' ');
        html += `<li class="li"><a class="anchor" href="/view/${title}">${title}</a></li>`;
    });
    document.querySelector('.ul').innerHTML = html;
});

const api = async function(e) {
    let inputApi = await prompt('which user? ')
    const apiFetch = await fetch(`/api/user?userid=${inputApi}`);
    const resAwait = await apiFetch.json();
    const [...rest] = resAwait;
    console.log(...rest)
};


re?.addEventListener('click', async function(e) {
    // console.log(...this.classList, this.className)
    const rety = await fetch('/api/lol/kol');
    console.log(await rety)
    if (rety.redirected) {
        window.location.href = rety.url;
    }
});

minusAll?.forEach((c,i)=>{
    c.addEventListener('click', function(){
        if(+this.textContent === 0) this.disabled = true
        console.log(this)
        console.log(+quantitySize[i].textContent--)

    })
})
plusAll?.forEach((c,i)=>{
    c.addEventListener('click', function(){
        console.log(+quantitySize[i].textContent++)
    })
})
s
