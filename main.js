let start = document.querySelector('.start')
let icons = [1, 2, 3, 4, 5, 6, 7]
let slots = document.querySelectorAll('.sloth_icons')
let iconsSlot = document.querySelectorAll('.icon_items')
let balance = document.querySelector('.balance_num')
let rates = document.querySelectorAll('.rate')
let lastWin = document.querySelector('.last_win')
let balanceDiv = document.querySelector('.balance')
let winMoney;
let winCount;
let offAudio = document.querySelector('.audioNo')


const spin = new Audio();
spin.src = 'img/spin_audio.mp3';

const item = new Audio();
item.src = 'img/item_audio.mp3';

const winAudio = new Audio();
winAudio.src = 'img/win_audio.mp3'

// ==================== подключение / отключение звука ====================

offAudio.addEventListener('click', () => {
    if (!offAudio.children[0].classList.contains('bx-volume-mute')) {
        offAudio.children[0].classList.add('bx-volume-mute')

    }else {
        offAudio.children[0].classList.remove('bx-volume-mute')
    }
})

// ==================== смена ставки ====================


rates.forEach((o) => {
    o.addEventListener('click', () => {
        for (let i = 0; i < rates.length; i++) {
            rates[i].classList.remove('rate_active')
        }
        o.classList.add('rate_active')
    })
})

// ==================== радномное попадание иконок ====================

iconsSlot.forEach(o => {
    let bg = window.getComputedStyle(o, null).getPropertyValue('background-image').split('/')
    let lastBg = bg[bg.length - 1].split('.')
    lastBg[0] = icons[Math.floor(Math.random() * icons.length)];
    let arrBg = lastBg.join('.');
    bg[bg.length - 1] = arrBg;
    let newBg = bg.join('/');
    o.style.setProperty('background-image', newBg)
})

// ==================== пначало игры ====================

