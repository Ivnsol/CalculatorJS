const digits = {
    X: 10,
    IX: 9,
    VIII: 8,
    VII: 7,
    VI: 6,
    V: 5,
    IV: 4,
    III: 3,
    II:2,
    I: 1
}



const stringValidation = string => {
    let pattern = /[^IVX0-9+*\/-\s]/g
    if([...string.matchAll(pattern)].length >= 1){
        throw new Error('В строке не понятные символы')
    }
    pattern = /[+*\/-]{2,}/g
    if([...string.matchAll(pattern)].length >= 1){
        throw new Error('В строке более 1 символа')
    }
    return true
}

const getOperation = string => {
    return [...string.match(/[+*\/-]/g)][0]
}

const getNums = string => {
    return string.split(/[+*\/-]/g).map(num => num.trim())
}

const romanToArabic = string => {
    return string.split('').reduce((prevVal, currValue, i, arr) => {
        debugger
        const [a, b, c] = [
            digits[arr[i]],
            digits[arr[i + 1]],
            digits[arr[i + 2]]
        ]
        if(b && c && a <= b && b < c){
            throw new Error('1')
        }
        return b > a ? prevVal - a : prevVal + a
    }, 0)
}

const isRoman = string => {
    const pattern = /^[IVX]+$/
    let arrNums = string.split(/[+*\/-]/g).map(num => num.trim())
    const countRoman = arrNums.reduce((prevVal, currValue) => prevVal + pattern.test(currValue), 0)
    if (countRoman === 1) {
        throw new Error("Оба числа должны быть римскими или арабскими")
    } else if(countRoman === 2) {
        return true       
    }
}

const sum = nums => {
    return nums.reduce((a, b) => a + b)
}

const mult = nums => {
    return nums.reduce((a, b) => a * b)
}

const division = nums => {
    return nums.reduce((a, b) => a / b)
}

const subtraction = nums => {
    return nums.reduce((a, b) => a - b)
}

const checkOperation = (str, nums) => {
    let result;
    if(str === '+'){
       result = sum(nums)
    } else if (str === "*") {
        result = mult(nums)
    }else if (str === "/") {
        result = division(nums)
    }else if (str === "-") {
        result = subtraction(nums)
    }
    return Math.floor(result)
}

const calculator = string => {
    const isValid = stringValidation(string)
    const operation = getOperation(string)
    let nums = getNums(string)
    const roman = isRoman(string)
    if(roman) {
        nums = nums.map(num => romanToArabic(num))
    }
    nums = nums.map(num => +num)
    return checkOperation(operation, nums)
}


// + арабские

console.log(calculator('V / IV'))
console.log(calculator('2 / 4'))