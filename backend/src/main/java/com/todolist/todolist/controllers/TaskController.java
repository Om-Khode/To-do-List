package com.todolist.todolist.controllers;

import com.todolist.todolist.models.Task;
import com.todolist.todolist.response.ApiResponse;
import com.todolist.todolist.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@Controller
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/")
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTask());
    }
    @GetMapping("/completed")
    public ResponseEntity<List<Task>> getAllCompletedTasks() {
        return ResponseEntity.ok(taskService.findAllCompletedTask());
    }
    @GetMapping("/incomplete")
    public ResponseEntity<List<Task>> getAllIncompleteTasks() {
        return ResponseEntity.ok(taskService.findAllInCompleteTask());
    }
    @PostMapping("/")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        if (task == null || task.getTitle() == null || task.getDueDate() == null || task.getTitle().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Task createdTask = taskService.createNewTask(task);
        return ResponseEntity.ok(createdTask);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        return task != null ? ResponseEntity.ok(task) : ResponseEntity.notFound().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTaskData) {
        if (id == null || updatedTaskData == null) {
            return ResponseEntity.badRequest().build();
        }

        Task existingTask = taskService.getTaskById(id);

        if (existingTask == null) {
            return ResponseEntity.notFound().build();
        }

        if (updatedTaskData.getTitle() != null) {
            existingTask.setTitle(updatedTaskData.getTitle());
        }

        if (updatedTaskData.getDescription() != null) {
            existingTask.setDescription(updatedTaskData.getDescription());
        }

        if (updatedTaskData.isCompleted() != existingTask.isCompleted()) {
            existingTask.setCompleted(updatedTaskData.isCompleted());
        }

        if (updatedTaskData.getDueDate() != null) {
            existingTask.setDueDate(updatedTaskData.getDueDate());
        }

        Task updatedTask = taskService.updateTask(existingTask);

        return ResponseEntity.ok(updatedTask);
    }

    @PutMapping("/complete/{id}")
    public ResponseEntity<ApiResponse> completeTask(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }

        Task existingTask = taskService.getTaskById(id);

        if (existingTask == null) {
            return ResponseEntity.notFound().build();
        }

        existingTask.setCompleted(!existingTask.isCompleted());

        Task updatedTask = taskService.updateTask(existingTask);

        ApiResponse response = new ApiResponse(true);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteTask(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.deleteTask(id));
    }
}
