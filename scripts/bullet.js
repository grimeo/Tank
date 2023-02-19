export default class Bullet{
    // sourceX, sourceY, Destination
    constructor(x, y){
        this.spriteWidth = 50;
        this.spriteHeight = 50;
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.radius = 10;
        this.directionY = -10;
        this.deleteMark = false;
        this.color ='black';
        this.sound = new Audio();
        this.sound.src = './sfx/shotsfx.ogg';
        this.sound.play();
        // this.sound = document.getElementById('shot-sfx');
        this.didFire = false;
        this.image = document.getElementById('bullet-img');
    }
    update(){
        // if(this.didFire == false) {
        //     this.sound.play(); 
        //     this.didFire = true;
        // }
        this.y += this.directionY;
        // if(this.y < 0) this.deleteMark = true;
    }

    draw(ctx){
        // if(this.frame === 0) this.sound.play();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();    
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight , this.x - this.width/2, this.y-this.height /2, this.width, this.height);
    }
}