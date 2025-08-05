import { useToastErrorHandler } from '@hooks';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useToastContext } from 'context/ToastContext';
import { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { MdPublishedWithChanges } from 'react-icons/md';
import { CommentForOneSnippetZ } from 'schemas/commentForOneSnippetZ';
import { rootRequest } from 'utils/request/rootRequest';
import z from 'zod';

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

export const EditComment = ({
  commentInfo,
  updatePost,
}: {
  commentInfo: z.infer<typeof CommentForOneSnippetZ>;
  updatePost: () => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState(commentInfo.content);
  const handleError = useToastErrorHandler();
  const { pushToast } = useToastContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target) {
      setComment(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      setIsLoading(true);
      rootRequest
        .updateComment(commentInfo.id, { content: comment.trim() })
        .then(() => pushToast({ type: 'success', message: 'Your comment successfully updated!' }))
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
      <button
        onClick={handleOpen}
        className="p-2 
          bg-stone-300 hover:cursor-pointer hover:bg-stone-400 text-emerald-500 hover:text-emerald-600 transition-colors duration-300 self-start"
      >
        <MdPublishedWithChanges size={30} className=" hover:scale-110" />
      </button>
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
            Update comment
          </Typography>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-1">
              <TextField
                id="outlined-basic"
                label="Answer"
                variant="outlined"
                value={comment}
                onChange={handleChange}
                className="w-full"
              />

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
