export default class Enemy{
    constructor(x){
        this.radius = 30;
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
        this.spriteWidth = 446;
        this.spriteHeight = 312;
    }

    update(){
        this.y += this.directionY;
        this.x += this.directionX;
        //bounce
        // if(this.x - this.radius < 30 || this.x + this.radius > 670) this.directionX = this.directionX * -1;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();   
    }
}
