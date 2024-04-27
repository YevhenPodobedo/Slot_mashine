import { Assets, Texture} from "./pixi.mjs";

await Assets.load ([
  'image/pictures/M00.jpg',
  'image/pictures/M01.jpg',
  'image/pictures/M02.jpg',
  'image/pictures/M11.jpg',
  'image/pictures/M03.jpg',
  'image/pictures/M04.jpg',
  'image/pictures/M12.jpg',

  'image/letters/M05.jpg',
  'image/letters/M06.jpg',
  'image/letters/M07.jpg',
  'image/letters/M08.jpg',

  'image/digits/M09.jpg',
  'image/digits/M10.jpg',
]);

export const imageTextures = [
  Texture.from('image/pictures/M00.jpg'),
  Texture.from('image/pictures/M01.jpg'),
  Texture.from('image/pictures/M02.jpg'),
  Texture.from('image/pictures/M11.jpg'),
  Texture.from('image/pictures/M03.jpg'),
  Texture.from('image/pictures/M04.jpg'),
  Texture.from('image/pictures/M12.jpg'),

  Texture.from('image/letters/M05.jpg'),
  Texture.from('image/letters/M06.jpg'),
  Texture.from('image/letters/M07.jpg'),
  Texture.from('image/letters/M08.jpg'),

  Texture.from('image/digits/M09.jpg'),
  Texture.from('image/digits/M10.jpg'),
];

// background
export const imgBackgoundCanvas = await Assets.load('image/background/background-canvas.jpg');
