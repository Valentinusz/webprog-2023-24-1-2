export const makeGridContent = grid => {
    return grid.map(row => `<tr>${row.map(cell => `<td style="background-color: ${cell}"></td>`).join(" ")}</tr>`).join("");
}