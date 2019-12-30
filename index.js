const express = require("express");
const app = express();

app.get("/", (req, res)=> {
    res.send(
    `<p>Hello World!</p>
    <p>To check the API, use the following endpoint</p>
    <p>http://localhost:3000/api/checktwosidedprime/{yournumber}</p>
    <p>Example - http://localhost:3000/api/checktwosidedprime/3797</p>
    `);

}); 

app.get("/api/checkTwoSidedPrime/:number", (req, res) => {
    let result = isTwoSidedPrime(req.params.number, res);
    if(result)
    console.log(`Final Result -> ${req.params.number} is a Two-Sided Prime`); 
    else
    console.log(`Final Result -> ${req.params.number} is not a Two-Sided Prime`); 
    res.send(result);
});

app.listen(3000, () => console.log("Listening on port 3000..."));

function isTwoSidedPrime(number, res) {
    let numberArr = [...number];
    let result = false;
    console.log("\n<------- Checking Two Sided Prime ------->")
    result = checkPrime(parseInt(numberArr.join('')))
    console.log(`Is ${parseInt(numberArr.join(''))} Prime Number ? - ${result}`);
    if(result)
    {
        let leftTemp = [...numberArr];
        let rightTemp = [...numberArr];
        while(leftTemp.length !== 0)
        {
            leftTemp.splice(0, 1);
            let tempNum = parseInt(leftTemp.join(''));
            result = checkPrime();
            console.log(`Is ${tempNum} Prime Number ? - ${result}`);
            if(result === false)
                break;
            else if(leftTemp.length === 1)
                leftTemp.splice(0, 1);            
        }
        while(rightTemp.length !== 0)
        {
            rightTemp.splice(-1, 1);
            let tempNum = parseInt(rightTemp.join(''))
            result = checkPrime(tempNum);
            console.log(`Is ${tempNum} Prime Number ? - ${result}`);
            if(result === false)
                break;
            else if(rightTemp.length === 1)
                rightTemp.splice(0, 1); 
        }
    }
    return result;
}

function checkPrime(number)
{
    if(number < 2)
        return false;
    for(let i=2; i< Math.sqrt(number); i++)
    {
        if(number % i === 0)
            return false;
    }
    return true;
}