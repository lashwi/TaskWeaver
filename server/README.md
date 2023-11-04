# TaskWeaver Server API

## API Endpoints

### /api/v0/me

#### GET
Returns the current logged in user's information.

401 if not logged in.

Example response:
```json
{
  "id": 1,
  "username": "test",
  "email": "test@example.com",
  "ownedBoards": [
    {
      "id": 1,
      "name": "test board"
    }
  ]
}
```

### /api/v0/boards/:id

#### GET
Returns the board with the given id.

404 if board does not exist or user does not have access to it.

Example response:
```json
{
  "id": 1,
  "name": "test board",
  "owner": {
    "id": 1,
    "username": "test",
    "email": "test@example.com"
  },
  "tasks": [
    {
      "id": 1,
      "name": "test task",
      "description": "test description",
      "status": "TODO",
      "assignee": {
        "id": 1,
        "username": "test",
        "email": "test@example.com"
      }
    }
  ]
}
```