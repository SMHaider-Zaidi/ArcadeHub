let boxes = document.querySelectorAll('.boxes');
let resetBtn = document.querySelector('.restart')
let scoreX = document.querySelector('.scoreX');
let scoreO = document.querySelector('.scoreO');
let winInfo = document.querySelector('.winInfo')
let gameRow = document.querySelector('.game-row');
let turnInfo = document.querySelector('.turn-info');
let tieCount = document.querySelector('.tie-count');

let turnO = true;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

function checkWinner(){
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val !== '' && pos2Val !== '' && pos3Val !== ''){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            turnInfo.innerText = pos1Val + ' Wins!';
            turnInfo.style.color = 'gold';
            for(let index of pattern){
                boxes[index].classList.add('winner');
            }
            resetBtn.innerText = 'Play Again';
            boxes.forEach(box =>{
                box.disabled = true;
            })
            if(pos1Val === 'X'){
                scoreX.innerText = Number(scoreX.innerText)+1;
            }else if(pos1Val === 'O'){
                scoreO.innerText = Number(scoreO.innerText)+1;
            }
            
            return;
        }
    }
    }
        // ---- Tie logic start ----
    let isTie = true;
    boxes.forEach(box => {
        if(box.innerText === '') isTie = false;
    });
    if(isTie){
        turnInfo.innerText = "It's a Tie!";
        turnInfo.style.color = 'orange';
        tieCount.innerText = Number(tieCount.innerText) + 1;
        boxes.forEach(box => box.disabled = true);
        resetBtn.innerText = 'Play Again';
    }
    // ---- Tie logic end ----
}

turnInfo.innerText = "Turn: O's";
turnInfo.style.color = '#F0B94E';

boxes.forEach(box =>{
    box.addEventListener('click',() =>{
        if(turnO){
            box.innerText = 'O';
            box.style.color ='#F0B94E';
            turnO = false;
            turnInfo.innerText = "Turn: X's";
            turnInfo.style.color ='#44C2BE';
        }else{
            box.innerText = 'X';
            box.style.color = '#44C2BE';
            turnO = true;
            turnInfo.innerText = "Turn: O's";
            turnInfo.style.color ='#F0B94E';
        }
        box.disabled = true;

        checkWinner();
    });
})

resetBtn.addEventListener('click', () =>{
    if(turnO){
        turnInfo.innerText = "Turn: O's";
        turnInfo.style.color = '#F0B94E';
    }else{
        turnInfo.innerText = "Turn: X's";
        turnInfo.style.color = '#44C2BE';
    }
    
    resetBtn.innerText = 'Restart';
    boxes.forEach(box =>{
        box.innerText = '';
        box.disabled = false;
        box.classList.remove('winner');
    })
})