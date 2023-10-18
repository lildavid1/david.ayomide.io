'use strict';
const planetscale = require('@planetscale/database');

async function runQuery() {
  const connection = planetscale.connect({
    host: 'aws.connect.psdb.cloud',
    user: 'bysidvltse7rfxg9yq2f',
    password: 'pscale_pw_ykn7ikOpzq3bcTFbe8awBu3AI48vXjZewJ9gVkS3mEo',
    database: 'adebayo-shopping'
  });
  // console.log(connection.execute("SELECT count(*) FROM registrants"))
  console.log(connection.execute())
};

runQuery();
//selectors here
const input = document.querySelector('.kol');
const btns = document.querySelectorAll('.btn');
const passWord = document.querySelector('.passWord');
const productPrice = document.querySelectorAll('.product_price_list');
const formLogin = document.querySelector('.form');

input?.addEventListener('input', async function(e){
    let response = await fetch(`/search?q=${this.value}`);
    let searchList = await response.json();
    console.log(searchList)
    let html = '';
    for (let s in searchList){
        let title = searchList[s].title.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
        html += `<li class="li"><a class="anchor" href="/view/${title}">${title}</a></li>`;
        }
    document.querySelector('.ul').innerHTML = html;
});

btns?.forEach((...btn)=>{
    console.log(btn)
    btn[0].addEventListener('click', function(){
      this.innerHTML++;
  });
});


// console.log(productPrice?.__proto__);
productPrice?.forEach(function(price){
    console.log(Number(price.innerText));

});

const api = async function(){
    let inputApi = await prompt('which user? ')
    const apiFetch = await fetch(`/api/${inputApi}`);
    const resAwait = await apiFetch.json();
    const [first, ...rest] = resAwait;
    console.log(first, rest)
};

api()