# will you come find me?

artist's statement

`will you come find me after the world ends?` is a short mood piece designed to explore ideas of post-apocalyptic intimacy
and feelings of loss. the idea is to determine how long the user would wait for someone to come for them, without knowing
if this other person would do the same for them. every day the user is faced with a choice: remain in the cave and risk running out of food,
or leave and abandon their home for a chance at discovering this person. eventually, another choice presents itself. the user
has the opportunity to leave, but this time, taking matters into their own hands - leaving a message on the wall instructing the next person
to arrive to "come find me".

the goal was to use webStorage to determine if a user has "left the cave" in a previous attempt, as a way to impress some realism
to the story. unfortunately, i was unable to figure out a way to implement this after trying multiple different methods. the bulk of the game,
though, is intact. every day, a random backdrop is picked from an array, and a random event is generated from another array. these events have
various effects, some adding health to the user, and some taking it. if the user reaches 0 health, the game ends in the same way as if they were
to end the simulation in the non-"come find me"-way.

as the user progresses through the days, the messages in the game-ending text box urges them to give up, asking them if the person they're
waiting for even cares - if they would do the same for them. eventually, when the third option is unlocked, the text within will get bigger
and bigger, until it encompasses the whole screen. when the user finally clicks the option, the game will end.
