// Main Application Controller for Hanukkah Grade 2 Web App
// Built for "הוראה בהנעה, משולחנה של המורה זינובי אינה"

class HanukkahApp {
  constructor() {
    this.totalSuccesses = this.loadScore();
    this.currentTab = 'symbolsGallery';
    this.visitedSymbols = new Set();
    this.stageIndices = {
      prefixComplete: 0,
      oddOneOut: 0,
      sentenceComplete: 0,
      scrambledWords: 0,
      sentenceMatchPicture: 0,
      logicalSequence: 0,
      trueOrFalse: 0,
      wordSearches: 0,
      puzzles: 0
    };
    this.solvedWordSearches = new Set();
    this.solvedPuzzles = new Set();

    // Active state per game
    this.matchRoundIndex = 0;
    this.matchSelected = null;
    this.matchedPairsIds = new Set();

    this.scrambledUserSlots = [];
    this.scrambledUsedIndices = new Set();

    this.sequenceSelections = {};

    this.wsSelectedCells = new Set();
    this.wsFoundOccurrences = new Set();
    this.wsCountAnswered = false;

    this.puzzleGridSize = 9; // 9 (3x3) or 12 (4x3)
    this.puzzleTiles = [];
    this.puzzleSelectedTileIdx = null;
    this.puzzleShowNumbers = true;
    this.puzzleShowHint = false;

    this.memoryCards = [];
    this.memoryFlippedIndices = [];
    this.memoryMatchedPairIds = new Set();
    this.memoryLocked = false;

    this.nextActionCallback = null;

    this.init();
  }

  init() {
    this.updateScoreUI();
    this.bindHeaderControls();
    this.bindNavTabs();
    this.renderCurrentActivity();
  }

