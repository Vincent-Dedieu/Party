# Server Party

- Installer les dépendances : `npm install`
- Creer une bdd avec postgres **party** avec un user **party**,
- Script pour reset les tables de la database `npm run db:reset`
- Script pour reset inserer des données tests dans la database `npm run db:populate`
- Lancer le serveur : `npm start` => <http://localhost:3000>

## Routes

### Event

- GET `/event/:id` : renvoie les détails d’un évent demandé.
- GET `/event` : renvoie les détails des évents.
- POST `/event` : créer un nouvel évent
  => fournir un objet contenant email et password, par exemple

```
  {
  "title": "Bringue de tout les diables",
  "date": "2023-07-05",
  "description": "On va se mettre bieng",
  "address": "20 rue de la soif",
  "city": "MONTPELLIER",
  "postal": 34000,
  "image": "https://www.google.com/",
  "user_id": 1
  }
```

- PUT `/event/:id` : modifier un évent (ou 404)
- DELETE `/event/:id` : supprimer un évent (ou 404)
- GET `/event/:id/users` : renvoie toutes les users d'un évent.
- DELETE `/event/:id/users/:mail` : supprimer un user qui fait parti d'un évent.
- POST `/event/:id/users` : ajouter un user qui fait parti d'un évent.

### User

- GET `/user/:mail` : renvoie les détails d’un user demandé.
- POST `/user` créer un nouvel user
- PUT `/user/:mail` : modifier un user (ou 404)
- DELETE `/user/:mail` : supprimer un user (ou 404)

### Item

- GET `/item/:id` : renvoie les détails d’une liste demandée.
- POST `/item` créer une nouvelle liste
- PUT `/item/:id` : modifier une liste (ou 404)
- DELETE `/item/:id` : supprimer une liste (ou 404)
- GET `/event/:id/item` : renvoie toutes les items d'un évent.
- POST `/event/:id/item` : créer un nouvel item qui fait parti d’une liste d'un évent.
- PUT `/event/:id/item/:id`: modifier un item qui fait parti d’une liste d'un évent.
- DELETE `/event/:id/item/:id` : supprimer un item qui fait parti d’une liste d'un évent.

### Identifiant valide

|  Identifiant   | Mot de passe |
| :------------: | :----------: |
| party@party.fr |    123456    |
