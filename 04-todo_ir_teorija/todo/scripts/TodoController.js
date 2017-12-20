(function() {
    function TodoController() {
        this.todoList = []
        this.currentFilter = this.always
    }

    TodoController.prototype.issaugoti = function(task) {
        this.todoList.push({ done: false, task: task })
    }

    TodoController.prototype.always = function() {
        return true
    }

    TodoController.prototype.isNotDone = function(item) {
        return !item.done
    }

    TodoController.prototype.isDone = function(item) {
        return item.done
    }

    TodoController.prototype.countNotDone = function() {
        return this.todoList.filter(this.isNotDone).length
        /*
        var count = 0;
        for (var i = 0; i < this.todoList.length; i++) {
            if (!this.todoList[i].done) {
                count++;
            }
        }

        return count*/
    }

    TodoController.prototype.showAll = function() {
        this.currentFilter = this.always
    }

    TodoController.prototype.showActive = function() {
        this.currentFilter = this.isNotDone
    }

    TodoController.prototype.showCompleted = function() {
        this.currentFilter = this.isDone
    }

    TodoController.prototype.remove = function(todoItem) {
        var index = this.todoList.indexOf(todoItem)
        if (index > -1) {
            this.todoList.splice(index, 1)
        }
    }

    function areAllSelected(todoList) {
        return this.todoList.filter(isNotDone).length == 0
        /*
        for (var i = 0; i < todoList.length; i++) {
            if (!todoList[i].done) {
                return false
            }
        }

        return true*/
    }

    TodoController.prototype.selectAll = function() {
        var selectValue = !areAllSelected(this.todoList)
        for (var i = 0; i < this.todoList.length; i++) {
            this.todoList[i].done = selectValue
        }
    }

    TodoController.prototype.clearCompleted = function() {
        for (var i = this.todoList.length - 1; i >= 0; i--) {
            if (this.todoList[i].done) {
                this.todoList.splice(i, 1)
            }
        }
    }

    var todoModule = angular.module('todo')
    todoModule.controller('TodoController', TodoController)
})()
