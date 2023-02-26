import Tank from "../scripts/tank.js"
import Enemy from "./enemy.js"
import Bullet from "../scripts/bullet.js"
import Explosion from "./explosion.js"
import Blood from "./blood.js"
import Survivor from "./survivor.js"
import InputHandler from "../scripts/inputHandler.js"

const canvas = document.getElementById('gamecanvas')
const ctx = canvas.getContext('2d')
canvas.focus()

ctx.canvas.width = 900;
ctx.canvas.height = 700;
ctx.font = '30px Impact';

let bulletIcon = document.getElementById('bullet-icon');
let lifeIcon = document.getElementById('life-icon');

const screen = document.getElementsByClassName('screen');

const fps = 120;

let isMusicOn = true;
let isSFXon = true;

const gameSound = new Audio();
gameSound.src = './sfx/gameSound.mp3';
gameSound.volume = .7;
gameSound.loop = true;

const gameOverSound = new Audio();
gameOverSound.src = './sfx/gameoverSound.mp3';
gameOverSound.volume = 1;

let lobbymusic = document.getElementById('lobby-music');
lobbymusic.volume = .5;

let input = new InputHandler();
let tank = new Tank(900, 700);

let gameTime = 0;

let spawnTime = 1000; // 2k default
let spawnCounter = 0
let survivorSpawnTime = 5000;
let survivorSpawnTimeCounter = 0;
let upgraded = false;

let updatedTankLife = tank.life

let score = 0;
let survivorScore = 0;

let isPause = false;
let backToMenu = false;
let isanimating = false;
let maxScreenCount = 4;

let bullets = []
let enemies = []
let explosions = []
let blood = []
let survivors = []


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

function resetStats(){
    enemies = [];
    bullets = [];
    explosions = [];
    blood = [];
    survivors = [];
    tank.init();
    score = 0;
    survivorScore = 0;
    gameTime = 0;
    document.getElementById('power-ups').style.display = 'none';
    document.getElementById('scoreVal').innerHTML = '';
    document.getElementById('survivorVal').innerHTML = '';
    upgraded = false;
    spawnCounter =0;
    survivorSpawnTimeCounter=0;
    spawnTime = 1000;
}

function drawStats(){
    if(tank.maxBullet == tank.usedBullet){
        // ctx.fillStyle = 'white';
        // ctx.fillText('reloading...' , 750, 100);
        // let reloadtimeinterval = tank.reloadTime / tank.maxBullet

        // if(tank.maxBullet == 4 ){
        //     if(tank.reloadCounter >= reloadtimeinterval*5){
        //         for(let i = 0; i < tank.maxBullet; i++){
        //             ctx.drawImage(bulletIcon, 0, 0, 50, 50, 845 + 30.1 * -i, 60 , 50 , 50);
        //         }
        //     } else if(tank.reloadCounter >= reloadtimeinterval*3) {
        //         for(let i = 0; i < tank.maxBullet; i++){
        //             ctx.drawImage(bulletIcon, 0, 0, 50, 50, 845 + 30.1 * -i, 60 , 50 , 50);
        //         }
        //     } else if(tank.reloadCounter >= reloadtimeinterval*1) {
        //         for(let i = 0; i < tank.maxBullet; i++){
        //             ctx.drawImage(bulletIcon, 0, 0, 50, 50, 845 + 30.1 * -i, 60 , 50 , 50);
        //         }
        //     }
        // }
        

    } else {
        for(let i = 0; i < tank.maxBullet - tank.usedBullet; i++){
            // ctx.drawImage(bulletIcon, 0, 0, 50, 50, 845 + 30.1 * -i, 60 , 50 , 50);
            ctx.drawImage(bulletIcon, 0, 0, 50, 50, 845 + 30.1 * -i, 60 , 50 , 50);
        }
    }
    

    for(let i = 0; i < tank.life; i++){
        ctx.drawImage(lifeIcon, 0, 0, 50, 50, 850 + 30 * -i, 15 , 50 * 0.7 , 50 *0.7  );
    }

    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score , 15, 90);

    ctx.fillStyle = 'lightgray';
    ctx.fillText('Score: ' + score , 10, 85);

    ctx.fillStyle = 'black';
    ctx.fillText('Survivors: ' + survivorScore , 15, 40);

    ctx.fillStyle = 'lightgray';
    ctx.fillText('Survivors: ' + survivorScore , 10, 35);

    // ctx.fillStyle = 'lightgray';
    // ctx.fillText('L: ' + (updatedTankLife ), 5, 695);
}

