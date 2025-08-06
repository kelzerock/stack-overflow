import { useToastErrorHandler } from '@hooks';
import { Box, Button, Modal, Tooltip, Typography } from '@mui/material';
import { useToastContext } from 'context/ToastContext';
import { useEffect, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { modalStyle } from 'utils/modalStyle';
import { rootRequest } from 'utils/request/rootRequest';
import { SelectLanguage } from './SelectLanguage';
import { CodeEditor } from './CodeEditor';
import { MdPublishedWithChanges } from 'react-icons/md';
import z from 'zod';
import { SnippetZ } from '@schemas';

export const EditSnippet = ({
  updatePost,
  snippet,
}: {
  updatePost: () => Promise<void>;
  snippet: z.infer<typeof SnippetZ>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const handleError = useToastErrorHandler();
  const { pushToast } = useToastContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setCode(snippet.code);
    setLanguage(snippet.language);
  }, [snippet.code, snippet.language]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ language, code });
    setIsLoading(true);
    if (language && code.trim()) {
      rootRequest
        .updateSnippet(snippet.id, { code, language })
        .then(() => {
          pushToast({ type: 'success', message: 'Snippet successfully updated!' });
        })
        .then(updatePost)
        .catch(handleError)
        .finally(() => {
          handleClose();
          setIsLoading(false);
        });
    } else {
      pushToast({ type: 'warning', message: 'Please fill all fields!' });
    }
  };
  return (
    <>
      <Tooltip title="Update snippet">
        <button
          onClick={handleOpen}
          className="p-2 
        bg-stone-300 hover:cursor-pointer hover:bg-stone-400 text-emerald-500 hover:text-emerald-600 transition-colors duration-300 self-start rounded-md"
        >
          <MdPublishedWithChanges size={30} className=" hover:scale-110" />
        </button>
      </Tooltip>
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
              <CodeEditor code={code} updateCode={setCode} />
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
