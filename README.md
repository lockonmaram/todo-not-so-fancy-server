# todo-not-so-fancy-server
Server for "todo not so fancy"

## List API
---

**Public Route**

| Route      | HTTP   |     Description    |
|------------|--------|:------------------:|
| /signup    | POST   | Sign up a user     |
| /login     | POST   | Manual login       |
| /fblogin   | POST   | Login via facebook |

**Users Route**

| Route      | HTTP   |     Description    |
|------------|--------|:------------------:|
| /users     | GET    | Get users          |
| /users/:id | GET    | Get one user       |
| /users     | POST   | Sign up a user     |
| /users/:id | DELETE | Delete a user      |
| /users/:id | PUT    | Update a user      |
