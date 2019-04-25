function renderTime() {
    let myDate = new Date();
    let day = myDate.getDay();
    let month = myDate.getMonth();
    let monthDay = myDate.getDate();
    let dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let clock = document.getElementById("displayDate");
    clock.textContent = `${dayArray[day]}, ${monthDay} ${monthArray[month]}`;
    clock.innerText = `${dayArray[day]}, ${monthDay} ${monthArray[month]}`;

    setTimeout("renderTime()", 1000);

}

function renderMonth() {
    let myDate = new Date();
    let month = myDate.getMonth();
    let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let clock = document.getElementById('displayDate');
    clock.textContent = `${monthArray[month]}`;
    clock.innerHTML = `${monthArray[month]}`;

    setTimeout("renderMonth()", 1000);
}

function displayBudget() {
    let index;
    
    for(i=0; i<localStorage.length; i++) {
        if(localStorage.key(i) === 'Budget') {
            index = i;
        }
    }
    let budget = localStorage.key(index);
    let budgetNumber = localStorage.getItem(budget);
    return budgetNumber;
}

function sum() {
    let sum=0;
    for(let i=0; i<localStorage.length; i++) {
        key = localStorage.key(i);
        value = localStorage.getItem(key);
        value = parseInt(value);
        if(key !== 'Budget') {
            sum += value;
        }        
    }

    return sum;
}

function sumAll() {
    let key, value, sum=0, index, hasBudget;
    for(let i=0; i<localStorage.length; i++) {
        key = localStorage.key(i);
        value = localStorage.getItem(key);
        value = parseInt(value);
        if(key !== 'Budget') {
            sum += value;
        }        
    }
    
    for(i=0; i<localStorage.length; i++) {
        if(localStorage.key(i) === 'Budget') {
            index = i;
            hasBudget = true;
        }
    }

    let budget = localStorage.key(index);
    let budgetNumber = localStorage.getItem(budget);
    
    let field = document.getElementsByClassName('sumAll');
    if(displayBudget() === null) {
        field[i].innerHTML = `Total Spendings $${0}`;
    } else {
        for(let i=0; i<field.length; i++) {
            field[i].innerHTML = `Total Spendings $${sum}`;
        }
    }
}

function storeData() {

    let category = prompt("In what did you spend?");

    if (category == null) {
        return;
    } else if(category === "") {
        alert("Please enter a spending");
        return;
    };

    let spending = prompt("How much?");

    if(spending === "") {
        alert("Please enter how much you spent");
    } else if(category && spending) {
        category = capitalizeFirstLetter(category);
        localStorage.setItem(category, spending);
    };

    location.reload();
}

function loadStorage() {

    let field = document.getElementById('spendings');

        for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            if(key !== 'Budget') {
                field.innerHTML += `${key} -${value}<br />`;
            } 
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function deleteItem() {

    let items = {};

    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

    }
}

function deleteAll() {
    let decision = confirm("Are you sure you want to reset all?");

    if(decision) {
        localStorage.clear();
    }
}

var button = document.getElementById('budget').addEventListener('click', buttonClick);
var budget = document.getElementById('goal').addEventListener('click', setBudget);

function buttonClick(e) {
    if (document.getElementById('budget').textContent === 'Budget') {
        document.getElementById('budget').textContent = `${displayBudget()}`;
    } else if (document.getElementById('budget').textContent === `${displayBudget()}`){
        document.getElementById('budget').textContent = 'Budget';
    } 
}

function setBudget(e) {
    if (document.getElementById('goal').textContent === 'Click to set budget') {
        let answer = confirm("Set budget?");
        if(answer === false) {
            return;
        } else {
            let decision = prompt("New budget");
            if(decision === null) {
                return;
            } else {
                localStorage.setItem("Budget", decision);
                document.getElementById('goal').textContent = `${decision}`;
            }
        }
    } else if (document.getElementById('goal').textContent === 'Changed') {
        document.getElementById('goal').textContent = 'Click to set budget';
    }
    location.reload();
}


//On load, new spending and on update budget, update progress bar
function updateBar() {
    // If user did not set a budget, bar stays full
    if(displayBudget() === null){
    } else {
        if(100-calculateBar() <= 0) {
            document.getElementById('progress').style.width = "100%";
            document.getElementById('progress').style.background = "#f3e2cb";
            document.getElementById('progress').textContent = 'No money';
        } else {
            document.getElementById('progress').style.width = `${100-calculateBar()}%`;
            document.getElementById('progress').textContent = `${100-calculateBar()}%`;
            if(100-calculateBar() <= 20) {
                document.getElementById('progress').style.background = "red";
            } else if(100-calculateBar() <= 40) {
                document.getElementById('progress').style.background = "#c04e0c";
            } else if(100-calculateBar() <= 60) {
                document.getElementById('progress').style.background = "orange";
            } else if(100-calculateBar() <= 80) {
                document.getElementById('progress').style.background = "rgb(207, 253, 138)";
            }
        } 
    }
}

function calculateBar() {
    let percentage = sum() * 100 / displayBudget(); 
    percentage = Math.round(percentage);
    return percentage;
}