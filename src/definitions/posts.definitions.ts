type PostIndex = {
    slug: string,
    date: string,
    title: string
}

type Post = PostIndex & {
    content: string
};

export type {
    PostIndex,
    Post
};