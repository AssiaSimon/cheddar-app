/* Variables pour dessiner la simulation Cheddar */

// varibale qui permet d'afficher les données des tâches sur HTML
let table; 

// initialisation du Canvas
const canvas = document.querySelector(".myCanvas");
console.log(document.querySelector(".myCanvas")); // tester dans le navigateur
const ctx = canvas.getContext("2d");

// longueur du Canvas
let c_width = document.getElementsByClassName("myCanvas")[0].width;

// tableau contenant les périodes des tâches
const periods = [];

let cote = 15;  // distance entre chaque unité de temps + haeteur rectangle
let tiret = 8; // hauteur de la délimitation de la "période" de la tâche
let unit = 4; // hauteur de la délimitation de chaque "unité de temps"
let pos_y = 0; /* permet d'ajuster la taille du tiret de la délimitation 
 de la période suite à lévénement + / -    */

// stocke la valeur y de la dernière ligne de temps avant l'ajout des lignes 
// pour la simulation des ressources
let y_d; 

// tableau contenant les noms des tâches
let tacheNom = []; 

// limite des lignes de temps à ne pas dépasser
let limite_line; 

// tableau contenant les ID des tâches
const tacheID = [];

let nbr; // nombre des tâches stockées
let c_len; // la hauteur du Canvas

// valeur de départ de x, y pour dessin de ligne de temps
const baseX = 100;
const baseY = 50;

// espace y entre chaque ligne de temps
const saut = 80; 

// décallage pour ajouter 1er ligne de temps / texte
const decalage = 30; 

// px à ajouter dans small/bigger
const add_c_width = 40; 
const add = 1; 

// agrandissemnt de la width de Canvas
const wid = 150; 

// position x pour ajout du nom des tâches
const x_nomTache = 25;

// position départ de y pour dessiner la période
const period_y = 118;  

// valeur jusqu'à laquelle on designe la ligne de temps
let upto ; 
let max_upto;// = 40; // maximum

// hauteur fixe à ajouter à "cote" pour délimitation de période
const h_8 = 8; 
const h_4 = 4; 

// base du tiret de délimitation période
let baseRec = 3; 

// par 5 unites 
const unit_5 = 5; 

// position x pour ajout nom des tâches
const x_10 = 10; 
const x_3 = 3; 
const x_2 =2;


// URL vers exemples
const ex1 = ["https://obiwan.univ-brest.fr/~e21811674/xml/case_study.xmlv3.txt.xml",
    "https://obiwan.univ-brest.fr/~e21811674/xml/case_study.xmlv3.ev.xml"];

const ex2 = ["https://obiwan.univ-brest.fr/~e21811674/xml/exo5_base.xmlv3.xml",
    "https://obiwan.univ-brest.fr/~e21811674/xml/exo5.xmlv3.ev.xml"];

const ex3 = ["https://obiwan.univ-brest.fr/~e21811674/xml/exo4.xmlv3.xml",
    "https://obiwan.univ-brest.fr/~e21811674/xml/exo4.ev.xmlv3.xml"];


let resource; // stocke nbr de ressource
let resource_name; // stocke nom de ressource



     