import { Button } from '@mui/material';
import { QuestionZ } from '@schemas';
import { useEffect, useRef, useState } from 'react';
import z from 'zod';
import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { rootRequest } from 'utils/request/rootRequest';
import { setQuestionsData } from 'store/questionsDataSlice';
import { getURLSearchParams } from '@utils';
import { UpdateQuestion } from './UpdateQuestion';
import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';

export const QuestionPost = ({ question }: { question: z.infer<typeof QuestionZ> }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleError = useToastErrorHandler();
  const userAuth = useAppSelector((state) => state.user.user);
  const links = useAppSelector((state) => state.questionsData.links);
  const dispatch = useAppDispatch();

  const {
    user: { username, id },
    title,
    attachedCode,
    description,
    answers,
    id: idQuestion,
  } = question;

  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorContainerRef.current) {
      editorViewRef.current = new EditorView({
        doc: attachedCode,
        extensions: [basicSetup, javascript({ typescript: false }), EditorState.readOnly.of(true)],
        parent: editorContainerRef.current,
      });
    }

    return () => {
      editorViewRef.current?.destroy();
      editorViewRef.current = null;
    };
  }, [attachedCode]);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleDelete = () => {
    rootRequest
      .deleteQuestion(idQuestion)
      .then((response) => {
        if (response.ok) {
          const query = getURLSearchParams(links?.current || '');
          rootRequest.getQuestions(query).then((res) => dispatch(setQuestionsData(res)));
        }
      })
      .catch((error) => handleError(error));
  };

  const answersBlock = (
    <>
      <Button size="small" variant="contained" color="primary" onClick={handleClick}>
        {isVisible ? 'close answer' : 'See answers'}
      </Button>
      {isVisible && (
        <>
          <span>answer:</span>
          <div className=" border-2 rounded-md p-1 flex flex-col gap-0.5">
            {answers.map(({ content, id }) => (
              <p key={id} className=" bg-stone-100 p-1 break-words">
                {content}
              </p>
            ))}
          </div>
        </>
      )}
    </>
  );

  const noAnswer = <span>Nobody answered this question.</span>;
  return (
    <div key={question.id} className="p-2 bg-emerald-200 rounded-md flex flex-col gap-1">
      <span>
        <strong>ID: </strong>
        {question.id}
        <strong>Username: </strong>
        {username}
      </span>
      <span>
        <strong>Title: </strong>
        {title}
      </span>
      <span>
        <strong>Description: </strong>
        {description}
      </span>
      <div
        ref={editorContainerRef}
        className="border-2 border-stone-600  bg-stone-300 rounded-md p-3"
      />
      {userAuth.id === id && (
        <>
          <Button variant="contained" size="small" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" size="small" color="warning" onClick={handleOpen}>
            Update
          </Button>
          <UpdateQuestion
            open={open}
            handleClose={handleClose}
            id={idQuestion}
            initialQuestion={{
              title: title,
              description: description,
              attachedCode: question.attachedCode || '',
            }}
          />
        </>
      )}
      {answers.length === 0 ? noAnswer : answersBlock}
    </div>
  );
};
