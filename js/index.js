let m ; //высота поля 
let n ; // длинна поля


// массив объектов всех клеток
// одна клетка представляет собой объект 
// с полем (id клетки) и значение (1 или 0) жива или мертва 
const matrix = [];

// счетчик для того что бы задать id каждой клетке
let counterId = 0;

// массив элементво которые будут убиты в начале нового тика
const toKillArr = [];
// массив элементво которые будут активированы в начале нового тика
const toAliveArr = [];



/**
 * Функция подсчитывает всех соседий конкретной клетки и 
 * запускает для неё 4 оператора ( «Активация», «Перегрузка», «Изоляция», «Вымирание» ) 
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

    if (current % n == 0) { // для каждой клетки в первом столбце
      leftNeighbor = null;
      downLeftNeighbor = null;
      upLeftNeighbor = null;
    } 

    if ((current + 1) % n == 0) { // для каждой клетки в последнем столбце
      rirhtNeighbor = null;
      upLeftNeighbor = null;
      upRirhtNeighbor = null;
    } 

    if (current < n) { // для каждой клетки в первом ряду
      upNeighbor = null;
      upLeftNeighbor = null;
      upRirhtNeighbor = null;
    } 

    if (current >= (matrix.length) - n) { // для каждой клетки в последнем ряду
      downNeighbor = null;
      downLeftNeighbor = null;
      downRirhtNeighbor = null;
    } 

    const obj = {
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

    const count = countAliveNeighbors(obj);

    activation(obj, count);
    overloading(obj, count)
    isolation(obj, count);
    dying(obj, count);
  }
}

/**
 * Функция проходится по массивам toAliveArr, toKillArr 
 * и убивает или оживляет клетку.
 * Если живых клеток не осталось , выводит на экран сообщение Game over!
 */
function newIteration() {
  const hasLivingCells = livingCells();
  if (!hasLivingCells) {
    alert('Game over!')
  }
  for (const el of toAliveArr) {
    aliveCell(el);
    matrix[el][el] = 1;
  }
  for (const el of toKillArr) {
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
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][i]) {
      return true;
    }  
  }
  return false;
}


/**
 * Функция отрисовывает поле с тем количеством клеток 
 * которое указано в инпутах
 */
function fillMainWrapper() {
  $('.generate-form').addClass('display-none');
  $('.button').removeClass('display-none');
  $('.button').parent().removeClass('display-none');
  $('.main-wrapper').removeClass('display-none');

  n = parseInt( $('.nInput').val() );
  m = parseInt( $('.mInput').val() );

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      
      const res =  Math.round(Math.random() ) // рандомно выбираем жива клетка или мертва
      
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
      
      matrix.push( { [counterId]: res } ); // добавляем id и значение клетки в массив matrix
      counterId++;  
    }
  }
  
  const widthOfCell = $('.cellBox').width();
  $('.main-wrapper').css('max-width', ((widthOfCell + 6) * n) ); // делаю поле клеток по ширине равным количеству клеток * ширину 1 клетки
  
}


function killCell(cellId) {
  $(`#${cellId}`).addClass('deathCell').removeClass('aliveCell');
}
function aliveCell(cellId) {
  $(`#${cellId}`).addClass('aliveCell').removeClass('deathCell');
}


/**
 * Оператор «Активация»
 * мертвая клетка, у которой ровно три активных соседа, становится активной в следующем состоянии поля
 * 
 * @param {Object} obj 
 * @returns void
 */
function activation(obj, count) {
  if (Object.values(matrix[obj.i])[0] == 1) { // проверка что клетка мерва 
    return;
  }

  if (count == 3) { // условие оператора
    toAliveArr.push(obj.i);
  }
}

/**
 * Оператор «Перегрузка»
 * активная клетка, у которой активных соседей четыре или больше, «умрет» в следующем состоянии поля.
 * 
 * @param {Object} obj 
 * @returns void
 */
function overloading(obj, count) {
  if (Object.values(matrix[obj.i])[0] == 0) { // проверка что клетка живая 
    return;
  }

  if (count >= 4) { // условие оператора
    toKillArr.push(obj.i);
  }
}

/**
 * Оператор «Изоляция»
 * Активная клетка, у которой активных соседей один или меньше, «умрет» в следующем состоянии поля.
 * 
 * @param {Object} obj 
 * @returns void
 */
function isolation(obj, count) {
  if (Object.values(matrix[obj.i])[0] == 0) { // проверка что клетка живая 
    return;
  }

  if ( count <= 1) { // условие оператора
    toKillArr.push(obj.i);
  }
}

/**
 * Оператор «Вымирание»
 * Активная клетка останется такой, только если у неё ровно 2 или 3 активных соседа, иначе «умрет» в следующем состоянии поля.
 * 
 * @param {Object} obj 
 * @returns void
 */
function dying(obj, count) {
  if (Object.values(matrix[obj.i])[0] == 0) { // проверка что клетка живая 
    return;
  }

  if ( count !== 2 || count !== 3) { // условие оператора
    toKillArr.push(obj.i);
  }
}


/**
 * Функция запускает следующуй тик игры
 */
 function next() {
  process();
  newIteration();
}


/**
 * Функция считает количество живых соседей
 * 
 * @param {Object} obj 
 * @returns {Integer} count
 */
function countAliveNeighbors(obj) {
  let count = 0; // счетчик живых соседей

  Object.keys(obj).forEach(key => {
    if (key == 'i') { // значение собственной клетки не учитывается
      return;
    }
    if (obj[key] !== null) { // если сосед есть прибавляем его значение которое равно 1 или 0
      count += Object.values(matrix[obj[key]])[0];
    }
  });

  return count;
}