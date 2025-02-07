const { addStock, getStock } = require("../src/stockManager");

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
