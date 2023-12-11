const MAX_PRIME = 1000000;

function isPrime(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return n > 1;
}

const random = (max) => Math.floor(Math.random() * max);

function generatePrimes(quota) {
  const primes = [];
  while (primes.length < quota) {
    const candidate = random(MAX_PRIME);
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  return primes;
}

// Probléma: hosszan futó feladatok (HTTP kérések, intenzív számítások) blokkolják a felületet amíg futnak
document.querySelector('#blocking').addEventListener('click', () => {
    console.log(generatePrimes(1000000));
});

// setTimeout, setInterval, addEventListener nem blokkolnak
// ezt már láttuk



setTimeout(() => {
    console.log("asd");
}, 10000)

console.log("asd2");
