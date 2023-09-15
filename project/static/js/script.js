'use strict';

//  variable selection
const btns = document.querySelectorAll('.btn');
const inputSearch = document.querySelector('.kol');
const 


inputSearch?.addEventListener('keyup', function(e) {
    console.log(e);
    console.log(this);
    $.get(`/search?q=${this.value}`, (shows)=> {
        let html = '';
        for (let id in shows) {
            let title = shows[id].title.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
            html += `<li class="li"><a class="anchor" href="/view/${title}">${title}</a></li>`;
        }
        document.querySelector('.ul').innerHTML = html;
    });
});

btns?.forEach(btn =>{
  btn.addEventListener('click', function(){
      this.innerText++;
  });
});