  loadScore() {
    try {
      const saved = localStorage.getItem('ina_hanukkah_score');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  }

  saveScore() {
    try {
      localStorage.setItem('ina_hanukkah_score', String(this.totalSuccesses));
    } catch {
      // Ignore storage restrictions
    }
  }

  addSuccess(points = 1) {
    this.totalSuccesses += points;
    this.saveScore();
    this.updateScoreUI(true);
  }

  updateScoreUI(animate = false) {
    const scoreEl = document.getElementById('total-score-count');
    const badgeEl = document.getElementById('score-badge');
    if (scoreEl) scoreEl.textContent = this.totalSuccesses;
    if (animate && badgeEl) {
      badgeEl.classList.remove('pop');
      void badgeEl.offsetWidth;
      badgeEl.classList.add('pop');
      setTimeout(() => badgeEl.classList.remove('pop'), 350);
    }
  }

  bindHeaderControls() {
    const playPauseBtn = document.getElementById('music-play-btn');
    const nextSongBtn = document.getElementById('music-next-btn');
    const muteBtn = document.getElementById('music-mute-btn');
    const songTitleEl = document.getElementById('current-song-name');

    const updateSongLabel = () => {
      if (songTitleEl) {
        songTitleEl.textContent = window.hanukkahAudio.getCurrentSongTitle();
      }
    };
    updateSongLabel();

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        const playing = window.hanukkahAudio.toggleMusic();
        playPauseBtn.textContent = playing ? '⏸️' : '▶️';
        playPauseBtn.setAttribute('aria-label', playing ? 'עֲצֹר שִׁיר' : 'נַגֵּן שִׁיר');
        updateSongLabel();
      });
    }

    if (nextSongBtn) {
      nextSongBtn.addEventListener('click', () => {
        window.hanukkahAudio.nextSong();
        if (playPauseBtn) playPauseBtn.textContent = '⏸️';
        updateSongLabel();
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        window.hanukkahAudio.isMuted = !window.hanukkahAudio.isMuted;
        muteBtn.textContent = window.hanukkahAudio.isMuted ? '🔇' : '🔊';
        if (window.hanukkahAudio.isMuted && window.hanukkahAudio.isPlayingMusic) {
          window.hanukkahAudio.stopMusic();
          if (playPauseBtn) playPauseBtn.textContent = '▶️';
        }
      });
    }

    const closeModalBtn = document.getElementById('celebration-next-btn');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        this.hideCelebrationModal();
        if (typeof this.nextActionCallback === 'function') {
          const cb = this.nextActionCallback;
          this.nextActionCallback = null;
          cb();
        }
      });
    }
  }

  bindNavTabs() {
    const buttons = document.querySelectorAll('.activity-tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        window.hanukkahAudio.playPop();
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.dataset.tab;
        this.resetTransientStatesForTab(this.currentTab);
        this.renderCurrentActivity();
      });
    });
  }

  resetTransientStatesForTab(tab) {
    if (tab === 'wordMatch') {
      this.matchRoundIndex = 0;
      this.matchSelected = null;
      this.matchedPairsIds = new Set();
    } else if (tab === 'scrambledWords') {
      this.initScrambledWordState();
    } else if (tab === 'logicalSequence') {
      this.sequenceSelections = {};
    } else if (tab === 'wordSearches') {
      this.initWordSearchState();
    } else if (tab === 'puzzles') {
      this.initPuzzleState();
    } else if (tab === 'memoryGame') {
      this.initMemoryState();
    }
  }

  // Celebration Modal (גביע, קונפטי ומחיאות כפיים)
  showStageCelebration(title, subtitle, buttonLabel = 'הַמְשִׁיכוּ לַשָּׁלָב הַבָּא ✨', onContinue = null) {
    const overlay = document.getElementById('celebration-modal');
    const titleEl = document.getElementById('celebration-title');
    const subEl = document.getElementById('celebration-subtitle');
    const trophyEl = document.getElementById('celebration-trophy-box');
    const btnEl = document.getElementById('celebration-next-btn');

    if (titleEl) titleEl.textContent = title;
    if (subEl) subEl.textContent = subtitle;
    if (trophyEl) trophyEl.innerHTML = window.SVG_ASSETS.trophy;
    if (btnEl) btnEl.textContent = buttonLabel;

    this.nextActionCallback = onContinue;

    if (overlay) {
      overlay.classList.add('active');
    }

    window.confettiLauncher.launch(160);
    setTimeout(() => window.confettiLauncher.launch(100), 400);
    window.hanukkahAudio.playClapping();
  }

  hideCelebrationModal() {
    const overlay = document.getElementById('celebration-modal');
    if (overlay) overlay.classList.remove('active');
  }

  showFeedback(el, type, message) {
    if (!el) return;
    el.className = `feedback-banner ${type}`;
    el.innerHTML = message;
  }

  clearFeedback(el) {
    if (!el) return;
    el.className = 'feedback-banner empty';
    el.innerHTML = '';
  }

  // Utility: Shuffle array copy
  shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  renderCurrentActivity() {
    const container = document.getElementById('activity-stage');
    if (!container) return;

    switch (this.currentTab) {
      case 'symbolsGallery':
        this.renderSymbolsGallery(container);
        break;
      case 'prefixComplete':
        this.renderPrefixComplete(container);
        break;
      case 'wordMatch':
        this.renderWordMatch(container);
        break;
      case 'oddOneOut':
        this.renderOddOneOut(container);
        break;
      case 'sentenceComplete':
        this.renderSentenceComplete(container);
        break;
      case 'scrambledWords':
        this.renderScrambledWords(container);
        break;
      case 'sentenceMatchPicture':
        this.renderSentenceMatchPicture(container);
        break;
      case 'logicalSequence':
        this.renderLogicalSequence(container);
        break;
      case 'trueOrFalse':
        this.renderTrueOrFalse(container);
        break;
      case 'wordSearches':
        this.renderWordSearches(container);
        break;
      case 'puzzles':
        this.renderPuzzles(container);
        break;
      case 'memoryGame':
        this.renderMemoryGame(container);
        break;
    }
  }

  // Switch to the next tab smoothly
  goToNextTab(nextTabId) {
    const targetBtn = document.querySelector(`.activity-tab-btn[data-tab="${nextTabId}"]`);
    if (targetBtn) {
      targetBtn.click();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // =========================================================================
  // 0. הכרת סמלי החג
  // =========================================================================
  renderSymbolsGallery(container) {
    const data = window.ACTIVITIES_DATA.symbolsGallery;
    let html = `
      <div class="activity-card">
        <div class="activity-header">
          <h2>🕯️ ${data.title}</h2>
          <p class="activity-instruction">${data.instruction}</p>
        </div>
        <div id="symbol-detail-box" class="symbol-detail-box" style="display:none;"></div>
        <div class="symbols-gallery-grid">
          ${data.symbols.map((sym, idx) => `
            <div class="symbol-card ${this.visitedSymbols.has(sym.id) ? 'visited' : ''}" data-sym-idx="${idx}">
              <div class="svg-container" style="margin:5px auto;">${window.SVG_ASSETS[sym.svg]}</div>
              <div class="symbol-card-title">${sym.name}</div>
              ${this.visitedSymbols.has(sym.id) ? '<span style="color:#2e7d32;font-weight:700;">✔️ נִלְמַד</span>' : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    container.innerHTML = html;

    const detailBox = document.getElementById('symbol-detail-box');
    container.querySelectorAll('.symbol-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.symIdx, 10);
        const sym = data.symbols[idx];
        window.hanukkahAudio.playPop();

        const isNew = !this.visitedSymbols.has(sym.id);
        this.visitedSymbols.add(sym.id);
        if (isNew) {
          this.addSuccess(1);
          card.classList.add('visited');
          if (!card.querySelector('span')) {
            const check = document.createElement('span');
            check.style.cssText = 'color:#2e7d32;font-weight:700;';
            check.textContent = '✔️ נִלְמַד';
            card.appendChild(check);
          }
        }

        detailBox.style.display = 'block';
        detailBox.innerHTML = `
          <div class="svg-container large">${window.SVG_ASSETS[sym.svg]}</div>
          <h3>${sym.name}</h3>
          <p>${sym.desc}</p>
        `;
        detailBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        if (isNew && this.visitedSymbols.size === data.symbols.length) {
          setTimeout(() => {
            this.showStageCelebration(
              'כָּל הַכָּבוֹד! 🌟',
              'הִכַּרְתֶּם אֶת כָּל 16 סַמְלֵי חַג הַחֲנֻכָּה!',
              'לַפְּעִילוּת הָרִאשׁוֹנָה ⬅️',
              () => this.goToNextTab('prefixComplete')
            );
          }, 800);
        }
      });
    });
  }

  // =========================================================================
  // 1. השלמת צרוף חסר בתחילת מילה
  // =========================================================================
  renderPrefixComplete(container) {
    const data = window.ACTIVITIES_DATA.prefixComplete;
    const idx = this.stageIndices.prefixComplete;
    const item = data.items[idx];
    const shuffledOptions = this.shuffle(item.options);

    container.innerHTML = `
      <div class="activity-card">
        <div class="activity-header">
          <h2>1. ${data.title}</h2>
          <p class="activity-instruction">${data.instruction}</p>
        </div>

        <div class="svg-container large">${window.SVG_ASSETS[item.svg]}</div>

        <div class="prefix-word-display">
          <span class="prefix-slot" id="prefix-slot-box">?</span>
          <span>${item.suffix}</span>
        </div>

        <div class="options-grid" style="max-width:500px;margin:20px auto;">
          ${shuffledOptions.map(opt => `
            <button class="option-btn" data-val="${opt}">${opt}</button>
          `).join('')}
        </div>

        <div id="stage-feedback" class="feedback-banner empty"></div>

        <div class="activity-pagination">
          <button class="action-nav-btn" id="prev-btn" ${idx === 0 ? 'disabled' : ''}>➡️ הַקּוֹדֵם</button>
          <span class="progress-text">שְׁאֵלָה ${idx + 1} מִתּוֹךְ ${data.items.length}</span>
          <button class="action-nav-btn" id="next-btn" style="visibility:hidden;">הַבָּא ⬅️</button>
        </div>
      </div>
    `;

    const slotBox = document.getElementById('prefix-slot-box');
    const feedback = document.getElementById('stage-feedback');
    const nextBtn = document.getElementById('next-btn');
    let solved = false;

    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (solved) return;
        const val = btn.dataset.val;
        if (val === item.correct) {
          solved = true;
          btn.classList.add('correct');
          slotBox.textContent = item.correct;
          slotBox.style.borderStyle = 'solid';
          slotBox.style.borderColor = '#2e7d32';
          slotBox.style.background = '#e8f5e9';
          slotBox.style.color = '#1b5e20';

          this.showFeedback(feedback, 'success', `מְצֻיָּן! הַמִּלָּה הִיא: <strong>${item.fullWord}</strong> ⭐`);
          this.addSuccess(1);
          window.hanukkahAudio.playFanfare();
          window.confettiLauncher.launch(50);

          if (idx === data.items.length - 1) {
            setTimeout(() => {
              this.showStageCelebration(
                'אַלּוּפִים! 🏆',
                'סִיַּמְתֶּם בְּהַצְלָחָה אֶת מְשִׂימַת הַשְׁלָמַת הַצֵּרוּפִים!',
                'לַמְּשִׂימָה הַבָּאָה ⬅️',
                () => {
                  this.stageIndices.prefixComplete = 0;
                  this.goToNextTab('wordMatch');
                }
              );
            }, 900);
          } else {
            nextBtn.style.visibility = 'visible';
          }
        } else {
          btn.classList.add('incorrect');
          window.hanukkahAudio.playTryAgain();
          this.showFeedback(feedback, 'try-again', 'לֹא נוֹרָא! נַסּוּ שׁוּב וּבִחְרוּ צֵרוּף אַחֵר כְּדֵי לְתַקֵּן 💪');
          setTimeout(() => btn.classList.remove('incorrect'), 600);
        }
      });
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
      if (this.stageIndices.prefixComplete > 0) {
        this.stageIndices.prefixComplete--;
        this.renderCurrentActivity();
      }
    });

    nextBtn.addEventListener('click', () => {
      this.stageIndices.prefixComplete++;
      this.renderCurrentActivity();
    });
  }

  // =========================================================================
  // 2. התאמת מילה לציור
  // =========================================================================
  renderWordMatch(container) {
    const data = window.ACTIVITIES_DATA.wordMatch;
    const roundPairs = data.rounds[this.matchRoundIndex];
    const shuffledPics = this.shuffle(roundPairs);
    const shuffledWords = this.shuffle(roundPairs);

    container.innerHTML = `
      <div class="activity-card">
        <div class="activity-header">
          <h2>2. ${data.title}</h2>
          <p class="activity-instruction">${data.instruction}</p>
          <p style="font-weight:700;color:#d81b60;margin-top:6px;">סֶבֶב ${this.matchRoundIndex + 1} מִתּוֹךְ ${data.rounds.length}</p>
        </div>

        <div class="match-columns-grid">
          <div class="match-column" style="display:flex;flex-direction:column;gap:12px;">
            ${shuffledPics.map(p => `
              <div class="match-item ${this.matchedPairsIds.has(p.id) ? 'matched' : ''}" data-type="pic" data-id="${p.id}">
                <div class="svg-container" style="margin:0;"><div style="width:90px;height:75px;">${window.SVG_ASSETS[p.svg]}</div></div>
              </div>
            `).join('')}
          </div>
          <div class="match-column" style="display:flex;flex-direction:column;gap:12px;">
            ${shuffledWords.map(w => `
              <div class="match-item ${this.matchedPairsIds.has(w.id) ? 'matched' : ''}" data-type="word" data-id="${w.id}">
                <span class="match-word-text">${w.word}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div id="stage-feedback" class="feedback-banner empty"></div>
      </div>
    `;

    const feedback = document.getElementById('stage-feedback');

    container.querySelectorAll('.match-item').forEach(el => {
      el.addEventListener('click', () => {
        if (el.classList.contains('matched')) return;
        const type = el.dataset.type;
        const id = el.dataset.id;

        if (!this.matchSelected) {
          window.hanukkahAudio.playPop();
          this.matchSelected = { type, id, el };
          el.classList.add('selected');
        } else if (this.matchSelected.type === type) {
          // Switching selection in the same column
          this.matchSelected.el.classList.remove('selected');
          window.hanukkahAudio.playPop();
          this.matchSelected = { type, id, el };
          el.classList.add('selected');
        } else {
          // Attempting match!
          const first = this.matchSelected;
          this.matchSelected = null;

          if (first.id === id) {
            first.el.classList.remove('selected');
            first.el.classList.add('matched');
            el.classList.add('matched');
            this.matchedPairsIds.add(id);

            this.addSuccess(1);
            window.hanukkahAudio.playFanfare();
            this.showFeedback(feedback, 'success', 'יֹפִי שֶׁל הַתְאָמָה! ⭐');

            if (this.matchedPairsIds.size === roundPairs.length) {
              if (this.matchRoundIndex < data.rounds.length - 1) {
                setTimeout(() => {
                  window.confettiLauncher.launch(70);
                  this.matchRoundIndex++;
                  this.matchedPairsIds = new Set();
                  this.renderCurrentActivity();
                }, 1000);
              } else {
                setTimeout(() => {
                  this.showStageCelebration(
                    'כָּל הַכָּבוֹד! 🏆',
                    'הִתְאַמְתֶּם אֶת כָּל הַמִּלִּים לַצִּיּוּרִים בְּהַצְלָחָה!',
                    'לַמְּשִׂימָה הַבָּאָה ⬅️',
                    () => {
                      this.matchRoundIndex = 0;
                      this.matchedPairsIds = new Set();
                      this.goToNextTab('oddOneOut');
                    }
                  );
                }, 800);
              }
            }
          } else {
            first.el.classList.remove('selected');
            first.el.classList.add('error-shake');
            el.classList.add('error-shake');
            window.hanukkahAudio.playTryAgain();
            this.showFeedback(feedback, 'try-again', 'זוֹ לֹא הַהַתְאָמָה הַנְּכוֹנָה. נַסּוּ שׁוּב לְהַתְאִים! 💪');
            setTimeout(() => {
              first.el.classList.remove('error-shake');
              el.classList.remove('error-shake');
            }, 600);
          }
        }
      });
    });
  }

  // =========================================================================
  // 3. מי יוצא דופן? (מתוך שלוש אפשרויות)
  // =========================================================================
  renderOddOneOut(container) {
    const data = window.ACTIVITIES_DATA.oddOneOut;
    const idx = this.stageIndices.oddOneOut;
    const item = data.items[idx];
    const shuffledOptions = this.shuffle(item.options);

    container.innerHTML = `
      <div class="activity-card">
        <div class="activity-header">
          <h2>3. ${data.title}</h2>
          <p class="activity-instruction">${data.instruction}</p>
        </div>

        <div class="odd-options-grid">
          ${shuffledOptions.map((opt, i) => `
            <div class="odd-card" data-is-odd="${opt.isOdd}" data-reason="${opt.reason || ''}">
              ${opt.svg
                ? `<div class="svg-container">${window.SVG_ASSETS[opt.svg]}</div>`
                : `<div class="odd-card-emoji">${opt.customEmoji}</div>`
              }
              <div class="odd-card-label">${opt.text}</div>
            </div>
          `).join('')}
        </div>

        <div id="stage-feedback" class="feedback-banner empty"></div>

        <div class="activity-pagination">
          <button class="action-nav-btn" id="prev-btn" ${idx === 0 ? 'disabled' : ''}>➡️ הַקּוֹדֵם</button>
          <span class="progress-text">שְׁאֵלָה ${idx + 1} מִתּוֹךְ ${data.items.length}</span>
          <button class="action-nav-btn" id="next-btn" style="visibility:hidden;">הַבָּא ⬅️</button>
        </div>
      </div>
    `;

    const feedback = document.getElementById('stage-feedback');
    const nextBtn = document.getElementById('next-btn');
    let solved = false;

    container.querySelectorAll('.odd-card').forEach(card => {
      card.addEventListener('click', () => {
        if (solved) return;
        const isOdd = card.dataset.isOdd === 'true';
        const reason = card.dataset.reason;

        if (isOdd) {
          solved = true;
          card.style.borderColor = '#22c55e';
          card.style.background = '#f0fdf4';
          card.style.transform = 'scale(1.06)';
          this.showFeedback(feedback, 'success', `נָכוֹן מְאֹד! ${reason} ⭐`);
          this.addSuccess(1);
          window.hanukkahAudio.playFanfare();
          window.confettiLauncher.launch(50);

          if (idx === data.items.length - 1) {
            setTimeout(() => {
              this.showStageCelebration(
                'חַשְׁבָנִים צְעִירִים! 🏆',
                'מְצָאתֶם אֶת כָּל יוֹצְאֵי הַדּוֹפֶן!',
                'לַמְּשִׂימָה הַבָּאָה ⬅️',
                () => {
                  this.stageIndices.oddOneOut = 0;
                  this.goToNextTab('sentenceComplete');
                }
              );
            }, 900);
          } else {
            nextBtn.style.visibility = 'visible';
          }
        } else {
          card.classList.add('error-shake');
          window.hanukkahAudio.playTryAgain();
          this.showFeedback(feedback, 'try-again', 'פָּרִיט זֶה דַּוְקָא שַׁיָּךְ לְחַג הַחֲנֻכָּה! חַפְּשׂוּ מִי יוֹצֵא דּוֹפֶן 💪');
          setTimeout(() => card.classList.remove('error-shake'), 600);
        }
      });
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
      if (this.stageIndices.oddOneOut > 0) {
        this.stageIndices.oddOneOut--;
        this.renderCurrentActivity();
      }
    });

    nextBtn.addEventListener('click', () => {
      this.stageIndices.oddOneOut++;
      this.renderCurrentActivity();
    });
  }

  // =========================================================================
  // 4. השלמת מילה חסרה במשפט (מתוך שלוש אפשרויות)
  // =========================================================================
  renderSentenceComplete(container) {
    const data = window.ACTIVITIES_DATA.sentenceComplete;
    const idx = this.stageIndices.sentenceComplete;
    const item = data.items[idx];
    const shuffledOptions = this.shuffle(item.options);
    const formattedSentence = item.sentence.replace('____', '<span class="sentence-blank-highlight" id="sentence-blank">____</span>');

    container.innerHTML = `
      <div class="activity-card">
        <div class="activity-header">
          <h2>4. ${data.title}</h2>
          <p class="activity-instruction">${data.instruction}</p>
        </div>

        <div class="svg-container">${window.SVG_ASSETS[item.svg]}</div>

        <div class="sentence-box">${formattedSentence}</div>

        <div class="options-grid" style="max-width:650px;margin:20px auto;">
          ${shuffledOptions.map(opt => `
            <button class="option-btn" data-val="${opt}" style="font-size:1.3rem;">${opt}</button>
          `).join('')}
        </div>

        <div id="stage-feedback" class="feedback-banner empty"></div>

        <div class="activity-pagination">
          <button class="action-nav-btn" id="prev-btn" ${idx === 0 ? 'disabled' : ''}>➡️ הַקּוֹדֵם</button>
          <span class="progress-text">מִשְׁפָּט ${idx + 1} מִתּוֹךְ ${data.items.length}</span>
          <button class="action-nav-btn" id="next-btn" style="visibility:hidden;">הַבָּא ⬅️</button>
        </div>
      </div>
    `;

    const blankEl = document.getElementById('sentence-blank');
    const feedback = document.getElementById('stage-feedback');
    const nextBtn = document.getElementById('next-btn');
    let solved = false;

    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (solved) return;
        const val = btn.dataset.val;
        if (val === item.correct) {
          solved = true;
          btn.classList.add('correct');
          blankEl.textContent = item.correct;
          blankEl.style.background = '#bbf7d0';
          blankEl.style.borderColor = '#16a34a';
          blankEl.style.color = '#14532d';

          this.showFeedback(feedback, 'success', 'כָּל הַכָּבוֹד! הִשְׁלַמְתֶּם אֶת הַמִּשְׁפָּט נָכוֹן! ⭐');
          this.addSuccess(1);
          window.hanukkahAudio.playFanfare();
          window.confettiLauncher.launch(50);

          if (idx === data.items.length - 1) {
            setTimeout(() => {
              this.showStageCelebration(
                'תּוֹתָחִים! 🏆',
                'הִשְׁלַמְתֶּם אֶת כָּל הַמִּשְׁפָּטִים לְחַג הַחֲנֻכָּה!',
                'לַמְּשִׂימָה הַבָּאָה ⬅️',
                () => {
                  this.stageIndices.sentenceComplete = 0;
                  this.goToNextTab('scrambledWords');
                }
              );
            }, 900);
          } else {
            nextBtn.style.visibility = 'visible';
          }
        } else {
          btn.classList.add('incorrect');
          window.hanukkahAudio.playTryAgain();
          this.showFeedback(feedback, 'try-again', 'זוֹ אֵינָהּ הַמִּלָּה הַמַּתְאִימָה. קִרְאוּ שׁוּב וְתַקְּנוּ! 💪');
          setTimeout(() => btn.classList.remove('incorrect'), 600);
        }
      });
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
      if (this.stageIndices.sentenceComplete > 0) {
        this.stageIndices.sentenceComplete--;
        this.renderCurrentActivity();
      }
    });

    nextBtn.addEventListener('click', () => {
      this.stageIndices.sentenceComplete++;
      this.renderCurrentActivity();
    });
  }

  // =========================================================================
  // 5. כותבים מילים לחנוכה (מילה מבולבלת כולל ציור תומך)
  // =========================================================================
  initScrambledWordState() {
    const idx = this.stageIndices.scrambledWords;
    const item = window.ACTIVITIES_DATA.scrambledWords.items[idx];
    this.scrambledUserSlots = new Array(item.target.length).fill(null);
    this.scrambledUsedIndices = new Set();
    this.scrambledShuffledLetters = this.shuffle(item.letters.map((l, i) => ({ char: l, id: i })));
  }

  renderScrambledWords(container) {
    const data = window.ACTIVITIES_DATA.scrambledWords;
    const idx = this.stageIndices.scrambledWords;
    const item = data.items[idx];
    if (!this.scrambledShuffledLetters || this.scrambledUserSlots.length !== item.target.length) {
      this.initScrambledWordState();
    }

    container.innerHTML = `
      <div class="activity-card">
        <div class="activity-header">
          <h2>5. ${data.title}</h2>
          <p class="activity-instruction">${data.instruction}</p>
        </div>

        <div class="svg-container large">${window.SVG_ASSETS[item.svg]}</div>

        <div class="word-target-slots" id="word-slots">
          ${this.scrambledUserSlots.map((slot, sIdx) => `
            <div class="target-slot" data-slot-idx="${sIdx}">
              ${slot ? slot.char : ''}
            </div>
          `).join('')}
        </div>

        <div class="letters-bank" id="letters-bank">
          ${this.scrambledShuffledLetters.map(lObj => `
            <button class="letter-tile ${this.scrambledUsedIndices.has(lObj.id) ? 'used' : ''}" data-lid="${lObj.id}" data-char="${lObj.char}">
              ${lObj.char}
            </button>
          `).join('')}
        </div>

        <div style="text-align:center;margin-top:12px;">
          <button class="action-nav-btn" id="clear-scrambled-btn" style="display:inline-flex;background:#94a3b8;box-shadow:none;">🔄 נַקֵּה וְתַקֵּן</button>
        </div>

        <div id="stage-feedback" class="feedback-banner empty"></div>

        <div class="activity-pagination">
          <button class="action-nav-btn" id="prev-btn" ${idx === 0 ? 'disabled' : ''}>➡️ הַקּוֹדֵם</button>
          <span class="progress-text">מִלָּה ${idx + 1} מִתּוֹךְ ${data.items.length}</span>
          <button class="action-nav-btn" id="next-btn" style="visibility:hidden;">הַבָּא ⬅️</button>
        </div>
      </div>
    `;

    const feedback = document.getElementById('stage-feedback');
    const nextBtn = document.getElementById('next-btn');
    let solved = false;

    const checkWordComplete = () => {
      if (this.scrambledUserSlots.every(s => s !== null)) {
        const built = this.scrambledUserSlots.map(s => s.char).join('');
        if (built === item.target) {
          solved = true;
          container.querySelectorAll('.target-slot').forEach(s => {
            s.style.background = '#dcfce7';
            s.style.borderColor = '#16a34a';
            s.style.color = '#14532d';
            s.style.borderStyle = 'solid';
          });
          this.showFeedback(feedback, 'success', `יֹפִי! כְּתַבְתֶּם נָכוֹן: <strong>${item.word}</strong> ⭐`);
          this.addSuccess(1);
          window.hanukkahAudio.playFanfare();
          window.confettiLauncher.launch(55);

          if (idx === data.items.length - 1) {
            setTimeout(() => {
              this.showStageCelebration(
                'סוֹפְרִים מְצֻיָּנִים! 🏆',
                'הִצְלַחְתֶּם לִכְתֹּב אֶת כָּל מִלֵּי הַחֲנֻכָּה!',
                'לַמְּשִׂימָה הַבָּאָה ⬅️',
                () => {
                  this.stageIndices.scrambledWords = 0;
                  this.goToNextTab('sentenceMatchPicture');
                }
              );
            }, 900);
          } else {
            nextBtn.style.visibility = 'visible';
          }
        } else {
          window.hanukkahAudio.playTryAgain();
          this.showFeedback(feedback, 'try-again', 'סֵדֶר הָאוֹתִיּוֹת אֵינוֹ נָכוֹן. לַחֲצוּ עַל אוֹת כְּדֵי לְהוֹצִיא אוֹתָהּ אוֹ לַחֲצוּ "נַקֵּה וְתַקֵּן" 💪');
        }
      }
    };

    container.querySelectorAll('.letter-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        if (solved) return;
        const lid = parseInt(tile.dataset.lid, 10);
        const char = tile.dataset.char;
        if (this.scrambledUsedIndices.has(lid)) return;

        const emptyIdx = this.scrambledUserSlots.findIndex(s => s === null);
        if (emptyIdx !== -1) {
          window.hanukkahAudio.playPop();
          this.scrambledUserSlots[emptyIdx] = { id: lid, char };
          this.scrambledUsedIndices.add(lid);
          this.renderScrambledWords(container);
        }
      });
    });

    container.querySelectorAll('.target-slot').forEach(slotEl => {
      slotEl.addEventListener('click', () => {
        if (solved) return;
        const sIdx = parseInt(slotEl.dataset.slotIdx, 10);
        const slot = this.scrambledUserSlots[sIdx];
        if (slot) {
          window.hanukkahAudio.playPop();
          this.scrambledUsedIndices.delete(slot.id);
          this.scrambledUserSlots[sIdx] = null;
          this.renderScrambledWords(container);
        }
      });
    });

    document.getElementById('clear-scrambled-btn').addEventListener('click', () => {
      if (solved) return;
      this.scrambledUserSlots.fill(null);
      this.scrambledUsedIndices.clear();
      this.renderScrambledWords(container);
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
      if (this.stageIndices.scrambledWords > 0) {
        this.stageIndices.scrambledWords--;
        this.initScrambledWordState();
        this.renderCurrentActivity();
      }
    });

    nextBtn.addEventListener('click', () => {
      this.stageIndices.scrambledWords++;
      this.initScrambledWordState();
      this.renderCurrentActivity();
    });

    // Run check on re-render if all slots are filled
    checkWordComplete();
  }

  // =========================================================================
  // 6. בחירת משפט מתאים לציור (מתוך שני משפטים)
  // =========================================================================
  renderSentenceMatchPicture(container) {
    const data = window.ACTIVITIES_DATA.sentenceMatchPicture;
    const idx = this.stageIndices.sentenceMatchPicture;
    const item = data.items[idx];
    const shuffledSentences = this.shuffle(item.sentences);

    container.innerHTML = `
      <div class="activity-card">
        <div class="activity-header">
          <h2>6. ${data.title}</h2>
          <p class="activity-instruction">${data.instruction}</p>
        </div>

        <div class="svg-container large">${window.SVG_ASSETS[item.svg]}</div>

        <div class="sentence-choices-list">
          ${shuffledSentences.map(s => `
            <div class="sentence-choice-card" data-correct="${s.correct}">
              <span>${s.text}</span>
              <span style="font-size:1.5rem;">👈</span>
            </div>
          `).join('')}
        </div>

        <div id="stage-feedback" class="feedback-banner empty"></div>

        <div class="activity-pagination">
          <button class="action-nav-btn" id="prev-btn" ${idx === 0 ? 'disabled' : ''}>➡️ הַקּוֹדֵם</button>
          <span class="progress-text">מְשִׂימָה ${idx + 1} מִתּוֹךְ ${data.items.length}</span>
          <button class="action-nav-btn" id="next-btn" style="visibility:hidden;">הַבָּא ⬅️</button>
        </div>
      </div>
    `;

    const feedback = document.getElementById('stage-feedback');
    const nextBtn = document.getElementById('next-btn');
    let solved = false;

    container.querySelectorAll('.sentence-choice-card').forEach(card => {
      card.addEventListener('click', () => {
        if (solved) return;
        const isCorrect = card.dataset.correct === 'true';
        if (isCorrect) {
          solved = true;
          card.classList.add('correct');
          this.showFeedback(feedback, 'success', 'כָּל הַכָּבוֹד! זֶה בְּדִיּוּק הַמִּשְׁפָּט הַמַּתְאִים לַצִּיּוּר! ⭐');
          this.addSuccess(1);
          window.hanukkahAudio.playFanfare();
          window.confettiLauncher.launch(50);

          if (idx === data.items.length - 1) {
            setTimeout(() => {
              this.showStageCelebration(
                'נֶהְדָּר! 🏆',
                'קְרָאתֶם וְהִתְאַמְתֶּם אֶת כָּל הַמִּשְׁפָּטִים לַצִּיּוּרִים!',
                'לַמְּשִׂימָה הַבָּאָה ⬅️',
                () => {
                  this.stageIndices.sentenceMatchPicture = 0;
                  this.goToNextTab('logicalSequence');
                }
              );
            }, 900);
          } else {
            nextBtn.style.visibility = 'visible';
          }
        } else {
          card.classList.add('incorrect');
          window.hanukkahAudio.playTryAgain();
          this.showFeedback(feedback, 'try-again', 'הַמִּשְׁפָּט הַזֶּה אֵינוֹ מְתָאֵר אֶת הַצִּיּוּר. בִּדְקוּ אֶת הַמִּשְׁפָּט הַשֵּׁנִי! 💪');
          setTimeout(() => card.classList.remove('incorrect'), 600);
        }
      });
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
      if (this.stageIndices.sentenceMatchPicture > 0) {
        this.stageIndices.sentenceMatchPicture--;
        this.renderCurrentActivity();
      }
    });

    nextBtn.addEventListener('click', () => {
      this.stageIndices.sentenceMatchPicture++;
      this.renderCurrentActivity();
    });
  }

  // =========================================================================
  // 7. מה קרה קודם? רצף הגיוני (1, 2, 3) עם ציור משותף
  // =========================================================================
  renderLogicalSequence(container) {
    const data = window.ACTIVITIES_DATA.logicalSequence;
    const idx = this.stageIndices.logicalSequence;
    const item = data.items[idx];

    if (!this.sequenceShuffledSentences || this.sequenceLastIdx !== idx) {
      this.sequenceLastIdx = idx;
      this.sequenceShuffledSentences = this.shuffle(item.sentences.map((s, i) => ({ ...s, uid: i })));
      this.sequenceSelections = {};
    }

    container.innerHTML = `
      <div class="activity-card">
        <div class="activity-header">
          <h2>7. ${data.title}</h2>
          <p class="activity-instruction">${data.instruction}</p>
          <h3 style="margin-top:8px;color:#0284c7;font-size:1.4rem;">${item.title}</h3>
        </div>

        <div class="svg-container large">${window.SVG_ASSETS[item.svg]}</div>

        <div class="sequence-items-list">
          ${this.sequenceShuffledSentences.map(s => `
            <div class="sequence-item-row" data-uid="${s.uid}" data-true-order="${s.order}">
              <div class="sequence-order-selector">
                ${[1, 2, 3].map(num => `
                  <button class="seq-num-btn ${this.sequenceSelections[s.uid] === num ? 'active' : ''}" data-uid="${s.uid}" data-num="${num}">${num}</button>
                `).join('')}
              </div>
              <div class="sequence-text">${s.text}</div>
            </div>
          `).join('')}
        </div>

        <div style="text-align:center;margin:20px 0;">
          <button class="celebration-btn" id="check-seq-btn" style="font-size:1.2rem;padding:12px 26px;">✔️ בְּדֹק אֶת הַסֵּדֶר</button>
        </div>

        <div id="stage-feedback" class="feedback-banner empty"></div>

        <div class="activity-pagination">
          <button class="action-nav-btn" id="prev-btn" ${idx === 0 ? 'disabled' : ''}>➡️ הַקּוֹדֵם</button>
          <span class="progress-text">סִפּוּר ${idx + 1} מִתּוֹךְ ${data.items.length}</span>
          <button class="action-nav-btn" id="next-btn" style="visibility:hidden;">הַבָּא ⬅️</button>
        </div>
      </div>
    `;

    const feedback = document.getElementById('stage-feedback');
    const nextBtn = document.getElementById('next-btn');
    let solved = false;

    container.querySelectorAll('.seq-num-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (solved) return;
        window.hanukkahAudio.playPop();
        const uid = parseInt(btn.dataset.uid, 10);
        const num = parseInt(btn.dataset.num, 10);

        // Clear same number from other rows so 1, 2, 3 stay unique
        Object.keys(this.sequenceSelections).forEach(k => {
          if (this.sequenceSelections[k] === num) {
            delete this.sequenceSelections[k];
          }
        });
        this.sequenceSelections[uid] = num;
        this.renderLogicalSequence(container);
      });
    });

    document.getElementById('check-seq-btn').addEventListener('click', () => {
      if (solved) return;
      const allChosen = this.sequenceShuffledSentences.every(s => this.sequenceSelections[s.uid] !== undefined);
      if (!allChosen) {
        window.hanukkahAudio.playTryAgain();
        this.showFeedback(feedback, 'try-again', 'סַמְּנוּ מִסְפָּר (1, 2 אוֹ 3) לְכָל שְׁלוֹשֶׁת הַמִּשְׁפָּטִים קֹדֶם! 💪');
        return;
      }

      const isAllRight = this.sequenceShuffledSentences.every(s => this.sequenceSelections[s.uid] === s.order);
      if (isAllRight) {
        solved = true;
        container.querySelectorAll('.sequence-item-row').forEach(r => {
          r.style.background = '#f0fdf4';
          r.style.borderColor = '#22c55e';
        });
        this.showFeedback(feedback, 'success', 'מְדֻיָּק! סִדַּרְתֶּם אֶת הָרֶצֶף הַהֶגְיוֹנִי מֵעֻלֶּה! ⭐');
        this.addSuccess(1);
        window.hanukkahAudio.playFanfare();
        window.confettiLauncher.launch(60);

        if (idx === data.items.length - 1) {
          setTimeout(() => {
            this.showStageCelebration(
              'חָכְמָה גְּדוֹלָה! 🏆',
              'הֵבַנְתֶּם וְסִדַּרְתֶּם אֶת כָּל סִפּוּרֵי הָרֶצֶף הַהֶגְיוֹנִי!',
              'לַמְּשִׂימָה הַבָּאָה ⬅️',
              () => {
                this.stageIndices.logicalSequence = 0;
                this.sequenceLastIdx = -1;
                this.goToNextTab('trueOrFalse');
              }
            );
          }, 900);
        } else {
          nextBtn.style.visibility = 'visible';
        }
      } else {
        window.hanukkahAudio.playTryAgain();
        this.showFeedback(feedback, 'try-again', 'יֵשׁ טָעוּת קְטַנָּה בַּסֵּדֶר. חִשְׁבוּ מָה קָרָה רִאשׁוֹן וְתַקְּנוּ אֶת הַמִּסְפָּרִים! 💪');
      }
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
      if (this.stageIndices.logicalSequence > 0) {
        this.stageIndices.logicalSequence--;
        this.renderCurrentActivity();
      }
    });

    nextBtn.addEventListener('click', () => {
      this.stageIndices.logicalSequence++;
      this.renderCurrentActivity();
    });
  }

  // =========================================================================
  // 8. נכון או לא נכון (איזה משפט נכון מבין השניים? כולל ציור מלווה)
  // =========================================================================
  renderTrueOrFalse(container) {
    const data = window.ACTIVITIES_DATA.trueOrFalse;
    const idx = this.stageIndices.trueOrFalse;
    const item = data.items[idx];
    const shuffledSentences = this.shuffle(item.sentences);

    container.innerHTML = `
      <div class="activity-card">
        <div class="activity-header">
          <h2>8. ${data.title}</h2>
          <p class="activity-instruction">${data.instruction}</p>
        </div>

        <div class="svg-container large">${window.SVG_ASSETS[item.svg]}</div>

        <div class="sentence-choices-list">
          ${shuffledSentences.map(s => `
            <div class="sentence-choice-card" data-correct="${s.correct}">
              <span>${s.text}</span>
              <span style="font-size:1.5rem;">✔️</span>
            </div>
          `).join('')}
        </div>

        <div id="stage-feedback" class="feedback-banner empty"></div>

        <div class="activity-pagination">
          <button class="action-nav-btn" id="prev-btn" ${idx === 0 ? 'disabled' : ''}>➡️ הַקּוֹדֵם</button>
          <span class="progress-text">שְׁאֵלָה ${idx + 1} מִתּוֹךְ ${data.items.length}</span>
          <button class="action-nav-btn" id="next-btn" style="visibility:hidden;">הַבָּא ⬅️</button>
        </div>
      </div>
    `;

    const feedback = document.getElementById('stage-feedback');
    const nextBtn = document.getElementById('next-btn');
    let solved = false;

    container.querySelectorAll('.sentence-choice-card').forEach(card => {
      card.addEventListener('click', () => {
        if (solved) return;
        const isCorrect = card.dataset.correct === 'true';
        if (isCorrect) {
          solved = true;
          card.classList.add('correct');
          this.showFeedback(feedback, 'success', 'צוֹדְקִים בְּהֶחְלֵט! זֶהוּ הַמִּשְׁפָּט הַנָּכוֹן! ⭐');
          this.addSuccess(1);
          window.hanukkahAudio.playFanfare();
          window.confettiLauncher.launch(50);

          if (idx === data.items.length - 1) {
            setTimeout(() => {
              this.showStageCelebration(
                'מוּמְחֵי הַחַג! 🏆',
                'זִהִיתֶם אֶת כָּל הַמִּשְׁפָּטִים הַנְּכוֹנִים!',
                'לַמְּשִׂימָה הַבָּאָה ⬅️',
                () => {
                  this.stageIndices.trueOrFalse = 0;
                  this.goToNextTab('wordSearches');
                }
              );
            }, 900);
          } else {
            nextBtn.style.visibility = 'visible';
          }
        } else {
          card.classList.add('incorrect');
          window.hanukkahAudio.playTryAgain();
          this.showFeedback(feedback, 'try-again', 'מִשְׁפָּט זֶה אֵינוֹ נָכוֹן. בִּדְקוּ אֶת הַמִּשְׁפָּט הַשֵּׁנִי! 💪');
          setTimeout(() => card.classList.remove('incorrect'), 600);
        }
      });
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
      if (this.stageIndices.trueOrFalse > 0) {
        this.stageIndices.trueOrFalse--;
        this.renderCurrentActivity();
      }
    });

    nextBtn.addEventListener('click', () => {
      this.stageIndices.trueOrFalse++;
      this.renderCurrentActivity();
    });
  }

  // =========================================================================
  // 9. תפזורות קלות מאוד + ספירה כמה פעמים המילה מופיעה
  // =========================================================================
  initWordSearchState() {
    this.wsSelectedCells = new Set();
    this.wsFoundOccurrences = new Set();
    this.wsCountAnswered = false;
  }

  renderWordSearches(container) {
    const data = window.ACTIVITIES_DATA.wordSearches;
    const idx = this.stageIndices.wordSearches;
    const puzzle = data.puzzles[idx];

    const isAllFound = this.wsFoundOccurrences.size === puzzle.occurrences;

    // Build lookup of cell -> occurrence index
    const cellToOcc = {};
    puzzle.locations.forEach((loc, occIdx) => {
      loc.forEach(([r, c]) => {
        cellToOcc[`${r},${c}`] = occIdx;
      });
    });

    container.innerHTML = `
      <div class="activity-card">
        <div class="activity-header">
          <h2>9. ${data.title}</h2>
          <p class="activity-instruction">${data.instruction}</p>
        </div>

        <div class="puzzle-selector-tabs">
          ${data.puzzles.map((p, i) => `
            <button class="puzzle-tab-btn ${i === idx ? 'active' : ''}" data-ws-idx="${i}">
              ${p.word} ${this.solvedWordSearches.has(i) ? '✔️' : ''}
            </button>
          `).join('')}
        </div>

        <div class="wordsearch-container">
          <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;justify-content:center;">
            <div class="svg-container" style="margin:0;"><div style="width:100px;height:85px;">${window.SVG_ASSETS[puzzle.svg]}</div></div>
            <div class="ws-target-word-banner">
              מִלָּה לְחִפּוּשׂ: <span style="font-size:2rem;color:#d97706;">${puzzle.word}</span>
            </div>
          </div>

          <div class="ws-grid" style="grid-template-columns: repeat(${puzzle.gridSize.cols}, auto);">
            ${puzzle.grid.map((row, r) => row.map((letter, c) => {
              const key = `${r},${c}`;
              const occIdx = cellToOcc[key];
              const isFound = occIdx !== undefined && this.wsFoundOccurrences.has(occIdx);
              const isSelected = this.wsSelectedCells.has(key);
              return `
                <div class="ws-cell ${isFound ? 'found' : (isSelected ? 'selected' : '')}" data-r="${r}" data-c="${c}">
                  ${letter}
                </div>
              `;
            }).join('')).join('')}
          </div>

          <div class="ws-count-box" style="${!isAllFound ? 'opacity:0.65;' : 'border-color:#22c55e;background:#f0fdf4;'}">
            <p>${isAllFound ? 'מָצָאתֶם הַכֹּל! עַכְשָׁו עֲנוּ: ' : 'לְאַחַר שֶׁתִּמְצְאוּ בַּתַּפְזֹרֶת, סַמְּנוּ: '}כַּמָּה פְּעָמִים הַמִּלָּה <strong>"${puzzle.word}"</strong> מוֹפִיעָה בַּתַּפְזֹרֶת?</p>
            <div class="ws-count-btns">
              ${[1, 2, 3, 4].map(n => `
                <button class="ws-count-btn" data-count="${n}" ${!isAllFound || this.wsCountAnswered ? 'disabled' : ''}>${n}</button>
              `).join('')}
            </div>
          </div>
        </div>

        <div id="stage-feedback" class="feedback-banner empty"></div>
      </div>
    `;

    const feedback = document.getElementById('stage-feedback');

    container.querySelectorAll('.puzzle-tab-btn').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        window.hanukkahAudio.playPop();
        this.stageIndices.wordSearches = parseInt(tabBtn.dataset.wsIdx, 10);
        this.initWordSearchState();
        this.renderWordSearches(container);
      });
    });

    container.querySelectorAll('.ws-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        if (isAllFound) return;
        const r = parseInt(cell.dataset.r, 10);
        const c = parseInt(cell.dataset.c, 10);
        const key = `${r},${c}`;
        const occIdx = cellToOcc[key];

        if (occIdx !== undefined) {
          if (this.wsFoundOccurrences.has(occIdx)) return;

          if (this.wsSelectedCells.has(key)) {
            this.wsSelectedCells.delete(key);
          } else {
            this.wsSelectedCells.add(key);
          }
          window.hanukkahAudio.playPop();

          // Check if all letters of this occurrence are now selected
          const occCells = puzzle.locations[occIdx];
          const allSelected = occCells.every(([lr, lc]) => this.wsSelectedCells.has(`${lr},${lc}`));
          if (allSelected) {
            this.wsFoundOccurrences.add(occIdx);
            occCells.forEach(([lr, lc]) => this.wsSelectedCells.delete(`${lr},${lc}`));
            window.hanukkahAudio.playFanfare();
            this.renderWordSearches(container);
          } else {
            this.renderWordSearches(container);
          }
        } else {
          cell.classList.add('error-shake');
          window.hanukkahAudio.playTryAgain();
          this.showFeedback(feedback, 'try-again', 'אוֹת זוֹ אֵינָהּ חֵלֶק מֵהַמִּלָּה. חַפְּשׂוּ בְּמָקוֹם אַחֵר! 💪');
          setTimeout(() => cell.classList.remove('error-shake'), 500);
        }
      });
    });

    container.querySelectorAll('.ws-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!isAllFound || this.wsCountAnswered) return;
        const chosen = parseInt(btn.dataset.count, 10);
        if (chosen === puzzle.occurrences) {
          this.wsCountAnswered = true;
          btn.classList.add('selected');
          this.solvedWordSearches.add(idx);
          this.addSuccess(1);
          this.showFeedback(feedback, 'success', `מְצֻיָּן! הַמִּלָּה "${puzzle.word}" מוֹפִיעָה בַּתַּפְזֹרֶת ${puzzle.occurrences} פְּעָמִים! ⭐`);

          setTimeout(() => {
            if (idx < data.puzzles.length - 1) {
              this.showStageCelebration(
                'בַּלָּשִׁים צְעִירִים! 🏆',
                `מְצָאתֶם אֶת הַמִּלָּה "${puzzle.word}" וּסְפַרְתֶּם נָכוֹן!`,
                'לַתַּפְזֹרֶת הַבָּאָה ⬅️',
                () => {
                  this.stageIndices.wordSearches++;
                  this.initWordSearchState();
                  this.renderWordSearches(container);
                }
              );
            } else {
              this.showStageCelebration(
                'כָּל הַכָּבוֹד! 🏆',
                'פְּתַרְתֶּם אֶת כָּל הַתַּפְזוֹרוֹת בְּהַצְלָחָה!',
                'לַפָּאזְלִים ⬅️',
                () => {
                  this.stageIndices.wordSearches = 0;
                  this.initWordSearchState();
                  this.goToNextTab('puzzles');
                }
              );
            }
          }, 600);
        } else {
          btn.classList.add('error-shake');
          window.hanukkahAudio.playTryAgain();
          this.showFeedback(feedback, 'try-again', 'סִפְרוּ שׁוּב אֶת הַמִּלִּים הַיְּרֻקּוֹת שֶׁמְּצָאתֶם וּבִחְרוּ אֶת הַמִּסְפָּר הַנָּכוֹן! 💪');
          setTimeout(() => btn.classList.remove('error-shake'), 500);
        }
      });
    });
  }

  // =========================================================================
  // 10. פאזלים קלים מאוד (9 או 12 חלקים) של סמלי החג
  // =========================================================================
  initPuzzleState() {
    const count = this.puzzleGridSize;
    const arr = Array.from({ length: count }, (_, i) => i);
    // Shuffle until at least a few pieces are out of place
    do {
      this.puzzleTiles = this.shuffle(arr);
    } while (this.puzzleTiles.every((val, i) => val === i));
    this.puzzleSelectedTileIdx = null;
  }

  // Slice an SVG viewBox cleanly for piece `origIndex` in `cols x rows`
  getSlicedSVG(svgKey, origIndex, cols, rows) {
    const rawSvg = window.SVG_ASSETS[svgKey];
    const vbMatch = rawSvg.match(/viewBox="0\s+0\s+(\d+)\s+(\d+)"/);
    const W = vbMatch ? parseFloat(vbMatch[1]) : 160;
    const H = vbMatch ? parseFloat(vbMatch[2]) : 160;

    // Fit nicely into a grid of aspect cols:rows without distortion
    const targetAspect = cols / rows;
    let totalW, totalH;
    if (W / H > targetAspect) {
      totalW = W;
      totalH = W / targetAspect;
    } else {
      totalH = H;
      totalW = H * targetAspect;
    }

    const startX = (W - totalW) / 2;
    const startY = (H - totalH) / 2;

    const r = Math.floor(origIndex / cols);
    const c = origIndex % cols;
    const tileW = totalW / cols;
    const tileH = totalH / rows;
    const tileX = startX + c * tileW;
    const tileY = startY + r * tileH;

    const suffix = `_p_${origIndex}`;
    let sliced = rawSvg
      .replace(/id="([^"]+)"/g, (m, id) => `id="${id}${suffix}"`)
      .replace(/url\(#([^)]+)\)/g, (m, id) => `url(#${id}${suffix})`)
      .replace(/viewBox="[^"]+"/, `viewBox="${tileX} ${tileY} ${tileW} ${tileH}"`)
      .replace('<svg ', '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" ');
    return sliced;
  }

  renderPuzzles(container) {
    const data = window.ACTIVITIES_DATA.puzzles;
    const idx = this.stageIndices.puzzles;
    const item = data.items[idx];

    if (!this.puzzleTiles || this.puzzleTiles.length !== this.puzzleGridSize) {
      this.initPuzzleState();
    }

    const cols = this.puzzleGridSize === 9 ? 3 : 4;
    const rows = 3;
    const gridClass = this.puzzleGridSize === 9 ? 'grid-3x3' : 'grid-4x3';
    const isSolved = this.puzzleTiles.every((val, i) => val === i);

    container.innerHTML = `
      <div class="activity-card">
        <div class="activity-header">
          <h2>10. ${data.title}</h2>
          <p class="activity-instruction">${data.instruction}</p>
        </div>

        <div class="puzzle-selector-tabs">
          ${data.items.map((p, i) => `
            <button class="puzzle-tab-btn ${i === idx ? 'active' : ''}" data-puz-idx="${i}">
              ${p.name} ${this.solvedPuzzles.has(i) ? '✔️' : ''}
            </button>
          `).join('')}
        </div>

        <div class="puzzle-controls-bar">
          <button class="puzzle-size-btn ${this.puzzleGridSize === 9 ? 'active' : ''}" data-size="9">9 חֲלָקִים (קַל)</button>
          <button class="puzzle-size-btn ${this.puzzleGridSize === 12 ? 'active' : ''}" data-size="12">12 חֲלָקִים</button>
          <button class="puzzle-size-btn" id="toggle-puz-nums">${this.puzzleShowNumbers ? '🔢 הַסְתֵּר מִסְפָּרִים' : '🔢 הַצֵּג מִסְפָּרִים'}</button>
          <button class="puzzle-size-btn" id="toggle-puz-hint">${this.puzzleShowHint ? '🖼️ הַסְתֵּר רֶמֶז' : '🖼️ תְּמוּנָה לְרֶמֶז'}</button>
        </div>

        <div class="puzzle-board-container">
          ${this.puzzleShowHint ? `
            <div class="puzzle-hint-preview">
              <div class="svg-container" style="margin:0;"><div style="width:120px;height:100px;">${window.SVG_ASSETS[item.svg]}</div></div>
            </div>
          ` : ''}

          <div class="puzzle-grid ${gridClass}">
            ${this.puzzleTiles.map((origIndex, currentPos) => `
              <div class="puzzle-piece ${this.puzzleSelectedTileIdx === currentPos ? 'selected' : ''} ${origIndex === currentPos ? 'correct-pos' : ''}" data-pos="${currentPos}">
                ${this.puzzleShowNumbers ? `<span class="puzzle-piece-number">${origIndex + 1}</span>` : ''}
                <div class="puzzle-piece-inner" style="width:100%;height:100%;">
                  ${this.getSlicedSVG(item.svg, origIndex, cols, rows)}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div id="stage-feedback" class="feedback-banner ${isSolved ? 'success' : 'empty'}">
          ${isSolved ? `כָּל הַכָּבוֹד! הִשְׁלַמְתֶּם אֶת הַפָּאזֶל שֶׁל ${item.name}! ⭐` : ''}
        </div>
      </div>
    `;

    container.querySelectorAll('.puzzle-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.hanukkahAudio.playPop();
        this.stageIndices.puzzles = parseInt(btn.dataset.puzIdx, 10);
        this.initPuzzleState();
        this.renderPuzzles(container);
      });
    });

    container.querySelectorAll('.puzzle-size-btn[data-size]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.hanukkahAudio.playPop();
        this.puzzleGridSize = parseInt(btn.dataset.size, 10);
        this.initPuzzleState();
        this.renderPuzzles(container);
      });
    });

    document.getElementById('toggle-puz-nums').addEventListener('click', () => {
      window.hanukkahAudio.playPop();
      this.puzzleShowNumbers = !this.puzzleShowNumbers;
      this.renderPuzzles(container);
    });

    document.getElementById('toggle-puz-hint').addEventListener('click', () => {
      window.hanukkahAudio.playPop();
      this.puzzleShowHint = !this.puzzleShowHint;
      this.renderPuzzles(container);
    });

    container.querySelectorAll('.puzzle-piece').forEach(piece => {
      piece.addEventListener('click', () => {
        if (isSolved) return;
        const pos = parseInt(piece.dataset.pos, 10);
        window.hanukkahAudio.playPop();

        if (this.puzzleSelectedTileIdx === null) {
          this.puzzleSelectedTileIdx = pos;
          this.renderPuzzles(container);
        } else if (this.puzzleSelectedTileIdx === pos) {
          this.puzzleSelectedTileIdx = null;
          this.renderPuzzles(container);
        } else {
          // Swap tiles
          const temp = this.puzzleTiles[this.puzzleSelectedTileIdx];
          this.puzzleTiles[this.puzzleSelectedTileIdx] = this.puzzleTiles[pos];
          this.puzzleTiles[pos] = temp;
          this.puzzleSelectedTileIdx = null;

          const nowSolved = this.puzzleTiles.every((val, i) => val === i);
          this.renderPuzzles(container);

          if (nowSolved) {
            this.solvedPuzzles.add(idx);
            this.addSuccess(1);
            setTimeout(() => {
              if (idx < data.items.length - 1) {
                this.showStageCelebration(
                  'מְצֻיָּן! 🏆',
                  `הִרְכַּבְתֶּם אֶת הַפָּאזֶל שֶׁל ${item.name} בְּהַצְלָחָה!`,
                  'לַפָּאזֶל הַבָּא ⬅️',
                  () => {
                    this.stageIndices.puzzles++;
                    this.initPuzzleState();
                    this.renderPuzzles(container);
                  }
                );
              } else {
                this.showStageCelebration(
                  'אַלּוּפֵי הַפָּאזְלִים! 🏆',
                  'הִרְכַּבְתֶּם אֶת כָּל פָּאזְלֵי הַחַג!',
                  'לְמִשְׂחַק הַזִּכָּרוֹן ⬅️',
                  () => {
                    this.stageIndices.puzzles = 0;
                    this.initPuzzleState();
                    this.goToNextTab('memoryGame');
                  }
                );
              }
            }, 400);
          }
        }
      });
    });
  }

  // =========================================================================
  // 12. משחק זיכרון של מילים וציורים לחג החנוכה (14 קלפים = 7 זוגות)
  // =========================================================================
  initMemoryState() {
    const pairs = window.ACTIVITIES_DATA.memoryGame.pairs;
    const deck = [];
    pairs.forEach(p => {
      deck.push({ pairId: p.id, kind: 'pic', svg: p.svg });
      deck.push({ pairId: p.id, kind: 'word', word: p.word });
    });
    this.memoryCards = this.shuffle(deck);
    this.memoryFlippedIndices = [];
    this.memoryMatchedPairIds = new Set();
    this.memoryLocked = false;
  }

  renderMemoryGame(container) {
    const data = window.ACTIVITIES_DATA.memoryGame;
    if (!this.memoryCards || this.memoryCards.length === 0) {
      this.initMemoryState();
    }

    container.innerHTML = `
      <div class="activity-card">
        <div class="activity-header">
          <h2>12. ${data.title}</h2>
          <p class="activity-instruction">${data.instruction}</p>
          <div style="display:flex;justify-content:center;gap:20px;align-items:center;margin-top:12px;">
            <span id="memory-pairs-counter" style="font-size:1.15rem;font-weight:800;color:#4f46e5;">זוּגוֹת שֶׁנִּמְצְאוּ: ${this.memoryMatchedPairIds.size} מִתּוֹךְ ${data.pairs.length}</span>
            <button class="action-nav-btn" id="restart-memory-btn" style="padding:6px 14px;font-size:0.95rem;">🔄 מִשְׂחָק חָדָשׁ</button>
          </div>
        </div>

        <div class="memory-grid">
          ${this.memoryCards.map((card, i) => {
            const isFlipped = this.memoryFlippedIndices.includes(i);
            const isMatched = this.memoryMatchedPairIds.has(card.pairId);
            return `
              <div class="memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}" data-idx="${i}">
                <div class="memory-card-inner">
                  <div class="memory-card-front">🕎</div>
                  <div class="memory-card-back">
                    ${card.kind === 'pic'
                      ? `<div class="svg-container" style="margin:0;"><div style="width:75px;height:65px;">${window.SVG_ASSETS[card.svg]}</div></div>`
                      : `<span class="memory-card-text">${card.word}</span>`
                    }
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div id="stage-feedback" class="feedback-banner empty"></div>
      </div>
    `;

    const feedback = document.getElementById('stage-feedback');

    document.getElementById('restart-memory-btn').addEventListener('click', () => {
      window.hanukkahAudio.playPop();
      this.initMemoryState();
      this.renderMemoryGame(container);
    });

    container.querySelectorAll('.memory-card').forEach(cardEl => {
      cardEl.addEventListener('click', () => {
        if (this.memoryLocked) return;
        const i = parseInt(cardEl.dataset.idx, 10);
        const card = this.memoryCards[i];

        if (this.memoryMatchedPairIds.has(card.pairId) || this.memoryFlippedIndices.includes(i)) {
          return;
        }

        window.hanukkahAudio.playPop();
        this.memoryFlippedIndices.push(i);
        cardEl.classList.add('flipped');

        if (this.memoryFlippedIndices.length === 2) {
          this.memoryLocked = true;
          const [idx1, idx2] = this.memoryFlippedIndices;
          const card1 = this.memoryCards[idx1];
          const card2 = this.memoryCards[idx2];

          const el1 = container.querySelector(`.memory-card[data-idx="${idx1}"]`);
          const el2 = container.querySelector(`.memory-card[data-idx="${idx2}"]`);

          if (card1.pairId === card2.pairId) {
            this.memoryMatchedPairIds.add(card1.pairId);
            this.addSuccess(1);
            window.hanukkahAudio.playFanfare();
            this.showFeedback(feedback, 'success', 'כָּל הַכָּבוֹד! מְצָאתֶם זוּג תּוֹאֵם! ⭐');

            const counterEl = document.getElementById('memory-pairs-counter');
            if (counterEl) {
              counterEl.textContent = `זוּגוֹת שֶׁנִּמְצְאוּ: ${this.memoryMatchedPairIds.size} מִתּוֹךְ ${data.pairs.length}`;
            }

            setTimeout(() => {
              if (el1) el1.classList.add('matched');
              if (el2) el2.classList.add('matched');
              this.memoryFlippedIndices = [];
              this.memoryLocked = false;

              if (this.memoryMatchedPairIds.size === data.pairs.length) {
                this.showStageCelebration(
                  'זִכָּרוֹן מֻפְלָא! 🏆',
                  'מְצָאתֶם אֶת כָּל 7 הַזּוּגוֹת בְּמִשְׂחַק הַזִּכָּרוֹן!',
                  'שַׂחֲקוּ שׁוּב 🔄',
                  () => {
                    this.initMemoryState();
                    this.renderMemoryGame(container);
                  }
                );
              }
            }, 450);
          } else {
            window.hanukkahAudio.playTryAgain();
            this.showFeedback(feedback, 'try-again', 'לֹא תּוֹאֵם הַפַּעַם, נַסּוּ לִזְכֹּר אֶת הַמִּקּוּם! 💪');
            setTimeout(() => {
              if (el1) el1.classList.remove('flipped');
              if (el2) el2.classList.remove('flipped');
              this.memoryFlippedIndices = [];
              this.memoryLocked = false;
            }, 1050);
          }
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new HanukkahApp();
});
