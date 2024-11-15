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
  if (t.getHours() >= 7){
    b.innerText = "You drank today! Come back at 7 AM tomorrow.";
  }
  else{
    b.innerText = "Yours aren't ready yet! Wait till 7 AM."
  }

}
else {
  a.src = "cups/coffee.png";
  if (t.getHours() >= 7 && t.getHours() <= 21){
    b.innerText = "Your coffee is ready!";
  }
  else {
    b.innerText = "This one is quite stale...";
  }

}

function drinkCoffee() {

  if (a.src.includes("cups/coffee.png")){
    localStorage.setItem('coffee', 'empty');
    a.src = a.src.replace('.png','-empty.png');
    b.innerText = "You drank today! Come back at 7 AM tomorrow.";
  }
}
