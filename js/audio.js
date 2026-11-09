// Web Audio API engine for Hanukkah songs and sound effects.
// Completely self-contained, no external network or file dependencies!

class HanukkahAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.currentSongIndex = 0;
    this.musicTimeout = null;
    this.musicVolume = 0.35;
    this.sfxVolume = 0.5;
    this.isMuted = false;

    // Classic Hanukkah melodies (note frequencies and durations in beats)
    // Notes: C4=261.6, D4=293.7, E4=329.6, F4=349.2, G4=392.0, A4=440.0, B4=493.9, C5=523.3, D5=587.3, E5=659.3
    const N = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16, B4: 493.88,
      C5: 523.25, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00,
      REST: 0
    };

    this.songs = [
      {
        id: 'sevivon',
        title: 'סְבִיבוֹן סֹב סֹב סֹב',
        tempo: 140,
        notes: [
          // סְ-בִי-בוֹן סֹב סֹב סֹב
          { f: N.G4, d: 1 }, { f: N.G4, d: 1 }, { f: N.A4, d: 1 }, { f: N.A4, d: 1 },
          { f: N.G4, d: 1 }, { f: N.G4, d: 1 }, { f: N.E4, d: 2 },
          // חֲ-נֻכָּה הוּא חַג טוֹב
          { f: N.G4, d: 1 }, { f: N.G4, d: 1 }, { f: N.A4, d: 1 }, { f: N.A4, d: 1 },
          { f: N.G4, d: 1 }, { f: N.G4, d: 1 }, { f: N.E4, d: 2 },
          // סְ-בִי-בוֹן סֹב סֹב סֹב
          { f: N.G4, d: 1 }, { f: N.G4, d: 1 }, { f: N.C5, d: 1 }, { f: N.C5, d: 1 },
          { f: N.B4, d: 1 }, { f: N.A4, d: 1 }, { f: N.G4, d: 2 },
          // חַג שִׂמְחָה הוּא לַ-עָם
          { f: N.F4, d: 1 }, { f: N.F4, d: 1 }, { f: N.A4, d: 1 }, { f: N.A4, d: 1 },
          { f: N.G4, d: 1 }, { f: N.F4, d: 1 }, { f: N.E4, d: 2 },
          // נֵס גָּדוֹל הָיָה שָׁם
          { f: N.D4, d: 1 }, { f: N.D4, d: 1 }, { f: N.G4, d: 1 }, { f: N.G4, d: 1 },
          { f: N.E4, d: 1 }, { f: N.D4, d: 1 }, { f: N.C4, d: 3 },
          { f: N.REST, d: 1 }
        ]
      },
      {
        id: 'nerli',
        title: 'נֵר לִי, נֵר לִי, נֵר לִי דַּקִיק',
        tempo: 130,
        notes: [
          // נֵר לִי נֵר לִי נֵר לִי דַּקִיק
          { f: N.C4, d: 1 }, { f: N.E4, d: 1 }, { f: N.G4, d: 2 },
          { f: N.C4, d: 1 }, { f: N.E4, d: 1 }, { f: N.G4, d: 2 },
          { f: N.A4, d: 1 }, { f: N.A4, d: 1 }, { f: N.G4, d: 1 }, { f: N.E4, d: 1 },
          { f: N.D4, d: 1 }, { f: N.D4, d: 1 }, { f: N.C4, d: 2 },
          // בַּחֲנֻכָּה נֵרִי אַדְלִיק
          { f: N.E4, d: 1 }, { f: N.E4, d: 1 }, { f: N.G4, d: 2 },
          { f: N.E4, d: 1 }, { f: N.E4, d: 1 }, { f: N.G4, d: 2 },
          { f: N.A4, d: 1 }, { f: N.A4, d: 1 }, { f: N.G4, d: 1 }, { f: N.E4, d: 1 },
          { f: N.D4, d: 1 }, { f: N.D4, d: 1 }, { f: N.C4, d: 3 },
          { f: N.REST, d: 1 }
        ]
      },
      {
        id: 'banuchoshech',
        title: 'בָּאנוּ חֹשֶׁךְ לְגָרֵשׁ',
        tempo: 125,
        notes: [
          // בָּא-נוּ חֹ-שֶׁךְ לְ-גָ-רֵשׁ
          { f: N.D4, d: 1 }, { f: N.D4, d: 1 }, { f: N.G4, d: 1 }, { f: N.G4, d: 1 },
          { f: N.F4, d: 1 }, { f: N.E4, d: 1 }, { f: N.D4, d: 2 },
          // בְּיָדֵינוּ אוֹר וָאֵשׁ
          { f: N.D4, d: 1 }, { f: N.D4, d: 1 }, { f: N.G4, d: 1 }, { f: N.G4, d: 1 },
          { f: N.F4, d: 1 }, { f: N.E4, d: 1 }, { f: N.D4, d: 2 },
          // כָּל אֶחָד הוּא אוֹר קָטָן
          { f: N.G4, d: 1 }, { f: N.G4, d: 1 }, { f: N.B4, d: 1 }, { f: N.B4, d: 1 },
          { f: N.A4, d: 1 }, { f: N.G4, d: 1 }, { f: N.A4, d: 2 },
          // וְכֻלָּנוּ אוֹר אֵיתָן
          { f: N.B4, d: 1 }, { f: N.B4, d: 1 }, { f: N.C5, d: 1 }, { f: N.B4, d: 1 },
          { f: N.A4, d: 1 }, { f: N.G4, d: 1 }, { f: N.G4, d: 3 },
          { f: N.REST, d: 1 }
        ]
      },
      {
        id: 'yemeihanukkah',
        title: 'יְמֵי הַחֲנֻכָּה',
        tempo: 135,
        notes: [
          // יְ-מֵי הַ-חֲ-נֻ-כָּה חֲ-נֻכַּת מִקְדָּשֵׁנוּ
          { f: N.C4, d: 1 }, { f: N.C4, d: 1 }, { f: N.E4, d: 1 }, { f: N.G4, d: 1 },
          { f: N.C5, d: 2 }, { f: N.G4, d: 2 },
          { f: N.A4, d: 1 }, { f: N.B4, d: 1 }, { f: N.C5, d: 1 }, { f: N.A4, d: 1 },
          { f: N.G4, d: 3 }, { f: N.REST, d: 1 },
          // בְּגִיל וּבְשִׂמְחָה מְמַלְּאִים אֶת לִבֵּנוּ
          { f: N.F4, d: 1 }, { f: N.G4, d: 1 }, { f: N.A4, d: 1 }, { f: N.F4, d: 1 },
          { f: N.E4, d: 1 }, { f: N.F4, d: 1 }, { f: N.G4, d: 2 },
          { f: N.D4, d: 1 }, { f: N.E4, d: 1 }, { f: N.F4, d: 1 }, { f: N.D4, d: 1 },
          { f: N.C4, d: 3 }, { f: N.REST, d: 1 }
        ]
      },
      {
        id: 'miyemalel',
        title: 'מִי יְמַלֵּל גְּבוּרוֹת יִשְׂרָאֵל',
        tempo: 130,
        notes: [
          // מִי יְ-מַ-לֵּל גְּבוּ-רוֹת יִשְׂרָאֵל
          { f: N.G4, d: 1.5 }, { f: N.C5, d: 1 }, { f: N.B4, d: 1 }, { f: N.C5, d: 1 },
          { f: N.D5, d: 2 }, { f: N.G4, d: 2 },
          { f: N.F4, d: 1 }, { f: N.G4, d: 1 }, { f: N.A4, d: 1 }, { f: N.B4, d: 1 },
          { f: N.C5, d: 3 }, { f: N.REST, d: 1 }
        ]
      }
    ];
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play charming music box/glockenspiel note
  playTone(freq, time, duration, gainValue = 0.2) {
    if (!this.ctx || freq <= 0 || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    // Pleasant marimba / music box timbre
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, time);

    const actualGain = gainValue * this.musicVolume;
    gainNode.gain.setValueAtTime(0.001, time);
    gainNode.gain.exponentialRampToValueAtTime(actualGain, time + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + duration);
    osc2.stop(time + duration);
  }

  // Background Hanukkah song player loop
  startSong(index = 0) {
    this.ensureContext();
    this.stopMusic();
    this.isPlayingMusic = true;
    this.currentSongIndex = index % this.songs.length;

    const song = this.songs[this.currentSongIndex];
    const beatSeconds = 60 / song.tempo;
    let scheduledTime = this.ctx.currentTime + 0.1;

    song.notes.forEach((note) => {
      const noteDuration = note.d * beatSeconds;
      if (note.f > 0) {
        this.playTone(note.f, scheduledTime, noteDuration * 0.9);
      }
      scheduledTime += noteDuration;
    });

    const totalSongDuration = (scheduledTime - this.ctx.currentTime) * 1000;
    this.musicTimeout = setTimeout(() => {
      if (this.isPlayingMusic) {
        // Loop to next song
        this.startSong((this.currentSongIndex + 1) % this.songs.length);
      }
    }, totalSongDuration + 800);
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startSong(this.currentSongIndex);
      return true;
    }
  }

  nextSong() {
    this.startSong((this.currentSongIndex + 1) % this.songs.length);
  }

  getCurrentSongTitle() {
    return this.songs[this.currentSongIndex].title;
  }

  // SFX: Clapping & Cheering (synthetic audience applause for kids)
  playClapping() {
    this.ensureContext();
    if (this.isMuted) return;

    const duration = 2.4;
    const now = this.ctx.currentTime;
    const clapCount = 28;

    for (let i = 0; i < clapCount; i++) {
      const clapTime = now + (i * 0.08) + (Math.random() * 0.04);
      this.createSingleClap(clapTime);
    }

    // Play triumphant fanfare alongside claps
    this.playFanfare(now);
  }

  createSingleClap(time) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000 + Math.random() * 500, time);
    filter.Q.setValueAtTime(1.8, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.sfxVolume * 0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
    noise.stop(time + 0.06);
  }

  // SFX: Joyful victory chime
  playFanfare(time = null) {
    this.ensureContext();
    if (this.isMuted) return;
    const start = time || this.ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start + idx * 0.09);

      gain.gain.setValueAtTime(0.001, start + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(this.sfxVolume * 0.4, start + idx * 0.09 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + idx * 0.09 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start + idx * 0.09);
      osc.stop(start + idx * 0.09 + 0.65);
    });
  }

  // SFX: Gentle "try again" sound (encouraging, soft, non-punitive!)
  playTryAgain() {
    this.ensureContext();
    if (this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [392.00, 329.63]; // G4 down to E4 - soft gentle reminder
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.16);

      gain.gain.setValueAtTime(0.001, now + idx * 0.16);
      gain.gain.linearRampToValueAtTime(this.sfxVolume * 0.25, now + idx * 0.16 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.16 + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.16);
      osc.stop(now + idx * 0.16 + 0.3);
    });
  }

  // SFX: Button Pop
  playPop() {
    this.ensureContext();
    if (this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);

    gain.gain.setValueAtTime(this.sfxVolume * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }
}

window.hanukkahAudio = new HanukkahAudioEngine();
