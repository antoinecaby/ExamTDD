const fs = require("fs");
const { addStock, getStock, removeStock, getStockReport, checkItemExists, getTransactionHistory } = require("../src/stockManager");

const historyFilePath = "./logs/transaction_history.txt";

const initialiserStock = (article, quantite) => ({ [article]: quantite });
const lireHistorique = () => getTransactionHistory(historyFilePath).join("\n");
const resetHistorique = () => {
    if (fs.existsSync(historyFilePath)) fs.unlinkSync(historyFilePath);
};

describe("Gestion du stock", () => {

    describe("Ajout d'article", () => {
        test("Ajout valide", () => {
            const stock = initialiserStock("Chaise", 5);
            addStock(stock, "Chaise", 3);
            expect(getStock(stock, "Chaise")).toBe(8);
        });

        test("Ajout avec quantité négative - erreur", () => {
            const stock = initialiserStock("Chaise", 5);
            expect(() => addStock(stock, "Chaise", -3)).toThrow("Quantité invalide");
        });

        test("Ajout d'article inexistant - erreur", () => {
            const stock = initialiserStock("Chaise", 5);
            expect(() => addStock(stock, "Table", 3)).toThrow("Article inexistant");
        });
    });

    describe("Consultation d'article", () => {
        test("Consultation valide", () => {
            const stock = initialiserStock("Chaise", 5);
            expect(getStock(stock, "Chaise")).toBe(5);
        });

        test("Consultation article inexistant - erreur", () => {
            const stock = initialiserStock("Chaise", 5);
            expect(() => getStock(stock, "Table")).toThrow("Article inexistant");
        });
    });

    describe("Suppression d'article", () => {
        test("Suppression valide", () => {
            const stock = initialiserStock("Chaise", 5);
            removeStock(stock, "Chaise", 3);
            expect(getStock(stock, "Chaise")).toBe(2);
        });

        test("Suppression avec quantité négative - erreur", () => {
            const stock = initialiserStock("Chaise", 5);
            expect(() => removeStock(stock, "Chaise", -3)).toThrow("Quantité invalide");
        });

        test("Suppression article inexistant - erreur", () => {
            const stock = initialiserStock("Chaise", 5);
            expect(() => removeStock(stock, "Table", 3)).toThrow("Article inexistant");
        });

        test("Suppression supérieure au stock - erreur", () => {
            const stock = initialiserStock("Chaise", 5);
            expect(() => removeStock(stock, "Chaise", 6)).toThrow("Quantité insuffisante");
        });

        test("Avertissement stock < 5", () => {
            const stock = initialiserStock("Chaise", 3);
            const message = removeStock(stock, "Chaise", 1);
            expect(message).toBe("Attention, il ne reste que 2 chaises en stock !");
            expect(getStock(stock, "Chaise")).toBe(2);
        });

        test("Avertissement stock vide", () => {
            const stock = initialiserStock("Chaise", 1);
            const message = removeStock(stock, "Chaise", 1);
            expect(message).toBe("Attention, le stock de chaises est vide !");
            expect(getStock(stock, "Chaise")).toBe(0);
        });
    });

    describe("Rapport des stocks", () => {
        test("Rapport avec articles", () => {
            const stock = { "Chaise": 5, "Table": 3 };
            expect(getStockReport(stock)).toBe("Stock actuel:\n- Chaise: 5\n- Table: 3");
        });

        test("Rapport vide", () => {
            expect(getStockReport({})).toBe("Le stock est vide");
        });
    });

    describe("Historique des transactions", () => {
        beforeEach(resetHistorique);

        test("Transaction d'ajout enregistrée", () => {
            const stock = initialiserStock("Chaise", 5);
            addStock(stock, "Chaise", 3);
            expect(lireHistorique()).toMatch(/Ajout: Chaise \(x3\)/);
        });

        test("Transaction de retrait enregistrée", () => {
            const stock = initialiserStock("Chaise", 10);
            removeStock(stock, "Chaise", 2);
            expect(lireHistorique()).toMatch(/Retrait: Chaise \(x2\)/);
        });

        test("Gestion d'erreur d'écriture", () => {
            jest.spyOn(fs, "appendFileSync").mockImplementation(() => {
                throw new Error("Erreur d'écriture");
            });

            const stock = initialiserStock("Chaise", 5);
            expect(() => addStock(stock, "Chaise", 2)).not.toThrow();
            expect(() => removeStock(stock, "Chaise", 1)).not.toThrow();

            fs.appendFileSync.mockRestore();
        });
    });
    
});