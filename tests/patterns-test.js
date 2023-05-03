const test = require("../lib/testing-utilities.js");
const pattern = require("../src/patterns.js");


const testRectangle = function() {
  test.assertTestOnArray("rectangle", pattern.generateRectangle(2, 3), ["***", "***"], "rectangle of 2X3"); 
  test.assertTestOnArray("rectangle", pattern.generateRectangle(1, 1), ["*"], "rectangle of 1X1 should be array of one star"); 
  test.assertTestOnArray("rectangle", pattern.generateRectangle(0, 0), [], "rectangle of 0X0 should be empty array"); 
}

const testHollowRectangle = function() {
  test.assertTestOnArray("hollowTriangle", pattern.generateEmptyRectangle(3, 3), [
    "***",
    "* *",
    "***"
  ], "empty rectangle of 3X3")
  test.assertTestOnArray("hollowTriangle", pattern.generateEmptyRectangle(2, 2), ["**", "**"], "empty rectangle of 1X1 should be rectangle of 2X2")
}

// not refactored
const testTriangle = function() {
  test.assertTest("leftTriangel", generateTriangle(3), "*\n**\n***", "triangle of 3"); 
  test.assertTest("leftTriangel", generateTriangle(1), "*", "triangle of 1"); 
  test.assertTest("leftTriangel", generateTriangle(0), "", "triangle of 0"); 
}

const testDiamond = function() {
  test.assertTest("diamond", generateDiamond(3), " *\n***\n *", "diamond of 3 lines");
  test.assertTest("diamond", generateDiamond(1), "*", "diamond of 1 lines");
  test.assertTest("diamond", generateDiamond(0), "", "diamond of 0 lines");
}

const testRightTriangle = function() {
  test.assertTest("rightTriangle", generateRightTriangle(3), "  *\n **\n***", "right triangle with height 3");
  test.assertTest("rightTriangle", generateRightTriangle(1), "*", "right triangle with height 1");
  test.assertTest("rightTriangle", generateRightTriangle(0), "", "right triangle with height 0");
}

const testRepeatativeRectangle = function() {
  test.assertTest("repeatativeRectangle", generateRepeatativeRectangle(2, 2, 2), "** **\n** **", "repeatative rectangles of 2X2X2");
  test.assertTest("repeatativeRectangle", generateRepeatativeRectangle(1, 1, 1), "*", "repeatative rectangles of 1X1X1");
  test.assertTest("repeatativeRectangle", generateRepeatativeRectangle(0, 0, 0), "", "repeatative rectangles of 0X0X0");
}

const testAlternateRectangle = function() {
  test.assertTest("anternateRectangle", generateAlternateRectangle(3, 4), "****\n----\n****", "alternate rectangle of 3X4")
  test.assertTest("anternateRectangle", generateAlternateRectangle(1, 1), "*", "alternate rectangle of 1X1")
  test.assertTest("anternateRectangle", generateAlternateRectangle(0, 0), "", "alternate rectangle of 0X0")
}

const testAll = function() {
  testRectangle();
//  testHollowRectangle();
//  testAlternateRectangle();
//  testRepeatativeRectangle();
//  testTriangle();
//  testRightTriangle();
//  testDiamond();
}

testAll();
console.log(test.generateAssertionReport());
