/* PROJECT TIME : CRM
Création d'un CRM minimaliste
Le CRM sera matérialisé en javascript par un tableau d'objet.
Chaque objet représentera un contact.
La CRM devra être géré totalement par un serveur web via le framework express et le moteur de template EJS
Les action suivantes devront être opérationnelles:
Possibilité d'ajouter des clients, de les supprimer mais également de les modifier

Step :
- Création d’un serveur web via express et EJS
- Création d’une variable nommée « clientList»  qui va contenir un tableau listant plusieurs clients.
- Chaque client enregistré dans le tableau pourra être définit sous forme d'objet javascript possédant les propriétés et valeur suivantes:
        firstName: John, lastName : Doe, email: john@gmail.com, phone: 0612457845
        firstName: Don, lastName : Draper, email: don@gmail.com, phone: 0654453587
        firstName: Jon, lastName : Snow, email: snow@gmail.com, phone: 0854357845 
- Création des routes correspondant aux différentes actions (lire, ajouter, modifier ...)

Warning :
- Penser à créer les différentes routes correspondantes aux actions de: lecture, suppression, modifications ...
- Les informations GET (envoyées au travers l'URL) sont accessibles  directement via la l’objet req.query
- La réponse au navigateur ne se fait plus via res.write() mais res.render()
----------------------------------------------------------------------------------------------------------------------------------------------*/
// npm install express --save
var express = require('express');
var app = express();

// npm install ejs --save
app.use(express.static('public'));
app.set('view engine', 'ejs');

// bootstrap : http://getbootstrap.com

var clientList = [ // tableau objet
     {firstName: "John", lastName : "Doe", email: "john@gmail.com", phone: "0612457845"},
     {firstName: "Don", lastName : "Draper", email: "don@gmail.com", phone: "0654453587"},
     {firstName: "Jon", lastName : "Snow", email: "snow@gmail.com", phone: "0854357845"}    
];

app.get("/", function(req, res) {
    res.render ("index", {clients : clientList}) // lire toute la liste à chaque fois - Index se rapporte à index.ejs
    console.log(req.query.i); // affiche le résultat stocké (query = résultat) - nota : i et pas id comme dans le cours, i c'est l'élément  
});

app.get('/delate', function(req, res) {
    res.render ("index", {clients : clientList}) // lire toute la liste à chaque fois
    console.log(req.query.i); // i et pas ID comme dans le cours
    clientList.splice(req.query.i, 1); // La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments. voir https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/splice
    res.render("index", {clients : clientList}); // "index" appelle l'index.ejs où se trouve la boucle notamment.
});

app.get('/add', function (req, res) {   // vérifier si c'est i ou rien ? pourquoi ici et pas ligne 53 ?
	console.log(req.query);  // le signe != signifie inégalité simple - req.query.lastname.length = longueur du résultat demandé different 0 alors push
	if (req.query.firstName.length != 0 && req.query.lastName.length != 0 && req.query.email.length != 0 && req.query.phone.length != 0 ){
    clientList.push(req.query);}     // && c'est l'opérateur logique "ET" 
    res.render("index", {clients : clientList});
});

app.get('/update', function (req, res) { 
	console.log(req.query);
    clientList[req.query.i] = req.query;
    res.render("index", {clients : clientList});
});

app.listen(8084, function () {
    console.log("Server listening on port 8084");
});