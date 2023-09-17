// Set Variables
const KEYS = ["Random", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const GENERATOR = new ChordGenerator();
const SYNTH = new Tone.PolySynth(Tone.Synth).toDestination();
let lastProgression;

async function playTones(progression)
{
	for (let i = 0; i < progression.length; ++i)
	{
		SYNTH.triggerAttackRelease(progression[i], "4n", Tone.now() + Tone.Time("4n").toSeconds() * i);
	}
}

// Generate on click
$("#generatebutton").click(() =>
{
	// get values
	const isMajor = $("#majorminorrange").val() == 0;
	const key = $("#keyoutput").text();

	// get progression and set last progression
	const progression = GENERATOR.makeProgression(isMajor, key);
	lastProgression = GENERATOR.convertProgressionToSynthChords(progression);

	// set text
	$("#screen h1").text(progression.join(" "));

	// play tones
	playTones(lastProgression);
});

// Replay on click
$("#replaybutton").click(() =>
{
	if (lastProgression) playTones(lastProgression);
});

// Set text of label for majorminorrange slider on change
$("#majorminorrange").on("input", () =>
{
	const value = ($("#majorminorrange").val() == 0) ? "Major" : "Minor";
	$("#majorminoroutput").text(value);

	// if major, convert to minor if not already.
	// if minor, convert to major if not already.
	const note = $("#keyoutput").text();
	if (value == "Major" && !GENERATOR.isNoteMajor(note))
	{
		$("#keyoutput").text(GENERATOR.convertMinorToMajor(note));
	}
	else if (value == "Minor" && GENERATOR.isNoteMajor(note))
	{
		$("#keyoutput").text(GENERATOR.convertMajorToMinor(note));
	}
});

// Set text of label for key slider on change
$("#keyrange").on("input", () =>
{
	const isMajor = $("#majorminorrange").val() == 0;
	$("#keyoutput").text(KEYS[$("#keyrange").val()] + (isMajor ? "" : "m"));
});
