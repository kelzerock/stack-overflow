import { SnippetZ } from '@schemas';
import z from 'zod';
import { DiCodeBadge } from 'react-icons/di';
import { FaUserTie } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import { basicSetup, EditorView } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { ReactionsPanel } from './ReactionsPanel';
import { CommentLabel } from './CommentLabel';

export const Snippet = ({
  snippet,
  isSinglePost = false,
}: {
  snippet: z.infer<typeof SnippetZ>;
  isSinglePost?: boolean;
}) => {
  const {
    id: snippetId,
    language,
    user: { username },
    code,
    marks,
  } = snippet;
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorContainerRef.current) {
      editorViewRef.current = new EditorView({
        doc: code,
        extensions: [basicSetup, javascript({ typescript: false }), EditorState.readOnly.of(true)],
        parent: editorContainerRef.current,
      });
    }

    return () => {
      editorViewRef.current?.destroy();
      editorViewRef.current = null;
    };
  }, [code]);

  return (
    <div className="bg-stone-300 flex flex-col gap-3 rounded-sm">
      <div className="flex justify-between p-3 bg-stone-100 border-4 border-stone-300">
        <span className="flex gap-1 items-center">
          <FaUserTie /> {username}
        </span>
        <span className="flex gap-1 items-center">
          <DiCodeBadge /> {language}
        </span>
      </div>
      <div ref={editorContainerRef} className="p-3"></div>
      <div className="flex justify-between p-3 bg-stone-100 border-4 border-stone-300">
        {!isSinglePost && <CommentLabel snippet={snippet} />}
        <ReactionsPanel marks={marks} snippetId={snippetId} />
      </div>
    </div>
  );
};
