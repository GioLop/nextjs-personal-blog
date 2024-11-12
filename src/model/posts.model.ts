import path from 'node:path';
import fs from  'node:fs';
import matter from 'gray-matter';
import { Post } from '../definitions/posts.definitions';
import { getDateFormated } from '../lib/date.lib';

const postsDirectory = path.join(process.cwd(), 'posts');

const getSortedPosts = () => {
    const files = fs.readdirSync(postsDirectory);
    
    const postsData = files.map((file) => {
        const id = file.replace(/\.md$/, '');
        const filePath = path.join(postsDirectory, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const { data: { title, date }  } = matter(fileContent);

        return {
            id,
            title,
            date: getDateFormated(date)
        } as Post;
    });

    return postsData.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1);
};

export {
    getSortedPosts
};