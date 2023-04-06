import "mocha";
import { expect } from "chai";
import { add } from "../src/ej-clase/add"

describe('function add test', () => {
  it('add() should return 2', () => {
    expect(add()).to.eql(2);
  });
})