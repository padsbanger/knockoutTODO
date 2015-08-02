function Task(data) {
    this.title = ko.observable(data.title)
}

function TaskListViewModel() {
    var self = this;
    self.newTaskText = ko.observable();
    self.tasks = ko.observableArray([{
        title: 'Buy milk'
    }, {
        title: 'Feed a cat'
    }]);

    self.addTask = function() {
        if (self.newTaskText.length > 0) {
            self.tasks.push(new Task({
                title: self.newTaskText()
            }))
            self.newTaskText('');
        }

    }
    self.removeTask = function(task) {
      self.tasks.remove(task)
    }
}

ko.applyBindings(new TaskListViewModel());
