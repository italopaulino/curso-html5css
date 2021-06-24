let canvas     = document.getElementById("snake");
let context    = canvas.getContext("2d");
let box        = 32;
let hw         = box / 2;
let hwM        = hw - 1;
let snake      = [];
let comida     = [];
let direction  = "right";
let randX      = retornaValRandom();
let randY      = retornaValRandom();
let bgcolor    = "black";
let snakecolor = "white";
let foodcolor  = "gray";

comida = {
    x: randX,
    y: randY
}

snake[0] = {
    x: (hw)/2 * box,
    y: (hw)/2 * box
}

function criarArea()
{
    context.fillStyle = bgcolor;
    context.fillRect(0, 0, hw*box, hw*box);
}

function criarCobrinha()
{
    for (i = 0; i < snake.length; i++){
        context.fillStyle = snakecolor;
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarComida()
{
    context.fillStyle = "gray";
    context.fillRect(comida.x, comida.y, box, box);
}

function retornaValRandom()
{
    return Math.floor(Math.random() * hwM + 1) * box;
}

document.addEventListener('keydown', verificaTeclas);

function verificaTeclas(event)
{
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo()
{    
    if (snake[0].x > (hwM)*box && direction == "right") snake[0].x = 0;
    else if (snake[0].x < 0 && direction == 'left') snake[0].x = hw * box;
    
    if (snake[0].y > hwM*box && direction == "down") snake[0].y = 0;
    else if (snake[0].y < 0 && direction == 'up') snake[0].y = hw * box;
    
    for (i = 1; i < snake.length; i++)
    {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y)
        {
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarArea();
    criarCobrinha();
    criarComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

         if (direction == "right") snakeX += box;
    else if (direction == "left")  snakeX -= box;
    else if (direction == "up")    snakeY -= box;
    else if (direction == "down")  snakeY += box;

    if (snakeX != comida.x || snakeY != comida.y){
        snake.pop();
    } else{
        comida.x = retornaValRandom();
        comida.y = retornaValRandom();
    }
    
    let newHead = 
    {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);