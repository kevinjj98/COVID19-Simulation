# COVID19-Simulation
Simulation of virus spread within a population with and without social distancing.


This is a simulation where a person is represented by a dot. Everyone starts off healthy (green) except for 1 person who starts sick (red) and can transmit the virus to other dots upon collision. After a few seconds, the sick recover (blue) and cannot get sick again nor can they re-transmit the virus.⁣
⁣
The first simulation ('No social distancing') shows the steep, exponential rise in sick dots when there is no social distancing. This is what would happen if there were no precautions taken in battling the spread of the virus.⁣

![](no_social_distancing.gif)

The second simulation ('With social distancing') shows how we can help flatten the curve by social distancing ourselves. Here, 3/4 of the population does not move which slows down the spread of the virus (notice the red curve is much flatter). A few dots even remained healthy and did not contract the virus at all.

![](with_social_distancing.gif)

In the real world, this would equate to allowing hospitals to function normally and not get overwhelmed by lots of sick patients at the beginning phases of a pandemic.⁣

To manually run either simulation, go into either folder and open the HTML file in a modern browser.
⁣

Proper social distancing precautions include washing hands for at least 20 seconds, covering your coughs, staying home, and minimizing contact with others as much as possible.

Tools used: P5.JS web editor⁣
Programming languages used: Javascript
⁣
Idea and inspiration from this article: https://www.washingtonpost.com/graphics/2020/world/corona-simulator/
