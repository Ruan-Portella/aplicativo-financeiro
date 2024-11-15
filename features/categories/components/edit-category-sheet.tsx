import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { CategoryForm, FormValues } from './category-form';
import { useOpenCategories } from '../hooks/use-open-categories';
import { useGetCategory } from '../api/use-get-category';
import { Loader2 } from 'lucide-react';
import { useEditCategory } from '../api/use-edit-category';
import { useDeleteCategory } from '../api/use-delete-category';
import { useConfirm } from '@/hooks/use-confirm';

export default function EditCategoriesSheet() {
  const { isOpen, onClose, id } = useOpenCategories();
  const [ConfirmDialog, confirm] = useConfirm('Are you sure you want to delete this category?', 'You are about to delete this category');

  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = categoryQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    })
  };

  const defaultValues = categoryQuery.data ? {
    name: categoryQuery.data.name,
  } : {
    name: '',
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            Edit an existing category.
          </SheetDescription>
          {
            isLoading ? (
              <div className='absolute inset-0 flex items-center justify-center'>
                <Loader2 className='size-4 text-muted-foreground animate-spin' />
              </div>
            ) : (
              <CategoryForm id={id} onSubmit={onSubmit} disabled={isPending} defaultValues={defaultValues} onDelete={onDelete} />
            )
          }
        </SheetContent>
      </Sheet>
    </>
  );
};
