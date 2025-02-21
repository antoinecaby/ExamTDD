const { addStock, getStock, removeStock, getStockReport } = require("../src/stockManager");

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
      expect(() => removeStock(stock, "Chaise", 1)).toThrow("Attention, il ne reste que 2 chaises en stock !");
      expect(getStock(stock, "Chaise")).toBe(2);
    });
    
    test("Avertir l'utilisateur quand le stock est vide", () => {
        const stock = { "Chaise": 1 };
        expect(() => removeStock(stock, "Chaise", 1)).toThrow("Attention, le stock de chaises est vide !");
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

