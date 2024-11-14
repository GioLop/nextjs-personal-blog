type PostIndex = {
    slug: string,
    date: string,
    title: string
}

type Post = PostIndex & {
    content: string
};

type NewPost = {
    title: string,
    date: string,
    content: string
};

export type {
    PostIndex,
    Post,
    NewPost
};