## Quick Start

```
docker-compose up
```

## Development

For development, the `server/` and `client/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The client server is spun up at `localhost:3000` and it proxies internally to the server using the linked name as `server:8080`.

## Production

```
docker-compose -f docker-compose.prod.yml up
```

The application exposed at `localhost:80/`.

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
