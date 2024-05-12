---
title: "Journey 6 - Server Crash, Painknee$, Sleepless"
date: 2024-05-04T11:03:28+08:00
draft: false
---

## Server Crash


I just experienced one of the worst things that could happen during a development process -- the API
client I was using [^1] just went down. You can't use it [^2].

Before that, you could use the app even when you were offline. But late September of 2023, they
announced that they would require users to login in order to use the app. I did like it especially
the cloud sync feature, but not to the extent that I can't use the app if your servers are offline!

That wasn't a big deal for me coz I really liked the app, it was easy to use and a great alternative
to the bloated Postman.


But because of the incident, I started looking into alternatives. My main requirements are just an
http client, websocket client, and dynamic variable support. I found `rest.nvim`,
`Insomnium (Insomnia fork)`, `httpie`, `Bruno`, and `RestFox`.

I initially tried _rest.nvim_ because it was a cli tool that works within my text editor. But it
feels unusable for me at the moment. There were some bugs that I experienced, and it didn't have
support for websockets.

`Insomnium` didn't seem to be actively maintained so I skipped that.

`httpie` had a CLI and Desktop app but it kinda felt that something was missing. I couldn't find in
the dynamic variable support within the documentation so I just gave up at that point.

`Bruno` seemed promising but the UI felt clunky and it didn't have dynamic path support. Although
they have an alternative which is the predefined variables. But that didn't feel like the right
approach since the variable should be within the path and not defined elsewhere.

`RestFox` had a classic and pretty straightforward UI. It seems to have everything I need and it has
a file based design in which you can store your workspace in a git repository or somewhere else. I
guess it kinda looks like Postman during its early days.

I'm torn between using `Bruno` and `RestFox`. On paper, `Bruno` seems to be the good choice since it
has funding and will likely be maintained for the next 5 or 10 years but my gut feel is to go with
`RestFox` due to it's simplicity.

I haven't played around with it extensively so expect that I may or may not be changing it.

## Painknee$

Experiencing knee pains again after hiking. I don't know what happened to me, but I really need to
improve my overall physique.

My knees are just getting weaker to the point where a 7 km hike would cause this. I can still walk,
and compared to last time, I can stand and walk better.


I still have a local python event to attend tomorrow and I hope my knees recover and I can ride my
bicycle to go to the venue since I really don't like commuting.

## Sleepless

It's funny how I've been using Insomnia client for a few years now and I guess I've been having lack
of quality sleep.

I guess the Insomnia incident is a sign that I really need to get better quality sleep since it lead
me into looking for alternatives!


[^1]: Insomnia Rest Client
[^2]: https://github.com/Kong/insomnia/issues/7358<br>
      https://github.com/Kong/insomnia/issues/5999
