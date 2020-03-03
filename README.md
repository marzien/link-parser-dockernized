## Quick Start

```
docker-compose up
```

## Limitations

Valid URL format:

```
http://mariusdev.tech
https://mariusdev.tech
https://www.mariusdev.tech
```

Not valid URL format:

```
mariusdev.tech
www.mariusdev.tech
```

- Don't work with SAP.
- If on page is more then one the same size biggest images we return only first image link.

## Assumption

Link is active when request return code `200`.
