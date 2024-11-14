"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { use } from "react";

type typeParams = { slug: string };

const EditPage = ({ params }) => {
    const [post, setPost] = useState(null);
    const [mounted, setMounted] = useState(false);

    const unwrappedParams = use(params);
    const { slug } = (unwrappedParams as typeParams);
    
    // const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const fetchPostData = async () => {
        const response = await fetch(`/api/v1/posts/${slug}`);
        const postData = await response.json();
        setPost(postData);
        };

        fetchPostData();
    }, [slug, mounted]);

    if (!mounted) return <p>Loading...</p>;

    if (!post) return <p>Loading post...</p>;

    return (
        <>
        <h2>Update Article</h2>
        <form onSubmit={(e) => e.preventDefault()}>
            <label>Article title</label>
            <input
            type="text"
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            <label>Publishing Date</label>
            <input
            type="date"
            id="date"
            value={post.date}
            onChange={(e) => setPost({ ...post, date: e.target.value })}
            />
            <label>Content</label>
            <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            />
            <input type="button" value="Update" />
        </form>
        </>
    );
};

export default EditPage;