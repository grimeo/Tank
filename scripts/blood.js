export default class Blood{
    constructor(x,y,size){
        this.image = document.getElementById('blood-img');
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 1;
        this.timeToNextFrame = 180;
        this.timeToNextFrameCounter = 0;
        this.deleteMark = false;

    }
    update(){
        this.timeToNextFrameCounter += 1;
        if(this.timeToNextFrameCounter > this.timeToNextFrame){
            this.frame++;
            if(this.frame > 5)this.deleteMark = true;
            this.timeToNextFrameCounter = 0;
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight , this.x - 75, this.y - 50, this.size * 3, this.size* 3);
    }
}