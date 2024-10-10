
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

ctx.fillStyle = "#eeeeee";
ctx.fillRect(0, 0, 400, 400);

let mouseX = 0;
let mouseY = 0;

class SpineNode {
    constructor (x, y, next) {
        this.x = x;
        this.y = y;
        this.next = next;
    }

    // sets the position of the node
    // constrains the position of the next node
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        console.log(x, y)
        if (!this.next) {
            return;
        }

        //calculate vector from current node to next node
        let dx = this.next.x - this.x;
        let dy = this.next.y - this.y;
        //calculate unit vector
        let length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        let udx = dx / length;
        let udy = dy / length;
        //scale unit vector
        let dist = 25;
        let sdx = udx * dist;
        let sdy = udy * dist;
        //set position of the next node
        this.next.setPosition(this.x + sdx, this.y + sdy);
    }

    // draw self on the canvas
    draw() {
        // draw rectangle at position
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x-5, this.y-5, 10, 10);
        if (!this.next) {
            return;
        }
        
        // draw line to the next node
        ctx.beginPath()
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 10;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.next.x, this.next.y);
        ctx.stroke();

        this.next.draw();
    }
}
let head = null;
for (let i = 0; i < 10; i++) {
    head = new SpineNode(0, 0, head);
}

// add mouse listener for movement
canvas.addEventListener("mousemove", (e) => {
    let rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    // update the head with a new position
    head.setPosition(mouseX, mouseY);
    
    // reset canvas and draw the head
    ctx.fillStyle = "#eeeeee";
    ctx.fillRect(0, 0, 400, 400);
    head.draw();
})
