// for await (const tyh of searchList){
//     console.log(tyh)
// }
'use strict';

//selectors here
const input = document.querySelector('.kol');
const btns = document.querySelectorAll('.btn');
const passWord = document.querySelector('.passWord');
const productPrice = document.querySelectorAll('.product_price_list');
const formLogin = document.querySelector('.form');
const re = document.querySelector('.re')

input?.addEventListener('keyup', async function(e){
    let response = await fetch(`/search?q=${this.value}`);
    let searchList = await response.json();
    let html = '';
    for (let s in searchList){
        let title = searchList[s].title.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('%20', ' ');
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


productPrice?.forEach((price)=>{
    console.log(Number(price.innerText));

});

const api = async function(e){
    console.log(arguments)
    console.log(e)
    let inputApi = await prompt('which user? ')
    const apiFetch = await fetch(`/api/${inputApi}`);
    const resAwait = await apiFetch.json();
    const [...rest] = resAwait;
    console.log(...rest)
};


re?.addEventListener('click', async function(e) {
    console.log(...this.classList, this.className)
    const rety = await fetch('/api/lol/kol', {
        method: 'POST',
        body: JSON.stringify([
            {
                [`guh${6+8}`]: "gyuh",
                jik: "gyhw"
            }]),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(await rety.json())
    // if(await rety.redirected){
    //     window.location.href = rety.url;
    // }
});


async function hujd(){
    const yuj = await fetch('https://www.codewars.com/api/v1/users/davidcoder1234')
    console.log(await yuj.json())
}

const oneWord = function(str){
    return str.replace(/ /g, '').toUpperCase();
}

const upperFirstWord = function(str){
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ')
}

const transformer = function(str, fn){
    console.log(`Original string: ${str}`)
    console.log(`Transformed string ${fn(str)}`)
    console.log(`Transformed by: ${fn.name}`)
}

transformer('Javascript is the best!', upperFirstWord)