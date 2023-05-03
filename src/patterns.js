// Common
const render = function(patternLines) {
  console.log(join(patternLines, "\n"));
}

// Rectangle
const getRectangleRow = function(rowNo, height, width) {
  return "*".repeat(width);
}

const generateRectangle = function(height, width) {
  const lines = [];

  for (let line = 1; line <= height; line++) {
    lines.push(getRectangleRow(line, height, width));
  }

  return lines;
}

// Hollow Rectangle
const generateHollowRectangleRow = function(length) {
  return "*" + " ".repeat(length - 2) + "*";
}

const generateHollowRectangle = function(height, width) {
  let lines = generateRectangle(height, width);

  const hollowRectangleRow = generateHollowRectangleRow(width);
  for (let line = 2; line < height; line++) {
    lines[line - 1] = hollowRectangleRow;
  }
  
  return lines;
}

/* -------------------- REQUIREMENT 2 -------------------- */ 

const generateAlternateRectangle = function(height, width) {
  let lines = [];
  const symbols = "-*";

  for (let line = 1; line <= height; line++) {
    lines.push((symbols[line % 2]).repeat(width));
  }

  return join(lines, "\n");
}

/* -------------------- REQUIREMENT 3 -------------------- */ 

const getRepeatativeRectangleRow = function(rowNo, height, width, repeatCount) {
  return ("*".repeat(width) + " ").repeat(repeatCount - 1) + "*".repeat(width);
}

const generateRepeatativeRectangle = function(height, width, repeatCount) {
  const lines = [];

  for (let line = 1; line <= height; line++) {
    lines.push(getRepeatativeRectangleRow(line, height, width, repeatCount));
  }

  return join(lines, "\n");
}

/* -------------------- REQUIREMENT 4 -------------------- */ 

const getTriangleRow = function(rowNo, height) {
  return "*".repeat(rowNo);
}

const generateTriangle = function(height, width) {
  const lines = [];

  for (let line = 1; line <= height; line++) {
    lines.push(getTriangleRow(line, height));
  }
  return join(lines, "\n");
}

/* -------------------- REQUIREMENT 5 -------------------- */ 

const getRightTriangleRow = function(rowNo, height) {
  return " ".repeat(height - rowNo) + "*".repeat(rowNo);
}

const generateRightTriangle = function(height, width) {
  const lines = [];

  for (let line = 1; line <= height; line++) {
    lines.push(getRightTriangleRow(line, height));
  }
  return join(lines, "\n");
}

/* -------------------- REQUIREMENT 6 -------------------- */ 

const getDiamondRow = function(rowNo, height) {
  /*
    1 - 2 1 
    2 - 1 3 
    3 - 0 5 
    4 - 1 3 
    5 - 2 1 
  */
  const middleRow = Math.ceil(height/2);
  const noOfLeadingSpaces = Math.abs(middleRow - rowNo);

  return " ".repeat(noOfLeadingSpaces) + "*".repeat(height - noOfLeadingSpaces * 2);
}

const generateDiamond = function(height, width) {
  const lines = [];

  for (let line = 1; line <= height; line++) {
    lines.push(getDiamondRow(line, height));
  }
  return join(lines, "\n");
}

exports.generateRectangle = generateRectangle;
exports.generateHollowRectangle = generateHollowRectangle;
