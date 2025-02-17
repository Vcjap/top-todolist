const create = (elements) => {
    return Object.assign(
        {},
        {title: elements.title},
        {dueDate: elements.due_date},
        {priority: elements.priority},
        {description: elements.description},
        {notes: elements.notes},
        {completed: elements.completed},
        {
            updateTitle(newTitle) {
                this.title = newTitle;
            },
            updateDueDate(newDueDate) {
                this.dueDate = newDueDate;
            },
            updatePriority(newPriority) {
                this.priority = newPriority;
            },
            updateDescription(newDescription) {
                this.description = newDescription;
            },
            updateNotes(newNotes) {
                this.notes = newNotes;
            },
            updateCompleted(newCompleted) {
                this.completed = newCompleted;
            }
        },
    )
}

export default {create};
