// 03. Eseménykezelés
// feladatsor: http://webprogramozas.inf.elte.hu/#!/subjects/webprog-pti/gyak/03
// előadás: http://webprogramozas.inf.elte.hu/webprog/lectures/03/#/

// HTML elemekre lehetőségünk van eseménykezelőket regisztrálni
// az eseménykezelők figyelnek az adott eseményekre, melyek bekövetkeztekor az általunk megadott alprogramokat
// (függvényeket) futtatják le

// eseménykezelő regisztrálás: element.addEventListener(eventType: string, eventHandler: function);
// eseménykezelő törlés: element.removeEventListener(eventType: string, eventHandler: function);

// sokféle esemény létezik
// click: egérkattintás
// mousemove: egérmozgatás
// mousedown: egér gombjának lenyomása
// mouseup: egér gombjának felenegedése
// input: input mező értékének megváltozása
// keydown: billentyűzet gombjának lenyomása
// keyup: billentyűzet gombjának felengedése
// keypress: billentyűzet gombjának megnyomása
// submit: űrlap elküldése
// scroll: görgetés az oldalon
// https://developer.mozilla.org/en-US/docs/Web/Events

// 1. Adott egy paragrafusbeli szöveg, amelyben néhány szó `span` elembe van foglalva vagy hivatkozásként van megadva.
// A paragrafusra kattintáskor írd ki a konzolra:
// a) az eseményt jelző objektumot;
// b) az esemény típusát;
// c) a kattintás közben lenyomott egérgombot;
// d) az egér kattintáskori pozícióját;
// e) az eseményt eredetileg jelző objektumot;
// f) span elemre kattintva a span elem szövegét.
// g) Ha a hivatkozás szövege "libero", akkor ne kövesse a hivatkozást.
const paragraph = document.querySelector('#lorem');
console.log(paragraph);

// eseménykezelő hozzáadása
// az eseménykezelő függvények automatikusan megkapnak egy esemény objektumot, ami az esemény adataittartalmazza
// (általában e, evt, event neveket használjuk)
paragraph.addEventListener('click', event => {
    console.log(event);

    // a
    // target az az elem, amivel interaktálva az esemény kiváltásra került
    // nem feltétlen az az elem amihez az eseménykezelő hozzá van adva
    // "Egy esemény bekövetkezte mindig egy adott DOM objektumhoz kapcsolódik. Ezt nevezzük az esemény forrásobjektumának.
    // Azonban az eseményt nemcsak ez az objektum jelzi, hanem annak szülője, majd annak szülője, szép sorban egészen a
    // legfelső szintig a document objektumig. Ezt nevezzük az esemény buborékolásának."
    // - http://webprogramozas.inf.elte.hu/tananyag/kliens/
    console.log(event.target);

    // b
    // az esemény típusa lekérhető
    console.log(event.type);

    // d
    // a különböző eseménytípusoknak vannak specifikus adattagjai
    console.log(event.clientX, event.clientY);

    // e
    // currentTarget mindig az az elem, amihez az eseménykezelő hozzá van adva
    console.log(event.currentTarget);


    // f
    // a matches függvénnyel megvizsgálható, hogy az adott elem megfelel-e a megadott CSS szelektornak
    if (event.target.matches('span')) {
        console.log(event.target.innerText);
    }

    // g
    if (event.target.matches('a') && event.target.innerText === 'libero') {
        // bizonyos HTML elemeknek van alapból definiált eseménye (pl. <a>, <form>)
        // az általunk definiált eseménykezelők hamarabb futnak le, ezért az
        // alapértelemezett működés a preventDefault() metódussal megakadályozható
        event.preventDefault();
    }

    // érdekesség:
    console.log("this értéke:", this);
    // ha az eseménykezelő függvény NEM arrow function akkor a this változó az event.currentTarget-re fog hivatkozni
    // ez azért van mert az arrow functionnek nincs saját this kontextusa
})

// 4. Készítsünk egy csak számokat elfogadó mezőt.
// a) Gépelés közben meg se jelenjenek a számoktól eltérő karakterek.
// b) A megoldás működjön minden olyan szöveges beviteli mezőre, amelynek szam stílusosztály be van állítva.
const handleInput = event => {
    // nem kötelező, de segíti a kód olvashatóságát
    const input = event.target;

    // minden gépeléskor megvizsgáljuk a beírt karakter szám-e
    // reguláris kifejezés azt nézi, hogy csak tetszőleges számokból áll-e a string
    if (!(/^\d*$/.test(input.value))) {
        // a nem számjegy karaktereket üres stringre cseréljük
        input.value = input.value.replace(/[^\d/]/g, '')
    }
}

// naív megoldás: összes input.szam-ra registrálunk eseménykezelőt
// nem rugalmas, nem hatékony
// document.querySelectorAll('input.szam').forEach(input => input.addEventListener('input', handleInput));

