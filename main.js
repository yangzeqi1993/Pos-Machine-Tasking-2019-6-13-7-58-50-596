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
        return getReceipt(barcodeArray);
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

function getCollection(barcodeArray) {
    let returnCollection = [];
    let barcodeMap = new Map();
    for(let i=0; i<barcodeArray.length; i++){
        if(barcodeMap.get(barcodeArray[i])==null){
            barcodeMap.set(barcodeArray[i],1);
        }else {
            barcodeMap.set(barcodeArray[i],barcodeMap.get(barcodeArray[i])+1);
        }
    }

    barcodeMap.forEach(function (value,key) {
        returnCollection.push({id:key,count:value})
    });

    return returnCollection;
}

function getReceipt (barcodeArray) {
    let collection = getCollection(barcodeArray);
    let receipt = [];
    let totalMoney =0 ;
    for (let i=0; i<collection.length; i++){
        for (let j=0; j<database.length; j++){
            if(collection[i].id===database[j].id){
                // 得到 sameObjectB 对象
                let object = database.filter((p) => {
                    return p.id === database[j].id;
                });
                totalMoney += object[0].price*collection[i].count;
                receipt+=object[0].name;
                for(let i=0;i< (20-object[0].name.length);i++){receipt+=" ";}
                receipt+=object[0].price+"          "+collection[i].count+"\n";
            }
        }
    }

    receipt = "Receipts\n" +
        "-----------------------------------\n" +
        receipt +
        "-----------------------------------\n" +
        "Price:"+totalMoney;

    return receipt;
}


module.exports = printReceipt;
