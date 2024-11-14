import fs from 'node:fs';

const writePostFile = ({
    fileName,
    fileData
}:{ 
    fileName: string, fileData:string }) => fs.writeFileSync(fileName, fileData, {
    encoding: 'utf-8'
});

const readPostFile = ({ filePath }:{filePath:string}) => fs.readFileSync(filePath, 'utf-8');

const getPostsFiles = ({ directoryPath }) => fs.readdirSync(directoryPath);

const getSlug = ({ file }: {file:string}) => file.replace(/\.md$/, '');

export {
    writePostFile,
    readPostFile,
    getPostsFiles,
    getSlug
};