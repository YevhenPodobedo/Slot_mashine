import * as PIXI from './pixi.mjs';
import { imageTextures, imgBackgoundCanvas} from './loader.js';

(async () => {

  const app = new PIXI.Application();
  await app.init({
    width: 600,
    height: 300
  });
  document.querySelector('#canvas').appendChild(app.canvas);
  
  const elementTextures = imageTextures;

  // #region background
  const background = new PIXI.Sprite(imgBackgoundCanvas);
  background.width = app.screen.width;
  background.height = app.screen.height;
  app.stage.addChild(background);
  //  #endregion
  
  // #region reels
  const REEL_WIDTH = 117;
  const SYMBOL_SIZE = 100;
  
  const reels = [];
  const quantitySlots = 5;
  const reelContainer = new PIXI.Container();

  reelContainer.x = app.screen.width - REEL_WIDTH * quantitySlots;

  for (let i = 0; i < quantitySlots; i++) {
      let slot = new PIXI.Container();

      slot.x = i * REEL_WIDTH;
      
      const reel = {
        symbols: [],
        previousPosition: 0,
        position: 0,
      };
      
      // element slot
      const quantityElements = 4;
      
      for (let j = 0; j < quantityElements; j++) {
        const rounding = elementTextures[Math.floor(Math.random() * elementTextures.length)]; 
        
        const symbol = new PIXI.Sprite(rounding);

          symbol.y = j * SYMBOL_SIZE;
          symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
          symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
          reel.symbols.push(symbol);
          slot.addChild(symbol);
      };

      reels.push(reel);
      reelContainer.addChild(slot);
      app.stage.addChild(reelContainer);
    }
    //  #endregion

  // #region create start playing
  document.querySelector('#btn').addEventListener('click', (event) => {
    startPlay();
  });
  
  let running = false;

  function startPlay() {

    if (running) { 
     return running = true;
    };

      for (let i = 0; i < reels.length; i++) {
          const r = reels[i];

          const extra = Math.floor(Math.random() * 3);
          const target = r.position + 10 + i * 5 + extra;
          const time = 2500 + i * 600 + extra * 600;

          tweenTo(r, 'position', target, time, backout(0.1), null, i === reels.length - 1 ? reelsComplete : null);
      };
  };

    function backout(sum) {
      return (t) => --t * t * ((sum + 1) * t + sum) + 1;
    };

  // Reels done handler.
  function reelsComplete() {
    running = false;
  };
  // #endregion

  // #region animate update.
  app.ticker.add(() => {

    // Update the slots.
    for (let i = 0; i < reels.length; i++) {
        const r = reels[i];

        // Update symbol positions on reel.
        for (let j = 0; j < r.symbols.length; j++) {
            const s = r.symbols[j];
            const prevy = s.y;

            s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;

            if (s.y < 0 && prevy > SYMBOL_SIZE) {
                // Detect going over and swap a texture.
                s.texture = elementTextures[Math.floor(Math.random() * elementTextures.length)];
                s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);

                s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
            };
        };
      };
  });

  const tweening = [];

  function tweenTo(object, property, target, time, easing) {

    const tween = {
      object,
      property,
      propertyBeginValue: object[property],
      target,
      easing,
      time,
      start: Date.now(),
    };

    tweening.push(tween);

    return tween;
  };

  // listen for animate update.
  app.ticker.add(() => {

    const now = Date.now();
    const remove = [];

    for (let i = 0; i < tweening.length; i++) {

      const t = tweening[i];
      const phase = Math.min(1, (now - t.start) / t.time);

      t.object[t.property] = t.propertyBeginValue * (t.easing(phase) - 1) + (t.target * t.easing(phase));

      if (t.change) t.change(t);

      if (phase === 1) {
        t.object[t.property] = t.target;
        if (t.complete) t.complete(t);
        remove.push(t);
      };
    };

    for (let i = 0; i < remove.length; i++) {
      tweening.splice(tweening.indexOf(remove[i]), 1);
    };

  });
  // #endregion
})();


