const NOTE_DURATION = "16n";
const SYNTH_INPUT_MAP = {
    "PolySynth": Tone.Synth,
    "FMSynth": Tone.FMSynth,
    "AMSynth": Tone.AMSynth,
    "NoiseSynth": Tone.NoiseSynth
};
const SYNTH_ENVELOPE = {
    attack: .01,
    decay: 0.5,
    sustain: 0,
    release: 1
};
const NUM_VOICES = 5;

const synthInput = document.querySelector("#synth-input");
const oscillatorInput = document.querySelector("#oscillator-input");
const playButton = document.querySelector("#play-button");

let toneJSStarted = false;
let synth;
let oscillator = "sine";


async function playProgression(chords)
{
    const progression = [];
    for (let i in chords)
    {
        const chord = chords[i];
        progression.push(["0:" + i, chord]);
    }

    const part = new Tone.Part((time, note) =>
    {
        synth.triggerAttackRelease(note, NOTE_DURATION, time);
    }, progression);

    part.start(0)
    Tone.Transport.start();
}


async function setSynth(synthClass)
{
    synth = new Tone.PolySynth(synthClass, NUM_VOICES).toMaster();
    synth.set({
        oscillator: {
            type: oscillator
        },
        envelope: SYNTH_ENVELOPE,
        resonance: 0.9
    });
}


synthInput.addEventListener("input", el =>
{
    const option = el.target.value;
    const optionClass = SYNTH_INPUT_MAP[option];

    if (synth && synth.name === option)
        return;

    setSynth(optionClass);
});


oscillatorInput.addEventListener("input", el =>
{
    oscillator = el.target.value;
    setSynth(SYNTH_INPUT_MAP[synth.name]);
});


playButton.addEventListener("click", async () =>
{
    if (!toneJSStarted)
    {
        await Tone.start();
        toneJSStarted = true;
    }

    if (!synth)
    {
        console.log("setting synth")
        await setSynth(Tone.Synth);
    }

    Tone.Transport.stop();
    Tone.Transport.clear();

    await playProgression([["C4", "D4", "E4"], ["C4", "D4", "E4"], ["C4", "D4", "E4"]])
});