export type tags = {
    _id: string
    tag: string
}

export type ContentType = {
    _id: string,
    title: string,
    type: string,
    tags: tags[]
    content: string,
    createdAt: string
}


