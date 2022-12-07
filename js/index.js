let m ; //высота поля 
let n ; // длинна поля


// массив объектов всех клеток
// одна клетка представляет собой объект 
// с полем (id клетки) и значение (1 или 0) жива или мертва 
let matrix = [];

// счетчик для того что бы задать id каждой клетке
let counterId = 0;

// массив элементво которые будут убиты в начале нового тика
let tokillArr = [];
// массив элементво которые будут активированы в начале нового тика
let toAliveArr = [];



/**
 * Функция подсчитывает всех соседий конкретной клетки и 
 * запускает для неё 4 оператора
 */
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

    let obj = {
      i,
      leftNeighbor,
      rirhtNeighbor,
      upNeighbor,
      downNeighbor,
      downLeftNeighbor,
      downRirhtNeighbor,
      upLeftNeighbor,
      upRirhtNeighbor,
    }

    activation(obj);
    overloading(obj)
    isolation(obj);
    dying(obj);
    
  }
}

/**
 * Функция проходится по массивам toAliveArr, tokillArr 
 * и убивает или оживляет клетку.
 * Если живых клеток не осталось , выводит на экран сообщение Game over!
 */
function newIteration() {
  if ( !livingCells()) {
    alert('Game over!')
  }
  for (const el of toAliveArr) {
    aliveCell(el);
    matrix[el][el] = 1;
  }
  for (const el of tokillArr) {
    killCell(el);
    matrix[el][el] = 0;
  }
}


/**
 * Функция проверят остались ли живые клетки
 * 
 * @returns Boolean
 */
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

/**
 * Функция отрисовывает поле с тем количеством клеток 
 * которое указано в инпутах
 */
