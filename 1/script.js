let a = "k";
const B = 'k';
const c = `a`;

const num = 3.14;

undefined;

const d = `helo ${c}`
console.log(d);

console.log(5 == 5);
console.log(5 == '5');
console.log(5 === '5');

function func() {

}

const add = function() {

}

const add2 = (a, b) => a + b;
console.log(add2(2, 5));

function count(str, fn) {
    let db = 0;
    for (const c of str) {
        if (fn(c)) {
        db++;
        }
    }
    return db;
}

console.log(count("apple", c => c === 'a'))

function lnko(a, b) {
    if(a < b) {
        let temp = a;
        a = b;
        b = temp;
    }
    let maradek = a % b;

    while (maradek > 0) {
        a = b;
        b = maradek;
        maradek = a % b;
    }
    return b;
} 

console.log(lnko(30, 9))

function lkkt(a, b) {
    let x = a;
    let y = b;

    while(x !== y) {
        if (x < y) {
            x += a;
        } else if (x > y) {
            y += b;
        }
    }
    return x;
}

console.log(lkkt(12, 5));


const tomb = [1, 2, 3, 4];
console.table(tomb);

tomb.push(5);
console.table(tomb);

for (let index = 0; index < tomb.length; index++) {
    const element = tomb[index];
}

for (const elem of tomb) {
    console.log(elem);
}

// sima for
tomb.forEach(elem => {
    console.log(elem);
})

// eldöntés
console.log(tomb.some(elem => elem % 3 === 0));
console.log(tomb.some(elem => elem > 6));


// optimista eldöntés
console.log(tomb.every(elem => elem % 2 === 0));
console.log(tomb.every(elem => elem > 0));

// követkző függvvények új tömböt adnak vissza
// map
console.log(tomb.map(elem => elem**2));
console.log(tomb.map(elem => {
    return elem**2;
}))

//kiválogatás
console.log(tomb.filter(elem => elem > 3));
console.log(tomb);

//keresés
console.log(tomb.find(elem => elem > 3));
console.log(tomb.findIndex(elem => elem > 3));
console.log(tomb.find(elem => elem > 5));


// reduce
// foldl 
// összegzés, minimum, maximum, megszámlálás
console.log(tomb.reduce((acc, elem) => acc + elem, 0))

// 12
const szamok = [2, 3, 1, 2, 2, 3, 5, 6, 7, 9];

// filter
console.log(szamok.filter(elem => elem % 2 === 0).length);

// reduce
console.log(szamok.reduce((acc, curr) => curr % 2 === 0 ? acc + 1 : acc, 0));


// 16
const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

console.log(matrix.every(row => row.every(elem => elem % 2 === 0)));

// 17
// Határozd meg egy mátrixban, hogy hány olyan sora van, amely nem tartalmaz 0 értéket!
const matrix2 = [[1, 2, 3], [4, 0, 6], [7, 8, 9]];
console.log(matrix2.filter(row => !row.includes(0)).length);


// objektumok
// legfontosabb adatszerkezet
// kulcs-érték párok pl. java map
const obj = {
    'a': "b",
    a: "c",
    b: () => console.log(asd),
    metodus2() {
        console.log('Foo: ', 5);
    }
}

console.log(obj.a);
console.log(obj.d);

const C = "x";
obj[C] = 5;
console.log(obj.x);

const matyi = {
    kor: 1.5,
    fiu: true,
    cuki: true
  }
  
  // Feldolgozás a for..in ciklussal
  for (const i in matyi) {
    console.log(i, matyi[i]);
  }

// for (const adat of matyi) {
//     console.log(adat);
// }

console.log("a");

class Movie {
    constructor(title, length, category, year, directors, cast) {
        this.title = title;
        this.length = length;
        this.category = category;
        this.year = year;
        this.directors = directors;
        this.cast = cast;
    }
}

const movies = [
    new Movie("Harry Potter", 42, "Fantasy", 2008, ["A", "B"], {"harry": "a színéz neve"}),
    new Movie("Harry Potter 2", 43, "Fantasy", 2009, ["A"], {"harry": "a színéz neve", "hagrid": "Kovács Sándor"}),
    new Movie("Harry Potter 3", 120, "Fantasy", 2013, ["B", "C"], {"harry": "a színéz neve", "hagrid": "Kovács Sándor"}),
]

console.table(movies);
movies.forEach(movie => console.log(movie));

console.table(movies.filter(({directors}) => directors.length > 1));

console.log(movies.reduce((maxLength, current) => {
    if (maxLength.length < current.length) {
        return current;
    }
    return maxLength;
}, movies[0]));