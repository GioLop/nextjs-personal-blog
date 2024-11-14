import path from 'node:path';
import fs from  'node:fs';
import matter from 'gray-matter';
import { NewPost, Post, PostIndex } from '../definitions/posts.definitions';
import { getDateFormated } from '../lib/date.lib';
import { remark } from 'remark';
import html from 'remark-html';

const POST_DIRECTORY = path.join(process.cwd(), 'posts');

const writePostFile = ({
    fileName,
    fileData
}:{ fileName: string, fileData:string }) => fs.writeFileSync(fileName, fileData, {
    encoding: 'utf-8'
});

const readPostFile = ({ filePath }:{filePath:string}) => fs.readFileSync(filePath, 'utf-8');

const getPostsFiles = () => fs.readdirSync(POST_DIRECTORY);

const getSlug = ({ file }: {file:string}) => file.replace(/\.md$/, '');

const getSortedPosts = () => {
    const files = getPostsFiles();
    
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
    const files = getPostsFiles();

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

const createPost = async (post: NewPost) => {

};

export {
    getSortedPosts,
    getPostsSlug,
    getPostData,
    createPost
};