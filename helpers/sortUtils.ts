export function isSortedAsc<T>(arr: T[]):boolean {
    return arr.every((val, i) => i === 0 || val >= arr[i - 1]);
}

export function isSortedDesc<T>(arr: T[]):boolean {
    return arr.every((val, i) => i === 0 || val <= arr[i - 1]);
}
