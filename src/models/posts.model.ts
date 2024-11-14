import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkStringify from 'remark-stringify';

import {
    NewPost,
    Post,
    PostIndex,
    PostUpdates
} from '../definitions/posts.definitions';
import {
    writePostFile,
    readPostFile,
    getPostsFiles,
    getSlug
} from '../lib/fs.lib';
import { getDateFormated } from '../lib/date.lib';

const POST_DIRECTORY = path.join(process.cwd(), 'posts');

const getSortedPosts = () => {
    const files = getPostsFiles({ directoryPath: POST_DIRECTORY });
    
    const postsData = files.map((file) => {
        const slug = getSlug({ file });
        const filePath = path.join(POST_DIRECTORY, file);
        const fileContent = readPostFile({ filePath });

        const { data: { title, date }  } = matter(fileContent);

        return {
            slug,
            title,
            date: getDateFormated(date)
        } as PostIndex;
    });

    return postsData.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1);
};

const getPostsSlug = () => {
    const files = getPostsFiles({ directoryPath: POST_DIRECTORY });

    return files.map((file) => ({
        slug: getSlug({ file })
    }));
};

const getPostData = async ({ slug }: { slug:string }) => {
    const filePath = path.join(POST_DIRECTORY, `${slug}.md`);
    
    try {
        const fileData = readPostFile({ filePath });

        const { data, content } = matter(fileData);

        const processedContent = await remark().use(html).process(content);

        return {
            slug,
            content: processedContent.toString(),
            ...data
        } as Post;    
    } catch (error) {
        throw new Error(`Error while reading ${filePath} file: ${error.message} `);
    }
};

const createPost = async ({ title, date, content }: NewPost) => {
    const metadata = {
        title,
        date: new Date(date).toISOString()
    };
    const fileContent = matter.stringify(content, metadata);
    const processedContent = await remark().use(remarkStringify).process(fileContent);
    const fileName = title.toLocaleLowerCase().replace(' ', '_');
    
    writePostFile({
        fileName,
        fileData: processedContent.toString()
    });
};

const updatePost = async (updates: PostUpdates) => {

};

export {
    getSortedPosts,
    getPostsSlug,
    getPostData,
    createPost,
    updatePost
};