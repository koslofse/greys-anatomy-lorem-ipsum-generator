import { WORDS } from "./words";
export function handler(event, context, callback) {
  const { queryStringParameters } = event;
  const { paragraphs = 0, words = 0 } = queryStringParameters;

  let isParagraph = Boolean(paragraphs);
  let count;

  console.log(queryStringParameters)

  if (paragraphs >= 1) {
    count = paragraphs;
  } else if (words > 0) {
    isParagraph = false;
    count = words;
  }

  let response;
  try {
    response = generateLoremIpsum(isParagraph, count).join(" ");
  } catch (error) {
    console.log(error);
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: response })
  });
}

export function generateLoremIpsum(isParagraph, count) {
  if (isParagraph) {
    console.log(`Trying to construct ${count} paragraphs`);
    return generateParagraphs(count);
  } else {
    console.log(`Trying to return ${count} words`);
    return [generateWords(count)];
  }
}

export function generateWords(wordCount) {
  let words = [];
  console.log(wordCount);

  var i = 0;
  while( i < wordCount) {
    var wordsToAdd = WORDS[getRandomInt()];
    var wordsInWordsToAdd = wordsToAdd.split(" ").length;

    // make sure we don't exceed word count
    if (i + wordsInWordsToAdd <= wordCount){
      words.push(wordsToAdd);
      i += wordsInWordsToAdd;
    }
  }
  const formattedWords = `<p>${words.join(" ")}</p>`;

  return formattedWords;
}

export function generateParagraphs(paragraphCount) {
  let paragraphs = [];
  for (var i = 0; i < paragraphCount; i++) {
    paragraphs.push(generateWords(50));
  }
  return paragraphs;
}

export function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(WORDS.length));
}
