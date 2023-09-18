'use strict';


//selectors here
const input = document.querySelector('.kol');
const btns = document.querySelectorAll('.btn');


input?.addEventListener('keyup', function(e){
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


