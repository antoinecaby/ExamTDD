const fs = require("fs");
const { addStock, getStock, removeStock, getStockReport, checkItemExists, getTransactionHistory } = require("../src/stockManager");

const historyFilePath = "./logs/trasaction_history.txt";

describe("Ajout d'article", () => {
  test("Ajout d'un nombre valide d'article existant", () => {
    const stock = { "Chaise": 5 };
    addStock(stock, "Chaise", 3);
    expect(getStock(stock, "Chaise")).toBe(8);
  });

  test("Ajout d'un nombre négatif d'article existant doit retourner une erreur", () => {
    const stock = { "Chaise": 5 };
    expect(() => addStock(stock, "Chaise", -3)).toThrow("Quantité invalide");
  });

  test("Tenter d'ajouter un article inexistant doit générer une erreur", () => {
    const stock = { "Chaise": 5 };
    expect(() => addStock(stock, "Table", 3)).toThrow("Article inexistant");
  });
});

describe("Consultation d'article dans le stock", () => {
  test("Consulter un article qui existe", () => {
    const stock = { "Chaise": 5 };
    expect(getStock(stock, "Chaise")).toBe(5);
  });

  test("Consulter un article non existant doit générer une erreur", () => {
    const stock = { "Chaise": 5 };
    expect(() => getStock(stock, "Table")).toThrow("Article inexistant");
  });
});

describe("Suppression d'article du stock", () => {
    test("Suppression d'un nombre valide d'article existant", () => {
      const stock = { "Chaise": 5 };
      removeStock(stock, "Chaise", 3);
      expect(getStock(stock, "Chaise")).toBe(2);
    });
  
    test("Suppression d'un nombre négatif d'article existant doit retourner une erreur", () => {
      const stock = { "Chaise": 5 };
      expect(() => removeStock(stock, "Chaise", -3)).toThrow("Quantité invalide");
    });
  
    test("Tenter de supprimer un article inexistant doit générer une erreur", () => {
      const stock = { "Chaise": 5 };
      expect(() => removeStock(stock, "Table", 3)).toThrow("Article inexistant");
    });
  
    test("Suppression d'un nombre d'article supérieur à la quantité en stock doit générer une erreur", () => {
      const stock = { "Chaise": 5 };
      expect(() => removeStock(stock, "Chaise", 6)).toThrow("Quantité insuffisante");
    });

    test("Avertir l'utilisateur quand le stock est inférieur à 5", () => {
      const stock = { "Chaise": 3 };
      const message = removeStock(stock, "Chaise", 1);
      expect(message).toBe("Attention, il ne reste que 2 chaises en stock !");
      expect(getStock(stock, "Chaise")).toBe(2);
  });
  
    
    test("Avertir l'utilisateur quand le stock est vide", () => {
      const stock = { "Chaise": 1 };
      const message = removeStock(stock, "Chaise", 1);
      expect(message).toBe("Attention, le stock de chaises est vide !");
      expect(getStock(stock, "Chaise")).toBe(0);
    });
  });

describe("Obtenir le rapport des stocks", () => {
  test("Génère un rapport quand le stock contient des articles", () => {
    const stock = { "Chaise": 5, "Table": 3 };
    expect(getStockReport(stock)).toBe("Stock actuel:\n- Chaise: 5\n- Table: 3");
  });

  test("Génère un rapport vide quand le stock est vide", () => {
    const stock = {};
    expect(getStockReport(stock)).toBe("Le stock est vide");
  });
});

describe("Historique des transactions", () => {
  beforeEach(() => {
      if (fs.existsSync(historyFilePath)) {
          fs.unlinkSync(historyFilePath);
      }
  });

  test("Ajout d'une transaction d'ajout dans l'historique", () => {
      const stock = { "Chaise": 5 };
      addStock(stock, "Chaise", 3);
      const history = getTransactionHistory();
      expect(history).toContain("Ajout: Chaise (x3)");
  });

  test("Ajout d'une transaction de retrait dans l'historique", () => {
      const stock = { "Chaise": 10 };
      removeStock(stock, "Chaise", 2);
      const history = getTransactionHistory();
      expect(history).toContain("Retrait: Chaise (x2)");
  });

  test("Gestion d'erreur si l'écriture de l'historique échoue", () => {
      jest.spyOn(fs, "appendFileSync").mockImplementation(() => {
          throw new Error("Erreur d'écriture");
      });

      const stock = { "Chaise": 5 };
      expect(() => addStock(stock, "Chaise", 2)).not.toThrow();
      expect(() => removeStock(stock, "Chaise", 1)).not.toThrow();

      fs.appendFileSync.mockRestore();
  });
});

