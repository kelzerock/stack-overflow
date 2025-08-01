import { Button } from '@mui/material';
import { QuestionZ } from '@schemas';
import { useState } from 'react';
import z from 'zod';
import Editor from '@monaco-editor/react';
import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { rootRequest } from 'utils/request/rootRequest';
import { setQuestionsData } from 'store/questionsDataSlice';
import { getURLSearchParams } from '@utils';

export const QuestionPost = ({ question }: { question: z.infer<typeof QuestionZ> }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [editorValue] = useState(question.attachedCode);
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
      <Editor
        height="100px"
        defaultLanguage="javascript"
        defaultValue={attachedCode}
        value={editorValue}
        options={{ readOnly: true }}
      />
      {userAuth.id === id && (
        <Button variant="contained" size="small" color="error" onClick={handleDelete}>
          Delete this question
        </Button>
      )}
      {answers.length === 0 ? noAnswer : answersBlock}
    </div>
  );
};
