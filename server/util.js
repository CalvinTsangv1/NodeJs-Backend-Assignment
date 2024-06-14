function isAlphabetic(input) {
  const regex = /^[A-Za-z0-9]+$/;
  return regex.test(input);
}

function isNumber(input) {
  return typeof input === 'number' && !isNaN(input);
}

module.exports = { isNumber, isAlphabetic };