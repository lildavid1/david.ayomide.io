'use strict';

//selectors here
const input = document.querySelector('.kol');
const btns = document.querySelectorAll('.btn');
const passWord = document.querySelector('.passWord');
const formLogin = document.querySelector('.form');

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

btns?.forEach((btn)=>{
  btn.addEventListener('click', function(){
      this.innerHTML++;
  });
});

formLogin?.addEventListener('submit', function(event){
    console.log(event);
    if(!this.value && !passWord.value){
        this.querySelector('.alert').innerText = 'required information';
        this.querySelector('.aler').innerText = 'required information';
        return false;
    }
});

console.log(btns?.);

