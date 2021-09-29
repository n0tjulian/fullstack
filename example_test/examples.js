const orders = [
    {ammount:400},
    {ammount:250},
    {ammount:300},
    {ammount:600},
    {ammount:400}
]


//reacap on reduce

var totalAmmount = orders.reduce(function(sum,order) {
    console.log("sum is", sum)
    console.log("ammount is" , order.ammount)
    return sum+order.ammount
}, 0)

console.log(totalAmmount)