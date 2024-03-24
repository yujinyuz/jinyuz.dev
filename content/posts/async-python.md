---
title: "async Python"
date: 2022-06-12T22:08:04+08:00
draft: false
description: ""
tags:
  - ""
categories:
  - ""
---

# TL;DR

When your python code encounters an `await` keyword, it just means that it's going to send the
control back to the event loop to let other functions execute.

`await` lets the CPU know that a coroutine is waiting for an operation that isn't CPU bound e.g.
network requests, database writes, etc.

coroutines always executes sequentially and the event loop is what manages the execution order of
coroutines (via asyncio.gather, asyncio.create_task)


`await` forces asynchronous operations to be completed in series - meaning they are executed as if
they were synchronous functions. This is necessary if the result of the next operation depends on
the result of the last one.


`await` is a checkpoint where it's safe for asyncio to go to another coroutine

For example,
```python
async def display_user():
    user_details = await get_user_details()
    profile_details = await get_profile_details(username=user_details.username)

    print(user_details)
    print(profile_details)
```

get_profile_details requires a username, therefore is dependent on the previous result. That's why
we added an await. But if they are both independent, it's better to create a task and use
`asyncio.gather`

```python
async def dislpay_users_and_locations():
    task_users = asyncio.create_task(get_users())
    task_locations = asyncio.create_task(get_locations())


    users, locations = await aysncio.gather(task_users, task_locations)
    print(users)
    print(locations)
```


Another example

```python
async def get_users():
  users = await session.execute('select * from users')
  return users

asyncio.run(get_users())
```

the `await` keyword here tells the `asyncio` or `event loop`:
  While we wait for the response, feel free to do other stuffs in the mean time


Resources:
- https://docs.python.org/3/library/asyncio-task.html#example-parallel-execution-of-tasks
- https://piped.kavin.rocks/watch?v=8aGhZQkoFbQ
- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
- https://stackoverflow.com/questions/55823011/visualizing-asyncio-coroutines-execution
