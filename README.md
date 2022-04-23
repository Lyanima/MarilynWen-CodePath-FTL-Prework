# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for Salesforce's FTL Program

Submitted by: Marilyn Wen

Time spent: **10** hours spent in total

Link to project: https://glitch.com/edit/#!/marilynwen-ftl-prework-project

## Required Functionality

The following **required** functionality is complete:

- [ x ] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [ x ] "Start" button toggles between "Start" and "Stop" when clicked.
- [ x ] Game buttons each light up and play a sound when clicked.
- [ x ] Computer plays back sequence of clues including sound and visual cue for each button
- [ x ] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [ x ] User wins the game after guessing a complete pattern
- [ x ] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [ x ] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [ x ] Buttons use a pitch (frequency) other than the ones in the tutorial
- [ x ] More than 4 functional game buttons
- [ x ] Playback speeds up on each turn

- [ x ] Computer picks a different pattern each time the game is played
- [ x ] Player only loses after 3 mistakes (instead of on the first mistake)
- [ x ] Game button appearance change goes beyond color (e.g. add an image)
- [ x ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [ x ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ x ] Chinese traditional song learning!
- [ x ] Imported fonts ('Common Pixel')
- [ x ] Tutorial
- [ x ] Buttons setup based on song of choice
  - [ x ] Automatically populate button backgrounds based on which buttons are displayed
- [ x ] Speed + and Speed - Buttons


## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
- [ ]  https://cdn.glitch.global/e8c92ccb-e3a1-45c5-a4c2-48e4d7eae45b/projectShowcase.gif?v=1650694764728

## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.
   W3schools (https://www.w3schools.com/): I used the CSS, JS, HTML references to learn about and implement methods not given by the pre-work guidelines.
   Youtube Videos (https://www.youtube.com/c/CuriousByte, etc.) I searched for those videos on how to import fonts and style buttons
   GlitchBlog (https://blog.glitch.com/): I browsed through the projects featured on the blog to understand how to use Assets and other features in Glitch

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)
   A challenge I encountered was using the HTML DOM to automate styling the webpage. I designed my program to have eight buttons, each holding a tune from C, D, E, ... up to C an octave higher. Once the song is chosen and game has started, the program will automatically filter through the song and determine which buttons are needed to be displayed. It then populates the chosen buttons with alternating yellow and green jasmine flower images to differentiate them. However, I realized that this function could not be accomplished using strictly CSS, since populating the document with buttons happens in run-time. Since the given pre-work code used the DOM to add .hidden class during run-time, I researched for ways to populate the backgrounds and ":active, .lit" properties of the buttons. I realized a way to automate populating the background-images, but there seem to be no error-proof solution for the ":active, .lit". I eventually realized that instead of making them change the buttons to a different color, they could just change the button opacity, saturation and other values, which serve the same purpose with simpler procedure and more aesthetic results.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)
   I've very eager to explore ways of automating code in full-stack development. The current interface in our program is largely manually programed with HTML and CSS. I was eager to explore more possibilities of using JavaScript to populate the interface, listen for events, and manage overall style of the game. This would not only allow for more automation, but also greater potentials for expanding the program for future features. During the prework project, I experimented with using DOM in JavaScript to manage CSS style elements, but that does not seem to be the most direct method. I would love to learn about other technologies such as React.js,  and Node.js to automate more code.

4. If you had a few more hours to work on this project, what would you spend them doing
   (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)
   First, I would like to refactor my code to include less global variables. The use of extensive amounts of global variables in JavaScript could lead to various buggy code. There are two ways which I plan to resolve it. During the project, I tried experimenting with importing .mjs files into glitch projects, but the procedure does not seem straight-forward. Given the time constraint, I did not invest my time in researching on this aspect. I would like to implement more code as class variables to store the current global variables in an enclosed manner. Second, I would like to do so by passing local variables enclosed by brackets into functions. For example, after the startGame() function, there should no longer be a need for the boolean variable holding if game is playing. If given more time, I would like to experiment with both methods to improve the exception safety of my code.
   
   Second, I would like to further develop the program by adding various functions. I wanted to implement a system to hold a song database of traditional cultural songs just like my current song "jasmine flower". If I could develop an algorithm to take in current songs and transform it to song patterns in the game, the game would serve more purpose as a cultural song learner.

## Interview Recording URL Link

[https://youtu.be/A3uFWeI6ZlQ] 

## License

    Copyright [Marilyn Wen]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
