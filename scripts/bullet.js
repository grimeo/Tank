export default class Bullet{
    // sourceX, sourceY, Destination
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.directionY = -10;
        this.deleteMark = false;
        this.color ='orange'
    }
    update(){
        this.y += this.directionY;
        // if(this.y < 0) this.deleteMark = true;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();    
    }
}