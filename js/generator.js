const SCALE = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
const OCTAVE = 4;

const displayText = document.querySelector("#display-text");
const generateButton = document.querySelector("#generate-button");
const numChordsInput = document.querySelector("#num-chords-input");
const keyInput = document.querySelector("#key-input");
const majorMinorInput = document.querySelector("#major-minor-input");


async function generateProgression(length=4, key="random", majorOrMinor="random")
{
    let text = "";
    const chords = [];
    for (let i = 0; i < length; ++i)
    {
        const r = Math.floor(Math.random() * (SCALE.length));
        chords.push([SCALE[r] + OCTAVE]);
        text += SCALE[r] + " ";
    }

    const progression = [];
    for (const i in chords)
    {
        const chord = chords[i];
        progression.push(["0:" + i, chord]);
    }

    currentProgression = progression;
    displayText.textContent = text;

    await setupIfNeeded();

    Tone.Transport.stop();
    Tone.Transport.clear();

    await playProgression();
}

generateButton.addEventListener("click", async () =>
{
    const numChords = numChordsInput.value;
    const key = keyInput.value;
    const majorMinor = majorMinorInput.value;

    await generateProgression(numChords, key, majorMinor);
});