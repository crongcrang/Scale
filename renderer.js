document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById('scale-canvas');
    var ctx = canvas.getContext('2d');
    var offset = 180; // ค่ากลาง
    var direction = 0;
    var scaleFactor = 100 / 10;
    var moveSpeed = 0.1;
    var intervalId;

    function drawScale() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "20px Arial";
        ctx.textAlign = "center";

        var centerX = canvas.width / 2;
        var startX = centerX - (offset * scaleFactor);

        // วาดเส้นสเกลหลัก
        ctx.beginPath();
        ctx.moveTo(0, 150);
        ctx.lineTo(canvas.width, 150);
        ctx.stroke();

        // วาดสเกลหลัก (ทุกๆ 10 หน่วย)
        for (var i = 0; i <= 360; i += 10) {
            var x = startX + (i * scaleFactor);
            ctx.beginPath();
            ctx.moveTo(x, 120); // สเกลหลักจะสูงขึ้น
            ctx.lineTo(x, 150);
            ctx.stroke();
            ctx.fillText(360 - i, x, 100); // ใส่หมายเลขที่ตำแหน่ง 100px ข้างบน
        }

        // วาดสเกลย่อย (ทุกๆ 1 หน่วยในระยะ 10 หน่วย)
        for (var i = 0; i <= 360; i++) {
            if (i % 10 !== 0) { // ถ้าไม่ใช่เลขที่เป็นตัวเลขหลัก
                var x = startX + (i * scaleFactor);
                var tickHeight = (i % 5 === 0) ? 20 : 10; // ถ้าเป็นค่าหมายเลข 5 (5, 15, 25, ...) ให้สูงขึ้น
                ctx.beginPath();
                ctx.moveTo(x, 150 - tickHeight); // ปรับตำแหน่งให้ขีดย่อยมีความสูงแตกต่างกัน
                ctx.lineTo(x, 150);
                ctx.stroke();
            }
        }

        // วาดสเกลด้านล่าง (ระหว่าง 10 ถึง 0, กว้างเท่ากับ 9 ช่องของสเกลด้านบน)
        var bottomScaleStartX = centerX - (scaleFactor * 9); // เริ่มจากตำแหน่ง 10 (เท่ากับ 9 ช่องในสเกลด้านบน)
        var bottomSpacing = (scaleFactor * 9) / 10; // ความกว้างระหว่างแต่ละช่องของสเกลล่าง (ระยะระหว่าง 10 ถึง 0 เท่ากับ 9 ช่องจากสเกลบน, แบ่งออกเป็น 10 ช่องย่อย)

        // วาดหมายเลข 10, 5, 0
        for (var i = 10; i >= 0; i -= 5) {
            var x = bottomScaleStartX + ((10 - i) * bottomSpacing); // คำนวณตำแหน่งของแต่ละหมายเลข (10, 5, 0)
            ctx.beginPath();
            ctx.moveTo(x, 180); // จุดเริ่มต้นของสเกล
            ctx.lineTo(x, 150); // ยาวไปยังด้านบน
            ctx.stroke();
            ctx.fillText(i, x, 210); // ใส่หมายเลขที่ตำแหน่งด้านล่าง
        }

        // วาดสเกลย่อยด้านล่าง (ระหว่าง 10-5, 5-0)
        for (var i = 1; i < 10; i++) {
            var x = bottomScaleStartX + (i * bottomSpacing); // คำนวณตำแหน่งของสเกลย่อย
            ctx.beginPath();
            ctx.moveTo(x, 150); // จุดเริ่มต้นของสเกลย่อย
            ctx.lineTo(x, 160); // ปรับตำแหน่งให้ขีดย่อยอยู่ใต้เส้นสเกลบน (y = 150)
            ctx.stroke();
        }
    }

    function getScaleReading() {
        var reading = 360 - offset;
        document.getElementById('reading').innerText = "ค่าที่อ่านได้: " + reading.toFixed(2);
    }

    document.getElementById('left-button').addEventListener('click', function () {
        // เคลียร์คำตอบเมื่อคลิกปุ่มซ้าย
        document.getElementById('reading').innerText = "ค่าที่อ่านได้: -";
        
        direction = -1;
        startMoving();
    });

    document.getElementById('stop-button').addEventListener('click', function () {
        direction = 0;
        clearInterval(intervalId);
        enableRevealButton();
    });

    document.getElementById('right-button').addEventListener('click', function () {
        // เคลียร์คำตอบเมื่อคลิกปุ่มขวา
        document.getElementById('reading').innerText = "ค่าที่อ่านได้: -";
        
        direction = 1;
        startMoving();
    });

    document.getElementById('reveal-button').addEventListener('click', function () {
        getScaleReading();
    });

    function startMoving() {
        // ปิดปุ่ม reveal ขณะเลื่อน
        document.getElementById('reveal-button').disabled = true;

        clearInterval(intervalId);
        intervalId = setInterval(function () {
            offset += direction * moveSpeed;
            offset = Math.max(0, Math.min(360, offset));
            drawScale();
        }, 5);
    }

    function enableRevealButton() {
        // เปิดปุ่ม reveal เมื่อหยุด
        document.getElementById('reveal-button').disabled = false;
    }

    drawScale();

});

	

