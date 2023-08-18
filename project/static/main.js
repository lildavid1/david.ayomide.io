let formSubmition = document.querySelector(".form");

formSubmition.addEventListener('submit', (e)=> {
    console.log(e);
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
input.addEventListener('keyup', (e)=> {
    console.log(e);
    $.getJSON(`/search?q=${input.value}`, (shows)=>  {
        let html = '';
        for (let id in shows) {
            let title = shows[id].title.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
            html += `<li class="li"><a class="anchor" href="/view/${title}">${title}</a></li>`;
        }
        document.querySelector('.ul').innerHTML = html;
    });
});

