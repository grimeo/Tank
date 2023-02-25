export default class Survivor{
    constructor(spawnAreaX){
        this.spriteWidth = 311;
        this.spriteHeight = 288;
        this.radius = 25;
        this.width = 50;
        this.height = 50;
        this.x = spawnAreaX;
        this.y = 0;
        this.color = 'red';
        this.directionY =  1.25; // 1.25
        this.deleteMark = false;
        this.didFinish = false;
        this.image = document.getElementById('survivor-img');
        this.frame = 0;
        this.finishSound = new Audio();
        this.finishSound.src = './sfx/survivor-finish.mp3'
        this.dead = new Audio();
        this.dead.src = './sfx/survivor-dead.mp3'
        this.maxFrame = 19;
        this.timeToNextFrame = 4;
        this.timeToNextFrameCounter = 0;
    }

    update(){
        this.y += this.directionY;

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
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth , this.spriteHeight , this.x - this.radius , this.y-this.radius, this.width, this.height);
    }
    init(){
        this.directionY =  0.75;
    }
}
