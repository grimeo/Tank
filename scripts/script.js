import Tank from "../scripts/tank.js"
import Enemy from "./enemy.js"
import Bullet from "../scripts/bullet.js"
import Explosion from "./explosion.js"
import Blood from "./blood.js"
import InputHandler from "../scripts/inputHandler.js"

const canvas = document.getElementById('gamecanvas')
const ctx = canvas.getContext('2d')
canvas.focus()

ctx.canvas.width = 900
ctx.canvas.height = 700
ctx.font = '30px Impact'

let bulletIcon = document.getElementById('bullet-icon');
let lifeIcon = document.getElementById('life-icon');

const screen = document.getElementsByClassName('screen');

const fps = 120;

const gameSound = new Audio();
gameSound.src = './sfx/gameSound.mp3';
gameSound.volume = 0.1;
gameSound.loop = true;

const gameOverSound = new Audio();
gameOverSound.src = './sfx/gameOverSound.mp3';
gameOverSound.volume = 0.1;

let input = new InputHandler();
let tank = new Tank(900, 700);

let spawnTime = 1000; // 2k default
let spawnCounter = 0
let updatedTankLife = tank.life

let score = 0;

let isPause = false;
let backToMenu = false;
let isanimating = false;
let maxScreenCount = 4;

let bullets = []
let enemies = []
let explosions = []
let blood = []


function isCollide(c1, c2){
    let dx = c2.x - c1.x
    let dy = c2.y - c1.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    let sumOfRadii = c1.radius + c2.radius;
    if(distance < sumOfRadii){
       return true
    } 
}

// screen support buttons
// 0 = mainmenu ;
// 1 = pause ; 
// 2 = menu after pause;
// 3 = game over

function switchSuppportButtonScreen(screenToDisplay){
    for(let i = 0; i < maxScreenCount; i++){
        if(i == screenToDisplay) screen[i].style.display = "block";
        else screen[i].style.display = "none";
    }
}

function playGameMusic(){
    gameSound.play();
}

function resetStats(){
    enemies = [];
    bullets = [];
    explosions = [];
    blood = [];
    tank.init();
    score = 0;
}

function drawStats(){
    if(tank.maxBullet == tank.usedBullet){

        for(let i = 0; i < tank.maxBullet; i++){

            // ctx.drawImage(bulletIcon, 0, 0, 50, 50, 845 + 35 * -i, 60 , 50 , 50);
        }
    } else {
        for(let i = 0; i < tank.maxBullet - tank.usedBullet; i++){
            ctx.drawImage(bulletIcon, 0, 0, 50, 50, 845 + 30.1 * -i, 60 , 50 , 50);
        }
    }
    

    for(let i = 0; i < tank.life; i++){
        ctx.drawImage(lifeIcon, 0, 0, 50, 50, 850 + 30 * -i, 15 , 50 * 0.7 , 50 *0.7  );
    }

    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score , 15, 40);

    ctx.fillStyle = 'lightgray';
    ctx.fillText('Score: ' + score , 10, 35);

    // ctx.fillStyle = 'lightgray';
    // ctx.fillText('L: ' + (updatedTankLife ), 5, 695);
}

