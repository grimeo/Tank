export default class Tank{
    
    constructor(gamewidth, gameheight){
        this.gamewidth = gamewidth;
        this.gameheight = gameheight;
        this.width = 100;
        this.height = 70;
        this.x = 700/2 - this.width/2;
        this.y = this.gameheight - (this.height + 30);
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
        this.life = 10;

        
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
        if(this.x < 0) this.x = 0;
        else if(this.x > 700 - this.width) this.x = 700 - this.width;
        
        if(this.shootIntervalCounter < this.shootTime) this.shootIntervalCounter++;

    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(this.image, this.frameX * this.width , this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}