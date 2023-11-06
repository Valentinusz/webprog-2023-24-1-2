// előadás: http://webprogramozas.inf.elte.hu/webprog/lectures/02/#/
// feladatsor: http://webprogramozas.inf.elte.hu/#!/subjects/webprog-pti/gyak/02

// 2. Gyakorlat DOM, eseménykezelés alapok

// DOM (Document Object Model), egy fa szerkezetű dokumentum (pl. SVG, XML, *HTML*) modellezése objektumokkal
// JS esetében általában a HTML DOM-ra gondolunk DOM alatta
// a DOM kényelmes interfészt biztosít, a HTML dokumentum manipulálásához

// objektumfa gyökere: document (globális változó)
// fát Node objektumok alkotják
// Node objektumnak 4 fajtája lehet
// 1. Document
// 2. Text (szöveges tartalom)
// 3. Element (HTML elemek)
// 4. Attribute (HTML elemek attribútumai)

console.log(document);

// 1. Egy gomb megnyomására írd ki a dokumentum valamelyik általad választott részére, hogy "Helló világ!"!

// a domban a querySelector metódussal tudunk keresni
// egyetlen paramétere egy CSS szelektor
// CSS szelektorok ismétléséhez ajánlom a CSS Diner (https://flukeout.github.io/) oldalt
// az első olyan html elemet reprezentáló objektumot adja vissza, melyre illeszkedik a megadott css szelektor
// ha nem illeszekedik semmire null
const greetButton = document.querySelector('button#greet');
console.log(greetButton);

// eseménykezelő hozzáadása
// következő gyakorlaton részletesebben
greetButton.addEventListener('click', () => {
    // egyszerűség kedvéért szúrjuk be a gomb után azt hogy helló
    // nem ez az egyetlen mód, erősen helyzetfüggő mit érdemes használni
    greetButton.insertAdjacentText('beforeend', 'Helló világ!');
    
    // alapvetően három típusú beszúró művelet van
    // 1. HTML pl. inserAdjacentHTML, a megadott szöveget HTML-ként értelmezi (óvakodjunk tőle)
    // 2. Text pl. insertAdjacentText, a megadott szöveget sima szövegként szúrja be
    // 3. Element pl. insertAdjacentElement, a megadott HTML elem objektumot szúrja be (preferáljuk)
})

// 2. Kérj be egy számot, és annyiszor írd ki egymás alá egyre növekvő betűméretekkel a "Hello világ!" szöveget!
const secondTaskDiv = document.querySelector('article:nth-of-type(2)');
const printCountInput = document.querySelector('input#print-count');
const printButton = document.querySelector('button#print-button');

