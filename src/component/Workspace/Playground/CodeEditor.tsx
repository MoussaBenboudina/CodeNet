import React from "react";
import MonacoEditor from "@monaco-editor/react";
import { javascript } from "@codemirror/lang-javascript";

type EditorProps = {
  userCode: any;
  onChange: any;
};

const CodeEditor: React.FC<EditorProps> = ({ userCode, onChange }) => {
  return (
    <div className="w-full h-full">
      <MonacoEditor
        theme="vs-dark"
        language="javascript"
        value={userCode}
        onChange={onChange}
      />
    </div>
  );
};

export default CodeEditor;
