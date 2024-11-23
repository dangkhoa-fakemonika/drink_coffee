localStorage.removeItem('coffee'); // remove old keys

var coffee_fill = document.querySelector(".oval");
var coffee_filler = document.querySelector(".coffee-filler")
var coffee_text = document.querySelector(".coffee-text");
var coffee_smoke = document.querySelector("#coffee-smoke");
var coffee_entity = document.querySelector(".coffee");
const r = document.querySelector(':root');

var current_time = new Date();
var current_hours = current_time.getHours();
var last_refill_time = localStorage.getItem('lastRefill') ? new Date(localStorage.getItem('lastRefill')) : null;

// Getting the coffee state
var fill_percent = Math.min(Math.max(parseFloat(localStorage.getItem('coffee-state')), 0), 1);

// Configuring the flavor texts
var coffee_current_state;
var day_current_state;
var day_progression;
var time_dif;

// console.log(current_time)
// console.log(last_refill_time)

flavor_texts = {
  "prompt_filling" : "Preparing your drink...",
  "prompt_done" : "Your drink is ready! Enjoy!",
  "full_new" : "Drink it while it's hot!",
  "full_semi" : "It's warm now, but still good!",
  "full_old" : "This one is lukewarm. But probably drinkable.",
  "full_bad" : "You barely touched it...",
  "high_new" : "Back for another sip perhaps?",
  "high_semi" : "You haven't touched it for a while now...",
  "high_old" : "Feels cold, are you sure?",
  "high_bad" : "Maybe today's cup will taste better...",
  "half_new" : "Still hot as new! Go for it!",
  "half_semi" : "We don't have it 'to-go', better finish it!",
  "half_old" : "It's been here for a while...",
  "half_bad" : "I'd say you should pass this...",
  "low_new" : "Not so much goodness left!",
  "low_semi" : "Does the end taste bitter or...",
  "low_old" : "Uhm... saving the best for last...?",
  "low_bad" : "I suggest you wait for a new one soon...",
  "empty_new" : "Hope you liked it! Come back tomorrow at 7 AM for more!",
  "empty_semi" : "Only one per day, sorry. 7 AM tomorrow for another!",
  "empty_old" : "We're not closed, but no additional coffee either. 7 AM please.",
  "empty_bad" : "Not 7 AM yet! Come back soon!",
  "done_new" : "Hope you liked it! Come back tomorrow at 7 AM for more!",
  "done_semi" : "Not too bad isn't it? 7 AM tomorrow for more!",
  "done_old" : "Probably not the brightest cups...Get one new tomorrow",
  "done_bad" : "You could've wait for a new one...",
  "drink_new_0" : "Delightful, isn't it?",
  "drink_new_1" : "Mmm... noice",
  "drink_new_2" : "Did it hit the spot?",
  "drink_semi_0" : "Taste not so bitter does it?",
  "drink_semi_1" : "Could've used a little more milk",
  "drink_semi_2" : "Goes for that 'kick', right?",
  "drink_old_0" : "Could've seen brighter days...",
  "drink_old_1" : "Not the ideal taste...",
  "drink_old_2" : "Not too bad...",
  "drink_bad_0" : "Does it even taste...normal?",
  "drink_bad_1" : "You don't have to...",
  "drink_bad_2" : "That doesn't feels good...",
  "empty_quotes_0" : "You know, maybe I'd switch for tea on someday...",
  "empty_quotes_1" : "Do you want some pastries next time? Or a croissant?",
  "empty_quotes_2" : "Did you like the cup? I hope you did. I did!",
  "empty_quotes_3" : "Maybe I'll try to have some latte art next time...",
  "empty_quotes_4" : "I've always want to brew my own cup of coffee, although not like this..."
}

r.style.setProperty('--coffee-progression', fill_percent.toString());

if (fill_percent === 1){
  coffee_current_state = "full";
}
else if (fill_percent >= 0.7){
  coffee_current_state = "high";
}
else if (fill_percent >= 0.4){
  coffee_current_state = "half";
}
else if (fill_percent > 0.0){
  coffee_current_state = "low";
}
else {
  coffee_current_state = "empty"
}

setTimeDif(last_refill_time, current_time);

// console.log(localStorage.getItem('lastRefill') === null);
// console.log(current_hours >= 7 && last_refill_time.toDateString() !== current_time.toDateString());
// console.log(time_dif >= 24);

// Refilling coffee
if ((localStorage.getItem('lastRefill') === null) || (current_hours >= 7 && last_refill_time.toDateString() !== current_time.toDateString()) || (time_dif >= 24)) {
  fillCoffee();
} else {
  loadCoffee();
}

function getHourDifference(time_a, time_b){
  let dif = Math.abs(time_a - time_b);
  return Math.floor(dif / (1000 * 60 * 60));
}

function fillCoffee(){
  localStorage.setItem('lastRefill', current_time.toLocaleString());
  coffee_fill.classList.add('fill-cup');
  coffee_filler.classList.add('filler');
  coffee_smoke.classList.add('fading');
  localStorage.setItem('coffee-state', '1');
  last_refill_time = new Date(current_time);
  fill_percent = 1;
  time_dif = 0;
  day_progression = 1;
  day_current_state = "new";
  r.style.setProperty('--day-progression', day_progression.toString());
  r.style.setProperty('--coffee-progression', fill_percent.toString());
  loadFlavorText("prompt_filling");
  setTimeout(coffeeReady, 7000);
}

function setTimeDif(time1, time2){
  time_dif = getHourDifference(time1, time2);

  if (time_dif < 6){
    day_current_state = "new";
    day_progression = 1;
  }
  else if (time_dif < 14){
    day_current_state = "semi";
    day_progression = 0.4;
  }
  else if (time_dif < 18){
    day_current_state = "old";
    day_progression = 0.2;
  }
  else {
    day_current_state = "bad";
    day_progression = 0;
  }
}

function loadCoffee(){
  coffee_entity.onclick = drinkCoffee;
  coffee_fill.classList.add('coffee-state');
  coffee_smoke.classList.add('smoke-state');
  r.style.setProperty('--coffee-progression', fill_percent.toString());
  r.style.setProperty('--day-progression', day_progression.toString());
  loadFlavorText(coffee_current_state + "_" + day_current_state);
}

// Functions
function drinkCoffee(){
  if (fill_percent > 0 && fill_percent <= 1){
    fill_percent -= 0.1;
    fill_percent = parseFloat(fill_percent.toFixed(1));
    r.style.setProperty('--coffee-progression', fill_percent.toString());
    r.style.setProperty('--day-progression', day_progression.toString());
    localStorage.setItem('coffee-state', fill_percent.toString());

    let randInt = Math.floor(Math.random() * 3);

    if (fill_percent !== 0.0){
      loadFlavorText("drink_" + day_current_state + "_" + randInt.toString());
    }
    else {
      loadFlavorText("done_" + day_current_state);
    }
  }
  else {
    let randInt = Math.floor(Math.random() * 5);
    loadFlavorText("empty_quotes_" + randInt.toString());
  }
}

function coffeeReady(){
  loadFlavorText("prompt_done");
  coffee_entity.onclick = drinkCoffee;
  coffee_fill.classList.remove('fill-cup');
  coffee_filler.classList.remove('filler');
  coffee_smoke.classList.remove('fading');
  coffee_fill.classList.add('coffee-state');
  coffee_smoke.classList.add('smoke-state');
}

function loadFlavorText(prompt){
  coffee_text.innerText = flavor_texts[prompt];
}

