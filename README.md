# User Stories - Gestionnaire de Stock

### 1. Gestion des Ajouts d'Articles

- **En tant que** gestionnaire de stock  
  **Je veux** ajouter un nombre valide d'articles existants au stock  
  **Afin de** maintenir l'inventaire à jour.

- **En tant que** gestionnaire de stock  
  **Je veux** empêcher l'ajout d'une quantité négative d'articles  
  **Afin de** garantir l'intégrité des données du stock.

- **En tant que** gestionnaire de stock  
  **Je veux** empêcher l'ajout d'un article inexistant  
  **Afin de** m'assurer que seuls les articles enregistrés soient modifiés.

---

### 2. Consultation du Stock

- **En tant que** utilisateur  
  **Je veux** consulter la quantité d'un article existant  
  **Afin de** connaître sa disponibilité.

- **En tant que** utilisateur  
  **Je veux** être averti si j'essaie de consulter un article inexistant  
  **Afin de** éviter toute confusion sur la disponibilité des produits.

---

### 3. Suppression d'Articles

- **En tant que** gestionnaire de stock  
  **Je veux** retirer une quantité valide d'articles du stock  
  **Afin de** refléter les sorties de marchandise.

- **En tant que** gestionnaire de stock  
  **Je veux** empêcher la suppression d'une quantité négative d'articles  
  **Afin de** éviter les erreurs de manipulation des stocks.

- **En tant que** gestionnaire de stock  
  **Je veux** empêcher la suppression d'un article inexistant  
  **Afin de** m'assurer que seules les références valides soient modifiées.

- **En tant que** gestionnaire de stock  
  **Je veux** empêcher la suppression d'une quantité supérieure à celle en stock  
  **Afin de** éviter les stocks négatifs.

- **En tant que** gestionnaire de stock  
  **Je veux** être averti si le stock d'un article descend en dessous de 5 unités  
  **Afin de** pouvoir réapprovisionner à temps.

- **En tant que** gestionnaire de stock  
  **Je veux** être averti si le stock d'un article est vide  
  **Afin de** éviter toute rupture non signalée.

---

### 4. Rapport des Stocks

- **En tant que** gestionnaire de stock  
  **Je veux** générer un rapport des articles en stock  
  **Afin de** avoir une vue d'ensemble des quantités disponibles.

- **En tant que** gestionnaire de stock  
  **Je veux** un message spécifique si le stock est vide  
  **Afin de** savoir immédiatement qu'il n'y a plus d'articles en inventaire.
