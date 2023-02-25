export default class Explosion {
    constructor(x,y){
        this.image = document.getElementById('explosion-img');
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.size = 150;
        this.x = x;
        this.y = y;
        // this.sound = new Audio();
        // this.sound.src = '';
        this.frame = 0;
        this.timeToNextFrame = 1;
        this.timeToNextFrameCounter = 0;
        this.deleteMark = false;
        this.sound = new Audio();
        this.sound.src = './sfx/explodesfx.ogg';
        this.sound.play();

    }
    update(){
        // if(this.frame === 0) this.sound.play();
        this.timeToNextFrameCounter += 1;
        if(this.timeToNextFrameCounter > this.timeToNextFrame){
            this.frame++;
            if(this.frame > 25)this.deleteMark = true;
            this.timeToNextFrameCounter = 0;
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth * 0.9, this.spriteHeight * 0.9, this.x-90, this.y-90, this.size, this.size);
    }
}