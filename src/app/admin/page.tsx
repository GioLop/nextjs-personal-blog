import Link from "next/link";
import { getSortedPosts } from "../../model/posts.model";

const AdminPage = () => {
    const posts = getSortedPosts();

    return (
        <>
            <Link href={'/'}>Home</Link>
            <h1>Personal Blog Admin</h1>
            <Link href={'/add'}>+ Add</Link>
            <ul>
                    { 
                        posts.map(({ title, slug }, index) => (
                            <li key={`${title}-${index}`}>
                                <Link href={`/edit/${slug}`}>Edit</Link>
                                <button>Delete</button>
                                <Link href={`/posts/${slug}`}>{ title }</Link>
                            </li>
                        ))
                    }
                </ul>
        </>
    );
};

export default AdminPage;