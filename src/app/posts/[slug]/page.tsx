import Link from "next/link";
import { getPostData, getPostsSlug } from "../../../model/posts.model";

const generateStaticParans = () => {
    return getPostsSlug();
};

const PostPage = async ({ params }) => {
    const { slug } = await params;
    
    const post = await getPostData({ slug });
    
    if (!post) {
        return <div>Post not found!</div>
    }

    return (
        <>  
            <Link href='/'>Home</Link>
            <h1>{post.title}</h1>
            <div>
                <p>{post.date}</p>
            </div>
            <article>
                {post.content}
            </article>
        </>
    );
};


export {
    generateStaticParans
};

export default PostPage;