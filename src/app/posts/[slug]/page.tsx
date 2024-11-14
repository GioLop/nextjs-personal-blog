import Link from "next/link";
import { getPostData, getPostsSlug } from "../../../models/posts.model";

const generateStaticParans = () => {
    return getPostsSlug();
};

const PostPage = async ({ params }) => {
    const { slug } = await params;

    try {
        const post = await getPostData({ slug });

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
    } catch (error) {
        return <div>{`${error.message}`}</div>
    }
};

export {
    generateStaticParans
};

export default PostPage;