import { Button } from '@mui/material';
import { QuestionZ } from '@schemas';
import { useState } from 'react';
import z from 'zod';

export const QuestionPost = ({ question }: { question: z.infer<typeof QuestionZ> }) => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    user: { username },
    title,
    attachedCode,
    description,
    answers,
  } = question;

  const handleClick = () => {
    setIsVisible(!isVisible);
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
      <span>{attachedCode}</span>
      {answers.length === 0 ? noAnswer : answersBlock}
    </div>
  );
};
