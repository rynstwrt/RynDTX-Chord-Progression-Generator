volumeInput.addEventListener("input", () =>
{
    if (synth)
        synth.set({"volume": volumeInput.value});
});


synthInput.addEventListener("input", async () =>
{
    if (synth && synth.name === synthInput.value)
        return;

    await setSynth();
});


oscillatorInput.addEventListener("input", async () =>
{
    await setSynth();
});


speedInput.addEventListener("input", () =>
{
    Tone.Transport.bpm.value = speedInput.value;
});