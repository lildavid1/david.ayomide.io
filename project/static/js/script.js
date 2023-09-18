'use strict';

<<<<<<< HEAD

//selectors here
const input = document.querySelector('.kol');
const btns = document.querySelectorAll('.btn');


input?.addEventListener('keyup', function(e){
=======
//  variable selection
const btns = document.querySelectorAll('.btn');
const input = document.querySelector('.kol');


input?.addEventListener('keyup', function(e) {
    console.log(e);
    console.log(this);
>>>>>>> 50f2188f98f5431c4e5cb527f9f0c3cc99b07f90
    $.get(`/search?q=${this.value}`, (shows)=>  {
        let html = '';
        for (let id in shows) {
            let title = shows[id].title.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
            html += `<li class="li"><a class="anchor" href="/view/${title}">${title}</a></li>`;
        }
        document.querySelector('.ul').innerHTML = html;
    });
});

btns?.forEach(function(btn){
  btn.addEventListener('click', function(){
      this.innerHTML++;
  });
});