function animate(){
    ctx.clearRect(0, 0, 900, 700); 

    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 535, 900, 5); // finish line

    isanimating = true;
    [...bullets, ...enemies, ...blood, ...explosions].forEach(object => object.update());
    [...bullets, ...enemies, ...blood, ...explosions].forEach(object => object.draw(ctx));
    
    tank.draw(ctx);
    tank.update(input);
    if(input.keys.indexOf(' ') > -1 ){
        if(tank.shootIntervalCounter == tank.shootTime && tank.usedBullet < tank.maxBullet){
            bullets.push(new Bullet(tank.x + tank.width /2 , tank.y + 20));
            tank.usedBullet += 1;
            tank.shootIntervalCounter = 0;
        }
    }
    
    if(tank.usedBullet == tank.maxBullet) {
        tank.color = 'orange';
        if(tank.reloadCounter < tank.reloadTime && tank.shootIntervalCounter == tank.shootTime) tank.reloadCounter++;
        if(tank.reloadCounter == tank.reloadTime){
            [...bullets].forEach(object => object.deleteMark = true); 
            tank.usedBullet = 0;
            tank.reloadCounter = 0;
            tank.color = 'green'
        }
    }
    // enemies.push(new Enemy());
    if(spawnCounter > spawnTime){
        enemies.push(new Enemy());
        if(score > 20)enemies[enemies.length -1].levelThree();
        else if(score > 10)enemies[enemies.length -1].levelTwo();
        spawnCounter = 0;
    } else {
        spawnCounter += 1000/fps;
    }

    [...enemies].forEach(object => {
        if(object.y >= 530 && object.didFinish == false){
            tank.life = tank.life -1;
            object.didFinish = true;
            updatedTankLife = tank.life
            object.deleteMark = true;
            object.finishSound.play();
        }
    });
        
    [...bullets].forEach(object =>{
        for(let i = 0; i < enemies.length; i++ ){
            if(isCollide(object, enemies[i])){
                explosions.push(new Explosion(enemies[i].x, enemies[i].y, enemies[i].width))
                blood.push(new Blood(enemies[i].x, enemies[i].y, enemies[i].width))
                enemies[i].deleteMark = true;
                object.deleteMark = true;
                score += 1;
            }
            
        }
    })
    
    // ctx.fillStyle = 'white';
    // ctx.fillText('Bullet: ' + bullets.length, 55, 80);
    bullets = bullets.filter(object => !object.deleteMark);
    explosions = explosions.filter(object => !object.deleteMark);
    enemies = enemies.filter(object => !object.deleteMark);
    blood = blood.filter(object => !object.deleteMark);

    
    drawStats();

    if(isPause == true){
        isanimating = false;
    }
    else if(backToMenu == true){ 
        cancelAnimationFrame(animate);
        isanimating = false;
        backToMenu = false;
    }
    else if(tank.life == 0){
        gameSound.pause();
        gameOverSound.play();
        resetStats();
        isanimating = false;
        switchSuppportButtonScreen(3);
        cancelAnimationFrame(animate);
    } else {
        setTimeout(()=>{
            requestAnimationFrame(animate);
        }, 1000 /fps);
    }
}


document.getElementById('play-btn').addEventListener('click', () => {
    isPause = false;
    backToMenu = false;
    resetStats();
    animate();
    playGameMusic();
    switchSuppportButtonScreen(1);
    screen[1].style.backgroundColor = 'transparent';
    backToMenu = false;
});

document.getElementById('pause').addEventListener('click', () =>{
    if(isPause == false){
        animate();
        isPause = true;
        gameSound.pause();
        switchSuppportButtonScreen(2);
    } 
    else{
        console.log('ispause == true')
        isPause = false;
        gameSound.play();
        animate();
        switchSuppportButtonScreen(1);
    }
    canvas.focus();
});

document.getElementById('continue').addEventListener('click', () =>{
    if(isPause == true){
        isPause = false;
        gameSound.play();
        animate();
        switchSuppportButtonScreen(1);
    } else {
        isPause = true;
        gameSound.pause();
        switchSuppportButtonScreen(2);
    }
    canvas.focus();
});

document.getElementById('restart').addEventListener('click', () =>{
    if(isanimating == false){
        resetStats();
        animate();
        switchSuppportButtonScreen(1);
        gameOverSound.pause();
    } 
    canvas.focus();
});
document.getElementById('gs-main-menu-btn').addEventListener('click', () => {
    switchSuppportButtonScreen(0);
    backToMenu = true;
    resetStats();
    gameSound.pause();
});

document.getElementById('main-menu-btn').addEventListener('click', () => {
    
    switchSuppportButtonScreen(0);
    backToMenu = true;
    gameOverSound.pause();
    gameSound.pause();
    resetStats();
});


switchSuppportButtonScreen(0);



