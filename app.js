function Task(data) {
    this.title = ko.observable(data.title)
    this.isDone = ko.observable();
}

function TaskListViewModel() {
    var self = this;

    self.search = ko.observable('');
    self.newTaskText = ko.observable();
    self.tasks = ko.observableArray([{
        title: 'Buy milk',
        isDone : ko.observable(false)
    }, {
        title: 'Feed a cat',
        isDone: ko.observable(false)
    }]);

    self.filter = ko.computed(function() {
        var lower = self.search().toLowerCase();
        if (!lower) {
            return self.tasks();
        } else {
            return ko.utils.arrayFilter(self.tasks(), function(task) {
                return task.title.toLowerCase().indexOf(lower) !== -1;
            })
        }
    });

    self.totalTODOCount = ko.computed(function() {
        return self.tasks().length;
    });

    self.incompleteTasks = ko.computed(function() {
        return ko.utils.arrayFilter(self.tasks(), function(task) { return !task.isDone() });
    });


    self.addTask = function() {
        self.tasks.push(new Task({
            title: self.newTaskText(),
            isDone: false
        }))
        self.newTaskText('');
    }
    self.removeTask = function(task) {
        self.tasks.remove(task)
    }


}

ko.applyBindings(new TaskListViewModel());
