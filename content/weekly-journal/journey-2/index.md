---
title: "Journey 2 - Insomnia, Semantics, Wheels & PyPI"
date: 2024-04-07T23:33:58+08:00
draft: false
---


I'm not in the mood of writing today since something happened within my personal life that I'm not
comfortable talking about just yet. Nonetheless, I've tried to force my self to start getting into
writing just so I won't lose my streak.

I think I'd also need some kind of scratch pad or idea pad where in I could put random topics that
come out during the week so I could have some idea on what to write on my weekly journal.


## Insomnia

It's been happening for a couple of weeks or even months now that I'm having a hard time sleeping.
I'm not sure if it's just my brain trying to become active around 00:00 to 2:00[^1] and it's damn
hard to silence it.

I've tried multiple things to sleep like blinking my eyes fast enough, or focusing on my breathing
like when I was doing meditation, and even resorted to counting sheep!

As of writing this, it's already 00:00 and I guess the root cause of my insomnia is that I'm still
using my devices at this hour.

I forgot to mention -- at work, we do our daily stand ups around 10:00. So I wake up around 9:00,
prepare, and then sometimes just stare at my laptop until it's time to do the daily stand up.
Around 11:00, I stop working and _kind of take a break_ and then cook brunch[^2]. While preparing, I
would also play a podcast from [syntax.fm](https://syntax.fm/) on Spotify or any other interesting
podcast I see on other platforms.

We'd finish eating around 12:30 and then I'll take another break from 13:30 to 14:00 or some times
14:30. I do think that's pretty inefficient and I gotta change that. Anyway, I resume work around
14:30 up to 17:00 and that brings me to around _4 hours_ of recorded work[^3].


Sometimes, I'd work until 18:00 and after that, I'd ride my bike buy food for dinner.

We'd finish eating dinner around 19:30 to 20:00. If it's Tuesday or Thursday, I'd usually take a
bath after going out since I buy dinner downtown and that takes me around 45 minutes to an hour of
riding my bike.


At 20:30, I start working again up until 23:00 or 00:00 so I'd reach a minimum of _7 to 8 hours_ of
working for the day. And that cycle repeats everyday.

Sometimes, I don't even reach the minimum number of hours so those hours gets deducted during the
pay cycle.[^4]


I guess in order to resolve my insomnia, I have to first figure out a working schedule. Plus, I need
time for myself at night.



## Semantics

Last Friday, April 05, 2024, it occurred to me to rewrite our
[capstone project](https://github.com/yujinyuz/nducurriculum) way back 2017 from
CodeIgniter to Django.[^5]


I actually started rewriting it and I'm planning to use [htmx](https://htmx.org) and
[picocss](https://picocss.com/) for the frontend, and Python/Django for the backend.

Although limited functionality, I chose picocss since it focuses more on the developer writing
semantic HTML rather than relying too much on _divs_ and getting distracted with too many options.

It's lightweight and I like the idea of using semantic HTML for structuring your design. It helps a
lot for beginner developers and especially for devs like me who don't write HTMl and CSS that much.


I've managed to do the models in the backend but got distracted with going back and forth with the
documentation for both htmx and picocss, and also looking at other designs for inspiration on how
the web app will look like.

It's still a WIP but I'll probably write about it once I get an MVP done.


## Wheels & PyPI


I talked about Wheels last week and I've created a new repository on structuring Django projects as
if they are python packages and it turned out great. I've forked the original repository and made
some changes to use different tools and it should be good to go. You can check out the repository
[here](https://github.com/yujinyuz/django-as-a-package-layout-template).


While I was trying to create the template, I also wanted to include a default EmailBackend for
Django where it would automatically open the email in your browser whenever an email is sent.

I find this extremely useful especially during development. I wanted to add
[django-naomi](https://github.com/edwinlunando/django-naomi) as the default
but it hasn't been active for the last couple of year and there were some open pull requests in the
main repository so I decided to create a fork of it and called it
[django-unravel](https://github.com/yujinyuz/django-unravel) and published it on
[PyPI](https://pypi.org/project/django-unravel/).


I had fun writing it and kinda gained momentum, and used that momentum to proceed working on the
django rewrite of our capstone project that I talked about earlier.


While I was doing the backend work, I had problems when trying to commit the project since
_ruff+/black_[^6] were not compatible with
[reorder-python-imports](https://github.com/asottile/reorder-python-imports).

The main problem was that neither the maintainers of _black_ or _reorder-python-imports_ would
adjust their packages to make them work together.

It was a miniscule formatting issue where in _reorder-python-imports_ would choose to remove
white-space below _docstrings_ or _imports_ while _black_ chooses to _whitespace_ to it.

Here's the [commit](https://github.com/yujinyuz/django-as-a-package-layout-template/commit/fcffee3)
I created that removes the _reorder-python-imports_ because _isort_ kinda does the same job with
less drama by adding `force-single-line = true`, and _ruff_ includes _isort_ sorting by default.

Well, in _reorder-python-imports_'s defense, it has been like that since _2014_ but I had to choose
between the two and _ruff_ seemed the logical choice for me since it has been widely adopted by the
python community.
Looking at [FastAPI](https://fastapi.tiangolo.com/) and [django-ninja](https://django-ninja.dev/).


Enough of my ranting for this week. Time to snooze :zzz:


[^1]: I prefer using military time.
[^2]: Yes, I'm the one who mostly cooks and we don't do breakfast and only eat twice a day. Though
    we do eat snacks but not that often.
[^3]: Yup. Annoying but we have a time tracker at my current remote work.
[^4]: While we aren't actually required to do _35 to 40 hours_ per week, I still need money so I
    need to reach those hours in order to get a comfortable amount to live with.
[^5]: It's actually a simple web application that solves my problem while I was studying in a
    university where I had to figure out whether I can take a subject or not, and whether it's
    offered in the current semester.
[^6]: _ruff_ is merely following _black_ in terms of it's formatting so I just combined them but I
    primarily use _ruff_ since it is _extremely fast_.
