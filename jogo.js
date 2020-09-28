console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const background = {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height:204,
    x: 0,
    y: canvas.height - 204,
    draw() {
        context.fillStyle = '#70c5ce';
        context.fillRect(0,0, canvas.width, canvas.height)

        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            background.x, background.y,
            background.width, background.height,
        );

        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            (background.x + background.width), background.y,
            background.width, background.height,
        );
    },
}

const floor = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height:112,
    x: 0,
    y: canvas.height - 112,
    draw() {
        context.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.width, floor.height,
            floor.x, floor.y,
            floor.width, floor.height,
        );

        context.drawImage(
            sprites,
            floor.spriteX, floor.spriteY,
            floor.width, floor.height,
            (floor.x + floor.width), floor.y,
            floor.width, floor.height,
        );
    },
}

 const flappyBird = {
     spriteX: 0,
     spriteY: 0,
     width: 33,
     height: 24,
     x: 10,
     y: 50,
     gravity: 0.25,
     velocity: 0,
     upDate() {
         flappyBird.velocity = flappyBird.velocity + flappyBird.gravity;
        flappyBird.y = flappyBird.y + flappyBird.velocity;
     },
     draw() {
        context.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, //Sprite X, Sprite Y
            flappyBird.width, flappyBird.height, //Tamanho do recorte na imagem
            flappyBird.x, flappyBird.y, 
            flappyBird.width, flappyBird.height,
        );
     }
 }

 const getReady = {
     sX: 134,
     sY: 0,
     w: 174,
     h: 152,
     x: (canvas.width / 2) - 174 / 2,
     y: 50,
     draw() {
         context.drawImage(
            sprites,
            getReady.sX, getReady.sY,
            getReady.w, getReady.h,
            getReady.x, getReady.y,
            getReady.w, getReady.h
         );
     }
 };

 let activeScreens = {};

 function changeScreen(newScreen) {
    activeScreens = newScreen;
 };

 const screens = {
     start: {
        draw() {
            background.draw();
            floor.draw();
            flappyBird.draw();
            getReady.draw();
         },
         click() {
            changeScreen(screens.GAME);
         },
         upDate() {

         }
     }
 };

 screens.GAME = {
     draw() {
        background.draw();
        floor.draw();
        flappyBird.draw();
     },
     upDate() {
        flappyBird.upDate();
     }
 };

 function loop() {
    activeScreens.draw();
    activeScreens.upDate();

    requestAnimationFrame(loop);

}

window.addEventListener('click', function() {
    if (activeScreens.click) {
        activeScreens.click();
    }
});

changeScreen(screens.start);
loop();