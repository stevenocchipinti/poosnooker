export default `
## The Setup

Set up the table like snooker, but instead of having a triangle of red balls,
just have the one and place it in the empty gap between the pink and blue balls.

Anytime a ball goes into a pocket, it must return to its initial position. If
this position is occupied, it may move up to the next available position.
Anytime the cue ball goes into a pocket, it must return to the "D".

## The Objective

The goal of the game is to reach exactly _31_ points before anyone else. However
you must not go over 31 as this is a foul and your score is reset to zero. As
the minimum number of points you can score in one round is 2, this means that if
you reach 30, that is also a foul and your score is reset to zero.

## Scoring

There are 3 ways to score points:

1. **Cannon** - Where the cue ball hits an object ball and continues on to hit a
   different ball
2. **Get a ball in** - When an object ball goes into one of its designated
   pockets
3. **Go in off** - When the cue ball rebounds off an object ball and goes into
   the rebounded balls pocket

Each ball has an associated point value:

* A cannon = **2 points**
* Yellow ball = **2 points**
* Green ball = **3 points**
* Blue ball = **5 points**
* Pink ball = **6 points**
* Black ball = **7 points**

Only certain balls can score points using certain pockets:

* **The yellow and green balls** may only go in (or in off) either of the corner
  pockets at the bottom of the table
* **The blue ball** may only go in (or in off) the side pockets
* **The black ball** may only go in (or in off) either of the corner pockets at
  the top of the table
* **The pink ball** may go in (or in off) any pocket but you must score, see
  below for details
* **The red ball** must not go into any pocket, this is a foul and your score is
  reset to zero

## Getting "Off the mark"

While your score is on zero, you can not begin to score any points until you
successfully **cannon off the pink** - this will result in 2 points and you may
continue to score using any other method after that.

## Special balls

**The brown ball** (_aka the "poo ball"_) must not be touched at all. If this
ball is moved or touched by any other ball, this is a foul - your score is reset
to zero.

**The pink ball** must result in a score. For example, hitting the cue ball into
the pink ball and not scoring any points is a foul - your score is reset to
zero. Hitting the cue ball into the pink ball, then the cue ball continues on to
hit the green ball is a valid cannon - this is worth 2 points. Hitting the pink
ball into any pocket (or going in off) is worth 6 points.

**The red ball** can only be used to cannon onto. For example, hitting the cue
ball into the green ball, then the cue ball continues on to hit the red ball is
a valid cannon - this is worth 2 points. Hitting the cue ball into the red ball,
then the cue ball continues on to hit the green ball is a foul - your score is
reset to zero.

## Lifeline

If you make the cue ball hit all four sides of the table without touching any
other balls, you do not score but you are allowed to take another turn.

## Winners

If you win and you go on to play another game, your target score is incremented
by 10 points. For example, in the first game you reach exactly 31, in the next
game you must reach 41 while the others players that have not won only need to
get to 31.
`
