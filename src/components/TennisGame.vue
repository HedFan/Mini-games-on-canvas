<template>
    <div class="container">
        <div class="inline">
            <div @click="paint">Press to start</div>
        </div>
        <canvas ref="canvas" class="js_bild bild"></canvas>

    </div>
</template>

<script>
    export default {
        name: "TennisGame",
        data() {
            return {
                canvas: null,
                ctx: null,
                startBuildY: 20,
                startBuildX: 20,
                hardLvl: false,
                defaultLvl: true,
                speed: 7,
                countPlayer: 0,
                countSpu: 0,
                spuSpeed: 5,
                finishGameFlag: false,
                maxRes: 3,

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

            objects
                (color, width, height, x, y, ctx) {
                this.color = color;
                this.width = width;
                this.height = height;
                this.x = x;
                this.y = y;
                this.ctx = ctx;

                this.ctx.fillStyle = this.color;
                this.ctx.fillRect(this.x, this.y, this.width, this.height)
            }
            ,
            paint() {
                let sY = this.startBuildY + 8, pY = this.startBuildY + 8, bY = 360 / 2 - 5, bX = 760 / 2 - 5, newbY,
                    newbX,
                    newsY;

                let draw = () => {
                    this.canvas.width = 760;
                    this.canvas.height = 360;

                    this.ctx.fillStyle = '#333';
                    this.ctx.fillRect(this.startBuildX, this.startBuildY, 740, 350);

                    this.ctx.strokeStyle = "#cec8ca";
                    this.ctx.arc(760 / 2, 360 / 2, 46, 0, Math.PI * 2, true);
                    this.ctx.moveTo(760 / 2, 20);
                    this.ctx.lineTo(760 / 2, 360);
                    this.ctx.stroke();

                    this.ctx.fillStyle = "#cec8ca";
                    this.ctx.font = 'bold 52px Arial';
                    this.ctx.fillText(this.countPlayer, 760 / 4, 70);
                    this.ctx.fillText(this.countSpu, 760 / 2 + 760 / 4, 70);

                    this.spu = new this.objects('#c4c4c4', 15, 90, 737, sY, this.ctx);
                    this.player = new this.objects('#c4c4c4', 15, 90, 28, pY, this.ctx);
                    this.ball = new this.objects('#e0e0e0', 12, 12, bX, bY, this.ctx);
                };
                let finishDraw = () => {
                    let text;
                    this.canvas.width = 760;
                    this.canvas.height = 360;
                    this.ctx.fillStyle = '#333';
                    this.ctx.fillRect(this.startBuildX, this.startBuildY, 740, 350);
                    this.ctx.fillStyle = "#cec8ca";
                    this.ctx.font = 'bold 60px Arial';
                    this.ctx.fillText('Game over', 760 / 2 - 165, 100);
                    if (this.countPlayer > this.countSpu) {
                        text = 'You win!'
                    } else text = 'You lose!';
                    this.ctx.font = 'bold 40px Arial';
                    this.ctx.fillText(text, 760 / 2 - 90, 170);
                    this.ctx.font = 'bold 24px Arial';
                    this.ctx.fillText('Retry?', 760 / 2 - 40, 300);
                    this.canvas.onmousedown = restart;

                };
                let movePlayer = (event) => {
                    let pageY = event.pageY;
                    if (pageY > 210 && pageY < this.canvas.height + (this.canvas.height / 2) - 100) {
                        pY = pageY - (this.player.height * 2);
                    }
                };
                let moveSpu = (val) => {
                    if (val) {
                        if (newsY === undefined) newsY = this.spuSpeed;
                        if (sY < this.startBuildY) {
                            newsY = this.spuSpeed;
                        }
                        if ((sY + this.spu.height > this.canvas.height)) {
                            newsY = -this.spuSpeed;
                        }
                        sY += newsY;
                    }
                };
                let hardLvl = (val) => {
                    if (val) {
                        sY = bY - this.spu.height / 2;
                        if (sY < this.startBuildY) sY = 30;
                        if (sY + this.spu.height > this.canvas.height) sY = this.canvas.height - this.spu.height - 10
                    }
                };
                // let collision = (small, middle) => {
                //     if ((bX > this.startBuildX + 3 && bX + this.ball.width - middle <= this.player.x + this.player.width && bY + this.ball.height >= pY - small) &&
                //         (bX > this.startBuildX + 3 && bX + this.ball.width - middle <= this.player.x + this.player.width && bY <= pY + this.player.height + small + 2) ||
                //         ((bX > this.startBuildX + 3 && bX + this.ball.width - middle <= this.spu.x + this.spu.width && bY + this.ball.height >= sY - small) &&
                //             (bX > this.spu.x && bX + this.ball.width - middle <= this.spu.x + this.spu.width && bY <= sY + this.spu.height + small))) {
                //         return true
                //     }
                //
                // };
                // let collisionS = (small, middle) => {
                //     if (
                //         ((bX > this.startBuildX + 3 && bX + this.ball.width - middle <= this.spu.x + this.spu.width && bY + this.ball.height >= sY - small) &&
                //             (bX > this.spu.x && bX + this.ball.width - middle <= this.spu.x + this.spu.width && bY <= sY + this.spu.height + small))) {
                //         return true
                //     }
                //
                // };
                let collisionX = (elx, ely, elwidth, elheight) => {
                    if (((bX + this.ball.width >= elx && bX < elx) ||
                        (bX <= elx + elwidth && bX + this.ball.width > elx + elwidth)) &&
                        (bY > ely && bY < ely + elheight)) {
                        return true;
                    }
                };
                let collisionY = (elx, ely, elwidth, elheight) => {
                    if (((bY + this.ball.height >= ely && bY < ely) ||
                        (bY <= ely + elheight && bY + this.ball.height > ely + elheight)) &&
                        (bX > elx && bX < elx + elwidth)) {
                        return true;
                    }
                };
                let ballF = () => {
                    if (newbY === undefined) newbY = 2;
                    if (newbX === undefined) newbX = 2;

                    if (bY + this.ball.height > this.canvas.height || bY <= this.startBuildY) newbY = -newbY;
                    if (bX + this.ball.width > this.canvas.width || bX <= this.startBuildX) newbX = -newbX;
                    if (bX < this.startBuildX) this.countSpu++;
                    if (bX > this.canvas.width - 13) this.countPlayer++;


                    if (collisionX(this.player.x, pY, this.player.width, this.player.height) || collisionX(this.spu.x, sY, this.spu.width, this.spu.height)) newbX = -newbX;
                    if (collisionY(this.player.x, pY, this.player.width, this.player.height) || collisionX(this.spu.x, sY, this.spu.width, this.spu.height)) newbY = -newbY;


                    // if ((((bX + this.ball.width >= this.player.x && bX < this.player.x) ||
                    //         (bX <= this.player.x + this.player.width && bX + this.ball.width > this.player.x + this.player.width)) &&
                    //     (bY > pY && bY < pY + this.player.height)) ||
                    //
                    //     (((bX + this.ball.width >= this.spu.x && bX < this.spu.x) ||
                    //         (bX <= this.spu.x + this.spu.width && bX + this.ball.width > this.spu.x + this.spu.width)) &&
                    //     (bY > sY && bY < sY + this.spu.height))) {
                    //     newbX = -newbX
                    // }


                    // if ((((bY + this.ball.height >= pY && bY < pY) ||
                    //         (bY <= pY + this.player.height && bY + this.ball.height > pY + this.player.height)) &&
                    //     (bX > this.player.x && bX < this.player.x + this.player.width)) ||
                    //
                    //     (((bY + this.ball.height >= sY && bY < sY) ||
                    //         (bY <= sY + this.spu.height && bY + this.ball.height > sY + this.spu.height)) &&
                    //     (bX > this.spu.x && bX < this.spu.x + this.spu.width))) {
                    //     newbY = -newbY
                    // }

                    // if (!((bX > this.player.width + this.player.x) || (bY + this.ball.height < pY) || (this.player.height + pY < bY)) ||
                    //     !((bX >= this.startBuildX - 3) || (bX - 2 > this.player.width) || (bY + this.ball.height < pY) || (this.player.height + pY < bY)) ||
                    //     !((bX < this.spu.x) || (bX + this.ball.width + 2 < this.spu.x) || (bY + this.ball.height < sY) || (this.spu.height + sY < bY)))
                    //     if ((this.ball.x > this.startBuildX && this.ball.x + this.ball.width) || (this.ball.y > this.startBuildY && this.ball.y + this.ball.height < this.canvas.height)) newbX = -newbX;
                    //     else {
                    //         newbY = -newbY
                    //     }


                    // if (collision(5, 10)) {
                    //     let pp = pY;
                    //     // newbY = -newbY;
                    //     pY = pp;
                    // }

                    bY += newbY;
                    bX += newbX;

                };
                let finishGame = () => {
                    if (this.countPlayer === this.maxRes || this.countSpu === this.maxRes) return this.finishGameFlag = true

                };
                let restart = () => {
                    bY = 360 / 2 - 5;
                    bX = 760 / 2 - 5;
                    this.countPlayer = 0;
                    this.countSpu = 0;
                    return this.finishGameFlag = false
                };

                setInterval(() => {
                    if (!finishGame()) {
                        draw();
                        moveSpu(this.defaultLvl);
                        hardLvl(this.hardLvl);
                        ballF();
                    } else {
                        finishDraw();
                    }
                }, this.speed);

                this.canvas.onmousemove = movePlayer


                // this.canvas.onmousemove = function (event) {
                //
                //     if (collisionY(this.player.x, pY, this.player.width, this.player.height) !== undefined || collisionX(this.spu.x, sY, this.spu.width, this.spu.height)!== undefined) {
                //         let pp = pY;
                //         newbY = -newbY;
                //         pY = pp;
                //     } else {
                //         movePlayer(event)
                //
                //     }
                //
                // }


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