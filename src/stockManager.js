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

function getStockReport(stock) {
    if (Object.keys(stock).length === 0) {
      return "Le stock est vide";
    }
  
    let report = "Stock actuel:\n";
    return report + Object.entries(stock)
      .map(([item, quantity]) => `- ${item}: ${quantity}`)
      .join("\n");
  }
  
module.exports = { addStock, getStock, removeStock, getStockReport };