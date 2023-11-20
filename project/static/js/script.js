'use strict';

//selectors here
const input = document.querySelector('.kol');
const btns = document.querySelectorAll('.btn');
const passWord = document.querySelector('.passWord');
const productPrice = document.querySelectorAll('.product_price_list');
const formLogin = document.querySelector('.form');
const re = document.querySelector('.re')
const total = document.querySelector('.total')
const minusAll = document.querySelectorAll('.minus')
const plusAll = document.querySelectorAll('.plus')
const quantitySize = document.querySelectorAll('.quantity')

input?.addEventListener('keyup', async function(e) {
    let response = await fetch(`/search?q=${this.value}`);
    let searchList = await response.json();
    let html = '';
    searchList.flatMap(obj => {
        let title = obj?.title?.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('%20', ' ');
        html += `<li class="li"><a class="anchor" href="/view/${title}">${title}</a></li>`;
    });
    document.querySelector('.ul').innerHTML = html;
});

const api = async function(e) {
    let inputApi = await prompt('which user? ')
    const apiFetch = await fetch(`/api/user?userid=${inputApi}`);
    const resAwait = await apiFetch.json();
    const [...rest] = resAwait;
    console.log(...rest)
};


re?.addEventListener('click', async function(e) {
    // console.log(...this.classList, this.className)
    const rety = await fetch('/api/lol/kol');
    console.log(await rety)
    if (rety.redirected) {
        window.location.href = rety.url;
    }
});

// btns?.forEach(btn => {
//     btn.addEventListener('click', function() {
//         this.textContent++
//     })
// })

minusAll?.forEach((c,i)=>{
    c.addEventListener('click', function(){
        console.log(this,i)
        console.log(+quantitySize[i].textContent--)

    })
})











//
//    We've just invented a new game for college kids that we call cups.  The object of the game is to
//      bounce a ping-pong ball into one of three cups.  Multiple players will have multiple rounds to score
//      as many points as possible.
//  
//  Possible points are:
//      Large cup - 3 points
//      Small cup - 6 points
//      Extra small cup - 7 points
//
//  In the code below we will be given the total score that the player got.  We need to determine

//
//    We've just invented a new game for college kids that we call cups.  The object of the game is to
//      bounce a ping-pong ball into one of three cups.  Multiple players will have multiple rounds to score
//      as many points as possible.
//  
//  Possible points are:
//      Large cup - 3 points
//      Small cup - 6 points
//      Extra small cup - 7 points
//
//  In the code below we will be given the total score that the player got.  We need to determine
//      a combination of points that let them get that score.  Please complete the method
//      'getLeastNumberOfScores' to make this happen.  Order of the numbers does not matter.
//          If no combination is possible, nothing should be printed.

// Should output nothing
calculateScores(2);

// Should output 3
calculateScores(3);

// Should output 3 and 7 (order doesn't matter)
calculateScores(10);

// Should output 3 and 6 (order doesn't matter)
calculateScores(9)
// Should output nothing
calculateScores(11);

// Should output 6 and 6
calculateScores(12);


function calculateScores(targetScore) {
  console.log("Scores for targetScore:"+targetScore);
  let scores = getLeastNumberOfScores(targetScore);
  for (let i = 0; i < scores.length; i++){
      console.log(scores[i]);
  }
}
function getLeastNumberOfScores(targetScore) {
// Put your code here
    if(targetScore>= 2){
        return []
    }else if(targetScore<=6){
        return [6]
    }
    else if(targetScore<=7){
        return [3,7]
    }

}