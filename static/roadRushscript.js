const score = document.querySelector('.score'); 
const highestScore = document.querySelector('.highestScore');
const start_screen = document.querySelector('.start_screen'); 
const game_area = document.querySelector('.game_area');

let keys = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false,
};

function keydown(e){
    e.preventDefault();
    keys[e.key] = true;
    
}
function keyup(e){
    e.preventDefault();
    keys[e.key] = false;

}

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

function isCollide(a, b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    // shrink hitboxes
    let shrink = 10;

    return !(
        (aRect.bottom - shrink < bRect.top + shrink) ||
        (aRect.top + shrink > bRect.bottom - shrink) ||
        (aRect.right - shrink < bRect.left + shrink) ||
        (aRect.left + shrink > bRect.right - shrink)
    );
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(line =>{
        let top = line.offsetTop;
        if (top > game_area.offsetHeight){
            top = -100;
        }
        line.style.top = (top + player.speed-1) + "px";
    });
}

function moveEnemyCars(car){
    let cars = document.querySelectorAll('.enemy');

    cars.forEach(enemy =>{
        if(isCollide(enemy, car)){
            if(player.score>player.highestScore){
                player.highestScore = player.score;
            }
            highestScore.innerText = 'Highest Score: ' + player.highestScore;
            player.start = false;
            start_screen.classList.remove('hide');
            start_screen.innerHTML = "<p>Game Over! <br> Your final score is " + player.score + "<br>Click here to restart the game.</p>";
        }
        let top = enemy.offsetTop;
        if(top > game_area.offsetHeight){
            top= -80;
            enemy.style.left = Math.random()*(game_area.offsetWidth - 50) + 'px';
        }
        enemy.style.top = (top + player.speed) + 'px';
    });
}

function gamePlay(){
    let road = game_area.getBoundingClientRect();

    if(player.start){

        moveLines();
        moveEnemyCars(car);
        if(keys.ArrowUp && player.y > 40){player.y-=player.speed;}

        if(keys.ArrowDown && player.y < (game_area.offsetHeight - 85)){player.y+=player.speed;}

        if(keys.ArrowLeft && player.x > 0){player.x-=player.speed;}

        if(keys.ArrowRight && player.x < (road.width - 50)){player.x += player.speed;}
    
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        player.score++;
        score.innerText = 'Score: ' + player.score;
        window.requestAnimationFrame(gamePlay)
   }
}
let player = {
    speed:5,
    score:0,
    highestScore:0
}
let car;
let roadLines;

function start(){
    game_area.innerText = '';
    
    // game_area.classList.remove('hide');
    start_screen.classList.add('hide');
    score.classList.remove('hide');
    highestScore.classList.remove('hide');
    
    player.start = true;
    player.score = 0;
    
    for(let x=0; x<5; x++){
        roadLines = document.createElement('div');
        roadLines.setAttribute('class', 'lines');
        roadLines.style.top = (x*150) + 'px';
        game_area.appendChild(roadLines);
    }

    car = document.createElement('div');
    car.setAttribute('class', 'car');
    game_area.appendChild(car);
    car.style.left = (game_area.offsetWidth/2 - car.offsetWidth/2) + 'px';
    car.style.top = (game_area.offsetHeight-100) +'px';

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(let x=0; x<3; x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy'); 
        enemyCar.style.top = (x*150) + 'px';
        enemyCar.style.left = Math.random()*(game_area.offsetWidth - 50) + 'px';
        game_area.appendChild(enemyCar);
    }

    window.requestAnimationFrame(gamePlay)
}


start_screen.addEventListener('click', start);





