---
title: "WalkMA Audit Dashboard"
date: 2026-03-01
summary: "An interactive dashboard visualizing walk audit data for Walk Massachusetts, built in partnership with Tufts University."
emoji: "🚶"
tech: ["JavaScript", "Leaflet", "Google Sheets API", "Netlify"]
description: "An interactive map and dashboard presenting walk audit data for Walk Massachusetts."
---

![WalkMA audit dashboard screenshot](/images/portfolio/walkma.png)

_[[Website]](https://walkma.netlify.app/)_
_[[GitHub]](https://github.com/dustinmichels/walkma-map)_

I built this dashboard as part of a group project at Tufts University, in partnership with [Walk Massachusetts](https://www.walkboston.org/) — a nonprofit founded in 1990 that uses walk audits as a tool to make walking safer and easier across the Commonwealth.

WalkMA maintains a growing spreadsheet of over 114 completed walk audits. As that number grows, they needed a way to present the data accessibly to communities across Massachusetts. This dashboard is the result.

The map displays audit locations as an interactive choropleth, alongside a list of browsable audit cards. Users can search or filter by city, year, or theme. Clicking a card opens a popup with full audit details, pulled live from the underlying Google Sheet.

- **Tools and technologies**: TypeScript, Vue, MapLibre, Go, Google Sheets API, Netlify.
- **Skills showcase**: Interactive web mapping, live data integration, community-centered design, client partnership.
