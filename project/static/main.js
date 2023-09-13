'use strict';

let formSubmition = document.querySelector(".form");

formSubmition.addEventListener('submit', function(e){
    console.log(this);
    if (!this.querySelector("#username").value) {
        this.querySelector(".alert").innerText = "required field";
        return false;
    }
    else if (!this.querySelector("#password").value) {
        this.querySelector(".aler").innerText = "required field";
        return false;
    }
    else {
        return true;
    }
});


let input = document.querySelector('.kol');
input.addEventListener('keyup', function(e) {
    console.log(e);
    console.log(this);
    $.get(`/search?q=${this.value}`, (shows)=>  {
        let html = '';
        for (let id in shows) {
            let title = shows[id].title.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
            html += `<li class="li"><a class="anchor" href="/view/${title}">${title}</a></li>`;
        }
        document.querySelector('.ul').innerHTML = html;
    });
});

const btn = document.querySelectorAll('.btn');
console.log(btn);

btn.forEach(function (btns) {
  btns.addEventListener('click', () => {
    // Parse the text content as an integer
    let count = parseInt(btns.innerText);

    // Increment the count
    count++;

    // Set the updated count as text content
    btns.innerText = count;
  });
});
