const { map } = require("zod")


function mergeSort(arr) {
    if (arr.length <= 1) return arr

    const middle = Math.floor(arr.length / 2),
    left = arr.slice(0, middle), right = arr.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    let i = 0, j = 0, result = []

    while(i < left.length && j < right.length) {
        if (left[i] > right[j]) result.push(right[j++]) 
        else result.push(left[i++])
    }
    return [...result, ...left.slice(i), ...right.slice(j)]
}

console.log(merge([ -2, -1, 2, 4], [1, 3, 6, 8]));



console.log(mergeSort([1, 0, -1, 2, 4,9, 8]));
            //         [1, 0, -1] [2,4,9,8] 
            //          [1] | [0, -1] | [2,4] [9,8]
            //          [1] | [0] | [-1] | [2] | [4] | [9] [8]
            //          [1] | res = [-1, 0]
            //          res = [-1, 0, 1] | res = [2,4] | res = [8, 9]
            //          res [-1, 0, 1, 2, 4] | res = [8, 9]
            //          res [-1, 0, 1, 2, 4, 8, 9]






const map = new Map()
map.set(1, [1,4])

console.log([...map.values()]);



const newStr = "   fly me   to   the moon  ".match(/\b\w+\b/ig)

console.log('asdSADSqew1'.slice(2, 3));