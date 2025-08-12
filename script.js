//DOM elements
const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

//saved transactions from local storage.
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

//addtodom
function addToDom(transactions){
    const sign = transactions.amount < 0 ? '-' : "+";
    const item = document.createElement("li");

    item.classList.add(transactions.amount < 0 ? "minus" : "plus");//add a css class minus if amout is - otherwise +

    item.innerHTML = 
    `${transactions.text}
    <span>${sign}$${Math.abs(transactions.amount).toFixed(2)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transactions.id}">x</button>`;
    list.appendChild(item);

}
//fuction update values
function updateValues(){
    const amounts = transactions.map(t => t.amount);//go through each trrasaction obj.
    const total = amounts.reduce((acc, val )=> acc + val, 0 ).toFixed(2); //adds up all numbers starting 0
    const income = amounts.filter(a => a > 0).reduce((acc, val )=> acc, val , 0).toFixed(2);//finds all positive amouts and sum them
    const expense = Math.abs(amounts.filter(a => a < 0).reduce((acc, val ) => acc + val, 0)).toFixed(2);//finds all negatives and sums them
    // updates ui to uses see them n browser
    balance.innerText = `$${total}`;
    moneyPlus.innerText = `+$${income}`;
    moneyMinus.innerText = `$${expense}`;

}
//functions delete transactions
function removeTransaction(id){
    transactions = transactions.filter(t => t.id !==id);//creates new array without transation whose id mathches provided id
    updateLocalStorage();   
    init();
}
function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}
function generateId(){
    return Math.floor(Math.random() * 1000000)
}



