
document.addEventListener("DOMContentLoaded", () => {

    const screen = document.querySelector(".answer-screen");
    const buttons = document.querySelectorAll(".btn");

    let currentValue = "";
    let previousValue = "";
    let operator = null;
    let justCalculated = false;

    document.addEventListener("keydown", (event) => {

        const key = event.key;

        if (!isNaN(key)) {
            appendNumber(key);
        }
        if (key === ".") {
            appendNumber(".");
        }
        if (key === "+" || key === "-" || key === "*" || key === "/") {
            chooseOperator(key);
        }

        if (key === "Enter" || key === "=") {
            compute();
        }

        if (key === "Backspace") {
            deleteLast();
        }

        if (key === "Escape") {
            clearAll();
        }

        updateDisplay();
    });



    buttons.forEach(button => {
        button.addEventListener("click", () => {

            if (button.dataset.number !== undefined) {
                appendNumber(button.dataset.number);
            }

            if (button.dataset.operator !== undefined) {
                chooseOperator(button.dataset.operator);
            }

            if (button.dataset.equals !== undefined) {
                compute();
            }

            if (button.dataset.clear !== undefined) {
                clearAll();
            }

            if (button.dataset.delete !== undefined) {
                deleteLast();
            }

            updateDisplay();
        });
    });

    function appendNumber(num) {

        if (justCalculated || currentValue === "Error") {
            currentValue = num;
            justCalculated = false;
            return;
        }

        if (num === "." && currentValue.includes(".")) return;

        if (currentValue === "" && num === ".") {
            currentValue = "0.";
            return;
        }

        if (currentValue === "0" && num !== ".") {
            currentValue = num;
            return;
        }

        currentValue += num;
    }

    function chooseOperator(op) {

        if (currentValue === "" && previousValue === "") {
            if (op === "-") {
                currentValue = "-";
            }
            return;
        }

        if (previousValue !== "" && currentValue === "") {
            if (op === "-") {
                currentValue = "-";
                return;
            }
            operator = op;
            return;
        }

        if (previousValue !== "" && currentValue !== "") {
            compute();
        }

        previousValue = currentValue;
        currentValue = "";
        operator = op;
        justCalculated = false;
    }

    function compute() {

        if (
            previousValue === "" ||
            operator === null ||
            currentValue === ""
        ) return;

        const a = Number(previousValue);
        const b = Number(currentValue);

        const result = performCalculation(a, b, operator);

        currentValue = String(result);
        previousValue = "";
        operator = null;
        justCalculated = true;
    }

    function performCalculation(a, b, op) {
        switch (op) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "/": return b === 0 ? "Error" : a / b;
            case "%": return a % b;
            default: return b;
        }
    }

    function deleteLast() {
        if (currentValue === "" || currentValue === "Error") return;
        currentValue = currentValue.slice(0, -1);
        justCalculated = false;
    }

    function clearAll() {
        currentValue = "";
        previousValue = "";
        operator = null;
        justCalculated = false;
    }

    function updateDisplay() {

        if (previousValue !== "" && operator !== null && currentValue !== "") {
            screen.innerText = `${previousValue} ${operator} ${currentValue}`;
            return;
        }

        if (previousValue !== "" && operator !== null && currentValue === "") {
            screen.innerText = `${previousValue} ${operator}`;
            return;
        }

        if (currentValue !== "") {
            screen.innerText = currentValue;
            return;
        }

        screen.innerText = "0";
    }

    updateDisplay();
});
