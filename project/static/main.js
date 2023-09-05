'use strict'

let formSubmition = document.querySelector(".form");

formSubmition.addEventListener('submit', (e)=> {
    console.log(e);
    if (!document.querySelector("#username").value) {
        document.querySelector(".alert").innerText = "required field";
        return false;
    }
    else if (!document.querySelector("#password").value) {
        document.querySelector(".aler").innerText = "required field";
        return false;
    }
    else {
        return true;
    }
});


let input = document.querySelector('.kol');
input.addEventListener('keyup', (e)=> {
    console.log(e);
    console.log(this);
    $.get(`/search?q=${input.value}`, (shows)=>  {
        let html = '';
        for (let id in shows) {
            let title = shows[id].title.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
            html += `<li class="li"><a class="anchor" href="/view/${title}">${title}</a></li>`;
        }
        document.querySelector('.ul').innerHTML = html;
    })
});

