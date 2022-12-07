let m = 4; //высота
let n = 4; // длинна

let widthOfCell = 35;
$('.main-wrapper').css('width', (widthOfCell * n) + 6);

let matrix = [];
let counterId = 0;

fillMainWrapper();















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


function killCell(cell) {
  cell.addClass('deathCell');
  cell.removeClass('aliveCell');
}

function aliveCell(cell) {
  cell.addClass('aliveCell');
  cell.removeClass('deathCell');
}