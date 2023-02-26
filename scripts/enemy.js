export default class Enemy{
    constructor(x){
        this.spriteWidth = 311;
        this.spriteHeight = 288;
        this.radius = 25;
        this.width = 50;
        this.height = 50;
        this.x = Math.random() * (810-this.radius -70) + this.radius +60;
        this.y = 0;
        this.color = 'red';
        this.directionY =  0.75;
        this.directionX =  0 ;
        this.deleteMark = false;
        this.didFinish = false;
        this.image = document.getElementById('enemy-img');
        this.frame = 0;
        this.finishSound = new Audio();
        this.finishSound.src = './sfx/enemySpawnSound.mp3'
        this.maxFrame = 16;
        this.timeToNextFrame = 5;
        this.timeToNextFrameCounter = 0;
    }

    update(){
        this.y += this.directionY;
        this.x += this.directionX;
        //bounce
        if(this.x - this.radius < 55 || this.x + this.radius > 845) this.directionX = this.directionX * -1;


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
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth , this.spriteHeight , this.x - this.radius , this.y-this.radius, this.width, this.height);
    }
    init(){
        // this.yWalkLevel1 = 1; // default 0.25 max is 2
        // this.yWalkLevel2 = Math.floor(Math.random() * 0.75);
        // this.xWalkLevel1 = 0;
        // this.xWalkLevel2 = Math.random() * 3 - 1.5;
        this.directionY =  0.75;
        this.directionX =  0;
    }
    levelOne(){
        // this.yWalkLevel1 = 1; // default 0.25 max is 2
        // this.yWalkLevel2 = Math.floor(Math.random() * 0.75);
        // this.xWalkLevel1 = 0;
        // this.xWalkLevel2 = Math.random() * 3 - 1.5;
        this.directionY =  0.75;
        this.directionX =  0;
    }
    levelTwo(){
        this.directionY =  Math.random() * 0.5 + 0.5;
        this.directionX =  Math.random() * 3 - 1.5;
    }
    levelThree(){
        this.directionY =  Math.random() * 0.5 + 0.5;
        this.directionX =  Math.random() * 3 - 1.5;
        setInterval(()=>{this.directionX = Math.random() * 4 - 2 }, Math.random() * 1000 + 500)
    }
    levelFour(){
        this.directionY =  Math.random() * 0.85 + 0.6;
        this.directionX =  Math.random() * 3 - 1.5;
        setInterval(()=>{this.directionX = Math.random() * 4 - 2 }, Math.random() * 1000 + 500)
    }
}
