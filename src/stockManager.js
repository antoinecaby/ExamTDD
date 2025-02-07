function addStock(stock, item, quantity) {
    // TODO : demander quel retour pour une quantité = 0
    if (quantity < 0) {
        throw new Error("Quantité invalide");
    }
    
    if (stock[item] === undefined) {
        throw new Error("Article inexistant");
    }
    
    stock[item] += quantity;
}

function getStock(stock, item) {
    if (stock[item] === undefined) {
        throw new Error("Article inexistant");
    }
    
    return stock[item];
} 

function removeStock(stock, item, quantity) {
    if (quantity < 0) {
        throw new Error("Quantité invalide");
    }
    
    if (stock[item] === undefined) {
        throw new Error("Article inexistant");
    }
    
    if (stock[item] < quantity) {
        throw new Error("Quantité insuffisante");
    }
    
    stock[item] -= quantity;
}

module.exports = { addStock, getStock, removeStock };