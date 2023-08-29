export const duplicateArray = arr => {
    const newArr = [];
    arr.forEach(item => {
        newArr.push({...item})
    });

    return newArr;
}
