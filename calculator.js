var number1 = 0;
var number2 = 0;
var opFlag = false;
var decimalOp = false;
var decimalFlag = false;
var storeFlag = true;

//make sure the window has loaded to make sure action listener can be assigned to an element that exists
window.onload = function () {
    document.getElementById("divide").addEventListener('click', function () {
        document.getElementById("divide-radio").checked = true;
        updateStroredValue();
    });
    document.getElementById("multiply").addEventListener('click', function () {
        document.getElementById("multiply-radio").checked = true;
        updateStroredValue();
    });
    document.getElementById("minus").addEventListener('click', function () {
        document.getElementById("minus-radio").checked = true;
        updateStroredValue();
    });
    document.getElementById("add").addEventListener('click', function () {
        document.getElementById("add-radio").checked = true;
        updateStroredValue();
    });
    document.getElementById("clear").addEventListener('click', function () {
        document.getElementById("screen-input").value = "0";
        document.getElementById("stored-value").innerHTML = "0.0";
        document.getElementById("divide-radio").checked = false;
        document.getElementById("multiply-radio").checked = false;
        document.getElementById("minus-radio").checked = false;
        document.getElementById("add-radio").checked = false;
        number1 = 0.0;
        number2 = 0.0;
        opFlag = false;
        decimalFlag = false;
        decimalOp = false;
    });
    document.getElementById("sign").addEventListener('click', function () {
        if(document.getElementById("screen-input").value == "0"){
            document.getElementById("screen-input").value = "-0";
        } else if(opFlag){
            document.getElementById("screen-input").value = "-0";
            opFlag = false;
        } else {
            document.getElementById("screen-input").value *= -1;
        }
    });
    document.getElementById("percent").addEventListener('click', function () {
        document.getElementById("screen-input").value /= 100;
    });

    for (let number = 1; number <= 9; number++) {
        document.getElementById(number).addEventListener('click', function () {
            if(opFlag){
                document.getElementById("screen-input").value = number;
                opFlag = false;
                decimalFlag = false;
                decimalOp = false;
            } else if(document.getElementById("screen-input").value == "-0"){
                document.getElementById("screen-input").value = number*-1;
            } else if(document.getElementById("screen-input").value == "0"){
                document.getElementById("screen-input").value = number;
            } else {
                if(decimalFlag){
                    document.getElementById("screen-input").value = document.getElementById("screen-input").value.slice(0,-1)+number;
                    decimalFlag = false;
                } else {
                    document.getElementById("screen-input").value += number;
                }
            }
            
        });
    }
    document.getElementById("zero").addEventListener('click', function () {
        if(opFlag){
            document.getElementById("screen-input").value = 0;
            opFlag = false;
        } else if(document.getElementById("screen-input").value != 0){
            document.getElementById("screen-input").value += 0;
        } else if(document.getElementById("screen-input").value.substring(0,4) == "-0.0" || document.getElementById("screen-input").value.substring(0,3) == "0.0"){
            document.getElementById("screen-input").value += 0;
        }
    });
    document.getElementById("decimal").addEventListener('click', function () {
        if(!decimalOp){
            document.getElementById("screen-input").value += ".0";
            decimalFlag = true;
            decimalOp = true;
        }
    });

    document.getElementById("screen-input").addEventListener('keyup', function (e) {
        //check if key pressed is the eneter key
        if (e.keyCode == 13) {
            calculate();
        }
    });

    document.getElementById("calculate").addEventListener('click', function (e) {
        calculate();
    });
}

//function to update the stored value to be passed into the php file when a button is clicked
function updateStroredValue() {
    if(document.getElementById("screen-input").value != ""){
        number2 = document.getElementById("screen-input").value;
        document.getElementById("stored-value").innerHTML = number2;
    }
    storeFlag = true;
    opFlag = true;
    decimalOp = false;
    decimalFlag = false;
}

//function to submit the php form and pass the proper values
function calculate(){
    number1 = document.getElementById("stored-value").innerHTML;
    number2 = document.getElementById("screen-input").value;
    document.getElementById("number1").value = number1;   


    console.log(number1+" "+number2);
    if(storeFlag){
        storeFlag = false;
        document.getElementById("stored-value").innerHTML = number2;
    }

    
    if(document.getElementById("add-radio").checked){
        document.getElementById("screen-input").value = +number1 + +number2;
    } else if(document.getElementById("minus-radio").checked){
        document.getElementById("screen-input").value = +number1 - +number2;
    } else if(document.getElementById("multiply-radio").checked){
        document.getElementById("screen-input").value = +number1 * +number2;
    } else if(document.getElementById("divide-radio").checked){
        document.getElementById("screen-input").value = +number1 / +number2;
    }

}