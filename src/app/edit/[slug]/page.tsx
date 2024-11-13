import { getPostData } from "../../../model/posts.model";

const EditPage = async ({ params }) => {
    const { slug } = await params;
    const post = await getPostData({ slug });
    return <h1>Edit content for {`${slug}`}</h1>;
};

export default EditPage;