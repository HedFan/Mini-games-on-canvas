<template>
    <div class="container">
        <div class="inline">
            <div @click="dxBall">Press to start</div>
        </div>
        <canvas ref="canvas" class="js_bild bild"></canvas>
    </div>
</template>

<script>
    export default {
        name: "DxballGame",
        data() {
            return {
                canvas: null,
                ctx: null,
                relaxBall: true,
                dxBallBallSpeed: 2,
                dxBallLiveCount: 2,
                restartClick: true,

            }
        },
        props: {
            msg: String
        },
        mounted() {
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext('2d');
        },
        methods: {

            dxBall() {
                let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                let ballX = 100, ballY = 300, platformX = 100, platformY = 320, newBallX, newBallY, arr = [],
                    cleanArr = [], stoneArr = [];


                let white = [0, 0, 'brick'], blue = [115, 0, 'brick'],
                    // green = [173, 0],
                    stone = [232, 0, 'stone'];


                // let map = [white];
                let map = [white, blue, stone, blue, white, stone, white, blue, stone, blue, white, stone];
                // let map2 = [white, green, stone, green, white, stone, white, green, stone, green, white, stone];
                // let mapAnim = [blueA];
                let img = new Image();

                let draw = () => {

                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.ctx.clearRect(ballX, ballY, 35, 35);
                    this.ctx.clearRect(platformX, platformY, 102, 35);

                    for (let x = 0; x < arr.length; x++) {
                        this.ctx.clearRect(arr[x].mapX, arr[x].mapY, 42, 20);
                    }
                    this.canvas.width = 760;
                    this.canvas.height = 360;
                    this.ctx.fillStyle = '#848484';
                    this.ctx.fillRect(20, 20, 740, 350);

                    for (let x = 0; x < arr.length; x++) {
                        this.ctx.drawImage(img, arr[x].mapCoordX, arr[x].mapCoordY, 42 + 10, 20 + 10, arr[x].mapX, arr[x].mapY, 42 + 10, 20 + 10);
                    }

                    if (this.relaxBall) {
                        ballX = platformX + 102 / 2 - 35 / 2;
                        ballY = platformY - 20;
                    } else {
                        ballMove();
                        for (let i = 0; i < arr.length; i++) {
                            brickBroken(arr[i].mapX, arr[i].mapY, arr[i].mapCoordX, arr[i].mapCoordY, arr[i].name)

                        }
                    }

                    // the ball
                    this.ctx.drawImage(img, 812, 132, 35, 35, ballX, ballY, 35, 35);
                    // the desk
                    this.ctx.drawImage(img, 0, 72, 102, 35, platformX, platformY, 102, 35);
                    // the lives
                    for (let i = 0; i < this.dxBallLiveCount; i++) {
                        this.ctx.drawImage(img, 682, 176, 40, 42, this.canvas.width - 40 - i * 17, 35, 25, 25)
                    }
                    if (this.dxBallLiveCount < 0 || arr.length === 0 || stoneArr.length === arr.length) {
                        this.restartClick = false
                    }

                };


                let finish = () => {
                    let text, coord;
                    this.dxBallLiveCount = 2;
                    this.relaxBall = true;
                    cleanArr = [];
                    this.ctx.fillStyle = '#848484';
                    this.ctx.fillRect(20, 20, 740, 350);
                    this.ctx.fillStyle = "#cec8ca";
                    this.ctx.font = 'bold 60px Arial';
                    this.ctx.fillText('Game over', 760 / 2 - 165, 100);
                    this.ctx.font = 'bold 40px Arial';
                    if (arr.length === 0 || stoneArr.length === arr.length) {
                        text = 'Do you want to retry?';
                        coord = 760 / 2 - 200
                    } else {
                        text = 'You lose!';
                        coord = 760 / 2 - 90;
                    }
                    this.ctx.fillText(text, coord, 170);
                    this.ctx.font = 'bold 24px Arial';
                    this.ctx.fillText('Retry?', 760 / 2 - 40, 300);

                };

                let restart = () => {
                    this.restartClick = true;
                };
                let diffArray = (arr1, arr2) => {
                    let newArr = [];
                    return newArr.concat(arr2.filter(function (val) {
                        if (JSON.stringify(arr1).indexOf(JSON.stringify(val)) === -1) {
                            return arr2[arr2.indexOf(val)];
                        }
                    })).concat(arr1.filter(function (val) {
                        if (JSON.stringify(arr2).indexOf(JSON.stringify(val)) === -1) {
                            return arr1[arr1.indexOf(val)];
                        }
                    }));
                };

                let rec = () => {
                    arr = [];
                    stoneArr = [];

                    for (let x = 0; x < map.length; x++) {
                        for (let y = 0; y < 5; y++) {
                            let mapX = 40 + 60 * x,
                                mapY = 40 + 25 * y,
                                mapCoordX = map[x][0],
                                mapCoordY = map[x][1],
                                name = map[x][2];
                            arr.push({mapX, mapY, mapCoordX, mapCoordY, name});
                            if (name === 'stone') stoneArr.push({mapX, mapY})
                        }
                    }
                    if (cleanArr.length > 0) {
                        arr = diffArray(cleanArr, arr)
                    }
                };

                img.src = 'https://www.spriters-resource.com/resources/sheets/63/65937.png';

                // img.src = 'src/assets/DX-Ball.png';

                let animate = () => {
                    requestAnimationFrame(animate);
                    if (this.restartClick === true) {
                        rec();
                        draw();
                    } else {
                        finish();
                    }
                };
                animate();

                this.canvas.onmousedown = () => {
                    this.restartClick === true ? this.relaxBall = false : restart();
                };


                let brickBroken = (mapX, mapY, mapCoordX, mapCoordY, name) => {
                    if (((ballX + 20 >= mapX && ballX < mapX) || (ballX <= mapX + 42 && ballX + 20 > mapX + 42)) &&
                        (ballY > mapY && ballY < mapY + 20)) {
                        newBallX = -newBallX;
                        if (name !== 'stone') cleanArr.push({mapX, mapY, mapCoordX, mapCoordY, name})
                    }

                    if (((ballY + 20 >= mapY && ballY < mapY) || (ballY <= mapY + 20 && ballY + 20 > mapY + 20)) &&
                        (ballX > mapX && ballX < mapX + 42)) {
                        newBallY = -newBallY;
                        if (name !== 'stone') cleanArr.push({mapX, mapY, mapCoordX, mapCoordY, name})
                    }
                };

                let ballMove = () => {
                    if (newBallX === undefined) newBallX = this.dxBallBallSpeed;
                    if (newBallY === undefined) newBallY = this.dxBallBallSpeed;
                    if (ballX < 20 || ballX + 20 > this.canvas.width) newBallX = -newBallX;
                    if (ballY < 20) newBallY = -newBallY;

                    if (ballY + 20 > this.canvas.height) {
                        this.dxBallLiveCount--;
                        this.relaxBall = true;
                    }

                    if (((ballX + 20 >= platformX && ballX < platformX) || (ballX <= platformX + 102 && ballX + 20 > platformX + 102)) &&
                        (ballY > platformY && ballY < platformY + 20)) {
                        newBallX = -newBallX
                    }


                    if (((ballY + 20 > platformY) && ((ballX + 20 > platformX) && (ballX < platformX + 102)))) newBallY = -newBallY;

                    ballX += newBallX;
                    ballY += newBallY;
                };

                let movePlatform = (event) => {
                    let pageX = event.pageX;
                    if (pageX > 540 && pageX < this.canvas.width + 430) {
                        platformX = pageX - (520);

                    }
                };
                this.canvas.onmousemove = movePlatform;


            },
        },
    }
</script>

<style scoped>
    .container {
        width: 800px;
        height: 500px;
        margin: 20px auto;
        border: 1px solid black;
    }

    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .bild {
        display: block;
    }

    .inline {
        display: inline-block;
        margin-right: 15px;
        cursor: pointer;

    }
</style>