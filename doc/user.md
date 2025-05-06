# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "test",
  "password": "tset",
  "name": "Test"
}
```

Response Body:

```json
{
  "data": {
    "username": "test",
    "name": "test test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "test",
  "password": "tset"
}
```

Response Body:

```json
{
  "data": {
    "username": "test",
    "name": "test test",
    "token": "session_id_generated"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or password is wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body:

```json
{
  "data": {
    "username": "test",
    "name": "test test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "password": "tset", //optional if want to change password
  "name": "Test" //optional if want to change name
}
```

Response Body:

```json
{
  "data": {
    "username": "test",
    "name": "test test"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username already registered"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers :

- Authorization : token

Response Body:

```json
{
  "data": true
}
```
