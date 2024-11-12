import React from "react";

type RootLayoutType = {
    children: React.ReactNode
};

const RootLayout = ({ children }:RootLayoutType) => (
    <html lang='en'>
        <body>{ children }</body>
    </html>
);

export default RootLayout;