start.addEventListener('click', () => {
    // ==================== проверка звука ====================

    if (!offAudio.children[0].classList.contains('bx-volume-mute')) {
        spin.play()
    }
    let activeRate = document.querySelector('.rate_active');
    let rateSum = +activeRate.textContent.trim().split('$').join('')
    console.log(rateSum);
    let balanceSum = +balance.textContent.split('$')[0]
    console.log(balanceSum);
    let x = window.getComputedStyle(slots[3], null).getPropertyValue("transform");
    // ==================== проверка на местность слота ====================

    if (x == 'none' || x == 'matrix(1, 0, 0, 1, 0, 0)') {
        if (balanceSum >= rateSum) {
            if (!offAudio.children[0].classList.contains('bx-volume-mute')) {
                item.play()
            }
            balanceSum = balanceSum - rateSum;
            balance.textContent = balanceSum + '$'
            console.log(true);

            removeClasses();
            iconsSlot.forEach(o => {

                let bg = window.getComputedStyle(o, null).getPropertyValue('background-image').split('/')
                let lastBg = bg[bg.length - 1].split('.')
                lastBg[0] = icons[Math.floor(Math.random() * icons.length)];
                let arrBg = lastBg.join('.');
                bg[bg.length - 1] = arrBg;
                let newBg = bg.join('/');
                o.style.setProperty('background-image', newBg)
            })


            // ==================== анимация иконок ====================

            slots.forEach(i => {
                i.classList.remove('anim')
            })
            let index = -1;
            let timer = setInterval(function () {
                if (++index == slots.length) {
                    clearInterval(timer);
                }
                else {
                    slots[index].classList.add('anim')
                    slots[index].classList.add('animEnd')
                }
            }, 35);
            let lastSlots = document.querySelectorAll('.sloth_item')

            // ==================== получаем победные иконки ====================

            let wins = [
                oneList = {
                    one: lastSlots[0].children[0].children[0].children[0],
                    two: lastSlots[0].children[0].children[1].children[0],
                    three: lastSlots[0].children[0].children[2].children[0]
                },
                twoList = {
                    one: lastSlots[1].children[0].children[0].children[0],
                    two: lastSlots[1].children[0].children[1].children[0],
                    three: lastSlots[1].children[0].children[2].children[0]
                },
                threeList = {
                    one: lastSlots[2].children[0].children[0].children[0],
                    two: lastSlots[2].children[0].children[1].children[0],
                    three: lastSlots[2].children[0].children[2].children[0]
                },
                fourList = {
                    one: lastSlots[3].children[0].children[0].children[0],
                    two: lastSlots[3].children[0].children[1].children[0],
                    three: lastSlots[3].children[0].children[2].children[0]
                }
            ]
            let winsVert = [
                oneVert = {
                    one: lastSlots[0].children[0].children[0].children[0],
                    two: lastSlots[1].children[0].children[0].children[0],
                    three: lastSlots[2].children[0].children[0].children[0],
                    four: lastSlots[3].children[0].children[0].children[0]
                },
                twoVert = {
                    one: lastSlots[0].children[0].children[1].children[0],
                    two: lastSlots[1].children[0].children[1].children[0],
                    three: lastSlots[2].children[0].children[1].children[0],
                    four: lastSlots[3].children[0].children[1].children[0]
                },
                threeVert = {
                    one: lastSlots[0].children[0].children[2].children[0],
                    two: lastSlots[1].children[0].children[2].children[0],
                    three: lastSlots[2].children[0].children[2].children[0],
                    four: lastSlots[3].children[0].children[2].children[0]
                }
            ]

            // получаем первую линию по гаризонтальности
            let winsOne = [];
            wins.forEach(i => {
                winsOne.push(i.one)
            })
            let oneWins = [];
            winNums(winsOne, oneWins)

            // получаем первую линию по вертикалии
            let vertWinsOne = [];
            winsVert.forEach(i => {
                vertWinsOne.push(i.one)
            })
            let oneVertWins = [];
            winNums(vertWinsOne, oneVertWins)

            // получаем вторую линию по гаризонтальности
            let winsTwo = [];
            wins.forEach(i => {
                winsTwo.push(i.two)
            })
            let twoWins = [];
            winNums(winsTwo, twoWins)

            // получаем вторую линию по вертикалии
            let vertWinsTwo = [];
            winsVert.forEach(i => {
                vertWinsTwo.push(i.two)
            })
            let twoVertWins = [];
            winNums(vertWinsTwo, twoVertWins)

            // получаем третью линию по гаризонтальности
            let winsThree = [];
            wins.forEach(i => {
                winsThree.push(i.three)
            })
            let threeWins = [];
            winNums(winsThree, threeWins)

            // получаем вторую линию по вертикалии
            let vertWinsThree = [];
            winsVert.forEach(i => {
                vertWinsThree.push(i.three)
            })
            let threeVertWins = [];
            winNums(vertWinsThree, threeVertWins)

            // получаем четвертую линию по вертикалии
            let vertWinsFour = [];
            winsVert.forEach(i => {
                vertWinsFour.push(i.four)
            })
            let fourVertWins = [];
            winNums(vertWinsFour, fourVertWins)


            // ==================== логика победы ====================

            let vertWins = [fourVertWins, threeVertWins, twoVertWins, oneVertWins]
            let allWins = [oneWins, twoWins, threeWins]
            allWins.forEach(i => {
                if (i.length > 2) {
                    i.forEach(o => {
                        setTimeout(() => {
                            o.parentElement.classList.add('win')
                            if (!offAudio.children[0].classList.contains('bx-volume-mute')) {
                                winAudio.play()
                            }
                        }, 3150)
                    })
                }
            })
            vertWins.forEach(i => {
                if (i.length > 2) {
                    i.forEach(o => {
                        setTimeout(() => {
                            o.parentElement.classList.add('win')
                            console.log(o.parentElement.classList);
                            if (!offAudio.children[0].classList.contains('bx-volume-mute')) {
                                winAudio.play()
                            }
                        }, 3150)
                    })
                }
            })
            // ==================== эффекты победы ====================

            setTimeout(() => {
                let winsCount = document.querySelectorAll('.win').length;

                winMoney = (rateSum * winsCount)

                winCount = 0;
                let index = -1;

                if (rateSum == 20) {
                    winEffect(index, winCount, 30)
                }else if (rateSum == 50) {
                    winEffect(index, winCount, 20)
                }else if (rateSum == 100) {
                    winEffect(index, winCount, 10)
                }else {
                    winEffect(index, winCount, 1)
                }
            }, 3200)

        } else {
            console.log(balanceDiv);
            let popaps = document.querySelector('.pop')
            popaps.classList.add('popaps')
            popaps.hidden = false;

            setTimeout(() => {
                popaps.classList.remove('popaps')
                popaps.hidden = true;
            }, 1550)
        }
    }
})

// ==================== функция для получения победных иконок ====================

function winNums(arr, arr2) {
    let found = false;
    for (let i = 0; i < arr.length; i++) {
        for (let o = 0; o < arr.length; o++) {
            if (i != o && getComputedStyle(arr[i], null).getPropertyValue('background-image')
                == getComputedStyle(arr[o], null).getPropertyValue('background-image')) {
                if (!found) {
                    found = true;
                    arr2.push(arr[i])
                }
            }
        }
        found = false;
    }
    return arr2;
}

// ==================== функция которая убирает все настройки при клике ====================


function removeClasses() {
    iconsSlot.forEach(i => {
        i.parentElement.classList.remove('win')
    })
    winAudio.pause();
    winAudio.currentTime = 0
}

// ==================== функция для эффекта ====================

function winEffect(index, winCount, active) {
    let timer = setInterval(function () {
        if (++index == winMoney) {
            balance.textContent = +balance.textContent.split('$')[0] + winMoney + '$';
            clearInterval(timer);
            // console.log(winMoney);
        }
        else {
            winCount++
            lastWin.textContent = winCount + '$'
            console.log(winCount);
        }
    }, active);
}