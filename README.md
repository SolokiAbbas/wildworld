# Wild World
=======================================================================

Wild World is a building tower defense game. The game involves building cannons to shoot enemies as they come. Money can then be used to buy upgrades for the cannons or towers. After certain number of troops from the side gets through, the game is lost.


Link to game:
[Wild World](https://solokiabbas.github.io/wildworld/)


Place Cannons on the Grid by clicking a cannon and then clicking the grid

![Cannon](/docs/images/intro.png)


Monsters move in a path and the cannons shoot the monsters. You get gold for killing monsters.

![Bears](/docs/images/path.png)


## Features
=======================================================================

Languages: JavaScript, HTML, CSS, and Canvas.

There are event handlers through out the canvas depending on the mouse click location. After clicking on the cannons, they can be placed by clicking on the grid. This simulates the effect of being interactive. Starting the battle leads to requestAnimationFrame to be called in animate and monsters path is initiated. Collision of a bullet and the monster leads to another animation of explosion.

There is a background music which can be muted or played by clicking on the icon on the bottom.


## Future
=======================================================================

I wish to implement:

* Complicated Monster Paths
* Different Types of cannons
* Monster Health
* Different Animations for all objects
