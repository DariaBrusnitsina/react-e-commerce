export function getDiscount(user) {
    let result = 0
    for (let i = 0; i < user.orders.length; i++) {
        for (let j = 0; j < user.orders[i].cart.length; j++) {
            result = result + (user.orders[i].cart[j].item.price * user.orders[i].cart[j].counter)
        }
    }
    return Math.floor(result/1000)
}