function animate(){
    ctx.clearRect(0, 0, 900, 700); 

    

    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 535, 900, 5); // finish line

    isanimating = true;
    [...blood, ...bullets, ...survivors, ...enemies, ...explosions].forEach(object => object.update());
    [...blood, ...bullets, ...survivors, ...enemies, ...explosions].forEach(object => object.draw(ctx));
    
    tank.draw(ctx);
    tank.update(input);
    if(input.keys.indexOf(' ') > -1 ){
        if(tank.shootIntervalCounter == tank.shootTime && tank.usedBullet < tank.maxBullet){
            bullets.push(new Bullet(tank.x + tank.width /2 , tank.y + 20, isSFXon));
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

    // 1st power ups - level 2 enemy 
    if(gameTime > 13000 && gameTime < 18000 && upgraded == false){
        survivorSpawnTimeCounter = 0;
        spawnCounter = 0;
    }
    if(gameTime > 15000 && gameTime < 18000 && upgraded == false && enemies.length == 0){
        document.getElementById('power-ups').style.display = 'block';
    }else if(gameTime > 18000 && gameTime < 33000){
        upgraded = true;
        document.getElementById('power-ups').style.display = 'none';
    }
    if(gameTime > 33000 -  1000 / fps * 3) upgraded = false;

    // 2nd power ups 3- enemy
    if(gameTime > 31000 && gameTime < 36000 && upgraded == false){
        survivorSpawnTimeCounter = 0;
        spawnCounter = 0;
    }
    if(gameTime > 33000 && gameTime < 36000 && upgraded == false && enemies.length == 0){
        document.getElementById('power-ups').style.display = 'block';
    }else if(gameTime > 36000 && gameTime < 51000){
        upgraded = true;
        document.getElementById('power-ups').style.display = 'none';
    }

    if(gameTime > 51000 -  1000 / fps * 3) upgraded = false;

    // 3rd power ups 4 -enemy

    if(gameTime > 49000 && gameTime < 54000 && upgraded == false){
        survivorSpawnTimeCounter = 0;
        spawnCounter = 0;
    }
    if(gameTime > 51000 && gameTime < 54000 && upgraded == false && enemies.length == 0){
        document.getElementById('power-ups').style.display = 'block';
    }else if(gameTime > 54000){
        document.getElementById('power-ups').style.display = 'none';
    }

    if(spawnCounter > spawnTime){
        enemies.push(new Enemy());
        if(gameTime > 54000){
            enemies[enemies.length -1].levelFour();
            spawnTime = 700;
        }
        else if(gameTime > 36000)enemies[enemies.length -1].levelThree();
        else if(gameTime > 18000)enemies[enemies.length -1].levelTwo();
        spawnCounter = 0;
    } else {
        spawnCounter += 1000/fps;
    }

    if(survivorSpawnTimeCounter > survivorSpawnTime){
        let spawnArea = 0;
        let lastEnemyX = 0;
        if(enemies.length >= 1){
            lastEnemyX = enemies[enemies.length -1].x - 25;
        } 
        else {
            lastEnemyX = Math.random() * (810- 25 -70) + 25 + 60
        }
        let enemyRightx = 775 - lastEnemyX + 50;
        let enemyLeftx = lastEnemyX;
        // let tentativeSpawnArea = Math.random() * (810-this.radius -70) + this.radius + 60
        if(enemyLeftx > enemyRightx){
            spawnArea = enemyLeftx * 0.5 + 60;
            survivors.push(new Survivor(spawnArea));
        } else {
            spawnArea = enemyRightx * 0.5 + 60;
            survivors.push(new Survivor(lastEnemyX + spawnArea));
        }
        survivorSpawnTimeCounter = 0;
    } else {
        survivorSpawnTimeCounter += 1000/fps;
    }

    [...enemies].forEach(object => {
        if(object.y >= 530 && object.didFinish == false){
            tank.life = tank.life -1;
            object.didFinish = true;
            updatedTankLife = tank.life
            object.deleteMark = true;
            if(isSFXon == true) object.finishSound.play();
        }
        for(let i = 0; i < survivors.length; i++){
            if(isCollide(object, survivors[i])){
                let survivorXpoint = survivors[i].x;
                let survivorYpoint = survivors[i].y;
                let survivorDeadSound = survivors[i].dead;
                survivors[i].deleteMark = true;
                survivors = survivors.filter(object => !object.deleteMark);

                enemies.push(new Enemy());
                survivorScore += -1;
                enemies[enemies.length -1].x = survivorXpoint;
                enemies[enemies.length -1].y = survivorYpoint;
                if(isSFXon == true) object.finishSound.play();
                if(isSFXon == true) survivorDeadSound.play();
            }
        }
    });

    [...survivors].forEach(object => {
        if(object.y > 530){
            survivorScore += 1;
            object.deleteMark = true;
            if(isSFXon == true) object.finishSound.play();
        }
        
    });

    [...bullets].forEach(object =>{
        for(let i = 0; i < enemies.length; i++ ){
            if(isCollide(object, enemies[i])){
                explosions.push(new Explosion(enemies[i].x, enemies[i].y, isSFXon))
                blood.push(new Blood(enemies[i].x, enemies[i].y, enemies[i].width))
                enemies[i].deleteMark = true;
                object.deleteMark = true;
                score += 1;
            }
        }
        for(let i = 0; i < survivors.length; i++){
            if(isCollide(object, survivors[i])) {
                if(isSFXon == true) survivors[i].dead.play();
                explosions.push(new Explosion(survivors[i].x, survivors[i].y, survivors[i].width));
                blood.push(new Blood(survivors[i].x, survivors[i].y, survivors[i].width));
                object.deleteMark = true;
                survivors[i].deleteMark = true;
                survivorScore += -1;
            }
        }
    });
    
    // ctx.fillStyle = 'white';
    // ctx.fillText('Bullet: ' + bullets.length, 55, 80);
    bullets = bullets.filter(object => !object.deleteMark);
    explosions = explosions.filter(object => !object.deleteMark);
    enemies = enemies.filter(object => !object.deleteMark);
    blood = blood.filter(object => !object.deleteMark);
    survivors = survivors.filter(object => !object.deleteMark)

    
    drawStats();
    gameTime += 1000 / fps;

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
        if(isMusicOn == true)gameOverSound.play();
        document.getElementById('scoreVal').innerHTML = score;
        document.getElementById('survivorVal').innerHTML = survivorScore;
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
    if(isMusicOn == true) gameSound.play();
    lobbymusic.pause();
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
        screen[2].style.zIndex = '3';
    } 
    else{
        console.log('ispause == true')
        isPause = false;
        if(isMusicOn == true) gameSound.play();
        animate();
        switchSuppportButtonScreen(1);
    }
    canvas.focus();
});

