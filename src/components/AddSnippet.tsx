import { useToastErrorHandler } from '@hooks';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useToastContext } from 'context/ToastContext';
import { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { modalStyle } from 'utils/modalStyle';
import { rootRequest } from 'utils/request/rootRequest';
import { SelectLanguage } from './SelectLanguage';
import { CodeEditor } from './CodeEditor';

export const AddSnippet = ({ updatePost }: { updatePost: () => Promise<void> }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const handleError = useToastErrorHandler();
  const { pushToast } = useToastContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (language && code.trim()) {
      console.log({ language, code });
      rootRequest
        .addSnippets({ code, language })
        .then(() => {
          pushToast({ type: 'success', message: 'Snippet successfully added!' });
          setCode('');
          setLanguage('');
        })
        .then(updatePost)
        .catch(handleError)
        .finally(() => {
          setIsLoading(false);
          handleClose();
        });
    } else {
      pushToast({ type: 'warning', message: 'Please fill all fields!' });
    }
  };
  return (
    <>
      <Button onClick={handleOpen} size="small" variant="contained" color="success">
        Create snippet
      </Button>
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
            Create snippet
          </Typography>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1 add-snippet">
              <SelectLanguage language={language} setLanguage={setLanguage} />
              <CodeEditor key={open ? 'open' : 'closed'} code={code} updateCode={setCode} />
              <Button
                size="small"
                variant="contained"
                color="success"
                type="submit"
                loading={isLoading}
              >
                Publish
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