printButton.addEventListener('click', () => {
    // a value adattagon keresztül elérhető az input elemek tartalma
    // value-ban stringe-ként szerepel az érték
    // ha nem sikerül a parseolás, akkor count = NaN, ami hamis érték
    const count = Number.parseInt(printCountInput.value, 10);

    for (let index = 1; index <= count; index++) {
        // elem létrehozása
        const heading = document.createElement('h3');

        // innerText = elem nyitó és záró tagje közötti szöveg
        heading.innerText = "Helló világ!";

        // style adattagon keresztül elérhetők az elem inline stílusai
        // kebab-case -> camelCase átírás 
        heading.style.fontSize = `${1 + index * 0.25}em` // !mértékegység!

        // az adott elem utolsó gyerekeként szúrja be az adott elemet
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

// az Element típusú Node-okra is értelmezve van a querySelector
// ekkor a querySelector a dom csak abban a részfában keres melynek gyökere az adott elem amire meghívjuk
// figyeljünk arra, hogy ekkor nyilván a szelektorokat is ezt figyelembe véve kell megadnunk
const firstInput = fifthTaskDiv.querySelector('label input');
const secondInput = fifthTaskDiv.querySelector('label:nth-of-type(2) input');
const copyButton = fifthTaskDiv.querySelector('button');
console.log(firstInput, secondInput);

copyButton.addEventListener('click', () => {
    // üres input -> üres string logikai értéke hamis
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
    // hidden tulajdonságon keresztül állítható, hogy megjelenjen-e az adott elem
    maidenNameInput.hidden = maleButton.checked; // checked = rádiógomb ki van-e választva
    maidenNameLabel.hidden = maleButton.checked;
}

maleButton.addEventListener('click', toggleMaidenName);
femaleButton.addEventListener('click', toggleMaidenName);

toggleMaidenName();

// 8. Oldalbetöltéskor listázd ki az oldal összes hiperhivatkozásának a címét (href)!

// querySelectorAll - összes selectornak megfelelő elem kiválasztása
// NodeList-et vissza !EZ NEM EGY TÖMB!
const links = document.querySelectorAll('a');
const linksList = document.querySelector('ul#links');
console.log(links);

// bár nem tömb forEach ugyan úgy van (filter viszont már nincs)
links.forEach(({href}) => {
    // végigmenni a linkeken és kiírni a címeket
    const item = document.createElement('li');
    item.innerText = href;
    linksList.appendChild(item);

})

// 10. Készíts egy számlálót komponenst!
const incrementButton = document.querySelector('button#inc');
const counter = document.querySelector('h3#counter');
const decrementButton = document.querySelector('button#dec');
console.log(incrementButton, counter, decrementButton);


const lowerBound = -5; // alsó határ
const upperBound = 5; // felső határ

let counterValue = 0;

const increment = () => {
    if (counterValue < upperBound) {
        counterValue++;
        counter.innerText = counterValue;
    }
    incrementButton.disabled = upperBound === counterValue;
    decrementButton.disabled = lowerBound === counterValue;
}

const decrement = () => {
    if (counterValue > lowerBound) {
        counterValue--;
        counter.innerText = counterValue;
    }
    incrementButton.disabled = upperBound === counterValue;
    decrementButton.disabled = lowerBound === counterValue;
}

// eseménykezelők hozzáadása a gombokhoz
incrementButton.addEventListener('click', increment);
decrementButton.addEventListener('click', decrement);

// ezt akár osztályba is lehet szervezni, vagy saját elemként definiálni
// akit esetleg ez jobban érdekel: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
// de majd a későbbiekben lesz szó a kódszervezésről

// 12. Készíts webes alkalmazást kamatos kamat számolására.
// A számoláshoz meg kell adni a kiindulási összeget, a kamat értékét, valamint azt, hány évvel későbbi összegre vagyunk
// kíváncsiak. Minden év végén adjuk hozzá a kamatot a tőkéhez, és a következő évben az képezi a kamatozás alapját.
// A feladat során jelenítsük meg azt is, hogy melyik évben hogyan változik az összeg.

// Bemenet
const moneyInput = document.querySelector("input#money");
const interestInput = document.querySelector("input#interest");
const yearInput = document.querySelector("input#year");
console.log(moneyInput, interestInput, yearInput);

// Kimenet
const interestTableBody = document.querySelector("table#interestTable tbody");
console.log(interestTableBody);

// Eseménykezelés
const calculateButton = document.querySelector("button#calculate");
console.log(calculateButton);

calculateButton.addEventListener('click', () => {
    // "állapottér"
    let money = Number.parseInt(moneyInput.value, 10);
    const interest = Number.parseFloat(interestInput.value, 10);
    const year = Number.parseInt(yearInput.value, 10);

    // firstChild megadja az adott Node első gyerekét
    // ezzel a trükkel eltávolítható az összes gyerek
    while (interestTableBody.firstChild) {
        interestTableBody.firstChild.remove(); // remove() kiveszi azt a Node-t amit keghívunk a DOM-ból
    }

    for (let index = 0; index <= year; index++) {
        const row = document.createElement('tr');

        const yearCell = document.createElement('td');
        yearCell.innerText = index;

        const moneyCell = document.createElement('td');
        moneyCell.innerText = money;

        money *= (1 + (interest / 100));

        row.appendChild(yearCell);
        row.appendChild(moneyCell);

        interestTableBody.appendChild(row);
    }

    console.log(money, interest, year);
})

// 14. Adott egy könyvtári nyilvántartás. Egy könyvről a következő adatokat tároljuk:
// szerző cím kiadás éve kiadó ISBN szám
// a. Felületen kérj be egy évszámot, és listázd ki az abban az évben megjelent könyvcímeket!
// b. Készíts egy legördülő mezőt, amelyben az egyes kiadók vannak felsorolva. Egy gombra kattintva táblázatos formában
// jelenítsd meg a kiválasztott kiadóhoz tartozó könyveket!


// adatok
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

// a
const filterButton = document.querySelector('button#filter');
const releaseYearInput = document.querySelector('input#release');

filterButton.addEventListener('click', () => {
    const year = Number.parseInt(releaseYearInput.value, 10);
    console.log(year)
    console.log(books.filter(book => book.kiadasEve === year));
})

// b
const selectPublisher = document.querySelector('select#publisher');
const bookTable = document.querySelector('table#books');

// halmaz típus
const publisherSet = new Set();
books.forEach(konyv => {
    publisherSet.add(konyv.kiado);
})

publisherSet.forEach(publisher => {
    const option = document.createElement('option');
    option.value = publisher;
    option.innerText = publisher;
    selectPublisher.appendChild(option);
})

selectPublisher.addEventListener('change', () => {
    // táblázat elemeknek lekérhető a törzse(i) a tBodies mezőn keresztül
    while (bookTable.tBodies[0].firstChild) {
        bookTable.tBodies[0].firstChild.remove();
    }

    books.forEach(book => {
        if (book.kiado === selectPublisher.value) {
            const row = document.createElement('tr');
            row.appendChild(document.createElement('td'))
            row.appendChild(document.createElement('td'))
            row.appendChild(document.createElement('td'))
            row.children[0].innerText = book.cim;
            row.children[1].innerText = book.szerzo;
            row.children[2].innerText = book.kiado;
            bookTable.tBodies[0].appendChild(row);
        }
    })
})