---
title: "Changing Caps Lock Key to Escape When Pressed Alone and Control When Pressed With Another"
date: "2021-01-02 18:43:28"
tags:
  - "config"
aliases:
  - "/posts/tips-and-tricks/Changing-caps-lock-key-to-Escape-when-pressed-alone-and-Control-when-pressed-with-another"
---

Like you before, I pretty much didn't give a damn about remmaping my mapping keyboard because I was worried
about what if I'm using someone elses keyboard? I'd be too dependent about my current setup.

But let me ask you. When was the last time you used someone elses keyboard?

After some time living inside the terminal, I noticed that it's quite hard to press the `control` key especially
when you are using a Mac keyboard layout.

It was kinda annoying to reach the `control` key when I want to stop a running program via `<Control C>` or clearing the screen with `<Control L>`.

It was when I was browsing through reddit and found a post where people using `Vim` were suggesting to remap `Caps Lock` to `Escape`
and some were also suggesting to remap `Caps Lock` to `Control`. My current configuration in `Vim` already mapped `jk` to `Escape`
so I took the route of mapping `Caps Lock` to `Contol`. Also, I don't use caps lock much often.

After a few weeks of getting used to my new `Control`, everything felt easier! I almost even questioned why the `Caps Lock` key was
positioned in that beautiful spot and we don't even use it that often.

So, you might be asking what happened to my `Caps Lock` key? I found a tool called `Karabiner Elements` and it basically lets me
create key combinations to execute another key. I trigger my `Caps Lock` key by pressing `Right Command + Right Shift` key together.

Thanks to karabiner, I also converted my `Caps Lock` key to be `Escape` when pressed alone and `Control` when pressed with another key.

Here's how to configure it via `Karabiner Elements`:

1. Download and install it first here: https://karabiner-elements.pqrs.org/docs/getting-started/installation/
2. Next, open Karabiner Elements and click `Complex Modifications`, then click on `Add Rule`.
![alt text](/images/20210102/1.png)
3. Click `Import rules from the Internet (open a web browser)`
4. Search for `caps lock` and then look for `Change caps_lock key (rev 4)` then click on `Import`.
![Change caps_lock key](/images/20210102/2.png)
5. Something similar to this should appear and you should click `Enable`:
![Enable](/images/20210102/3.png)

And we're done!
