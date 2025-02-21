const fs = require("fs");
const path = "./logs/transaction_history.txt";

function addStock(stock, item, quantity) {
    if (quantity < 0) throw new Error("Quantité invalide");
    checkItemExists(stock, item);
    stock[item] += quantity;
    logTransaction("Ajout", item, quantity);
}

function getStock(stock, item) {
    checkItemExists(stock, item);
    return stock[item];
}

function removeStock(stock, item, quantity) {
    if (quantity < 0) throw new Error("Quantité invalide");
    checkItemExists(stock, item);
    if (stock[item] < quantity) throw new Error("Quantité insuffisante");

    stock[item] -= quantity;
    logTransaction("Retrait", item, quantity);

    if (stock[item] === 0) {
        return `Attention, le stock de ${item.toLowerCase()}s est vide !`;
    } else if (stock[item] < 5) {
        return `Attention, il ne reste que ${stock[item]} ${item.toLowerCase()}${stock[item] > 1 ? 's' : ''} en stock !`;
    }
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

function checkItemExists(stock, item) {
    if (!stock.hasOwnProperty(item)) {
        throw new Error("Article inexistant");
    }
}

function logTransaction(type, item, quantity) {
    const date = new Date().toLocaleString("fr-FR");
    const entry = `${date} - ${type}: ${item} (x${quantity})\n`;

    try {
        if (!fs.existsSync("./logs")) {
            fs.mkdirSync("./logs");
        }

        fs.appendFileSync(path, entry);
    } catch (error) {
        console.error(" Erreur lors de l'écriture de l'historique :", error.message);
    }
}

function getTransactionHistory() {
    if (!fs.existsSync(path)) return [];
    return fs.readFileSync(path, "utf-8").split("\n").filter(line => line.trim() !== "");
}
  
module.exports = { addStock, getStock, removeStock, getStockReport, checkItemExists, getTransactionHistory };