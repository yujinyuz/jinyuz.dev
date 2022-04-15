---
title: "Faking Google Cloud Storage in Python"
date: "2020-12-27 20:49:11"
tags:
  - "python"
aliases:
  - "/posts/tips-and-tricks/Faking-google-cloud-storage-in-Python"
---

I had a problem where I couldn't register to google cloud and use the google cloud storage service.
Tried searching online and found this repository: https://github.com/fsouza/fake-gcs-server

It has great documentation and you can also run it if you have docker installed:

```shell
$ docker run -d --name fake-gcs-server -p 4443:4443 fsouza/fake-gcs-server
```

I had a task to upload files to google cloud storage but I wasn't given access to the bucket.
We were using docker and I was able to easily add it to our `docker-compose.yml` file:

```yaml
version: '2'
services:
  mygooglecloudstorage:
    container_name: mygooglecloudstorage
    image: fsouza/fake-gcs-server
    ports:
      - "4443:4443"
    volumes:
      - ./gcs/data:/data # This just prepopulates data
```

And since I wanted to use it locally first, I created a file called `fake_gcs.py` with the following content:

```python
def get_fake_client():
    import requests
    import urllib3
    from google.api_core.client_options import ClientOptions
    from google.auth.credentials import AnonymousCredentials
    from google.cloud import storage
    my_http = requests.Session()
    my_http.verify = False  # disable SSL validation
    urllib3.disable_warnings(
        urllib3.exceptions.InsecureRequestWarning
    )  # disable https warnings for https insecure certs

    client = storage.Client(
        credentials=AnonymousCredentials(),
        project="test",
        _http=my_http,
        client_options=ClientOptions(api_endpoint='https://127.0.0.1:4443'),
    )
    return client
```

I did this so that I could easily replace `client = storage.Client()` with `client = get_fake_client()` later
when I push my code.

`storage.Client()` package uses the `GOOGLE_APPLICATION_CREDENTIALS` environment variable so there wasn't much of a problem
switching between the original and the fake client.

Now, you can perform regular operations in your fake server like you normally would in the original server.

```python
from fake_gcs import get_fake_client

client = get_fake_client()
bucket = client.bucket('sample-bucket')
blob = bucket.get_blob('test_file.txt')
```

