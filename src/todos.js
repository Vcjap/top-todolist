const create = (elements) => {
    return Object.assign(
        {},
        {title: elements.title},
        {dueDate: elements.due_date},
        {priority: elements.priority},
        {description: elements.description},
        {notes: elements.notes},
        {completed: elements.completed},
    )
}

export default {create};
