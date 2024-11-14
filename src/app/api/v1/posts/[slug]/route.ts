import { NextResponse } from 'next/server';
import { getPostData } from '../../../../../model/posts.model';

const GET = async (_request, { params }) => {
    const { slug } = await params;
    const post = await getPostData({ slug });
    
    if (!post) return NextResponse.json({ message: `Post with slug ${slug} not found` }, { status: 404 });

    return NextResponse.json(post);
};

export {
    GET
};