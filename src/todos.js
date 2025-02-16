class title {
    constructor(title_text) {
        return title_text
    }
}

class due_date {
    constructor(due_date) {
        return due_date
    }
}

class priority {
    constructor(priority) {
        return priority
    }
}

class description {
    constructor(description) {
        return description
    }
}

class notes {
    constructor(notes) {
        return notes
    }
}

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
