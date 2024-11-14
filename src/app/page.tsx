import Link from "next/link";
import { getSortedPosts } from "../models/posts.model";

const IndexPage = () => {
    const posts = getSortedPosts();
    
    return (
        <>
            <h1>Personal Blog</h1>
            <p>Other projects on <a href="#">GitHub</a></p>
            <p>
                This is a simple web blog built in Nextjs,
                this  blog have and admin side where you’ll be asked to login in order to add, edit or delete articles.
            </p>
            <ul>
                { 
                    posts.map(({ title, date, slug }, index) => (
                        <li key={`${title}-${index}`}>
                            <div>{ date }</div>
                            <Link href={`/posts/${slug}`}>{ title }</Link>
                        </li>
                    ))
                }
            </ul>
        </>
    );
};

export default IndexPage;