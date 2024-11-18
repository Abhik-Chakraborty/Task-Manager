const { findTaskById } = require('../fileUtils');

describe('findTaskById', () => {
    const mockTasks = [
        { _id: 'task1', title: 'Test Task 1', description: 'Description 1' },
        { _id: 'task2', title: 'Test Task 2', description: 'Description 2' },
        { _id: 'task3', title: 'Test Task 3', description: 'Description 3' },
    ];

    it('should return the correct task when a valid ID is provided', () => {
        const taskId = 'task2';
        const result = findTaskById(mockTasks, taskId);
        expect(result).toEqual({
            _id: 'task2',
            title: 'Test Task 2',
            description: 'Description 2',
        });
    });

    it('should return undefined when an invalid ID is provided', () => {
        const taskId = 'invalid-id';
        const result = findTaskById(mockTasks, taskId);
        expect(result).toBeUndefined();
    });

    it('should return undefined when no tasks exist', () => {
        const taskId = 'task1';
        const result = findTaskById([], taskId);
        expect(result).toBeUndefined();
    });
});
