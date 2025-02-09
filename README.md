# Flow board App

A simple Task Management application built with React. This app allows users to add, edit, delete, and mark tasks as complete. All tasks are persisted using the browser's local storage, meaning data will remain even after refreshing the page.

## Features
- Add new tasks with a title and description
- Add new Columns for additional boards
- Edit existing tasks
- Delete tasks
- Data persistence using local storage

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Rajesh0078/flow-board
   ```
2. Navigate to the project directory:
   ```sh
   cd flow-board
   ```
3. Install dependencies:
   ```sh
   npm install --force
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Usage
- Open the app in the browser at `http://localhost:3000/`
- Enter a task title and description, then click "Add Task" to create a task.
- Use the edit button to modify a task.
- Click the delete button to remove a task.
- The tasks will be stored in the browser's local storage.

## Local Storage Implementation
The app uses `localStorage` to persist tasks. Whenever a task is added, edited, or deleted, the task list is updated in local storage. On app load, tasks are retrieved from local storage.

## Technologies Used
- React.js
- Local Storage API
- JavaScript (ES6+)
- Tailwindcss
- Context API (state management)

## Future Enhancements
- Add due dates and priority levels
- Implement drag-and-drop task ordering
- Add categories and filters
- Sync with a backend (optional)

## License
This project is open-source and available under the [MIT License](LICENSE).

