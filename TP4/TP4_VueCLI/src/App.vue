<template>
  <div id="app">
    <!-- section des filtres pour rechercher et filtrer les pièces -->
    <section class="filtres">
      <h3>Filtres</h3>
      <div id="filtresContainer">
        <!-- champ de recherche pour filtrer les pièces par nom -->
        <div class="recherche">
          <label for="searchTerm">Rechercher :</label>
          <input
            type="text"
            id="searchTerm"
            v-model="searchTerm"
            placeholder="Tapez un nom de pièce..."
          />
        </div>
        <!-- filtre par catégorie -->
        <div class="categorie">
          <label for="selectedCategory">Catégorie :</label>
          <select id="selectedCategory" v-model="selectedCategory">
            <option value="">Toutes les catégories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>
        <!-- filtre pour n'afficher que les pièces disponibles -->
        <div class="disponible">
          <label for="showAvailableOnly">
            <input
              type="checkbox"
              id="showAvailableOnly"
              v-model="showAvailableOnly"
            />
            Seulement les pièces disponibles
          </label>
        </div>
        <!-- boutons de tri des pièces par prix -->
        <div class="tri">
          <button @click="trierPrixCroissant">Prix croissant</button>
          <button @click="trierPrixDecroissant">Prix décroissant</button>
        </div>
      </div>
    </section>

    <!-- affichage des fiches produits -->
    <section class="fiches">
      <div class="fiche" v-for="piece in piecesFiltered" :key="piece.id">
        <!-- image du produit -->
        <img :src="piece.image" :alt="piece.nom" />
        <h4>{{ piece.nom }}</h4>
        <p>Catégorie : {{ piece.categorie }}</p>
        <p>Prix : {{ piece.prix }} €</p>
        <!-- affichage de la disponibilité de la pièce -->
        <p v-if="piece.disponible" style="color: green;">En stock</p>
        <p v-else style="color: red;">Indisponible</p>
        <!-- bouton pour ajouter au panier -->
        <button @click="ajouterAuPanier(piece)">Ajouter au panier</button>
      </div>
    </section>

    <!-- affichage du panier -->
    <section class="panier">
      <h3>Panier</h3>
      <p v-if="panier.length === 0">Votre panier est vide.</p>
      <ul v-else>
        <li v-for="(article, index) in panier" :key="index">
          {{ article.nom }} – {{ article.prix }} €
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pieces: [], // tableau contenant les pièces disponibles
      panier: [], // tableau contenant les pièces ajoutées au panier
      searchTerm: '', // terme de recherche pour filtrer les pièces
      selectedCategory: '', // catégorie sélectionnée pour le filtrage
      showAvailableOnly: false, // booléen pour filtrer les pièces disponibles
      order: null, // ordre de tri des prix (ascendant ou descendant)
    };
  },
  computed: {
    // calcul des catégories uniques à partir des pièces disponibles
    categories() {
      const cats = new Set(this.pieces.map(piece => piece.categorie));
      return Array.from(cats);
    },
    // filtrage dynamique des pièces en fonction des critères de recherche
    piecesFiltered() {
      let filtered = this.pieces.filter((p) => {
        return p.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
      if (this.selectedCategory) {
        filtered = filtered.filter(p => p.categorie === this.selectedCategory);
      }
      if (this.showAvailableOnly) {
        filtered = filtered.filter(p => p.disponible);
      }
      if (this.order === 'asc') {
        filtered.sort((a, b) => a.prix - b.prix);
      } else if (this.order === 'desc') {
        filtered.sort((a, b) => b.prix - a.prix);
      }
      return filtered;
    },
  },
  methods: {
    // ajout d'une pièce au panier
    ajouterAuPanier(piece) {
      this.panier.push(piece);
    },
    // tri des pièces par prix croissant
    trierPrixCroissant() {
      this.order = 'asc';
    },
    // tri des pièces par prix décroissant
    trierPrixDecroissant() {
      this.order = 'desc';
    },
  },
  mounted() {
    // récupération des données des pièces depuis un fichier json
    fetch("pieces_autos.json")
      .then(response => response.json())
      .then(data => {
        console.log(data); // affichage des données dans la console pour le debug
        this.pieces = data; 
      })
      .catch(err => console.error("Erreur lors du fetch:", err));
  },
};
</script>

<style >/* Polices et body global */
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body {
    max-width: 1200px;
    margin: auto;
    padding: 16px;
    font-family: 'Montserrat', sans-serif;
}

header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
    padding: 8px;
    background-color: #7451eb;
    text-align: center;
    color: white;
}
header img {
    height: 100px;
    margin-left: 1rem;
}
header h1 {
    flex-grow: 1;
}


main {
    display: flex;           
    flex-direction: row;
    gap: 16px;               
}
#app{
    display: flex;
    flex-direction: row;
    gap: 16px;
}
.filtres {
    width: 10%;
    display: flex;
    flex-direction: column;
    flex: 0 0 250px;         
    border-radius: 4px;
    box-shadow: 0px 0px 4px gray;
    padding: 8px;
    min-height: 400px;
}
.filtres h3 {
    text-align: center;
}
#filtresContainer {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.recherche, .categorie, .disponible, .tri {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.recherche label, .categorie label, .disponible label {
    font-weight: bold;
}
.recherche input, .categorie select {
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.categorie select {
    width: 100%;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.fiches {
  width:70%;
    flex: 1;                 
    margin: 8px 0;
    display: flex;
    flex-wrap: wrap;         
    justify-content: center; 
    gap: 20px;              
}

.fiches .fiche {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;            
    padding: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.fiches img {
    max-width: 100%;         
    display: block;
    margin: 0 auto;          
}
.fiches p {
    margin: 4px 0;
}

.panier {
    flex: 0 0 250px;        
    margin: 8px 0;
    border-radius: 4px;
    box-shadow: 0px 0px 4px gray;
    padding: 8px;
}
.panier h3 {
    text-align: center;
}
</style>