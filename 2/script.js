// DOM (Document Object Model)
// egy fa szerkezetű dokumentum (pl. SVG, XML, *HTML*) modellezése objektumokkal
// JS esetében általában a HTML DOM-ra gondolunk DOM alatt
// a DOM kényelmes interfészt biztosít, a HTML dokumentum manipulálásához
// objektumfa gyökere: document (globális változó)
// fát Node objektumok alkotják
// Node objektumnak 4 fajtája lehet
// 1. Document
// 2. Text (szöveges tartalom)
// 3. Element (HTML elemek)
// 4. Attribute (HTML elemek attribútumai)
// CSS szelektorok ismétléséhez ajánlom a CSS Diner (https://flukeout.github.io/) oldalt

console.log(document);

// 1. Egy gomb megnyomására írd ki a dokumentum valamelyik általad választott részére, hogy "Helló világ!"!
const greetButton = document.querySelector('button#greet');
console.log(greetButton);

// eseménykezelés
greetButton.addEventListener('click', () => {
    greetButton.insertAdjacentText('beforeend', 'Helló világ!');
})

// 2. Kérj be egy számot, és annyiszor írd ki egymás alá egyre növekvő betűméretekkel a "Hello világ!" szöveget!
const secondTaskDiv = document.querySelector('article:nth-of-type(2)');
const printCountInput = document.querySelector('input#print-count');
const printButton = document.querySelector('button#print-button');

printButton.addEventListener('click', () => {
    const count = Number.parseInt(printCountInput.value, 10);

    for (let index = 1; index <= count; index++) {
        // elem létrehozása
        const heading = document.createElement('h3');
        heading.innerText = "Helló világ!";

        // !mértékegység!
        heading.style.fontSize = `${1 + index * 0.25}em`

        // szűlő gyerekei közé befűzés
        secondTaskDiv.appendChild(heading);
    }
})

// 3. Kérj be egy N számot, és készíts azzal egy NxN-es szorzótáblát!
const size = 10;
const thirdTaskDiv = document.querySelector('article:nth-of-type(3)');

const table = document.createElement('table');

for (let i = 1; i <= size; i++) {
    const row = document.createElement('tr');
    for (let j = 1; j <= size; j++) {
        const cell = document.createElement('td');
        cell.innerText = i * j;
        row.appendChild(cell);
    }
    table.appendChild(row);
}

thirdTaskDiv.appendChild(table)

// 6. Adott két szöveges beviteli mező és köztük egy gomb.
// A gomb lenyomására másold át az egyik szöveges beviteli mező tartalmát a másikba!
const fifthTaskDiv = document.querySelector('article:nth-of-type(5)');

// elemen belül is lehet keresni
const firstInput = fifthTaskDiv.querySelector('label input');
const secondInput = fifthTaskDiv.querySelector('label:nth-of-type(2) input');
const copyButton = fifthTaskDiv.querySelector('button');
console.log(firstInput, secondInput);

copyButton.addEventListener('click', () => {
    if (firstInput.value) {
        // value attribútum írható
        secondInput.value = firstInput.value;
    } else {
        firstInput.value = secondInput.value;
    }
})

// 7. Egy űrlapon csak akkor kérd be a leánykori nevet, ha nő az illető! Használd a rádiógombok click eseményét!
// A megjelenítéshez, eltűntetéshez használd az elemek hidden tulajdonságát!
const personForm = document.querySelector('form');
const maleButton = personForm.querySelector('input[type="radio"]#male');
const femaleButton = personForm.querySelector('input[type="radio"]#female');
console.log(maleButton, femaleButton);

const maidenNameInput = personForm.querySelector('input#maiden-name');
const maidenNameLabel = personForm.querySelector('label[for="maiden-name"]');
console.log(maidenNameInput, maidenNameLabel);

const toggleMaidenName = () => {
    // checked = rádiógomb ki van-e választva
    maidenNameInput.hidden = maleButton.checked;
    maidenNameLabel.hidden = maleButton.checked;
}

maleButton.addEventListener('click', toggleMaidenName);
femaleButton.addEventListener('click', toggleMaidenName);

toggleMaidenName();

// 8. Oldalbetöltéskor listázd ki az oldal összes hiperhivatkozásának a címét!

// 10. Készíts egy számlálót komponenst!

// 12. Készíts webes alkalmazást kamatos kamat számolására.
// A számoláshoz meg kell adni a kiindulási összeget, a kamat értékét, valamint azt, hány évvel későbbi összegre vagyunk
// kíváncsiak. Minden év végén adjuk hozzá a kamatot a tőkéhez, és a következő évben az képezi a kamatozás alapját.
// A feladat során jelenítsük meg azt is, hogy melyik évben hogyan változik az összeg.

// 14. Adott egy könyvtári nyilvántartás. Egy könyvről a következő adatokat tároljuk:
// szerző cím kiadás éve kiadó ISBN szám
// a. Felületen kérj be egy évszámot, és listázd ki az abban az évben megjelent könyvcímeket!
// b. Készíts egy legördülő mezőt, amelyben az egyes kiadók vannak felsorolva. Egy gombra kattintva táblázatos formában
// jelenítsd meg a kiválasztott kiadóhoz tartozó könyveket!

const books = [
    {
        szerzo: "J.K. Rowling",
        cim: "Harry Potter és a Bölcsek Köve",
        kiadasEve: 1997,
        kiado: "Bloomsbury",
        ISBN: "978-963-8386-65-4"
    },
    {
        szerzo: "George Orwell",
        cim: "1984",
        kiadasEve: 1949,
        kiado: "Secker and Warburg",
        ISBN: "978-0451524935"
    },
    {
        szerzo: "Harper Lee",
        cim: "Ne bántsátok a feketerigót!",
        kiadasEve: 1960,
        kiado: "J. B. Lippincott & Co.",
        ISBN: "978-0061120084"
    },
    {
        szerzo: "Paulo Coelho",
        cim: "The Fifth Mountain",
        kiadasEve: 1997,
        kiado: "HarperOne",
        ISBN: "978-0061723731"
    },
    {
        szerzo: "J.K. Rowling",
        cim: "Harry Potter and the Chamber of Secrets",
        kiadasEve: 1998,
        kiado: "Bloomsbury",
        ISBN: "978-0-7475-3849-0"
    }
];