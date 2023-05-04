function add(num1,num2){
    return num1+num2;
}

function divide(num1,num2){
    return num1/num2;
}
function subtract(num1,num2){
    return num1-num2;
}
function multiply(num1,num2){
    return num1*num2;
}

function operate(num1,num2,operator){

    let res = 0;

    if(operator == '+'){
        res = add(num1,num2);
    }
    if(operator == '-'){
        res = subtract(num1,num2);
    }
    if(operator == '/'){
        res = divide(num1,num2);
    }
    if(operator == '*'){
        res = multiply(num1,num2)
    }

    return res;
}
function updateDisplay(text){

    if(text === '')display.innerText = '';
    
    if(checkLength() < 12){
        
        display.innerText += text;
    }
}
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function calculate(){
    let operators = ['+','-','*','/'];
        let text = display.innerText;

        for(let i = 0;i < text.length ;i++){
            if(operators.includes(text[i])){
                if(text.slice(i+1,text.length) === ''){
                    if(text.slice(0,i) === ''){
                        return '';
                    }
                    return +text.slice(0,i);
                }
                num1 = +text.slice(0,i)
                num2 = +text.slice(i+1,text.length)
                operator = text[i]
                display.innerText = '';
                let res = operate(num1,num2,operator)
                if(isFloat(res)){
                    res = +res.toFixed(7)
                }
                updateDisplay(res);
            
        }

    }
    let res = operate(num1,num2,operator)
                if(isFloat(res)){
                    res = +res.toFixed(8)
                }

    return res;
}

function checkForOperator(){
    let operators = ['+','-','*','/'];
        let text = display.innerText;
        let isOperator = false;

    for(let i = 0;i < text.length ;i++){
        if(operators.includes(text[i])){
            isOperator = true
    }
}
return isOperator;
}

function delOne(){
    let length= display.innerText.length;

    return display.innerText.slice(0,length-1);
}

function dotOperations(){
    let text = display.innerText;
    let operators = ['+','-','*','/'];
    if(/[0-9]+\.[0-9]+[\+\*\-\/]{1}[0-9]+\.[0-9]*/.test(text) || /[0-9]+[\+\*\-\/]{1}[0-9]+\.[0-9]*/.test(text)){
        dotButton.disabled = true;
        return true;
    }

    

    for(let i = 0 ; i < text.length; i++){
        if(operators.includes(text[i]) && text.slice(i+1,text.length) ==''){
            dotButton.disabled = true;
            return true;
        }
        

   
}
return false;
}

function checkLength(){
    return display.innerText.length;
}


let display = document.getElementById('display');
let displayValue = '';
let num1 = 0;
let num2 = 0;
let operator = '';
let buttons = document.querySelectorAll('button');
let dotButton = document.querySelector('#Decimal');
let upperDisplay = document.querySelector('#upper-display');

buttons.forEach(button =>{
    

    if(button.id != 'clear' && button.id != 'Enter' && button.id !='Backspace'){
        button.addEventListener('click',()=>{
        
        if(checkForOperator()){
            if(button.classList.contains('operator')){
                
                let res = calculate();
                if(res === ''){
                    return;
                }
                let displayText = res + `${button.innerText}`;
                updateDisplay('');
                updateDisplay(displayText);
                dotOperations();
                return
            }
        }
        if(button.id == 'Decimal'){
            
            if(display.innerText == ''){
                updateDisplay('0.') 
                return;
            }
            else{
                updateDisplay(button.innerText);
                button.disabled = true;
                return;
            }
        }
        if((button.innerText.includes('+') || button.innerText.includes('*') || button.innerText.includes('/')) && display.innerText == ''){
            return;
        }
    
        updateDisplay(button.innerText)
        if(!dotOperations()) dotButton.disabled = false;
        return
        })
    }
    else if(button.id == 'clear'){
    button.addEventListener('click',()=>{
        updateDisplay('');
    })
    }
    else if(button.id == 'Enter'){
        button.addEventListener('click',()=>{
        calculate();
})
}
else if(button.id =='Backspace'){
    button.addEventListener('click',()=>{
    display.innerText = delOne();
    })
}

document.addEventListener('keydown', (event)=>{
    if(event.key === button.id){
        button.click()
    }else if(event.code == 'Equals' || event.code == 'NumpadAdd'){
        document.getElementById('Add').click()
    }
    else if(event.code == "KeyX" || event.code == "NumpadMultiply"){
        document.getElementById('Multiply').click()
    }
    else if(event.code == "Slash" || event.code == "NumpadDivide"){
        document.getElementById('Divide').click()
    }
    else if(event.code == 'Minus' || event.code == 'NumpadSubtract'){
        document.getElementById('Subtract').click()
    }
    else if(event.code == "Enter"){
        document.getElementById('Enter').click()
    }
    else if(event.code == "Period" || event.code == "NumpadDecimal"){
        document.getElementById('Decimal').click()
    }
})

})