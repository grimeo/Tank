export default class Enemy{
    constructor(x){
        this.spriteWidth = 311;
        this.spriteHeight = 288;
        this.radius = 30;
        this.width = 60;
        this.height = 60;
        this.x = Math.random() * (670-this.radius) + this.radius;
        this.y = 0;
        this.color = 'red';
        this.yWalkLevel1 = 2; // default 0.25 max is 2
        this.yWalkLevel2 = Math.floor(Math.random() * 0.75);
        this.xWalkLevel1 = 0;
        this.xWalkLevel2 = Math.random() * 6 - 3;
        this.directionY =  this.yWalkLevel1;
        this.directionX =  this.xWalkLevel1 ;
        this.deleteMark = false;
        this.didFinish = false;
        this.image = document.getElementById('enemy-img');
        this.frame = 0;
        this.maxFrame = 16;
        this.timeToNextFrame = 5;
        this.timeToNextFrameCounter = 0;
    }

    update(){
        this.y += this.directionY;
        this.x += this.directionX;
        //bounce
        // if(this.x - this.radius < 30 || this.x + this.radius > 670) this.directionX = this.directionX * -1;


        // else this.frame++;  
        if(this.timeToNextFrameCounter < this.timeToNextFrame){
            this.timeToNextFrameCounter++;
        } 

        if(this.timeToNextFrameCounter == this.timeToNextFrame){
            this.frame++;
            this.timeToNextFrameCounter = 0;
        }
        if(this.frame > this.maxFrame)this.frame=0;
    }

    draw(ctx){
        // ctx.beginPath();
        // ctx.fillStyle = this.color;
        // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.closePath(); 
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth , this.spriteHeight, this.x - this.radius, this.y-this.radius, this.width, this.height);
    }
}
