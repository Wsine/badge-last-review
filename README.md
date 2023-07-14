# badge-last-review

![Last Review](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fbadge-last-review.wsine.workers.dev%2Fwsine%2Fbadge-last-review&query=%24.reviewed_at&label=last%20review&color=orange)
![Last Review](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.github.com%2Frepos%2Fwsine%2Fbadge-last-review&query=%24.updated_at&label=last%20review)

**Motivation**

Show the last review timestamp of the repository in order to signal the repository is not yet "dead" without a meaningless commit.

**How to use**

Put the following into your repository README.md. Remember to modify the repository URL to yours.

```markdown
![Last Review](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.github.com%2Frepos%2F<user>%2F<repo>&query=%24.updated_at&label=last%20review)
```

If you prefer a better date format, deploy and use the cloudflare worker.

```markdown
![Last Review](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2F<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev%2F<user>%2F<repo>&query=%24.reviewed_at&label=last%20review)
```

Just update the description of the repository, then the display badge will be updated (maybe with some delay).

**Thanks**

- https://shields.io/
- https://developers.cloudflare.com/workers/
