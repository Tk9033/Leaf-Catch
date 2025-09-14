// import { createApp } from "vue";

export default{
  data() {
    return {
      score: 0,
      timeLeft: 30,
      gameStarted: false,
      gameEnded: false,
      leaves: [],
      pops: [],
      leafIdCounter: 0,
      popIdCounter: 0,
      gameTimer: null,
      leafGenerator: null,
      animationFrame: null,
      cursorX: 0,
      cursorY: 0
    };
  },
  methods: {
    startGame() {
      // 初期化
      this.gameStarted = true;
      this.gameEnded = false;
      this.score = 0;
      this.timeLeft = 30;
      this.leaves = [];
      this.pops = [];
      this.leafIdCounter = 0;
      this.popIdCounter = 0;

      // タイマー（既にあればクリア）
      if (this.gameTimer) clearInterval(this.gameTimer);
      this.gameTimer = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) this.endGame();
      }, 1000);

      // 既存の生成器をクリア
      if (this.leafGenerator) { clearInterval(this.leafGenerator); this.leafGenerator = null; }
      if (this.animationFrame) { cancelAnimationFrame(this.animationFrame); this.animationFrame = null; }

      // 落ち葉生成（毎回 game-area の幅を参照）
      const leafSize = 45; // <img> の表示サイズに合わせる
      this.leafGenerator = setInterval(() => {
        // game-area を確実に取得
        const area = document.querySelector('.game-area');
        const width = area && area.clientWidth ? area.clientWidth : window.innerWidth;
        const x = Math.random() * Math.max(0, width - leafSize);

        this.leaves.push({
          id: this.leafIdCounter++,
          x: x,
          y: -leafSize,
          speed: Math.random() * 2 + 1,
          rotation: Math.random() * 360,
          size: leafSize
        });
      }, 800);

      // アニメーション開始
      this._animateLoop();
    },

    // RAF ループを分離して管理
    _animateLoop() {
      const step = () => {
        if (!this.gameStarted) return;

        const area = document.querySelector('.game-area');
        const height = area && area.clientHeight ? area.clientHeight : window.innerHeight;

        // 落ち葉移動（後方ループで安全に削除）
        for (let i = this.leaves.length - 1; i >= 0; i--) {
          const leaf = this.leaves[i];
          leaf.y += leaf.speed;
          leaf.rotation += 2;
          if (leaf.y > height + 50) {
            this.leaves.splice(i, 1);
          }
        }

        // pops 更新
        for (let i = this.pops.length - 1; i >= 0; i--) {
          const pop = this.pops[i];
          pop.y -= 0.5;
          pop.scale += 0.02;
          pop.opacity -= 0.05;
          if (pop.opacity <= 0) this.pops.splice(i, 1);
        }

        this.animationFrame = requestAnimationFrame(step);
      };

      if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
      this.animationFrame = requestAnimationFrame(step);
    },

    shootLeaf(id, x, y) {
      const index = this.leaves.findIndex(l => l.id === id);
      if (index !== -1) {
        this.leaves.splice(index, 1);
        this.score += 10;

        // ポップアニメーション追加
        this.pops.push({
          id: this.popIdCounter++,
          x: x + 15,
          y: y + 15,
          scale: 1,
          opacity: 1
        });
      }
    },

    updateCursor(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      this.cursorX = event.clientX - rect.left;
      this.cursorY = event.clientY - rect.top;
    },

    endGame() {
      this.gameStarted = false;
      this.gameEnded = true;
      if (this.gameTimer) { clearInterval(this.gameTimer); this.gameTimer = null; }
      if (this.leafGenerator) { clearInterval(this.leafGenerator); this.leafGenerator = null; }
      if (this.animationFrame) { cancelAnimationFrame(this.animationFrame); this.animationFrame = null; }
    }
  }
}.mount('#app');