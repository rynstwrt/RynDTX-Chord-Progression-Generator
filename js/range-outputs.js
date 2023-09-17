const numChordsRange = document.querySelector("#num-chords-input");
const numChordsOutput = document.querySelector("#num-chords-output");

numChordsRange.addEventListener("input", el =>
{
    numChordsOutput.value = el.target.value;
});