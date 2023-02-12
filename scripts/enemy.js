export default class Enemy{
    constructor(x){
        this.radius = 30;
        this.x = Math.random() * (670-this.radius) + this.radius;
        this.y = 0;
        this.color = 'red';
        this.directionY = Math.random() * 0.75;
        this.directionX = Math.random() * 6 - 3;
    }

    update(){
        this.y += this.directionY;
        this.x += this.directionX;
        if(this.x - this.radius < 30 || this.x + this.radius > 670) this.directionX = this.directionX * -1;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();    
    }
}
