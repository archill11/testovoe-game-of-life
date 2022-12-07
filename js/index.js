let m = 10; //высота
let n = 10; // длинна

let widthOfCell = 35;
$('.main-wrapper').css('width', (widthOfCell * n) + 6);

let matrix = [];
let counterId = 0;

let tokillArr = [];
let toAliveArr = [];

fillMainWrapper();
// process();


// while( livingCells() == true ) {
//   alert('new')
  // process();
  // newIteration();
// }

function process() {

  for(let i = 0; i < matrix.length; i++) {
    let current = i;
    let leftNeighbor = i - 1;
    let rirhtNeighbor = i + 1;
    let upNeighbor = i - n;
    let downNeighbor = i + n;
    let downLeftNeighbor = i + n - 1;
    let downRirhtNeighbor = i + n - 1;
    let upLeftNeighbor = i - n + 1;
    let upRirhtNeighbor = i - n + 1;


    if (current % n == 0) { // для каждого первого в каждом столбце
      leftNeighbor = null;
      downLeftNeighbor = null;
      upLeftNeighbor = null;
    } 
    if ((current + 1) % n == 0) { // для каждого последнего в каждом столбце
      rirhtNeighbor = null;
      upLeftNeighbor = null;
      upRirhtNeighbor = null;
    } 
    if (current < n) { // для каждого в первом ряду
      upNeighbor = null;
      upLeftNeighbor = null;
      upRirhtNeighbor = null;
    } 
    if (current >= (matrix.length) - n) { // для каждого в последнем ряду
      downNeighbor = null;
      downLeftNeighbor = null;
      downRirhtNeighbor = null;
    } 

    let count = 0; // счетчик живых соседей
    if (Object.values(matrix[i])[0] == 0) { //«Активация» если клетка мерта 

      if (leftNeighbor !== null) { // если сосед есть прибавляем его значение которое равно либо 1 либо 0
        count += Object.values(matrix[leftNeighbor])[0];
      }
      if (rirhtNeighbor !== null) {
        count += Object.values(matrix[rirhtNeighbor])[0];
      }
      if (upNeighbor !== null) {
        count += Object.values(matrix[upNeighbor])[0];
      }
      if (downNeighbor !== null) {
        count += Object.values(matrix[downNeighbor])[0];
      }
      if (downLeftNeighbor !== null) {
        count += Object.values(matrix[downLeftNeighbor])[0];
      }
      if (downRirhtNeighbor !== null) {
        count += Object.values(matrix[downRirhtNeighbor])[0];
      }
      if (upLeftNeighbor !== null) {
        count += Object.values(matrix[upLeftNeighbor])[0];
      }
      if (upRirhtNeighbor !== null) {
        count += Object.values(matrix[upRirhtNeighbor])[0];
      }
    }
    if (Object.values(matrix[i])[0] == 0 && count == 3) {
      toAliveArr.push(i);
    }

    count = 0; // счетчик живых соседей
    if (Object.values(matrix[i])[0] == 1) { //«Перегрузка» если клетка жива 

      if (leftNeighbor !== null) { // если сосед есть прибавляем его значение которое равно либо 1 либо 0
        count += Object.values(matrix[leftNeighbor])[0];
      }
      if (rirhtNeighbor !== null) {
        count += Object.values(matrix[rirhtNeighbor])[0];
      }
      if (upNeighbor !== null) {
        count += Object.values(matrix[upNeighbor])[0];
      }
      if (downNeighbor !== null) {
        count += Object.values(matrix[downNeighbor])[0];
      }
      if (downLeftNeighbor !== null) {
        count += Object.values(matrix[downLeftNeighbor])[0];
      }
      if (downRirhtNeighbor !== null) {
        count += Object.values(matrix[downRirhtNeighbor])[0];
      }
      if (upLeftNeighbor !== null) {
        count += Object.values(matrix[upLeftNeighbor])[0];
      }
      if (upRirhtNeighbor !== null) {
        count += Object.values(matrix[upRirhtNeighbor])[0];
      }
    }
    if (Object.values(matrix[i])[0] == 1 && count >= 4) {
      tokillArr.push(i);
    }

     count = 0; // счетчик живых соседей
    if (Object.values(matrix[i])[0] == 1) { //Изоляция если клетка жива 

      if (leftNeighbor !== null) { // если сосед есть прибавляем его значение которое равно либо 1 либо 0
        count += Object.values(matrix[leftNeighbor])[0];
      }
      if (rirhtNeighbor !== null) {
        count += Object.values(matrix[rirhtNeighbor])[0];
      }
      if (upNeighbor !== null) {
        count += Object.values(matrix[upNeighbor])[0];
      }
      if (downNeighbor !== null) {
        count += Object.values(matrix[downNeighbor])[0];
      }
      if (downLeftNeighbor !== null) {
        count += Object.values(matrix[downLeftNeighbor])[0];
      }
      if (downRirhtNeighbor !== null) {
        count += Object.values(matrix[downRirhtNeighbor])[0];
      }
      if (upLeftNeighbor !== null) {
        count += Object.values(matrix[upLeftNeighbor])[0];
      }
      if (upRirhtNeighbor !== null) {
        count += Object.values(matrix[upRirhtNeighbor])[0];
      }
    }
    if (Object.values(matrix[i])[0] == 1 && count <= 1) {
      tokillArr.push(i);
    }

     count = 0; // счетчик живых соседей
    if (Object.values(matrix[i])[0] == 1) { //«Вымирание» если клетка жива 

      if (leftNeighbor !== null) { // если сосед есть прибавляем его значение которое равно либо 1 либо 0
        count += Object.values(matrix[leftNeighbor])[0];
      }
      if (rirhtNeighbor !== null) {
        count += Object.values(matrix[rirhtNeighbor])[0];
      }
      if (upNeighbor !== null) {
        count += Object.values(matrix[upNeighbor])[0];
      }
      if (downNeighbor !== null) {
        count += Object.values(matrix[downNeighbor])[0];
      }
      if (downLeftNeighbor !== null) {
        count += Object.values(matrix[downLeftNeighbor])[0];
      }
      if (downRirhtNeighbor !== null) {
        count += Object.values(matrix[downRirhtNeighbor])[0];
      }
      if (upLeftNeighbor !== null) {
        count += Object.values(matrix[upLeftNeighbor])[0];
      }
      if (upRirhtNeighbor !== null) {
        count += Object.values(matrix[upRirhtNeighbor])[0];
      }
    }
    if (Object.values(matrix[i])[0] == 1 && count !== 2 || count !== 3) {
      tokillArr.push(i);
    }
  }
}

