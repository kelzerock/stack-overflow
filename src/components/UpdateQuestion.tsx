import { ToastContext } from '@context';
import { useAppDispatch, useAppSelector, useToastErrorHandler } from '@hooks';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { setQuestionsData } from 'store/questionsDataSlice';
import { rootRequest } from 'utils/request/rootRequest';
import { IoCloseCircle } from 'react-icons/io5';
import { getURLSearchParams } from '@utils';
import { basicSetup } from 'codemirror';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';

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

type InitialData = { title: string; description: string; attachedCode: string };

export const UpdateQuestion = ({
  open,
  handleClose,
  initialQuestion,
  id,
}: {
  open: boolean;
  handleClose: () => void;
  initialQuestion: InitialData;
  id: string;
}) => {
  const [question, setQuestion] = useState(initialQuestion);
  const { pushToast } = useContext(ToastContext);
  const handleError = useToastErrorHandler();
  const dispatch = useAppDispatch();
  const links = useAppSelector((state) => state.questionsData.links);

  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorContainerRef.current) {
      editorViewRef.current = new EditorView({
        doc: initialQuestion.attachedCode,
        extensions: [basicSetup, javascript({ typescript: false }), EditorState.readOnly.of(false)],
        parent: editorContainerRef.current,
      });
    }

    return () => {
      editorViewRef.current?.destroy();
      editorViewRef.current = null;
    };
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = editorViewRef.current?.state.doc.toString();
    const { title, description } = question;
    if (title && description && content) {
      rootRequest
        .updateQuestion(id, { ...question, attachedCode: content })
        .then((response) => {
          if (response.ok) {
            pushToast({ type: 'success', message: 'Your question successfully updated!' });
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
      keepMounted
    >
      <Box sx={style}>
        <IoCloseCircle
          className="absolute top-1 right-1 text-stone-500 hover:cursor-pointer hover:scale-105 transition-transform duration-300"
          size="3em"
          onClick={handleClose}
        />
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Update your own question!
        </Typography>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={question.title}
              onChange={(e) => handleChange(e, 'title')}
              className="w-full"
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={question.description}
              onChange={(e) => handleChange(e, 'description')}
            />
            <div
              ref={editorContainerRef}
              className="border-2 border-stone-600  bg-stone-300 rounded-md p-3"
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
