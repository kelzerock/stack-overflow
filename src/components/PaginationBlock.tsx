import { Button, ButtonGroup, Typography } from '@mui/material';
import { PageLinksZ, PaginationMetadataZ } from '@schemas';
import z from 'zod';

export const PaginationBlock = ({
  pagination,
  isLoading,
  loadPage,
  meta,
  title,
}: {
  isLoading: boolean;
  pagination: z.infer<typeof PageLinksZ> | null;
  loadPage: (url: string) => Promise<void>;
  meta: z.infer<typeof PaginationMetadataZ> | null;
  title: string;
}) => {
  return (
    <div className="w-5/6 bg-stone-100 rounded-md p-2 gap-1 flex-col flex items-center">
      <ButtonGroup variant="contained" size="small" aria-label="Basic button group">
        <Button
          disabled={!pagination?.first}
          loading={isLoading}
          onClick={() => loadPage(pagination?.first || '')}
        >
          First
        </Button>
        <Button
          disabled={!pagination?.previous}
          loading={isLoading}
          onClick={() => loadPage(pagination?.previous || '')}
        >
          Prev
        </Button>
        <Button
          disabled={isLoading}
          color="info"
          sx={{
            pointerEvents: 'none',
          }}
        >
          Current: {meta?.currentPage}
        </Button>
        <Button
          disabled={!pagination?.next}
          loading={isLoading}
          onClick={() => loadPage(pagination?.next || '')}
        >
          Next
        </Button>
        <Button
          disabled={!pagination?.last}
          loading={isLoading}
          onClick={() => loadPage(pagination?.last || '')}
        >
          Last
        </Button>
      </ButtonGroup>
      <Typography component="span" sx={{ fontSize: '.6rem' }}>
        Total {title}: {meta?.totalItems}
      </Typography>
      <Typography component="span" sx={{ fontSize: '.6rem' }}>
        Total pages: {meta?.totalPages}
      </Typography>
    </div>
  );
};
