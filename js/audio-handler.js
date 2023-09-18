const NOTE_DURATION = "8n";
const NUM_VOICES = 1;
const BPM = 250;
const SYNTH_INPUT_MAP = {
    "PolySynth": Tone.Synth,
    "FMSynth": Tone.FMSynth,
    "AMSynth": Tone.AMSynth,
};
const SYNTH_ENVELOPE = {
    attack: .005,
    decay: .4,
    sustain: 0,
    release: .5
    // decay: 0.5,
    // sustain: 0,
    // release: .35
};

const synthInput = document.querySelector("#synth-input");
const oscillatorInput = document.querySelector("#oscillator-input");
const playButton = document.querySelector("#play-button");

let toneJSStarted = false;
let synth;
let oscillator = oscillatorInput.value;
let part;
let currentProgression;


async function playProgression()
{
    if (part)
        part.clear();

    part = new Tone.Part((time, note) =>
    {
        synth.triggerAttackRelease(note, NOTE_DURATION, time);
    }, currentProgression);

    part.start(0)
    Tone.Transport.start();
}


async function setSynth(synthClass)
{
    synth = new Tone.PolySynth(synthClass, NUM_VOICES).toDestination();

    synth.set({
        oscillator: {
            type: oscillator
        },
        envelope: SYNTH_ENVELOPE
    });
}


synthInput.addEventListener("input", async el =>
{
    const option = el.target.value;
    const optionClass = SYNTH_INPUT_MAP[option];

    if (synth && synth.name === option)
        return;

    await setSynth(optionClass);
});


oscillatorInput.addEventListener("input", async el =>
{
    oscillator = el.target.value;
    await setSynth(SYNTH_INPUT_MAP[synth.name]);
});


async function setupIfNeeded()
{
    if (!currentProgression)
        return;

    if (!toneJSStarted)
    {
        await Tone.start();
        toneJSStarted = true;
    }

    if (!synth)
    {
        const synthClass = SYNTH_INPUT_MAP[synthInput.value];
        await setSynth(synthClass);
    }
}


playButton.addEventListener("click", async () =>
{
    await setupIfNeeded();

    Tone.Transport.stop();
    Tone.Transport.clear();
    // Tone.Transport.bpm.value = BPM;

    await playProgression(currentProgression);
});