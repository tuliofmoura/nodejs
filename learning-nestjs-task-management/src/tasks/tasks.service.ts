import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id == id);
    if (!found)
      throw new NotFoundException(`Task with ID " ${id}" not found`);
    return found;
  }

  getTasks(filter: GetTaskFilterDTO): Task[] {
    let tasks = this.getAllTasks();
    const { status, search } = filter;
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(task =>
        task.title.includes(search) ||
        task.description.includes(search)
      );
    }
    return tasks;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}
