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

exports.assertTest = assertTest;
exports.assertTestOnArray = assertTestOnArray;
exports.generateAssertionReport = generateAssertionReport;
