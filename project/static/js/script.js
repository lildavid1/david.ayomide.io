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
const homepage_link = document.querySelectorAll('.homepagelink')
const search_user = document.querySelector('.usersearch')

input?.addEventListener('keyup', async function(e) {
    let response = await fetch(`/search?q=${this.value}`);
    let searchList = await response.json();
    let html = '';
    searchList.flatMap(obj => {
        let title = obj?.title?.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('%20', ' ');
        html += `<li class="li"><a class="anchor" href="/categories?q=${title}">${title}</a></li>`;
    });
    document.querySelector('.ul').innerHTML = html;
});



const api = async function(e) {
    let inputApi = await prompt('which user? ')
    const apiFetch = await fetch(`/api/user?userid=${inputApi}&usertoken=btn`);
    const resAwait = await apiFetch.json();
    const [...rest] = resAwait;
    console.log(...rest)
};

minusAll?.forEach((c, i) => {
    if (+quantitySize[i].textContent === 0) {
        c.disabled = true;
    }

    c.addEventListener('click', function() {
        if (+quantitySize[i].textContent === 0) {
            this.disabled = true;
        } else {
            this.disabled = false;
            +quantitySize[i].textContent--;
        }
    });
});

plusAll?.forEach((c, i) => {
    c.addEventListener('click', function() {
        minusAll[i].disabled = false;
        +quantitySize[i].textContent++;
    });
});