// jobb, de absztraktabb megoldás: delegálás
// A buborékolás miatt megtehetjük azt, hogy a konkrét elem helyett, annak egy szűlőjére regisztrálunk eseménykezelőt,
// majd a függvény törzsében vizsgáljuk meg, ténylegesen a megadott gyerekelem váltotta-e ki az eseményt.
document.addEventListener('input', event => {
    if (event.target.matches('input.szam')) {
        // ezen a ponton biztosak vagyunk benne, hogy az eseményt egy input elem váltotta ki aminek van szam stílusosztálya
        handleInput(event);
    }
})

// 5. Az oldalon minden olyan hivatkozást tiltsunk le, amelyik nem ELTÉs címre mutat!

document.addEventListener('click', event => {
    // includes igaz, ha a stringben megtalálható a megadott substring
    if (event.target.matches('a') && !event.target.href.includes('.elte.hu')) {
        event.preventDefault()
    }
});

// 11.
// Adott egy GYIK oldal. Ezen egy faq stílusosztályú elemen belül vannak a kérdések válaszok. A kérdések h2 elemben, a 
// válaszok közvetlenül utána p elemekben vannak. Oldjuk meg, hogy egy kérdésre kattintva a válasz eltűnjön/megjelenjen!

document.querySelector('.faq').addEventListener('click', event => {
    if (event.target.matches('h3')) {
        const question = event.target;

        // nextElementSibling az adott elem következő Element testvére
        const answer = question.nextElementSibling;

        answer.hidden = !answer.hidden;
    } 
});

// 8. Készíts memóriajátékot!

const MemoryGame = size => {
    // "Állapottér"
    let firstSelectedCard = null;
    let flippedCount = 0;
    const cardCount = size * size;
    let bothFlipped = false; // jelenleg fel van-e fordítva mindkettő

    const gameTable = document.createElement('table');
    gameTable.id = "game"

    // Element CSS osztályai a classList property-n keresztül érhetőek el
    // classList.add('string') osztály hozzáadása
    // classList.remove('string') osztály eltávolítása
    // classList.toggle('string') osztály hozzáadása ha nincs, eltávolítása, ha van
    // classList.includes('string') igaz, ha az elem rendelkezik a stílusosztállyal

    shuffleCards(size).forEach(matrixRow => {
        const row = document.createElement('tr');
        matrixRow.forEach(number => {
            const cell = document.createElement('td');

            // data attribútumok
            // saját HTML attribútumok, megadás HTML-ben data-* pl. data-id="1"
            // dataset mezőn keresztül érhetőek el
            // element.dataset.id = 1; írás
            // element.dataset.id; olvasás
            // 'id' in element.dataset; attribútom meglétének vizsgálata
            cell.dataset.number = number;

            cell.innerText = number;

            row.appendChild(cell);
        });

        gameTable.appendChild(row);
    });

    gameTable.addEventListener('click', event => {
        if (
            event.target.matches('td') && // td-re kattintunk-e
            event.target !== firstSelectedCard && // nem ugyan arra kattintunk
            !event.target.classList.contains('flipped') && // amire kattintunk nincs felfordítva
            !bothFlipped // várjuk meg a setTimeOut végét
        ) {
            if (!firstSelectedCard) {
                firstSelectedCard = event.target;
                firstSelectedCard.classList.add('selected');
            } else {
                const secondSelectedCard = event.target;

                if (firstSelectedCard.dataset.number === secondSelectedCard.dataset.number) {
                    firstSelectedCard.classList.add('flipped');
                    firstSelectedCard.classList.remove('selected');

                    secondSelectedCard.classList.add('flipped');
                    flippedCount += 2;

                    if (flippedCount === cardCount) {
                        alert("Nyertél!");
                    }
                } else {
                    secondSelectedCard.classList.add('selected');
                    bothFlipped = true;

                    // setTimeout legalább n milliszekundum-ot vár mielőtt végrehajta a megadott kódot
                    // aszinkron, nem blokkol a várás a js fájl végrehajtása folytatódik
                    setTimeout(() => {
                        firstSelectedCard.classList.remove('selected');
                        secondSelectedCard.classList.remove('selected');
                        firstSelectedCard = null;
                        bothFlipped = false;
                    }, 2000)
                }
            }
        }
    })

    return gameTable;
}

document.querySelector("#memory").appendChild(MemoryGame(4));

// SEGÉDFÜGGVÉNYEK
/**
 * Helper function to create the arrangement of cards in the memory game.
 * @param {number} size of of the matrix to create
 * @returns int[][] of cards.
 */
function shuffleCards(size) {
    const cards = Array.from({length: size * size}, (_, index) => (Math.ceil((index + 1) / 2)));
    shuffleArray(cards);

    const cardMatrix = [];
    for (let i = 0; i < cards.length; i += size) {
        cardMatrix.push(cards.slice(i, i + size));
    }

    return cardMatrix;
}

/**
 * Helper function to shuffle the elements of an array.
 * @param {array} array Array to shuffle.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}