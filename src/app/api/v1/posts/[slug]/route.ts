import { NextResponse } from 'next/server';
import { getPostData } from '../../../../../models/posts.model';

const GET = async (_request, { params }) => {
    const { slug } = await params;
    
    try {
        const post = await getPostData({ slug });
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ message: `${error.message}` }, { status: 404 });  
    }
};

const POST = async (_request, { params }) => {
    console.log(params);
};


export {
    GET,
    POST
};