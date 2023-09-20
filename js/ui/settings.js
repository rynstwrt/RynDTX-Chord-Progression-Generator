volumeInput.addEventListener("input", () =>
{
    synth.set({"volume": volumeInput.value});
});


synthInput.addEventListener("input", async () =>
{
    if (synth && synth.name === synthInput.value)
        return;

    await setSynth(SYNTH_INPUT_MAP[synthInput.value]);
});


oscillatorInput.addEventListener("input", async () =>
{
    await setSynth(SYNTH_INPUT_MAP[synth.name]);
});


speedInput.addEventListener("input", () =>
{
    Tone.Transport.bpm.value = speedInput.value;
});