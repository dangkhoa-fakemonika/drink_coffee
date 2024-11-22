let t = new Date();
localStorage.removeItem('coffee') // remove old keys
// localStorage.clear()

function getDateOfYear(d){
  return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
}

let coffee_fill = document.querySelector(".oval");
let coffee_filler = document.querySelector(".coffee-filler")
let coffee_text = document.querySelector(".coffee-text");
let coffee_smoke = document.querySelector("#coffee-smoke");
var r = document.querySelector(':root');

// Refilling coffee
if (t.getHours() >= 7 && localStorage.getItem('lastRefill') !== getDateOfYear(t)) {
  localStorage.setItem('lastRefill', getDateOfYear(t));
  coffee_fill.classList.add('fill-cup');
  coffee_filler.classList.add('filler');
  coffee_smoke.classList.add('fading');
  localStorage.setItem('coffee-state', '1');
} else {
  coffee_fill.classList.add('coffee-state');
  coffee_smoke.classList.add('smoke-state');
}

let fill_percent = Math.min(Math.max(parseFloat(localStorage.getItem('coffee-state')), 0), 1);
console.log(fill_percent)

r.style.setProperty('--coffee-progression', fill_percent.toString());

function drinkCoffee(){
  fill_percent -= 0.1;
  r.style.setProperty('--coffee-progression', fill_percent.toString());
  localStorage.setItem('coffee-state', fill_percent.toString());
}


