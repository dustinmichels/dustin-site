---
title: "Children's Bike Safety Mapping Tool"
date: 2025-12-01
summary: "An interactive map scoring cycling network segments by safety, targeted towards children and other vulnerable riders."
emoji: "🗺️"
tech: ["ArcGIS", "Python", "GIS", "OpenStreetMap"]
description: "An interactive safety map for cyclists in Somerville, MA, with customizable parameters for parents and children."
---

![bike stress model screenshot](/images/portfolio/bike-safety.png)

_[[Website]](https://dustinmichels.github.io/bike-stress-model/)_
_[[About]](https://arcg.is/1ziaPD1)_
_[[GitHub]](https://github.com/dustinmichels/bike-stress-model)_

This interactive map assigns a composite safety score to each segment of the cycling network in Somerville, MA, targeted towards the needs of children and other vulnerable riders.

The score weighs three factors: the level of infrastructure separation, street busyness, and posted speed. All parameters are customizable, so parents can fine-tune the model to reflect their own thresholds and their child's comfort level.

**How it was made:** I pulled Somerville's cycling network from OpenStreetMap using the Python package `osmnx`, then extracted and cleaned relevant tags to feed into the scoring logic. For example, OSM uses `cycleway:lane` for a non-protected bike lane and `cycleway:track` for a protected one — but a `cycleway:buffer` tag can also appear, complicating the picture. Some analysts treat a buffered lane as equivalent to a protected track; others don't. I resolved this by introducing a custom `lane_buffered` category that scores just below a full track. The frontend is built with TypeScript and Vue, using Leaflet for the interactive map.

**Safe routes to school:** Using my custom safety classifications, I extended the project to identify schools and neighborhoods most in need of infrastructure improvements. I simulated bike journeys from every census block centroid in Somerville to every school — first weighted by safety score (safest route), and then by distance (shortest path). The gap between the two reveals how much safety a rider has to sacrifice to avoid a long detour.

For each route I computed a weighted mean safety score (weighted by segment length), the min and max segment scores, and the total route length. Grouping these by school surfaces which schools are surrounded by genuinely dangerous infrastructure versus those that are well-served — a useful signal for where to prioritize future investment.

- **Tools and technologies**: Python, osmnx, TypeScript, Vue, Leaflet, OpenStreetMap.
- **Skills showcase**: Geospatial network analysis, custom scoring logic, OSM data cleaning, interactive web mapping, user-centered design.
