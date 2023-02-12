import Tank from "../scripts/tank.js"
import Enemy from "./enemy.js"
import Bullet from "../scripts/bullet.js"
import InputHandler from "../scripts/inputHandler.js"

//https://www.youtube.com/watch?v=7JtLHJbm0kA
// time 17:32

const canvas = document.getElementById('gamecanvas')
const ctx = canvas.getContext('2d')

ctx.canvas.width = 700
ctx.canvas.height = 700
ctx.font = '30px Impact'

const fps = 120;

let input = new InputHandler();
let tank = new Tank(700, 700)

let bullets = []
let enemies = []





function animate(){
    ctx.clearRect(0, 0, 700, 700);
    tank.draw(ctx);
    tank.update(input);
    if(input.keys.indexOf('ArrowUp') > -1 ){
        if(tank.shootIntervalCounter == tank.shootTime && bullets.length < tank.maxBullet){
            bullets.push(new Bullet(tank.x + tank.width /2 , tank.y));
            tank.shootIntervalCounter = 0;
        }
        enemies.push(new Enemy());
    }
    
    if(bullets.length == tank.maxBullet) {
        tank.color = 'orange';
        if(tank.reloadCounter < tank.reloadTime && tank.shootIntervalCounter == tank.shootTime) tank.reloadCounter++;
        if(tank.reloadCounter == tank.reloadTime){
            [...bullets].forEach(object => object.deleteMark = true); 
            bullets = bullets.filter(object => !object.deleteMark)
            tank.reloadCounter = 0;
            tank.color = 'green'
        }
    }
    
    console.log(tank.reloadCounter, tank.shootIntervalCounter, tank.maxBullet - bullets.length);

    
    // ctx.fillStyle = 'white';
    // ctx.fillText('Bullet: ' + bullets.length, 55, 80);
    [...bullets, ...enemies].forEach(object => object.update());
    [...bullets, ...enemies].forEach(object => object.draw(ctx));
    ctx.fillStyle = 'black';
    ctx.fillText('Bullet: ' + (tank.maxBullet - bullets.length), 50, 75);

    setTimeout(()=>{
        requestAnimationFrame(animate);
    }, 1000 /fps);
}
animate();