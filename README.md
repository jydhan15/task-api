# Task API

A simple RESTful API for managing personal tasks, built with Express.js.

## Technologies Used
- Node.js
- Express.js
- Postman (testing)
- Render (deployment)

## Installation and Running Locally
1. Clone the repository: `git clone https://github.com/jydhan15/task-api.git`
2. Go to the folder: `cd task-api`
3. Install dependencies: `npm install`
4. Start the server: `npm start`
5. Open `http://localhost:3000`

## Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | / | API status message |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get one task |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Example Request Body (POST /api/tasks)
```json
{
  "title": "Study IM102",
  "description": "Review SQL joins",
  "completed": false
}
```

## Links
- GitHub: https://github.com/jydhan15/task-api
- Render: https://task-api-qm1o.onrender.com

## Known Limitations
- Data is stored in memory, so records reset when the server restarts or redeploys.