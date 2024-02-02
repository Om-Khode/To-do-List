# React App - Todo List

This document provides instructions on setting up and running the To do List locally.

## Technologies Used

- ReactJS
- JavaScript

## Instructions

1. Clone the repository:

   ```
   git clone https://github.com/Om-Khode/To-do-List
   cd To-do-List
   ```

2. Create a .env file in the root directory.

3. Add the following line to the .env file:

   ```
   REACT_APP_API_URL=http://localhost:8080/api/tasks/
   ```

4. Install dependencies:

   ```
   yarn install
   ```

5. Run the app locally:

   ```
   yarn start
   ```

6. Access the app in your browser at 'http://localhost:3000'.

## Features

### Task Management:

- Add a task.
- Edit existing tasks.
- Mark a task as complete or vice versa.

### Sorting and Filtering:

- Implement task sorting options (e.g., by due date).
- Filter tasks by completion status.

### Visual Cues:

- Incorporate visual cues for task priorities.
- Use color-coded indicators based on due dates.
