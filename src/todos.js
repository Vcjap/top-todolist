const create = (elements) => {
    return Object.assign(
        {},
        {title: elements.title},
        {dueDate: elements.due_date},
        {priority: elements.priority},
        {description: elements.description},
        {notes: elements.notes},
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
            }
        },
    )
}

export default {create};
