import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { Button, Typography } from '@mui/material';
import { ResponseGetQuestionsZ } from '@schemas';
import { getURLSearchParams } from '@utils';
import { CreateQuestion } from 'components/CreateQuestion';
import { PaginationBlock } from 'components/PaginationBlock';
import { QuestionPost } from 'components/QuestionPost';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { setQuestionsData } from 'store/questionsDataSlice';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

export const QuestionsPage = () => {
  const loadedQuestions = useLoaderData<z.infer<typeof ResponseGetQuestionsZ>>();
  const questionsData = useAppSelector((state) => state.questionsData);
  const { data } = questionsData;

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isAuth = useAppSelector((state) => state.user.isAuth);
  const pagination = useAppSelector((state) => state.questionsData.links);
  const meta = useAppSelector((state) => state.questionsData.meta);
  const dispatch = useAppDispatch();
  const errorHandler = useToastErrorHandler();

  const loadPage = async (url: string) => {
    setIsLoading(true);
    const query = getURLSearchParams(url);
    try {
      dispatch(setQuestionsData(await rootRequest.getQuestions(query)));
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loadedQuestions) dispatch(setQuestionsData(loadedQuestions));
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center">
      <Typography component="h1" sx={{ fontSize: 32, textTransform: 'uppercase', fontWeight: 500 }}>
        Questions from users
      </Typography>
      {isAuth && (
        <>
          <Button size="small" variant="contained" color="success" onClick={handleOpen}>
            Create question
          </Button>
          <CreateQuestion open={open} handleClose={handleClose} />
        </>
      )}
      <PaginationBlock
        pagination={pagination}
        title="questions"
        meta={meta}
        isLoading={isLoading}
        loadPage={loadPage}
      />
      <div className="flex flex-col gap-0.5 p-2 w-full border-2 border-emerald-800 rounded-2xl">
        {data.length === 0 && <h2>Questions absent</h2>}
        {data.length > 0 &&
          data.map((question) => <QuestionPost question={question} key={question.id} />)}
      </div>
    </div>
  );
};
