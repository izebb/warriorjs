import {
  BACKWARD,
  EAST,
  FORWARD,
  RELATIVE_DIRECTIONS,
  WEST,
} from '@warriorjs/geography';

import getLevel from './getLevel';

const levelConfig = {
  towerName: 'beginner',
  number: 2,
  description: "It's too dark to see anything, but you smell sludge nearby.",
  tip:
    "Use `warrior.feel().isEmpty()` to see if there's anything in front of you, and `warrior.attack()` to fight it. Remember, you can only do one action per turn.",
  clue:
    'Add an if/else condition using `warrior.feel().isEmpty()` to decide whether to attack or walk.',
  timeBonus: 20,
  aceScore: 26,
  floor: {
    size: {
      width: 8,
      height: 1,
    },
    stairs: {
      x: 7,
      y: 0,
    },
    warrior: {
      character: '@',
      maxHealth: 20,
      abilities: {
        walk: unit => ({
          action: true,
          description: `Move one space in the given direction (${FORWARD} by default).`,
          perform(direction = FORWARD) {
            unit.say(`walks ${direction}`);
            const space = unit.getSpaceAt(direction);
            if (space.isEmpty()) {
              unit.move(direction);
            } else {
              unit.say(`bumps into ${space}`);
            }
          },
        }),
        attack: unit => ({
          action: true,
          description: `Attack a unit in the given direction (${FORWARD} by default) dealing 5 HP of damage.`,
          perform(direction = FORWARD) {
            const receiver = unit.getSpaceAt(direction).getUnit();
            if (receiver) {
              unit.say(`attacks ${direction} and hits ${receiver}`);
              const attackingBackward = direction === BACKWARD;
              const amount = attackingBackward ? 3 : 5;
              unit.damage(receiver, amount);
            } else {
              unit.say(`attacks ${direction} and hits nothing`);
            }
          },
        }),
        feel: unit => ({
          description: `Return the adjacent space in the given direction (${FORWARD} by default).`,
          perform(direction = FORWARD) {
            return unit.getSpaceAt(direction);
          },
        }),
      },
      position: {
        x: 0,
        y: 0,
        facing: EAST,
      },
    },
    units: [
      {
        name: 'Sludge',
        character: 's',
        maxHealth: 12,
        abilities: {
          attack: unit => ({
            action: true,
            description: `Attack a unit in the given direction (${FORWARD} by default) dealing 3 HP of damage.`,
            perform(direction = FORWARD) {
              const receiver = unit.getSpaceAt(direction).getUnit();
              if (receiver) {
                unit.say(`attacks ${direction} and hits ${receiver}`);
                const attackingBackward = direction === BACKWARD;
                const amount = attackingBackward ? 2 : 3;
                unit.damage(receiver, amount);
              } else {
                unit.say(`attacks ${direction} and hits nothing`);
              }
            },
          }),
          feel: unit => ({
            description: `Return the adjacent space in the given direction (${FORWARD} by default).`,
            perform(direction = FORWARD) {
              return unit.getSpaceAt(direction);
            },
          }),
        },
        playTurn(sludge) {
          const playerDirection = RELATIVE_DIRECTIONS.find(direction =>
            sludge.feel(direction).isPlayer(),
          );
          if (playerDirection) {
            sludge.attack(playerDirection);
          }
        },
        position: {
          x: 4,
          y: 0,
          facing: WEST,
        },
      },
    ],
  },
};

test('returns level', () => {
  expect(getLevel(levelConfig)).toEqual({
    towerName: 'beginner',
    number: 2,
    description: "It's too dark to see anything, but you smell sludge nearby.",
    tip:
      "Use `warrior.feel().isEmpty()` to see if there's anything in front of you, and `warrior.attack()` to fight it. Remember, you can only do one action per turn.",
    clue:
      'Add an if/else condition using `warrior.feel().isEmpty()` to decide whether to attack or walk.',
    timeBonus: 20,
    floor: {
      map: [
        [
          {
            character: '╔',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '╗',
            stairs: false,
          },
        ],
        [
          {
            character: '║',
            stairs: false,
          },
          {
            character: '@',
            stairs: false,
            unit: {
              character: '@',
              health: 20,
              maxHealth: 20,
              score: 0,
              warrior: true,
              abilities: {
                actions: [
                  [
                    'walk',
                    'Move one space in the given direction (forward by default).',
                  ],
                  [
                    'attack',
                    'Attack a unit in the given direction (forward by default) dealing 5 HP of damage.',
                  ],
                ],
                senses: [
                  [
                    'feel',
                    'Return the adjacent space in the given direction (forward by default).',
                  ],
                ],
              },
            },
          },
          {
            character: ' ',
            stairs: false,
          },
          {
            character: ' ',
            stairs: false,
          },
          {
            character: ' ',
            stairs: false,
          },
          {
            character: 's',
            stairs: false,
            unit: {
              name: 'Sludge',
              character: 's',
              health: 12,
              maxHealth: 12,
            },
          },
          {
            character: ' ',
            stairs: false,
          },
          {
            character: ' ',
            stairs: false,
          },
          {
            character: '>',
            stairs: true,
          },
          {
            character: '║',
            stairs: false,
          },
        ],
        [
          {
            character: '╚',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '═',
            stairs: false,
          },
          {
            character: '╝',
            stairs: false,
          },
        ],
      ],
      warrior: {
        abilities: {
          actions: [
            [
              'walk',
              'Move one space in the given direction (forward by default).',
            ],
            [
              'attack',
              'Attack a unit in the given direction (forward by default) dealing 5 HP of damage.',
            ],
          ],
          senses: [
            [
              'feel',
              'Return the adjacent space in the given direction (forward by default).',
            ],
          ],
        },
        character: '@',
        health: 20,
        maxHealth: 20,
        score: 0,
        warrior: true,
      },
    },
  });
});
