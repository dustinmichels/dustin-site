---
title: "Kava Brewer"
date: 2021-03-01
summary: "A program that generates plausible foreign coffee words using a PCFG (probabilistic context-free grammar) and a list of real coffee words."
emoji: "☕"
tech: ["NLP", "PCFG", "Python"]
description: "A program that generates plausible foreign coffee words using a PCFG (probabilistic context-free grammar) and a list of real coffee words."
---

![Kava Brewer output screen](/images/portfolio/kava.png)

_[[GitHub]](https://github.com/dustinmichels/kava-brewer)_

A program that generates plausible foreign coffee words using a PCFG (probabilistic context-free grammar) and a list of real coffee words.

While traveling across Europe, I observed that many coffee words sounded alike: "koffie", "café", "kava", "kaffee", etc. I figured the rule was something like (1) start with a "k" sound, (2) add a vowel sound "e" "a" or "o," (3) add a consonant sound "f" or "v," (4) end with a vowel sound "e" or "a."

A rule set like this closely resembles a "probabilistic context-free grammar". This is a concept from computational linguistics that I learned about during my Computer Science undergrad. A PCFG tells you which symbols (in this case, letters) you can reach from previous symbols and how likely you are to reach them. It is not so different from current LLMs, though those are more context-full. So, I tried creating a PCFG to generate plausible coffee words.
