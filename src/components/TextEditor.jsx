import { React, useState } from 'react';
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";

export default function TextEditor() {
    return (
        <Editor
            height="90vh"
            defaultLanguage="yaml"
            defaultValue="// some comment"
            theme='vs-dark'
        />
    );
}
