const NUM_VOICES = 1;
const SYNTH_INPUT_MAP = {
    "PolySynth": Tone.Synth,
    "FMSynth": Tone.FMSynth,
    "AMSynth": Tone.AMSynth,
    "MetalSynth": Tone.MetalSynth
};
const SYNTH_ENVELOPE = {
    // attack: .005,
    // decay: .4,
    // sustain: 0,
    // release: .5
    attack: .005,
    // release: .3
};

const playButton = document.querySelector("#play-button");
const synthInput = document.querySelector("#synth-input");
const oscillatorInput = document.querySelector("#oscillator-input");
const volumeInput = document.querySelector("#volume-input");
const speedInput = document.querySelector("#speed-input");
const noteDurationInput = document.querySelector("#note-duration-input");

const reverb = (new Tone.Reverb(10)).toDestination();

let synth;
let part;
let currentProgression;


async function playProgression()
{
    if (!(await Tone.loaded()))
    {
        await Tone.start();
        Tone.Transport.bpm.value = speedInput.value;
        await setSynth();
    }

    if (part)
        part.clear();

    part = new Tone.Part((time, note) =>
    {
        synth.triggerAttackRelease(note, noteDurationInput.value, time);
    }, currentProgression);

    part.start(0)
    Tone.Transport.start();
}


async function setSynth()
{
    if (synth)
        synth.dispose();

    synth = new Tone.PolySynth(SYNTH_INPUT_MAP[synthInput.value], NUM_VOICES).toDestination();

    synth.set({
        oscillator: {
            type: oscillatorInput.value
        },
        envelope: SYNTH_ENVELOPE,
        volume: volumeInput.value
    });
}


playButton.addEventListener("click", async () =>
{
    if (!currentProgression)
        return;

    resetTransport();
    await playProgression(currentProgression);
});


function resetTransport()
{
    Tone.Transport.stop();
    Tone.Transport.clear();
    Tone.Transport.bpm.value = speedInput.value;
}


(async function()
{
    // await Tone.start();
    // await setSynth(SYNTH_INPUT_MAP[synthInput.value]);
    // Tone.Transport.bpm.value = speedInput.value;
})();