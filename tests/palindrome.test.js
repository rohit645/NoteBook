const palindrome = require('../utils/for_testing/').palindrome
const average = require('../utils/for_testing').average

describe('Palindrome', () => {
    test('Palindrome of a', () => {
        const result = palindrome('a')
        expect(result).toBe('a')
    })
    
    test('palindrome of react', () => {
        const result = palindrome('react')
        expect(result).toBe('tcaer')
    })
    
    test('palindrome of releveler', () => {
        const result = palindrome('releveler')
        expect(result).toBe('releveler')
    })
});


describe('average', () => {
    test('average of [1,2,3]', () => {
        const result = average([1,2,3])
        expect(result).toBe(2)
    })
    
    test('average of empty array', () => {
        const result = average([])
        expect(result).toBe(0)
    })
});


