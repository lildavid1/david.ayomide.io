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
    const [first, second] = resAwait;
    resAwait?.forEach(res=>console.log(res?.full_name))
    console.log(first?.[prompt('your name? ')], second?.hash)
    console.log(...Object.values(first)?.entries())
    return first, second;
};
const data = '';
// fetch('/api/users', {
//     method: 'POST', // Specify the HTTP method as POST
//     headers: {
//         'Content-Type': 'application/json', // Set the content type if sending JSON data
//         // Other headers if needed
//     },
//     body: JSON.stringify(data) // JSON data to send in the request body
// })
// .then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json(); // Parse the response as JSON, assuming it's a JSON response.
// })
// .then(data => {
//     // Handle the response data
//     const [rest] = data;
//     console.log(rest)
// })
// .catch(error => {
//     // Handle errors
//     console.error('There was a problem with the fetch operation:', error);
// });


async function trySam(){
    let resBack = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    let responseAwait = await resBack.json();
    console.log(responseAwait)
};
trySam()

