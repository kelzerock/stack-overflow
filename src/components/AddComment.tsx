import { ToastContext } from '@context';
import { useToastErrorHandler } from '@hooks';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { rootRequest } from 'utils/request/rootRequest';
import { IoCloseCircle } from 'react-icons/io5';

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

export const AddComment = ({
  open,
  handleClose,
  snippetId,
  updatePost,
}: {
  open: boolean;
  handleClose: () => void;
  snippetId: string;
  updatePost: () => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');
  const { pushToast } = useContext(ToastContext);
  const handleError = useToastErrorHandler();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      setIsLoading(true);
      rootRequest
        .addComment({ snippetId: snippetId, content: comment.trim() })
        .then(() => pushToast({ type: 'success', message: 'Your comment successfully added!' }))
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target) {
      setComment(e.target.value);
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
          Add your comment!
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
  );
};
