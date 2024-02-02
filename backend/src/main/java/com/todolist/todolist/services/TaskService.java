package com.todolist.todolist.services;

import com.todolist.todolist.models.Task;
import com.todolist.todolist.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task createNewTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTask() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public List<Task> findAllCompletedTask() {
        return taskRepository.findByCompletedTrue();
    }

    public List<Task> findAllInCompleteTask() {
        return taskRepository.findByCompletedFalse();
    }

    public boolean deleteTask(Long id) {
        Task toBeDeleted = getTaskById(id);
        if (toBeDeleted != null){
            taskRepository.delete(toBeDeleted);
            return true;
        }
        else {
            return false;
        }
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }
}