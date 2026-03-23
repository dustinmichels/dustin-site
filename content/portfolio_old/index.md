---
title: "Portfolio"
# url: "/archives/"
# summary: archives
author: "Dustin Michels"
ShowReadingTime: false
ShowWordCount: false
images:
  - images/geohearo.png
---

Outside of my professional work as a software engineer, I have done various personal projects that demonstrate technical skills (including web scraping, spatial analytics, and data visualization), a playful and creative approach to data and technology. A recurring theme across many projects is my desire to use technology to tell stories and create interactive experiences that allow users to engage with data and ideas in new ways, building knowledge about the world.

- [Maps and Urbanism](#maps-and-urbanism)
  - [Bike exploration animations (Nov 2024)](#bike-exploration-animations-nov-2024)
  - [Stroad Hero (Jan 2024)](#stroad-hero-jan-2024)
  - [GeoHearo (April 2023)](#geohearo-april-2023)
  - [Data Mining Dylan (May 2018)](#data-mining-dylan-may-2018)
  - [Bike-walk-drive (March 2016)](#bike-walk-drive-march-2016)
- [Other Projects](#other-projects)
  - [PradellEditor (2020, Updated 2022)](#pradelleditor-2020-updated-2022)
  - [Kava Brewer (March 2021)](#kava-brewer-march-2021)
  - [PL-phylogeny (May 2019)](#pl-phylogeny-may-2019)
  - [DNA Encoder (July 2017)](#dna-encoder-july-2017)

---

## Maps and Urbanism

These projects have something to do with mapping, geography, and urbanism. While they are on the playful side, they showcase skills in programming, analysis, geography, and design.

### Bike exploration animations (Nov 2024)

_[[Webpage]](https://dustinmichels.github.io/bike-exploration/)_
_[[GithHub]](https://github.com/dustinmichels/bike-exploration)_
_[[Blog]](https://dustinthe.city/posts/2024/11/project-bike-exploration-animations/)_

{{< figure src="images/boston.gif" link="<https://dustinmichels.github.io/bike-exploration/>" target="_blank" width="600" class="box">}}

Here, I created a series of artistic animations that visualize my biking
activity in cities I have lived in (Gothenburg, Sweden; Denver,
Colorado; and Boston, Massachusetts).

After encountering [a similar
visualization](https://www.reddit.com/r/dataisbeautiful/comments/f8nu0c/oc_this_is_how_londons_street_grid_reveals_using/)
more than four years ago, I started recording my bike rides using the
Strava app, planning to make these animations. I even found myself
deliberately avoiding obvious routes to ensure the fullness of my future
maps.

Visualizations like these can motivate people to explore by bike--
seeing that animation years ago clearly had that effect on me. A more
typical (and informative) map would show routes drawn onto a base map,
but this more abstract representation emphasizes discovery. There is no
world outside of what you uncover through biking. The use of animation
(as opposed to, for example, a heatmap of all routes) also emphasizes
the idea of discovery. You have to lay down the routes one by one, day
by day, slowly revealing the city. It is a process.

I intend to expand the project into a toolkit that allows others to make
their own animations.

- **Tools and technologies**: Python, GeoPandas, Jupyter Notebooks, QGIS, ffmpeg, GPX.
- **Skills showcase**: (Geospatial) data cleaning, manipulation, and analysis pipeline; problem-solving with weird data formats; artistic visualization; and animation.

### Stroad Hero (Jan 2024)

_[[GithHub]](https://github.com/dustinmichels/stroad-hero)_
_[[Blog]](https://dustinthe.city/posts/2024/01/project-my-stroad-hero-video-game/)_
_[[Video]](https://vimeo.com/963369186)_

{{< figure src="images/stroad-hero.png" link="<https://vimeo.com/963369186>" target="_blank" width="600" class="box">}}

**Stroad Hero** is a Frogger-esque, activist video game that highlights
the danger and misery of navigating a "stroad" by foot.

The term "stroad," [coined by Charles Marohn of
StrongTowns](https://www.strongtowns.org/journal/2018/3/1/whats-a-stroad-and-why-does-it-matter),
describes an unpleasant hybrid of a street and a road. The idea is that
_roads_ provide wide, straight, and forgiving lanes, free of obstacles,
that enable drivers to move quickly across the landscape. But once
drivers reach a neighborhood or city center, a _street_ is more
appropriate. The presence of shops, pedestrians, etc, requires frequent
stopping and starting; traffic slows to a human scale. A 'stroad''
(ubiquitous in the US) contains elements of both, and the muddled design
makes these spaces confusing, hostile, and dangerous.

In the game, you play as Mats, a hapless Dutch boy trying to navigate a
perilous shopping center in Anywhere, USA. The tagline is _"Do you have
what it takes to complete a series of simple shopping tasks without
becoming another senseless pedestrian death? Do you have what it takes
to become the Stroad Hero?"_

I was inspired to create the game by a visit to Muncie, Indiana, where I
felt like the titular Frog from Frogger trying to scurry across
terrifying stroads. The game is meant to educate players about the
"stroad" concept and parody the absurdity of these spaces.

This game is still in its early days. My [blog
post](https://dustinthe.city/posts/2024/01/project-my-stroad-hero-video-game/)
details all my aspirations for the game.

- **Tools and technologies**: Godot game engine, Aseprite.
- **Skills showcase**: Learning a technology far outside of my typical suite (a game engine), game design, pixel art.

### GeoHearo (April 2023)

_[[Webpage]](https://geohearo.com)_
_[[GithHub]](https://github.com/dustinmichels/geo-hearo)_
_[[Blog]](https://dustinthe.city/posts/2023/04/project-geohearo/)_

{{< figure src="images/geohearo.png" link="<https://geohearo.com>" target="_blank" width="600" class="box">}}

**An audio-based geography guessing game.**

When the game begins, a mystery country is chosen at random and you are presented with five radio stations to pan through. As you submit your guesses, the game tells you how close you are and which direction to go. The map is provided as a visual aid; you can hover a country to check its name, and your guessed countries are filled with a color that reflects proximity to the correct answer.

The game relies on your knowledge and challenges your preconceptions about the musical tastes and spoken languages of different countries. It can be used to build familiarity the countries of the world, where they lie, and what they sound like.

The current iteration of the game is simple and fun. I have ideas for how it could be adapted in different directions to be more meaningful. To emphasize geography education, I would add more informed feedback and tooling. For example, if you guess "France" but the correct answer is "Senegal," the game could relay that the French language part is correct and highlight other countries that speak French. I can also imagine adapting the project into an interactive component to support others' academic or artistic work. I spoke with one history student studying patterns of migration who liked the idea of using a version of the game to help show the spread of languages through migration.

- **Tools and technologies**: Go, Python (Pandas, Jupyter), VueJS, D3, DataMaps, GeoJSON, HTML/ CSS/ JavaScript.
- **Skills showcase**: API usage & crawling, spatial analytics, coordinate system manipulation, interactive web app development.

### Data Mining Dylan (May 2018)

_[[Webpage]](https://dustinmichels.github.io/data-mining-dylan)_
_[[GithHub]](https://github.com/dustinmichels/data-mining-dylan)_
_[[Blog]](https://dustinthe.city/posts/2024/01/project-my-stroad-hero-video-game/)_

{{< figure src="images/data_mining_dylan_screenshot.png" link="<https://dustinmichels.github.io/data-mining-dylan>" target="_blank" width="600" class="box">}}

Bob Dylan sings many narrative-centered songs set all around the world.
This project lets users explore the places he references.

Using Python, I scraped [BobDylan.com](https://www.bobdylan.com/songs/)
for lyrics and then counted references to places with rudimentary NLP
techniques. The results are presented via an interactive web page
containing a bubble map chart synchronized with a lyrics display panel
using VueJS and Leaflet. This project was presented at a digital
humanities conference during my undergraduate study at Carleton.

- **Tools and technologies**: Python (Scrapy, Pandas, Jupyter), GeoJson, VueJs, Leaflet.
- **Skills showcase**: Web scraping, NLP, interactive web app development.

### Bike-walk-drive (March 2016)

_[[GithHub]](https://github.com/dustinmichels/bike-walk-drive)_

{{< figure src="images/bike_walk_drive.png" link="./images/bike_walk_drive.png" target="_blank" width="600" class="box">}}

**Bike-walk-drive** is a very early project-- from my first college
computer science course. It is included here simply to showcase my
longstanding interest in using programming to promote alternative
transportation and help people rethink how they navigate their
environment.

The rudimentary app lets a user input a distance and a number of trips
e.g., 10 trips of 4 miles each. It then compares three modes of
transportation-- bike, walk, and drive-- in terms of time, cost,
calories burned, and CO2 emissions. The app provides options for
customizing the calculations and contextualizing the numbers. Time can
be shown as audiobooks consumed, cost as coffees purchased, and CO2
emissions as number of trees planted. This is done to help a user
grapple with the trade-offs in a new way.

When I entered college, I was already a dedicated bike commuter with a
head full of ideas like this. I wanted to create an app that lets users
track all their bike rides and see how much they save on gas money each
month. This little project was an expression of that interest.

- **Tools and technologies**: Python (matplotlib, numpy).
- **Skills showcase**: Data analysis and visualization, object-oriented programming.

## Other Projects

These are miscellaneous creative projects, that veer towards the irreverent. In addition to highlighting specific skills, they underscore that for me, multi-disciplinary learning is not just a means to an end but a joyous and rewarding journey of discovery. Each project was born out of learning something new and immediately wanting to go deeper by applying it, creating something useful, or combining it with something unrelated.

### PradellEditor (2020, Updated 2022)

_[[GithHub]](https://github.com/dustinmichels/paradellEditor)_
_[[Webpage]](https://dustinmichels.github.io/paradellEditor)_

{{< figure src="images/paradelleditor_screenshot.png" link="<https://dustinmichels.github.io/paradellEditor>" target="_blank" width="600" class="box">}}

The paradelle is a rigid poetic form invented by Billy Collins as a
parody of the villanelle. This tool aids users in formulating the
intricate poems. It also provides functionality for sharing your
creations by encoding the text into the URL.

### Kava Brewer (March 2021)

_[[GithHub]](https://github.com/dustinmichels/kava-brewer)_

{{< figure src="images/kava.png" link="./images/kava.png" target="_blank" width="600" class="box">}}

A program that generates plausible foreign coffee words using a PCFG
(probabilistic context-free grammar) and a list of real coffee words.

While traveling across Europe, I observed that many coffee words sounded
alike: "koffie", "café", "kava", "kaffee", etc. I figured the rule was
something like (1) start with a "k" sound, (2) add a vowel sound "e" "a"
or "o," (3) add a consonant sound "f" or "v," (4) end with a vowel sound
"e" or "a."

A rule set like this closely resembles a "probabilistic context-free
grammar". This is a concept from computational linguistics that I
learned about during my Computer Science undergrad. A PCFG tells you
which symbols (in this case, letters) you can reach from previous
symbols and how likely you are to reach them. It is not so different
from current LLMs, though those are more context-full. So, I tried
creating a PCFG to generate plausible coffee words.

### PL-phylogeny (May 2019)

_[[GithHub]](https://github.com/dustinmichels/PL-phylogeny)_

{{< figure src="images/PL-tree.png" link="./images/PL-tree.png" target="_blank" width="600" class="box">}}

This is an attempt to build an evolutionary tree of programming
languages derived from "analogous" code snippets. The idea was to take a
technique I learned in a bioinformatics class-- to compare snippets of
DNA from different species and build a phylogenetic tree-- and apply the
same technique to bits of computer code.

This project plays with applying concepts from biology/bioinformatics in
a new and unusual way.

### DNA Encoder (July 2017)

_[[GithHub]](https://github.com/dustinmichels/dna-encoder)_

{{< figure src="images/dna_encoder_screenshot.png" link="<https://github.com/dustinmichels/dna-encoder>" target="_blank" width="600" class="box">}}

A web application that encodes a string of text as DNA in a hands-on
manner-- taking the binary representation of each character and
assigning a DNA base pair to each pair of bits.

I made this while studying computer science and genetics at Carleton
College and thinking about all the ways one can store information. The
app is built with Python, Flask, and Jinja2.

<!-- ### More -->

<!--
[connect4](https://github.com/dustinmichels/connect4)
(December 2023)

- Connect-4 in the terminal, written in Go. -->

<!-- [book-report](https://github.com/dustinmichels/book-report)
(May 2020)

> Analysis & data visualization of ePub files -->

<!-- [bayesian-values-guesser](https://github.com/dustinmichels/bayesian-values-guesser)
(August 2017)

- Uses some user input, data from the [World Values Survey](www.worldvaluessurvey.org), and Bayes Rule to guess a number of beliefs the user might have. -->
