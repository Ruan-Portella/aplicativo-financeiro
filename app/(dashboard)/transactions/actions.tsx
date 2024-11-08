'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction';
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction';
import { useConfirm } from '@/hooks/use-confirm';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

type Props = {
  id: string;
}

export default function Actions({ id }: Props) {
  const [ConfirmDialog, confirm] = useConfirm('Are you sure you want to delete this transaction?', 'You are about to delete this transaction.');
  const deleteMutation = useDeleteTransaction(id);
  const { onOpen } = useOpenTransaction();

  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate();
    }
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='size-8 p-0'>
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={() => onOpen(id)}>
            <Edit className='size-4 mr-2' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
            <Trash className='size-4 mr-2' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
