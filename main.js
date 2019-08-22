const database = [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
];

function printReceipt (barcodeArray) {
    let checkResult = checkInput(barcodeArray);
    if(checkResult!=="Success"){
        return checkResult;
    }else{
        let countItem = countItems(barcodeArray);
        let products = getItems(countItem);
        let totalMoney = calculateTotal(products);
        return generateReceipt(products, totalMoney);
    }
}

function checkInput(barcodeArray){
    let checkResult;
    if(barcodeArray.length === 0){
        checkResult = "无输入信息";
    }else if(barcodeArray.length > 1000){
        checkResult = "内存超出限制";           // 不再测试
    }else if(!isValidInput(barcodeArray)){
        checkResult = "输入的ID包含无效信息";
    }else {
        checkResult = "Success";
    }
    return checkResult;
}

function isValidInput(barcodeArray) {
    let inputNum = 0;
    for (let i=0; i<barcodeArray.length; i++){
        for (let j=0; j<database.length; j++){
            if(barcodeArray[i]===database[j].id){
                inputNum++;
            }
        }
        if(barcodeArray[i] ===""){
            inputNum++;
        }
    }
    return inputNum === barcodeArray.length
}

function countItems(barcodeArray){
    let result = [];
    // barcodeArray.forEach( inputId => {
    //     let index = result.findIndex(element => element.id === inputId);
    //     if(index === -1){
    //         result.push({id:inputId, count:1});
    //     }else {
    //         result[index].count++;
    //     }
    // });

     barcodeArray.map( inputId => {
        let index = result.findIndex(element => element.id === inputId);
        if(index === -1){
            result.push({id:inputId, count:1});
        }else {
            result[index].count++;
        }
     });

    return result;
}

function getItems(countedItems){
    let result = [];
    for(let i=0; i<countedItems.length; i++){
        for(let j=0; j<database.length; j++){
            if(countedItems[i].id === database[j].id){
                result.push({name:database[j].name, price:database[j].price, count: countedItems[i].count});
            }
        }
    }
    return result;
}

function calculateTotal(products){
    let totalMoney = 0;
    for(let i=0; i<products.length; i++){
        totalMoney += products[i].price * products[i].count;
    }
    return totalMoney;
}

function getOneInfo(barcodeObject) {
    let result = [];
    result+=barcodeObject.name;
    for(let j=0;j<(32-barcodeObject.name.length);j++){result+=" ";}
    result+=barcodeObject.price+"          "+barcodeObject.count+"\n";
    return result;
}

function generateReceipt(products, totalMoney){
    let receipt = [];
    for (let i=0; i<products.length; i++){
        receipt += getOneInfo(products[i]);
    }

    receipt = "Receipts\n" +
        "------------------------------------------------------------\n" +
        receipt +
        "------------------------------------------------------------\n" +
        "Price:"+totalMoney;

    return receipt;
}

module.exports = printReceipt;
