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
import { useAppSelector, useToastErrorHandler } from '@hooks';
import { CiSquareRemove } from 'react-icons/ci';
import { rootRequest } from 'utils/request/rootRequest';
import { Tooltip } from '@mui/material';
import { EditSnippet } from './EditSnippet';
import { useNavigate } from 'react-router';
import { UrlPath } from '@enums';

export const Snippet = ({
  snippet,
  isSinglePost = false,
  updatePost,
}: {
  snippet: z.infer<typeof SnippetZ>;
  isSinglePost?: boolean;
  updatePost: () => Promise<void>;
}) => {
  const {
    id: snippetId,
    language,
    user: { username, id: userId },
    code,
    marks,
  } = snippet;
  const navigate = useNavigate();
  const authUserId = useAppSelector((state) => state.user.user.id);
  const isMySnippet = userId === authUserId;

  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const handleError = useToastErrorHandler();

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
  }, [code, language]);

  const handleDeleteComment = () => {
    rootRequest
      .deleteSnippet(snippetId)
      .then(() => {
        if (isSinglePost) {
          navigate(UrlPath.HOME);
        } else {
          updatePost();
        }
      })
      .catch(handleError);
  };

  return (
    <div className="bg-stone-300 flex flex-col gap-3 rounded-sm">
      <div className="flex justify-between p-3 bg-stone-100 border-4 border-stone-300">
        <span className="flex gap-1 items-center bg-stone-300 p-1 rounded-sm">
          <FaUserTie className={`${isMySnippet ? 'text-yellow-600' : ''}`} /> {username}
        </span>
        <span className="flex gap-1 items-center">
          <DiCodeBadge /> {language}
        </span>
      </div>
      <div ref={editorContainerRef} className="p-3"></div>
      <div className="flex justify-between p-3 bg-stone-100 border-4 border-stone-300">
        {!isSinglePost && <CommentLabel snippet={snippet} />}
        <div className="flex gap-3">
          {isMySnippet && (
            <>
              <EditSnippet updatePost={updatePost} snippet={snippet} />
              <Tooltip title="Delete snippet">
                <button
                  className="p-2 
                bg-stone-300 hover:cursor-pointer hover:bg-stone-400 text-red-600 hover:text-red-800 transition-colors duration-300 rounded-md"
                  onClick={handleDeleteComment}
                >
                  <CiSquareRemove size={30} className=" hover:scale-110" />
                </button>
              </Tooltip>
            </>
          )}
          <ReactionsPanel marks={marks} snippetId={snippetId} updatePost={updatePost} />
        </div>
      </div>
    </div>
  );
};
