const startTime = performance.now();

const cache = new Map();
cache.set(1, 1);

let longest = { number: 1, length: 1 };

// Tek sayıları kontrol ederek performans kazancı sağlayabiliriz.
// Çift sayılar, yarı değerlerinden bir adım daha fazla olduğu için, o değeri doğrudan mapten bulup kullanabiliriz.
for (let i = 1; i < 1_000_000; i += 2) {
  let n = i;
  let length = 0;
  const sequence = [];

  while (!cache.has(n)) {
    sequence.push(n);
    n = n % 2 === 0 ? n / 2 : 3 * n + 1;
    length++;
  }

  length += cache.get(n);

  for (let j = 0; j < sequence.length; j++) {
    cache.set(sequence[j], length - j);
  }

  if (length > longest.length) {
    longest = { number: i, length };
  }
}

const endTime = performance.now();
const elapsedTime = (endTime - startTime).toFixed(3);

document.write(
  `En uzun zinciri üreten başlangıç sayısı: ${longest.number} (Adım sayısı: ${longest.length}) (Çalışma süresi: ${elapsedTime} ms)`
);

// En uzun zinciri üreten başlangıç sayısı: 837799 (Adım sayısı: 525) (Çalışma süresi: 1590.400 ms)
