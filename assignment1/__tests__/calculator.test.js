import { divide } from '../src/calculator.js'


describe('divide', () => {
it('div1de 2 by 1 ', () =>{
expect(divide(2, 1)).toBe(2);
});
it('divide throws error if numbers are letters', () =>{
expect(() => divide("a", "b")).toThrow(TypeError);
});
it('divide  throws error if arguments are NaN', () =>{
expect(() => divide(NaN, NaN)).toThrow("Arguments cannot be NaN");
});
it('divide  throws error if either argument is NaN', () =>{
expect(() => divide(2, NaN)).toThrow("Arguments cannot be NaN");
});
it('divide  throws error if number is 0', () =>{
expect(() => divide(2, 0)).toThrow(RangeError);
});

})
