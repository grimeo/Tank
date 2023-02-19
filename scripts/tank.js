export default class Tank{
    
    constructor(gamewidth, gameheight){
        this.gamewidth = gamewidth;
        this.gameheight = gameheight;
        this.spriteWidth = 446;
        this.spriteHeight = 312;
        this.width = 190;
        this.height = 133;
        this.x = 900/2 - this.width/2;
        this.y = this.gameheight - (this.height + 10);
        this.maxBullet = 4;
        this.usedBullet = 0;
        // this.image = document.getElementById('tank-img');
        // this.frameX = 0; 
        // this.frameY = 0;
        this.speedX = 1
        this.color = 'green'
        this.shootIntervalCounter = 0;
        this.shootTime = 15;
        this.reloadCounter = 0;
        this.reloadTime = 110;
        this.life = 4;
        this.image = document.getElementById('tank-img');
        this.frame = 1;

        
    }

    update(input){
        this.x += this.speedX;
        if(input.keys.indexOf('ArrowRight') > -1){
            this.speedX = 10;
        } else if(input.keys.indexOf('ArrowLeft') > -1){
            this.speedX = -10;
        } else {
            this.speedX = 0;
        }
        if(this.x < -40) this.x = -40;
        else if(this.x > 940 - this.width) this.x = 940 - this.width;
        
        if(this.shootIntervalCounter < this.shootTime) this.shootIntervalCounter++;

    }
    draw(ctx){
        // ctx.fillStyle = this.color;
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}