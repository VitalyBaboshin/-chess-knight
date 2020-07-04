//Создали массив и заполнили его другим масивом который заполнили нулями
let chess=Array(8).fill(Array(8).fill(0));

const length = chess.length;
function draw() {
    let out = '';
    let m = 0;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j< chess[i].length; j++) {
            if (m%2) {
                out+=`<div class="chess-block bg-black" data-x=${j} data-y=${i}></div>`;
            } else {
                out+=`<div class="chess-block" data-x=${j} data-y=${i}></div>`;
            }
            m++;
        }
        m--
    }
    document.querySelector('#field').innerHTML = out;
    document.querySelectorAll('.chess-block').forEach(function(element) {
        element.onclick = horse;
    });
}

draw();

function removeHorse() {
    document.querySelectorAll('.chess-block').forEach(function (element) {
        element.classList.remove('green');
        element.classList.remove('active');
    })
}

function horse() {
    // Если предыдущий раз уже нажимали по этому полю то очистить
    if (this.classList.contains('green')) {
        removeHorse();
        return;
    }

    removeHorse();
    let x = this.dataset.x;
    let y = this.dataset.y;
    this.classList.add('green');
    if (+x+2 < length && +y+1 < length) {
        document.querySelector(`.chess-block[data-x="${+x+2}"][data-y="${+y+1}"]`).classList.add('active');
    }
    if (+x+2 < length && +y-1 >= 0) {
        document.querySelector(`.chess-block[data-x="${+x+2}"][data-y="${+y-1}"]`).classList.add('active');
    }
    if (+x-2 >= 0 && +y+1 < length) {
        document.querySelector(`.chess-block[data-x="${+x-2}"][data-y="${+y+1}"]`).classList.add('active');
    }
    if (+x-2 >= 0 && +y-1 >= 0) {
        document.querySelector(`.chess-block[data-x="${+x-2}"][data-y="${+y-1}"]`).classList.add('active');
    }



    if (+x-1 >= 0 && +y+2 < length) {
        document.querySelector(`.chess-block[data-x="${+x-1}"][data-y="${+y+2}"]`).classList.add('active');
    }
    if (+x-1 >= 0 && +y-2 >= 0) {
        document.querySelector(`.chess-block[data-x="${+x-1}"][data-y="${+y-2}"]`).classList.add('active');
    }
    if (+x+1 < length && +y+2 < length) {
        document.querySelector(`.chess-block[data-x="${+x+1}"][data-y="${+y+2}"]`).classList.add('active');
    }
    if (+x+1 < length && +y-2 >= 0) {
        document.querySelector(`.chess-block[data-x="${+x+1}"][data-y="${+y-2}"]`).classList.add('active');
    }
}

// ===== Маршрут Яниша ====
const wayYanish = [[50,11,24,63,14,37,26,35],
                   [23,62,51,12,25,34,15,38],
                   [10,49,64,21,40,13,36,27],
                   [61,22,9, 52,33,28,39,16],
                   [48,7, 60,1, 20,41,54,29],
                   [59,4, 45,8, 53,32,17,42],
                   [6, 47,2, 57,44,19,30,55],
                   [3, 58,5, 46,31,56,43,18]];

const wayWarnsdorf = [[54,21,34,9, 58,19,32,7 ],
                      [35,10,55,20,33,8, 57,18],
                      [22,53,64,59,56,45,6, 31],
                      [11,36,49,46,63,60,17,44],
                      [50,23,52,61,40,47,30,5 ],
                      [37,12,25,48,27,62,43,16],
                      [24,51,2, 39,14,41,4, 29],
                      [1, 38,13,26,3, 28,15,42]];


/** По номеру хода находит координаты массива */
function cellArr(arr, number) {
    let arrNew = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] === number) {
               return arrNew = [i,j];
            }
        }
    }
    return -1;
}

let timeoutList = [];

const btnWayYanish = document.querySelector('.wayYanish');
const btnWayWarnsdorf = document.querySelector('.wayWarnsdorf');
const clear = document.querySelector('.clear');
btnWayYanish.addEventListener('click', function (element) {
    drawWay(element, wayYanish);
})
btnWayWarnsdorf.addEventListener('click', function (element) {
    drawWay(element, wayWarnsdorf);
})
clear.addEventListener('click', function () {
    removeWay();
})
function drawWay(element, arr) {
    removeWay();
    // На время работы отрисовки маршрута заблокировать кнопку
    element.target.disabled = true;
    // Скорость отрисовки
    const interval = 300;
    const masLength = arr.length;
    let timer;
    for (let i = 0; i <masLength*masLength;i++) {
         timer = setTimeout(() => {
            stepWayHorse(cellArr(arr,i+1),i);
        },interval*i);

        timeoutList.push(timer);
    }
    timeoutList.push(setTimeout(() => element.target.disabled = false, interval*masLength*masLength)) ;
}
/** Отрисовывает ячейку по заданной координате, и в эту координату вписывает номер хода */
function stepWayHorse (arr,i) {
    if (arr === -1) return ;
    const cell = document.querySelector(`.chess-block[data-x="${arr[0]}"][data-y="${arr[1]}"]`);
    cell.classList.add('flag');
    cell.textContent = `${i+1}`;
}


/** Очистка поля от лишних классов */
function removeWay() {

    // очищаем лист setTimeout
    for(let i = 0; i < timeoutList.length; i++) {
        clearTimeout(timeoutList[i]);
    }
    timeoutList = [];
    //активируем неактивные кнопки
    btnWayYanish.removeAttribute('disabled');
    btnWayWarnsdorf.removeAttribute('disabled');

    document.querySelectorAll('.chess-block').forEach(function (element) {
        element.classList.remove('flag');
        element.classList.remove('green');
        element.classList.remove('active');
        element.textContent = '';
    })
}
