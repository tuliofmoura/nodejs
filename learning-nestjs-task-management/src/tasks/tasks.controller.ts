import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filter: GetTaskFilterDTO): Task[] {
        console.log('filter', filter);
        return this.tasksService.getTasks(filter);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDTO: CreateTaskDTO): Task {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id);
    }
}
