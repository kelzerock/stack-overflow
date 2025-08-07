import { ToastContext } from '@context';
import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { setQuestionsData } from 'store/questionsDataSlice';
import { rootRequest } from 'utils/request/rootRequest';
import { IoCloseCircle } from 'react-icons/io5';
import { getURLSearchParams } from '@utils';
import { modalStyle } from 'utils/modalStyle';

export const AddAnswer = ({
  open,
  handleClose,
  idQuestion,
}: {
  open: boolean;
  handleClose: () => void;
  idQuestion: string;
}) => {
  const [answer, setAnswer] = useState('');
  const { pushToast } = useContext(ToastContext);
  const handleError = useToastErrorHandler();
  const dispatch = useAppDispatch();
  const links = useAppSelector((state) => state.questionsData.links);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answer.trim()) {
      rootRequest
        .addAnswer({ questionId: idQuestion, content: answer.trim() })
        .then((response) => {
          if (response.ok) {
            pushToast({ type: 'success', message: 'Your answer successfully added!' });
            const query = getURLSearchParams(links?.current || '');
            rootRequest.getQuestions(query).then((res) => dispatch(setQuestionsData(res)));
          }
        })
        .catch((error) => handleError(error))
        .finally(() => handleClose());
    } else {
      pushToast({ type: 'warning', message: 'Please fill all fields!' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target) {
      setAnswer(e.target.value);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      keepMounted
    >
      <Box sx={modalStyle}>
        <IoCloseCircle
          className="absolute top-1 right-1 text-stone-500 hover:cursor-pointer hover:scale-105 transition-transform duration-300"
          size="3em"
          onClick={handleClose}
        />
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Add answer!
        </Typography>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1">
            <TextField
              id="outlined-basic"
              label="Answer"
              variant="outlined"
              value={answer}
              onChange={handleChange}
              className="w-full"
            />

            <Button size="small" variant="contained" color="success" type="submit">
              Publish
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};
