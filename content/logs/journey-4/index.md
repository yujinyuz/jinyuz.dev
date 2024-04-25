---
title: "Journey 4 - Golang, Micro-Optimization, Will of D"
date: 2024-04-21T14:02:19+08:00
draft: false
---

## Golang

I have been deferring learning Golang for quite a few months now, or probably even year until I saw
YouTube videos of AnthonyGG that got me interested in learning it again.

Probably what piqued my interest in Golang was that I had a task at work that relied on websockets
and I had an implementation of it using Python/Django. I tried implementing our current
implementation in Django into FastAPI and that seemed to clear some things that I have been doing
wrong in the Django implementation.

I know FastAPI would be good enough for the use case but what made me want to learn Golang is that
it might introduce me to newer concepts especially async  programming. I still don't think async and
I still remember the first time I encountered async code which made me even question about its
benefits.

I remember it looked something like this and that `async` did not even make sense because it was
still executing things in order and that the execution of the code stops in each line.

```javascript
const token = await fetch('https://my.api.url/token')
const userDetails = await fetch('https://my.api.url/users/me', { Authorization: token.data })
```

I do have some better understanding now where the given example above is not really a good example
of using `async`. It would be useful in a given circumstance where you want to perform requests that
do not depend on each other:

```javascript
const updateSettings = fetch('https://my.api.url/users/me', { method: 'PATCH' }) // patch
const getNewDetails = fetch('https://my.api.url/users/me')

const data = await Promise.all([updateSettings, getNewDetails])
```

If the update endpoint takes around _2 seconds_ and the get new details around _5 seconds_, the
total time it would take for those to finish is equivalent to the longest request which is
_5 seconds_.

One good thing I keep in mind when working with async is that things get done depending on the how
fast the _weakest link_ is.

If that was synchronous, total request time would take around _7 seconds_.

Going back, I'm learning Golang with
[learn-go-with-tests](https://quii.gitbook.io/learn-go-with-tests).

It's been really good so far but I haven't gotten too far yet as I am still in the _Structs,
methods, & interfaces_ section.

Would I recommend this to beginners? Probably not as the examples require some basic understanding
of programming languages.

I think I was lucky enough that the university I went to in college taught us programming in C. I
initially hated the idea after graduating because we never really got to use C when I landed my
first job.

I even spent my vacant time in college in the library learning about pointers. Damn, that
was baffling.

I never really got to use my knowledge with pointers but it gave me a good understanding of
programming later on. Especially now that it's quite common to see pointers in Golang!


## Micro-Optimizations

I haven't planned this during the weekend but, what I thought of was a _< 2-hour_ task turned out
to be a whole day task. Well, it wasn't that bad since I quite enjoyed it. But damn, I got into a
rabbit hole of micro-optimizing.

I initially wanted to update my dotfiles config wherein during the week, I learned about vim's
`:global` and `:vglobal` commands. I haven't used it enough but I was pretty sure I wanted to
incorporate it into my workflow.

My current mappings for `/` and `?` was working well but I wanted to use vim's _very magic_ mode
with `:global` and `:vglobal` as well so I had to update my config.

I ended up extracting [this](https://github.com/yujinyuz/dotfiles/commit/ea086a) part of my config
and written it into a plugin instead and called it
[very-magic-slash.nvim](https://github.com/yujinyuz/very-magic-slash.nvim).

Things didn't quite end there after extracting it into a plugin as I was trying to fix something
that isn't even a big deal in the first place where the plugin was taking around `0.40~0.67ms` to
load.

It's not that bad. It's just that I didn't want it to take that long as well as I wanted it to be
around `<0.1ms`.

I event went ahead and tried to reduce the _lines of code_ of the plugin but it just would reduce
the overall readability for it.

I gave up as that seems to be the normal and I could just lazy load the plugin on a keypress.

What a waste of my weekend for such tiny benefits![^1]


## Will of D

We can become good friends if you get the reference! It might be a coincidence since they release
new episodes on a _Sunday_. But this has nothing to do with it. Just thought it might be a good
addition to the _title_.

I just wanted to talk about this since I saw a reel right after waking up and it talked about the
signs you might be having if you lack _Vitamin D_.

Almost all of the things listed on that video were things that I felt:

* Always getting sick -- well, not really always but I feel like I easily get sick nowadays.
* Tiredness
* Stuck in throat sensation -- where I feel like something is always stuck in my throat that I have
  to always clear it.
* Tight neck and back -- I don't know whether this is because of the deficiency or do I just lack a
  better posture!

It almost felt like that video was a sign that I should go out and take a walk in the morning even
just for a bit so I'd get a little bit of that Vitamin D. I might need to look into my diet as well
since I really think that I have _Vitamin D_ deficiencies, and exercise!

Anyway, that's it for this week! I hope I get better at writing my journey and choosing topics, as
it sometimes feels like a random brain fart that I want talk about whenever I start writing.


[^1]: I'm just exaggerating here since I did quite enjoy having to improve my QoL as a developer but
    I could've spent the time into something else. Well, what's done is done
