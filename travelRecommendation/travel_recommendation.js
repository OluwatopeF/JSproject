let btnReset = document.querySelector('button');
let input = document.querySelector('input');

btnReset.addEventListener('click', () =>{
    input.forEach(input => input.value = '');
});

