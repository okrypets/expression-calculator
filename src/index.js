function eval() {
    // Do not use eval!!!
    return;
}

const PRIORITET = {
    "(":0,
    ")":1,
    "+":2,
    "-":2,
    "*":3,
    "/":3
};

const switchFn = (lastNum, preLastNum, lastOper) => {
    if (lastNum === 0 && lastOper === "/") throw "TypeError: Division by zero.";
    if (preLastNum === undefined) throw "ExpressionError: Brackets must be paired";
    switch (lastOper) {
        case "+":
            rezOper = preLastNum + lastNum;
            break;
        case "-":
            rezOper = preLastNum - lastNum;
            break;
        case "/":
            rezOper = preLastNum / lastNum;
        break;
        case "*":
            rezOper = preLastNum * lastNum;
            break;
        case ")":
            rezOper = preLastNum * lastNum;
            break;
        default:
            break;
    }
    return rezOper
}

function expressionCalculator(expr) {
    
    let arr = expr.split(" ").length <= 1 ? expr.split("") : expr.split(" ").reduce((acc, it) => {
        let check = it.length > 1 && (it.includes('(') || it.includes(')'))
        if (it && !check) {
            acc.push(it)
        } else if (check) {
            let multiIt = it.split("");
            acc = [...acc, multiIt]
        }
    acc = acc.flat();    
    return acc;
    }, [])

    let numSt = [];
    let operSt = [];   

    for (let i = 0; i < arr.length; i++) {
        
        let elem = arr[i];
        let charCode = arr[i].charCodeAt(0);
        let lastOperStElem = operSt[operSt.length-1]
        let rezOper;
        
        if (charCode <40 && charCode >57) throw Error; 

        if (charCode > 47 && charCode < 58) { 
            numSt.push(+elem)
            if (i === arr.length -1) { 
                do {
                    let lastNum =  numSt.pop();
                    let preLastNum = numSt.pop();
                    let lastOper = operSt.pop();
                    if (lastOper === "(") throw "ExpressionError: Brackets must be paired";
                    rezOper = switchFn(lastNum, preLastNum, lastOper);
                    numSt.push(rezOper);                   

                } while (operSt.length > 0);
            }
        }

        if (charCode > 39 && charCode < 48) { 
            let isEmpty = operSt.length === 0;
            let elemPrioritet = PRIORITET[elem];   
            
            if (elem === "(" || lastOperStElem === "(" || isEmpty || elemPrioritet > PRIORITET[lastOperStElem] ) {
                operSt.push(elem);  
            } else if (elemPrioritet <=  PRIORITET[lastOperStElem] && elem !== "(" && elem !== ")") {
                
                do {
                    let lastNum =  numSt.pop();
                    let preLastNum = numSt.pop();
                    let lastOper = operSt.pop();
                    rezOper = switchFn(lastNum, preLastNum, lastOper);
                    numSt.push(rezOper);
                    lastOperStElem = operSt[operSt.length-1]
                } while (operSt.length > 0 && elemPrioritet <= PRIORITET[lastOperStElem] && lastOperStElem !== "(");
                
                operSt.push(elem);
                
            } else if (elem === ")") {
                do {
                    let lastNum =  numSt.pop();
                    let preLastNum = numSt.pop();
                    let lastOper = operSt.pop();
                    rezOper = switchFn(lastNum, preLastNum, lastOper);                    
                    numSt.push(rezOper);
                    lastOperStElem = operSt[operSt.length-1]
                } while (lastOperStElem !== "(");
                operSt.pop();
            }
            if  (i === arr.length-1) { 
                do {
                    let lastNum =  numSt.pop();
                    let preLastNum = numSt.pop();
                    let lastOper = operSt.pop();
                    if (lastOper === "(") throw "ExpressionError: Brackets must be paired";
                    rezOper = switchFn(lastNum, preLastNum, lastOper);
                    numSt.push(rezOper);                 
                 } while (operSt.length > 0);                 
             }
        }
        
    }
    let result = numSt[0];
    return result;
}

module.exports = {
    expressionCalculator
}