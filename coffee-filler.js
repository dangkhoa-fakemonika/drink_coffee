let t = new Date();

function getDateOfYear(d){
  return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
}

if (t.getHours() >= 7 && localStorage.getItem('lastRefill') !== getDateOfYear(t)) {
  localStorage.setItem('coffee', 'filled');
  localStorage.setItem('lastRefill', getDateOfYear(t));
}

if (localStorage.getItem('coffee') !== "filled"){
  let a = document.querySelector("#coffee");
  let b = document.querySelector(".coffee-text");
  a.src = a.src.replace('.png','-empty.png');
  b.innerText = "You drank today! Come back at 7 AM tomorrow.";
}
else {
  let b = document.querySelector(".coffee-text");
  b.innerText = "Your coffee is ready!";
}

function drinkCoffee() {
  let a = document.querySelector("#coffee");

  if (a.src.includes("cups/coffee.png")){
    a.src = a.src.replace('.png','-empty.png');
    localStorage.setItem('coffee', 'empty');
    let b = document.querySelector(".coffee-text");
    b.innerText = "You drank today! Come back at 7 AM tomorrow.";
  }
}
