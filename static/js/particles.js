var canvas = document.getElementById("canvas");
var sidebar = document.querySelector('.sidebar');

function resize(){
    canvas.width = sidebar.clientWidth;
    canvas.height = sidebar.clientHeight;
}
resize();
window.onresize = resize;

var ctx = canvas.getContext('2d');
var mousePos = { x: 0, y: 0 };
/*sidebar.onmousemove = function(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
};*/
var ascii = "@%#+</=*&$>~`";
// var ascii = "↵●✔`";
// var ascii = "❄︎";
ascii = ascii.split("");

function distanceFromCenter() {
    return Math.sqrt(Math.pow(mousePos.x - (canvas.width / 2), 2) + Math.pow(mousePos.y - (canvas.height / 2), 2));
}

function Particle() {
    this.theta = Math.random() * Math.PI * 2;
    this.radius = (Math.random() * ((canvas.width > canvas.height) ? canvas.width : canvas.height) * 0.33) + 4;
    this.maxRadius = (Math.random() * ((canvas.width > canvas.height) ? canvas.width : canvas.height) * 0.45);
    this.radialChange = Math.random() * 0.1 *  (Math.random() > 0.5) ? 1 : -1;
    this.opacity = Math.random();
    this.size = Math.round(Math.random() * 10) + 10;
    this.speed = Math.round(Math.random() * .1) + 1;
    this.direction = (Math.random() > 0.5) ? 1 : -1;
    this.text = ascii[Math.floor(Math.random()*ascii.length)];
    this.x = 0;
    this.y = 0;
}
Particle.prototype.update = function() {
    this.theta += this.speed / 1250 * this.direction;
    this.x = (canvas.width / 2) + (Math.cos(this.theta) * this.radius) * (distanceFromCenter() / this.maxRadius);
    this.y = (canvas.height / 2) + (Math.sin(this.theta) * this.radius) * (distanceFromCenter() / this.maxRadius);
    this.radius += this.radialChange;
    if (Math.abs(this.radius) > this.maxRadius) {
        this.radialChange *= -1;
    }
};
Particle.prototype.render = function() {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#dfdaf1';
    ctx.globalAlpha = this.opacity;
    ctx.font = this.size + 'px DejaVuSansMonoPowerline, monospace';
    ctx.fillText(this.text, this.x, this.y);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};

var particles = [];
for(var i = 0; i < (Math.random() * 50) + 25; i++) {
    particles.push(new Particle());
}
requestAnimationFrame(demo = function() {
    ctx.save();
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    particles.forEach(function(particle, i) {
        particle.update();
        particle.render();
    });

    requestAnimationFrame(demo);
});