function fillMainWrapper() {
  $('.generate-form').addClass('display-none')
  $('.button').removeClass('display-none')
  $('.main-wrapper').removeClass('display-none')


  n = parseInt( $('.nInput').val() );
  m = parseInt( $('.mInput').val() );

  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      
      res =  Math.round(Math.random() ) // рандомно выбираем жива клетка или мертва
      
      if (res) { // если рандомное чило 1 
        $('.main-wrapper').append( // добавляем живую клетку
        $('<div/>')
        .attr("id", counterId)
        .addClass("cellBox aliveCell")
        );
      }else{ // если рандомное чило 0 
        $('.main-wrapper').append( // добавляем мертвую клетку
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
  
  let widthOfCell = $('.cellBox').width();
  $('.main-wrapper').css('max-width', ((widthOfCell + 7) * n) ); // делаю поле клеток по ширине равным количеству клеток * ширину 1 клетки
  
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



function activation(obj) {
  console.log('matrix[obj.i])[0]', matrix);
  console.log('matrix[obj.i])[1]', obj);
  if (Object.values(matrix[obj.i])[0] == 1) {
    return;
  }

  let count = 0; // счетчик живых соседей
  if (Object.values(matrix[obj.i])[0] == 0) { //«Активация» если клетка мерта 

    if (obj.leftNeighbor !== null) { // если сосед есть прибавляем его значение которое равно либо 1 либо 0
      count += Object.values(matrix[obj.leftNeighbor])[0];
    }
    if (obj.rirhtNeighbor !== null) {
      count += Object.values(matrix[obj.rirhtNeighbor])[0];
    }
    if (obj.upNeighbor !== null) {
      count += Object.values(matrix[obj.upNeighbor])[0];
    }
    if (obj.downNeighbor !== null) {
      count += Object.values(matrix[obj.downNeighbor])[0];
    }
    if (obj.downLeftNeighbor !== null) {
      count += Object.values(matrix[obj.downLeftNeighbor])[0];
    }
    if (obj.downRirhtNeighbor !== null) {
      count += Object.values(matrix[obj.downRirhtNeighbor])[0];
    }
    if (obj.upLeftNeighbor !== null) {
      count += Object.values(matrix[obj.upLeftNeighbor])[0];
    }
    if (obj.upRirhtNeighbor !== null) {
      count += Object.values(matrix[obj.upRirhtNeighbor])[0];
    }
  }
  if (count == 3) {
    toAliveArr.push(obj.i);
  }
}

function overloading(obj) {
  if (Object.values(matrix[obj.i])[0] == 0) {
    return;
  }

  let count = 0; // счетчик живых соседей
  if (Object.values(matrix[obj.i])[0] == 1) { //«Перегрузка» если клетка жива 

    if (obj.leftNeighbor !== null) { // если сосед есть прибавляем его значение которое равно либо 1 либо 0
      count += Object.values(matrix[obj.leftNeighbor])[0];
    }
    if (obj.rirhtNeighbor !== null) {
      count += Object.values(matrix[obj.rirhtNeighbor])[0];
    }
    if (obj.upNeighbor !== null) {
      count += Object.values(matrix[obj.upNeighbor])[0];
    }
    if (obj.downNeighbor !== null) {
      count += Object.values(matrix[obj.downNeighbor])[0];
    }
    if (obj.downLeftNeighbor !== null) {
      count += Object.values(matrix[obj.downLeftNeighbor])[0];
    }
    if (obj.downRirhtNeighbor !== null) {
      count += Object.values(matrix[obj.downRirhtNeighbor])[0];
    }
    if (obj.upLeftNeighbor !== null) {
      count += Object.values(matrix[obj.upLeftNeighbor])[0];
    }
    if (obj.upRirhtNeighbor !== null) {
      count += Object.values(matrix[obj.upRirhtNeighbor])[0];
    }
  }
  if (Object.values(matrix[obj.i])[0] == 1 && count >= 4) {
    tokillArr.push(obj.i);
  }
}

function isolation(obj) {
  if (Object.values(matrix[obj.i])[0] == 0) {
    return;
  }

  let count = 0; // счетчик живых соседей
  if (Object.values(matrix[obj.i])[0] == 1) { //Изоляция если клетка жива 

    if (obj.leftNeighbor !== null) { // если сосед есть прибавляем его значение которое равно либо 1 либо 0
      count += Object.values(matrix[obj.leftNeighbor])[0];
    }
    if (obj.rirhtNeighbor !== null) {
      count += Object.values(matrix[obj.rirhtNeighbor])[0];
    }
    if (obj.upNeighbor !== null) {
      count += Object.values(matrix[obj.upNeighbor])[0];
    }
    if (obj.downNeighbor !== null) {
      count += Object.values(matrix[obj.downNeighbor])[0];
    }
    if (obj.downLeftNeighbor !== null) {
      count += Object.values(matrix[obj.downLeftNeighbor])[0];
    }
    if (obj.downRirhtNeighbor !== null) {
      count += Object.values(matrix[obj.downRirhtNeighbor])[0];
    }
    if (obj.upLeftNeighbor !== null) {
      count += Object.values(matrix[obj.upLeftNeighbor])[0];
    }
    if (obj.upRirhtNeighbor !== null) {
      count += Object.values(matrix[obj.upRirhtNeighbor])[0];
    }
  }
  if (Object.values(matrix[obj.i])[0] == 1 && count <= 1) {
    tokillArr.push(obj.i);
  }
}

function dying(obj) {
  if (Object.values(matrix[obj.i])[0] == 0) {
    return;
  }

  let count = 0; // счетчик живых соседей
  if (Object.values(matrix[obj.i])[0] == 1) { //«Вымирание» если клетка жива 

    if (obj.leftNeighbor !== null) { // если сосед есть прибавляем его значение которое равно либо 1 либо 0
      count += Object.values(matrix[obj.leftNeighbor])[0];
    }
    if (obj.rirhtNeighbor !== null) {
      count += Object.values(matrix[obj.rirhtNeighbor])[0];
    }
    if (obj.upNeighbor !== null) {
      count += Object.values(matrix[obj.upNeighbor])[0];
    }
    if (obj.downNeighbor !== null) {
      count += Object.values(matrix[obj.downNeighbor])[0];
    }
    if (obj.downLeftNeighbor !== null) {
      count += Object.values(matrix[obj.downLeftNeighbor])[0];
    }
    if (obj.downRirhtNeighbor !== null) {
      count += Object.values(matrix[obj.downRirhtNeighbor])[0];
    }
    if (obj.upLeftNeighbor !== null) {
      count += Object.values(matrix[obj.upLeftNeighbor])[0];
    }
    if (obj.upRirhtNeighbor !== null) {
      count += Object.values(matrix[obj.upRirhtNeighbor])[0];
    }
  }
  if ( count !== 2 || count !== 3) {
    tokillArr.push(obj.i);
  }
}


/**
 * Функция запускает следующуй тик игры
 */
 function next() {
  process();
  newIteration();
}