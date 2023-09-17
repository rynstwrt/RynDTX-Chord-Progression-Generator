class ChordGenerator
{
    MAJORPATTERN = [1, 0, 0, 1, 1, 0, 2]; // 0 is minor, 1 is major, 2 is dim
    MINORPATTERN = [0, 2, 1, 0, 0, 1, 1];

    // create constants for each major scale
    MAJORSCALES = {
        "C": ["C", "D", "E", "F", "G", "A", "B"],
        "D": ["D", "E", "F#", "G", "A", "B", "C#"],
        "E": ["E", "F#", "G#", "A", "B", "C#", "D#"],
        "F": ["F", "G", "A", "A#", "C", "D", "E"],
        "G": ["G", "A", "B", "C", "D", "E", "F#"],
        "A": ["A", "B", "C#", "D", "E", "F#", "G#"],
        "B": ["B", "C#", "D#", "E", "F#", "G#", "A#"],
        "C#": ["C#", "D#", "F", "F#", "G#", "A#", "C"],
        "D#": ["D#", "F", "G", "G#", "A#", "C", "D"],
        "F#": ["F#", "G#", "A#", "B", "C#", "D#", "F"],
        "G#": ["G#", "A#", "C", "C#", "D#", "F", "G"],
        "A#": ["A#", "C", "D", "D#", "F", "G", "A"]
    };

    // create constants for each minor scale
    MINORSCALES = {
        "Cm": ["C", "D", "D#", "F", "G", "G#", "A#"],
        "Dm": ["D", "E", "F", "G", "A", "A#", "C"],
        "Em": ["E", "F#", "G", "A", "B", "C", "D"],
        "Fm": ["F", "G", "G#", "A#", "C", "C#", "D#"],
        "Gm": ["G", "A", "A#", "C", "D", "D#", "F"],
        "Am": ["A", "B", "C", "D", "E", "F", "G"],
        "Bm": ["B", "C#", "D", "E", "F#", "G", "A"],
        "C#m": ["C#", "D#", "E", "F#", "G#", "A", "B"],
        "D#m": ["D#", "F", "F#", "G#", "A#", "B", "C#"],
        "F#m": ["F#", "G#", "A", "B", "C#", "D", "E"],
        "G#m": ["G#", "A#", "B", "C#", "D#", "E", "F#"],
        "A#m": ["A#", "C", "C#", "D#", "F", "F#", "G#"]
    };

    CHORDS = {
        "C": ["C", "E", "G"],
        "D": ["D", "F#", "A"],
        "E": ["E", "G#", "B"],
        "F": ["F", "A", "C"],
        "G": ["G", "B", "D"],
        "A": ["A", "B#", "E"],
        "B": ["B", "D#", "F#"],
        "C#": ["C#", "F", "G#"],
        "D#": ["D#", "G", "A#"],
        "F#": ["F#", "A#", "C#"],
        "G#": ["G#", "C", "D#"],
        "A#": ["A#", "D", "F"],
        "Cm": ["C", "D#", "G"],
        "Dm": ["D", "F", "A"],
        "Em": ["E", "G", "B"],
        "Fm": ["F", "G#", "C"],
        "Gm": ["G", "A#", "D"],
        "Am": ["A", "C", "E"],
        "Bm": ["B", "D", "F#"],
        "C#m": ["C#", "E", "G#"],
        "D#m": ["D#", "F#", "A#"],
        "F#m": ["F#", "A", "C#"],
        "G#m": ["G#", "B", "D#"],
        "A#m": ["A#", "C#", "F"],
        "Cdim": ["C", "D#", "F#"],
        "Ddim": ["D", "F", "G#"],
        "Edim": ["E", "G", "A#"],
        "Fdim": ["F", "G#", "B"],
        "Gdim": ["G", "A#", "C#"],
        "Adim": ["A", "C", "D#"],
        "Bdim": ["B", "D", "F"],
        "C#dim": ["C#", "E", "G"],
        "D#dim": ["D#", "F#", "A"],
        "F#dim": ["F#", "A", "C"],
        "G#dim": ["G#", "B", "D"],
        "A#dim": ["A#", "C#", "E"]
    }

    // get scale for that key
    // start on 1
    // pick random chord between 1 and 7
    // pick random chord between 1 and 7
    // end on 4 or 5
    makeProgression(isMajor, key)
    {
        let scale;
        if (key == "Random")
        {
            if (isMajor) scale = this.MAJORSCALES[Object.keys(this.MAJORSCALES)[Math.floor(Math.random() * Object.keys(this.MAJORSCALES).length)]];
            else scale = this.MINORSCALES[Object.keys(this.MINORSCALES)[Math.floor(Math.random() * Object.keys(this.MINORSCALES).length)]];
        }
        else
        {
            if (isMajor) scale = this.MAJORSCALES[key];
            else scale = this.MINORSCALES[key];
        }

        const indexes = [];
        indexes.push(0);
        indexes.push(Math.floor(Math.random() * 6));
        indexes.push(Math.floor(Math.random() * 6));
        indexes.push(Math.random() > .5 ? 3 : 4);

        const progression = [];

        for (let i = 0; i < indexes.length; ++i)
        {
            const index = indexes[i];
            const note = scale[index];
            const type = (isMajor) ? this.MAJORPATTERN[index] : this.MINORPATTERN[index];

            switch (type)
            {
                case 0:
                    progression.push(note + "m");
                    break;
                case 1:
                    progression.push(note);
                    break;
                case 2:
                    progression.push(note + "dim");
                    break;
            }
        }

        return progression;
    }

    // get [C, G, C, G] and turn it into [[c4 e4 g4], [g4 b4 d4], [c4 e4 g4], [g4 b4 d4]].
    convertProgressionToSynthChords(progression)
    {
        const synthProgression = [];
        for (let noteIndex in progression)
        {
            const chord = this.CHORDS[progression[noteIndex]];
            const newChord = [];

            for (let noteIndex2 in chord)
            {
                newChord.push(chord[noteIndex2] + "4");
            }

            synthProgression.push(newChord);
        }

        return synthProgression;
    }

    isNoteMajor(note)
    {
        return (note != "Random" && note.substr(note.length - 1) != "m");
    }

    convertMajorToMinor(note)
    {
        return note + "m";
    }

    convertMinorToMajor(note)
    {
        return note.substr(0, note.length - 1);
    }

}
