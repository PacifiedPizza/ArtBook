document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById("drawingCanvas");
    var ctx = canvas.getContext("2d");
    let drawing = false;
    var pos = { x: 0, y: 0 };

    function startPosition(e) {
        drawing = true;
        draw(e);
    }

    function endPosition() {
        drawing = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!drawing) return;

        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        var range = document.getElementById("thickness").value;
        var color = document.getElementById("color").value;
        var tool = document.getElementById("tool").value;

        ctx.lineWidth = range;
        ctx.lineCap = "round";
        ctx.strokeStyle = (tool === 'eraser') ? '#ffffff' : color;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }


    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
});

function clearCanvas() {
    var canvas = document.getElementById("drawingCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveImage() {
    var canvas = document.getElementById("drawingCanvas");
    var image = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.href = image;
    link.download = 'canvas_image.png';
    link.click();
}
