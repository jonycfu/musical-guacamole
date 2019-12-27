interface IHangman {
  gallows: Array<Array<number>>;
  head: [number, number, number, number, number, boolean]; //tuple type
  torso: Array<number>;
  rightArm: Array<number>;
  leftArm: Array<number>;
  rightLeg: Array<number>;
  leftLeg: Array<number>;
}
export const HANGMAN: IHangman = {
  gallows: [
    [0, 150, 150, 150],
    [10, 0, 10, 150],
    [0, 5, 70, 5],
    [60, 5, 60, 15],
  ],
  head: [60, 25, 10, 0, Math.PI * 2, true],
  torso: [60, 36, 60, 70],
  rightArm: [60, 46, 100, 50],
  leftArm: [60, 46, 20, 50],
  rightLeg: [60, 70, 100, 100],
  leftLeg: [60, 70, 20, 100],
};

//static constants -- alt. can use dynamic Array.from() generation
export const NUMERALS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const ALPHABETS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
