// Styling Utilities
const style = function(text, code) {
  return "\033[" + code + "m" + text + "\033[0m";
}

const underline = function(text) {
  return style(text, 4);
}

const bold = function(text) {
  return style(text, 1);
}

const red = function(text) {
  return style(text, 31);
}

const green = function(text) {
  return style(text, 32);
}

const headline = function(text)  {
  return "\n" + bold(underline(text)) + "\n";
}

// Testing Utilities
// Assertion Log
const assertionLog = [];

const pushAssertion = function(fnName, actual, expected, message, isPassedAssertion) {
  assertionLog.push({fnName, actual, expected, message, isPassedAssertion});
}

const generateTestReport = function(isPassedAssertion, actual, expected, message) {
  const reportLines = [];

  reportLines.push((isPassedAssertion ? green("󰗡 ") : red(" ")) + message); 
  if (!isPassedAssertion) {
    reportLines.push(green("   expected: " + expected));
    reportLines.push(red("    actutal: " + actual));
  }

  return join(reportLines, "\n");
}

const select = function(object, keys) {
  const newObject = {};

  for (const key of keys) {
    newObject[key] = object[key];
  }

  return newObject;
}

const group = function(listOfObjects, key) {
  const groupedObject = {};

  for (const object of listOfObjects) {
    const groupKey = object[key];
    groupedObject[groupKey] = (groupedObject[groupKey] || []).concat(object);
  }

  return groupedObject;
}

const generateSummaryLine = function(assertions) {
  const totalCoutnt = assertions.length;
  const passedCount = (group(assertions, "isPassedAssertion").true || []).length;

  return passedCount + " / " + totalCoutnt + " passed";
}

const generateAssertionReport = function(functions) {
  let allReports = [];
  const assertions = group(assertionLog, "fnName");

  for (const fnName in assertions) {
    const reportHeadline = headline(
      "Asserting: " + fnName + " " +  
      "[ " + generateSummaryLine(assertions[fnName]) + "]"
    );
    const reports = [];
    for (const test of assertions[fnName]) {
      reports.push(generateTestReport(
        test.isPassedAssertion, 
        test.actual, 
        test.expected, 
        test.message
      ));
    }
    allReports.push(reportHeadline + join(reports, "\n"));
  }
  const summary = bold("\n\nSummary : " + generateSummaryLine(assertionLog));
  return join(allReports, "\n") + summary;
}

// Common Functions
const join = function(array, delimeter) {
  if (array.length === 0) return "";

  let joinedElements = array[0];
  for (element of array.slice(1)) {
    joinedElements += delimeter + element;
  }

  return joinedElements;
}

// Array Testing Functions
const areEqual = function(array1, array2) {
  if (array1.length !== array2.length) return false;

  let index = 0;
  while (index < array1.length) {
    if (array1[index] !== array2[index]) return false;
    index++;
  }

  return true;
}

const assertTestOnArray = function(fnName, actualArray, expectedArray, message) {
  const isPassedAssertion = areEqual(actualArray, expectedArray);
  
  pushAssertion(fnName, actualArray, expectedArray, message, isPassedAssertion); 
}

// Other Type Testing Functions
const assertTest = function(fnName, actual, expected, message) {
  const isPassedAssertion = actual === expected;

  pushAssertion(fnName, actual, expected, message, isPassedAssertion);
}

/* -------------------- END OF TEST -------------------- */
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

/* -------------------- REQUIREMENT 2 -------------------- */ 
const repeat = function(pattern, times, seperator) {
  if (times <= 0) return [];
  if (times === 1) return pattern;
  
  return pattern.concat(seperator.concat(repeat(pattern, times-1, seperator)));
}

const getEmptyRectangleRow = function(rowNo, height, width) {
  const isInBorder = rowNo === 1 || rowNo === height  
  return "*" + repeat(" *"[isInBorder + 0], width - 2) + "*";
}

const generateEmptyRectangle = function(height, width) {
  let lines = [];

  for (let line = 1; line <= height; line++) {
    lines.push(getEmptyRectangleRow(line, height, width));
  }
  
  return join(lines, "\n");
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

/* -------------------- TESTCASES -------------------- */ 

const testRectangle = function() {
  assertTestOnArray("rectangle", generateRectangle(2, 3), ["***", "***"], "rectangle of 2X3"); 
  assertTestOnArray("rectangle", generateRectangle(1, 1), ["*"], "rectangle of 1X1 should be array of one star"); 
  assertTestOnArray("rectangle", generateRectangle(0, 0), [], "rectangle of 0X0 should be empty array"); 
}

const testTriangle = function() {
  assertTest("leftTriangel", generateTriangle(3), "*\n**\n***", "triangle of 3"); 
  assertTest("leftTriangel", generateTriangle(1), "*", "triangle of 1"); 
  assertTest("leftTriangel", generateTriangle(0), "", "triangle of 0"); 
}

const testDiamond = function() {
  assertTest("diamond", generateDiamond(3), " *\n***\n *", "diamond of 3 lines");
  assertTest("diamond", generateDiamond(1), "*", "diamond of 1 lines");
  assertTest("diamond", generateDiamond(0), "", "diamond of 0 lines");
}

const testRightTriangle = function() {
  assertTest("rightTriangle", generateRightTriangle(3), "  *\n **\n***", "right triangle with height 3");
  assertTest("rightTriangle", generateRightTriangle(1), "*", "right triangle with height 1");
  assertTest("rightTriangle", generateRightTriangle(0), "", "right triangle with height 0");
}

const testRepeatativeRectangle = function() {
  assertTest("repeatativeRectangle", generateRepeatativeRectangle(2, 2, 2), "** **\n** **", "repeatative rectangles of 2X2X2");
  assertTest("repeatativeRectangle", generateRepeatativeRectangle(1, 1, 1), "*", "repeatative rectangles of 1X1X1");
  assertTest("repeatativeRectangle", generateRepeatativeRectangle(0, 0, 0), "", "repeatative rectangles of 0X0X0");
}

const testEmptyRectangle = function() {
  assertTest("hollowTriangle", generateEmptyRectangle(3, 3), "***\n* *\n***", "empty rectangle of 3X3")
  assertTest("hollowTriangle", generateEmptyRectangle(1, 1), "*", "empty rectangle of 1X1")
  assertTest("hollowTriangle", generateEmptyRectangle(0, 0), "", "empty rectangle of 0X0")
}

const testAlternateRectangle = function() {
  assertTest("anternateRectangle", generateAlternateRectangle(3, 4), "****\n----\n****", "alternate rectangle of 3X4")
  assertTest("anternateRectangle", generateAlternateRectangle(1, 1), "*", "alternate rectangle of 1X1")
  assertTest("anternateRectangle", generateAlternateRectangle(0, 0), "", "alternate rectangle of 0X0")
}

const testAll = function() {
  testRectangle();
//  testEmptyRectangle();
//  testAlternateRectangle();
//  testRepeatativeRectangle();
//  testTriangle();
//  testRightTriangle();
//  testDiamond();
}

testAll();
console.log(generateAssertionReport());
