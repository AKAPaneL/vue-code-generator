// 大驼峰
function toBigCamelCase(input) {
  return input
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

// 小驼峰
function toSmallCamelCase(input) {
  const words = input.split("-");
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return camelCaseWords.join("");
}

module.exports = {
  toBigCamelCase,
  toSmallCamelCase
}