function newIteration() {
  for (const el of toAliveArr) {
    aliveCell(el);
  }
  for (const el of tokillArr) {
    killCell(el);
  }
}


function livingCells() {
  for (const el of matrix) {
    for (const [key, value] of Object.entries(el)) {
      if (value) {
        return true;
      }
    }
  }
  return false;
}

function fillMainWrapper() {
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      res =  Math.round(Math.random() ) // рандомно выбираем жива клетка или мертва
      if (res) { // если рандомное чило 1 
        // добавляем живую клетку
        $('.main-wrapper').append(
          $('<div/>')
          .attr("id", counterId)
          .addClass("cellBox aliveCell")
        );
      }else{ // если рандомное чило 0 
        // добавляем мертвую клетку
        $('.main-wrapper').append(
          $('<div/>')
          .attr("id", counterId)
          .addClass("cellBox deathCell")
        );
      }
      // добавляем id и значение клетки в массив matrix
      matrix.push( { [counterId]: res } );
      counterId++;
    }
  }
  
  console.log(matrix);
}



function killCell(cellId) {
  $(`#${cellId}`)
        .addClass('deathCell')
        .removeClass('aliveCell');
}
function aliveCell(cellId) {
  $(`#${cellId}`)
        .addClass('aliveCell')
        .removeClass('deathCell');
}

function activation() {
  let count = 0; // счетчик живых соседей
  if (Object.values(matrix[i])[0] == 0) { //«Активация» если клетка мерта 

    if (leftNeighbor !== null) { // если сосед есть прибавляем его значение которое равно либо 1 либо 0
      count += Object.values(matrix[leftNeighbor])[0];
    }
    if (rirhtNeighbor !== null) {
      count += Object.values(matrix[rirhtNeighbor])[0];
    }
    if (upNeighbor !== null) {
      count += Object.values(matrix[upNeighbor])[0];
    }
    if (downNeighbor !== null) {
      count += Object.values(matrix[downNeighbor])[0];
    }
    if (downLeftNeighbor !== null) {
      count += Object.values(matrix[downLeftNeighbor])[0];
    }
    if (downRirhtNeighbor !== null) {
      count += Object.values(matrix[downRirhtNeighbor])[0];
    }
    if (upLeftNeighbor !== null) {
      count += Object.values(matrix[upLeftNeighbor])[0];
    }
    if (upRirhtNeighbor !== null) {
      count += Object.values(matrix[upRirhtNeighbor])[0];
    }
  }
  if (count == 3) {
    toAliveArr.push(i);
  }
}