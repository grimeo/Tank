import Tank from "../scripts/tank.js"
import Enemy from "./enemy.js"
import Bullet from "../scripts/bullet.js"
import InputHandler from "../scripts/inputHandler.js"

//https://www.youtube.com/watch?v=7JtLHJbm0kA
// time 17:32

const canvas = document.getElementById('gamecanvas')
const ctx = canvas.getContext('2d')
canvas.focus()

ctx.canvas.width = 700
ctx.canvas.height = 700
ctx.font = '30px Impact'

const fps = 120;

let input = new InputHandler();
let tank = new Tank(700, 700);

let spawnTime = 1000; // 2k default
let spawnCounter = 0
let updatedTankLife = tank.life

let score = 0;


let bullets = []
let enemies = []


function isCollide(c1, c2){
    let dx = c2.x - c1.x
    let dy = c2.y - c1.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    let sumOfRadii = c1.radius + c2.radius;
    if(distance < sumOfRadii){
       return true
    } 
}

function drawStats(){
    ctx.fillStyle = 'black';
    ctx.fillText('B: ' + (tank.maxBullet - tank.usedBullet), 5, 35);

    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score , 580, 35);

    ctx.fillStyle = 'black';
    ctx.fillText('L: ' + (updatedTankLife ), 5, 695);
}

function animate(){
    ctx.clearRect(0, 0, 700, 700); 

    ctx.fillStyle = 'red'
    ctx.fillRect(0, 550, 700, 10); // finish line

    [...bullets, ...enemies].forEach(object => object.update());
    [...bullets, ...enemies].forEach(object => object.draw(ctx));
    
    tank.draw(ctx);
    tank.update(input);
    if(input.keys.indexOf(' ') > -1 ){
        if(tank.shootIntervalCounter == tank.shootTime && tank.usedBullet < tank.maxBullet){
            bullets.push(new Bullet(tank.x + tank.width /2 , tank.y));
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
    
    if(spawnCounter > spawnTime){
        enemies.push(new Enemy());
        spawnCounter = 0;
        console.log(enemies[0].y)
    } else {
        spawnCounter += 1000/fps;
    }

    [...enemies].forEach(object => {
        if(object.y >= 530 && object.didFinish == false){
            tank.life = tank.life -1;
            object.didFinish = true;
            updatedTankLife = tank.life
        }
    });
        
    [...bullets].forEach(object =>{
        for(let i = 0; i < enemies.length; i++ ){
            if(isCollide(object, enemies[i])){
                enemies[i].deleteMark = true;
                object.deleteMark = true;
                score += 1;
            }
            
        }
    })
    
    // ctx.fillStyle = 'white';
    // ctx.fillText('Bullet: ' + bullets.length, 55, 80);
    bullets = bullets.filter(object => !object.deleteMark)
    enemies = enemies.filter(object => !object.deleteMark)


    drawStats();

    setTimeout(()=>{
        requestAnimationFrame(animate);
    }, 1000 /fps);
}
animate();