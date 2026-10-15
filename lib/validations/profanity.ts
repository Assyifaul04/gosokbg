const BAD_WORDS = [
  // Indonesia
  "anjing", "bangsat", "bajingan", "kontol", "memek", "ngentot",
  "pepek", "pler", "pukimak", "tai", "tahi", "kampret", "keparat",
  "setan", "brengsek", "sialan", "goblok", "idiot", "tolol", "bodoh",
  "bego", "dungu", "sinting", "gila", "edan",
  // Inggris
  "fuck", "shit", "bitch", "asshole", "bastard", "damn",
  "cunt", "dick", "pussy", "whore", "slut",
];

// Normalisasi: huruf kecil, hilangkan karakter berulang, ganti simbol umum
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[0@]/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/[3]/g, "e")
    .replace(/[4]/g, "a")
    .replace(/[5$]/g, "s")
    .replace(/[7]/g, "t")
    .replace(/(.)\1{2,}/g, "$1") // "aaaa" -> "a"
    .replace(/[^a-z\s]/g, " ");
}

export function containsBadWords(text: string): {
  found: boolean;
  words: string[];
} {
  const normalized = normalize(text);
  const words = normalized.split(/\s+/);

  const found = BAD_WORDS.filter((bad) =>
    words.some((w) => w === bad || w.includes(bad))
  );

  return { found: found.length > 0, words: found };
}

export function countLinks(text: string): number {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  return (text.match(urlRegex) ?? []).length;
}