import { Dispatch, useEffect, useRef } from 'react';
import { basicSetup, EditorView } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';

export const CodeEditor = ({
  code,
  updateCode,
}: {
  code: string;
  updateCode: Dispatch<React.SetStateAction<string>>;
}) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorContainerRef.current) {
      const startState = EditorState.create({
        doc: code,
        extensions: [
          basicSetup,
          javascript(),
          EditorState.readOnly.of(false),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const doc = update.state.doc.toString();
              updateCode(doc);
            }
          }),
        ],
      });

      editorViewRef.current = new EditorView({
        state: startState,
        parent: editorContainerRef.current,
      });
    }

    return () => {
      editorViewRef.current?.destroy();
      editorViewRef.current = null;
    };
  }, []);

  return <div ref={editorContainerRef} className="p-3" />;
};
