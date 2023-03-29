# Hackathon

## Setup
From project root run following commands:
```bash
# Initialize containers
$ ./scripts/compose.sh dev up -d

# Rebuild single container
$ ./scripts/compose.sh dev up -d --build --force-recreate --no-deps <service_name>

# Verify running containers
$ ./scripts/compose.sh dev ps

# Stop containers
$ ./scripts/compose.sh dev stop
```
