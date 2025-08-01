import { ToastContext } from '@context';
import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { Editor, OnChange } from '@monaco-editor/react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { setQuestionsData } from 'store/questionsDataSlice';
import { rootRequest } from 'utils/request/rootRequest';
import { IoCloseCircle } from 'react-icons/io5';
import { getURLSearchParams } from '@utils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: { xs: '100%', sm: '90%', md: '600px' },
  height: { xs: '100vh', sm: '80vh' },
  maxHeight: { xs: '100vh', sm: '500px' },
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const CreateQuestion = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const initialQuestion: { title: string; description: string; attachedCode: string } = {
    title: '',
    description: '',
    attachedCode: '',
  };
  const [question, setQuestion] = useState(initialQuestion);
  const { pushToast } = useContext(ToastContext);
  const handleError = useToastErrorHandler();
  const dispatch = useAppDispatch();
  const links = useAppSelector((state) => state.questionsData.links);

  const handleChangeEditor: OnChange = (value) => {
    const handleValue = value === undefined ? '' : value;
    setQuestion((prev) => ({ ...prev, attachedCode: handleValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, attachedCode } = question;
    if (title && description && attachedCode) {
      rootRequest
        .addQuestion(question)
        .then((response) => {
          if (response.ok) {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof typeof question
  ) => {
    if (e.target) {
      setQuestion((prev) => ({ ...prev, [key]: e.target.value }));
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IoCloseCircle
          className="absolute top-1 right-1 text-stone-500 hover:cursor-pointer hover:scale-105 transition-transform duration-300"
          size="3em"
          onClick={handleClose}
        />
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Create your own question! Fill the form.
        </Typography>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={(e) => handleChange(e, 'title')}
              className="w-full"
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              onChange={(e) => handleChange(e, 'description')}
            />
            <Editor
              height="100px"
              defaultLanguage="javascript"
              defaultValue={question.attachedCode}
              value={question.attachedCode}
              onChange={handleChangeEditor}
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