document.getElementById('continue').addEventListener('click', () =>{
    if(isPause == true){
        isPause = false;
        if(isMusicOn == true) gameSound.play();
        animate();
        switchSuppportButtonScreen(1);
        screen[2].style.zIndex = '1';
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
        gameSound.currentTime = 0;
        if(isMusicOn == true) gameSound.play();
    } 
    canvas.focus();
});
document.getElementById('gs-main-menu-btn').addEventListener('click', () => {
    switchSuppportButtonScreen(0);
    backToMenu = true;
    resetStats();
    gameSound.pause();
    if(isMusicOn == true) lobbymusic.play();
});

document.getElementById('go-main-menu-btn').addEventListener('click', () => {
    switchSuppportButtonScreen(0);
    backToMenu = true;
    gameOverSound.pause();
    gameSound.pause();
    if(isMusicOn == true) lobbymusic.play();
    resetStats();
});

document.getElementById('main-menu-music').addEventListener('click', () => {
    if(isMusicOn == true){
        lobbymusic.pause();
        isMusicOn = false;
        document.getElementById('menu-toggle-music').src = './imgs/off-music.png';
        document.getElementById('game-music-btn').src = './imgs/off-music.png';
    } else {
        isMusicOn = true;
        lobbymusic.play();
        document.getElementById('menu-toggle-music').src = './imgs/on-music.png';
        document.getElementById('game-music-btn').src = './imgs/on-music.png';
    }
});

document.getElementById('music').addEventListener('click', () => {
    if(isMusicOn == true){
        gameSound.pause();
        isMusicOn = false;
        document.getElementById('game-music-btn').src = './imgs/off-music.png';
        document.getElementById('menu-toggle-music').src = './imgs/off-music.png';
    } else {
        isMusicOn = true;
        gameSound.play();
        document.getElementById('menu-toggle-music').src = './imgs/on-music.png';
        document.getElementById('game-music-btn').src = './imgs/on-music.png';
    }
});

document.getElementById('main-menu-sfx').addEventListener('click', () => {
    if(isSFXon == true){
        isSFXon = false;
        document.getElementById('game-sfx-btn').src = './imgs/off-state-sfx-btn.png';
        document.getElementById('menu-toggle-sfx').src = './imgs/off-state-sfx-btn.png';
    } else {
        isSFXon = true;
        document.getElementById('menu-toggle-sfx').src = './imgs/on-state-sfx-btn.png';
        document.getElementById('game-sfx-btn').src = './imgs/on-state-sfx-btn.png';
    }
});
document.getElementById('sfx').addEventListener('click', () => {
    if(isSFXon == true){
        isSFXon = false;
        document.getElementById('game-sfx-btn').src = './imgs/off-state-sfx-btn.png';
        document.getElementById('menu-toggle-sfx').src = './imgs/off-state-sfx-btn.png';
    } else {
        isSFXon = true;
        document.getElementById('menu-toggle-sfx').src = './imgs/on-state-sfx-btn.png';
        document.getElementById('game-sfx-btn').src = './imgs/on-state-sfx-btn.png';
    }
});



// lobbymusic

switchSuppportButtonScreen(0);

