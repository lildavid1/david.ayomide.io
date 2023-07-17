let formSubmition = document.querySelector(".form");

formSubmition.addEventListener('onsubmit', ()=> {
    if (!document.querySelector("#username").value) {
        document.querySelector(".alert").innerHTML = "required field";
        return false;
    }
    else if (!document.querySelector("#password").value) {
        document.querySelector(".aler").innerHTML = "required field";
        return false;
    }
    else {
        return true;
    }
});


let input = document.querySelector('.kol');
input.addEventListener('keyup', ()=> {
    $.get(`/search?q=${input.value}`, (shows)=>  {
        let html = '';
        for (let id in shows) {
            let title = shows[id].title.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
            html += `<li><a href="/view/${title}">` + title + '</a></li>';
        }
        document.querySelector('.ul').innerHTML = html;
    });
});























