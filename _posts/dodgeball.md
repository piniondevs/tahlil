---
title: Dodgeball
description: I wrote a fucking game.
slug: dodgeball
index: 2
---

# Dodgeball

Its been 2 years since I made the last post. I havent really been coding for that time so I didn't have anything to write about. But I recently got into the habit of writing stuff again.

I recently made this shitty game ([check it out here](https://kkkescape.netlify.app/)) and i'm writing about this since its out of my usual line of work. I used Pixi JS which is like a wrapper over the Canvas API with a lot of prebuilt systems and primitives. But i did have to write the majority of the things myself. I also used Howler for audio. Thats basically all of the libraries I used.

The entire game is just a shitpost.

I just wanna talk about a few things i liked writing.

## The Code

The entire game is only **200** lines of . I know that lines of code is not a measure of somethings quality by any means and considering i was the person who wrote those lines of code it would be shit either way. But yeah the entirety of the games code is written in a single file.

The main idea is you (the player) need to dodge the enemies coming towards you. The spawn points are randomly chosen on either one of the 4 sides of the 500x500 canvas. Thats propably my favourite bit about the game cause the logic for it came to me randomly while i was trying to go to sleep even though i wasnt able to find a good solution that entire day. This is the code for that. I know this is not the best and someone can prolly write it better but fuck you its my blog.

```js
function spawnEnemy() {
  const enemy = Sprite.from("/enemy.png");
  enemy.anchor.set(0.5);

  const randomizer = Math.floor(Math.random() * 4);

  switch (randomizer) {
    case 0:
      // TOP
      enemy.x = Math.floor(Math.random() * 490);
      enemy.y = 1;
      enemy.spawn = "TOP";
      break;
    case 1:
      // Bottom
      enemy.x = Math.floor(Math.random() * 490);
      enemy.y = 500;
      enemy.spawn = "BOTTOM";
      break;
    case 2:
      // Left
      enemy.x = 1;
      enemy.y = Math.floor(Math.random() * 490);
      enemy.spawn = "LEFT";
      break;
    case 3:
      // Right
      enemy.x = 500;
      enemy.y = Math.floor(Math.random() * 490);
      enemy.spawn = "RIGHT";
      break;
  }

  app.stage.addChild(enemy);
}
```

As you can see i basically get a random number in the range 0 to 4 and afterwards create a switch statement which determines which side itll spawn. Basically for top and bottom the y are predetermined and for left and right the x is predermined. Reading the code should allow you to figure it out. This is such a fucking dumb solution but i love it.

_I wont be writing about the collision detection cause i stole it from a youtube video._

So the next bit of code i want to talk about is how i spawn the enemies. This is the second worst part of the app because of how scuffed it is.

```js
const spawner = setInterval(spawnEnemy, SPAWN_RATE * 1000);
```

Yeah its just a set interval. But it works.

Now comes the worst part of the app. Its about how the game checks for if the player has collided and if a game over needs to be called. This logic is put inside the main game loop.

```js
const gameLoop = app.ticker.add((delta) => {
  let children = [...app.stage.children];
  let player = children.shift();

  children.forEach((child) => {
    if (collisionDetector(player, child)) {
      gameOver();
    }

    switch (child.spawn) {
      case "TOP":
        child.y += ENEMY_SPEED * delta;
        break;
      case "BOTTOM":
        child.y -= ENEMY_SPEED * delta;
        break;
      case "LEFT":
        child.x += ENEMY_SPEED * delta;
        break;
      case "RIGHT":
        child.x -= ENEMY_SPEED * delta;
        break;
      default:
        return;
    }
  });
});
```

The code checks for a collision every single tick and the way it does it is by fucking looping through an array of enemies and compares all of the enemies with the player and checks for collision. Here a child represents an enemy. This is so dumb and so inefficient but it somehow works. So I cant be bothered to change it. Furthermore im not smart enough to write a better implementation.

Another bad part about the app is the fact that it does not remove any enemies from the stage when it goes out of the canvas range i.e gets out of player visibilty. This might be a performance concern but nobody really cares about the performance so i cant be bothered to fix it.

If you wanna see the entire code check it out [here](https://github.com/tahlilma/dodgeball)

_(PS: ignore any grammatical or spelling mistakes, I was too lazy to spellcheck.)_
