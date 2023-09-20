const SCALE = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
const OCTAVE = 4;

const display = document.querySelector("#display");
const generateButton = document.querySelector("#generate-button");
const keyInput = document.querySelector("#key-input");
const numChordsInput = document.querySelector("#num-chords-input")
const majorMinorInput = document.querySelector("#major-minor-input");


async function setDisplayText(text)
{
    while (display.hasChildNodes())
        display.removeChild(display.firstChild);

    let hasBrokeLine = false;
    let i = 0;
    for (const char of text.split(" "))
    {
        if (char === " " || char === "")
            return;

        const wrapper = document.createElement("div");
        wrapper.classList.add("display-text-wrapper");

        const h2 = document.createElement("h2");
        h2.textContent = char;
        wrapper.appendChild(h2);

        if (!hasBrokeLine && i >= 4)
        {
            hasBrokeLine = true;

            const lineBreak = document.createElement("div");
            lineBreak.classList.add("flex-break");

            display.appendChild(lineBreak);
        }

        display.appendChild(wrapper);
        ++i;
    }
}


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
    await setDisplayText(text);

    resetTransport();

    await playProgression();
}


generateButton.addEventListener("click", async () =>
{
    const numChords = numChordsInput.value;
    const key = keyInput.value;
    const majorMinor = majorMinorInput.value;

    await generateProgression(numChords, key, majorMinor);
});


// function generateKeys()
// {
//     for (const key of SCALE)
//     {
//         const option = document.createElement("option");
//         option.value = key;
//         option.textContent = key;
//         keyInput.appendChild(option);
//     }
// }
// generateKeys();