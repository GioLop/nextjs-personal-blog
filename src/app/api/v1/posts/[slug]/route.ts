import { NextResponse } from 'next/server';
import { getPostData } from '../../../../../model/posts.model';
import { error } from 'console';

const GET = async (_request, { params }) => {
    const { slug } = await params;
    const post = await getPostData({ slug });
    console.log(post);

    if (!post) return NextResponse.json({ message: 'Post not found' }, { status: 404 });

    return NextResponse.json(post);
};

export {
    GET
};