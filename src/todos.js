const create = (elements) => {
    return Object.assign(
        {},
        {title: elements.title},
        {due_date: elements.due_date},
        {priority: elements.priority},
        {description: elements.description},
        {notes: elements.notes}
    )
}

const edit = (todo, element, newValue) => {
    todo[`${element}`] = newValue;
    return todo;
}

export default {create, edit};
