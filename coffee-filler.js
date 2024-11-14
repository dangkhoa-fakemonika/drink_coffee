let t = new Date();

function getDateOfYear(d){
  return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
}

if (t.getHours() >= 7 && localStorage.getItem('lastRefill') !== getDateOfYear(t)) {
  localStorage.setItem('coffee', 'filled');
  localStorage.setItem('lastRefill', getDateOfYear(t));
}

let a = document.querySelector("#coffee");
let b = document.querySelector(".coffee-text");

if (localStorage.getItem('coffee') !== "filled"){
  a.src = "cups/coffee-empty.png";
  b.innerText = "You drank today! Come back at 7 AM tomorrow.";
}
else {
  a.src = "cups/coffee.png";
  b.innerText = "Your coffee is ready!";
}

function drinkCoffee() {

  if (a.src.includes("cups/coffee.png")){
    localStorage.setItem('coffee', 'empty');
    a.src = a.src.replace('.png','-empty.png');
    b.innerText = "You drank today! Come back at 7 AM tomorrow.";
  }
}
