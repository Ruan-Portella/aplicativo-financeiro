import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { useNewCategory } from '../hooks/use-new-category';
import { CategoryForm, FormValues } from './category-form';
import { useCreateCategory } from '../api/use-create-category';

export default function NewCategoriesSheet() {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    })
  }
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Create a new category to track your transactions.
        </SheetDescription>
        <CategoryForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{name: ''}} />
      </SheetContent>
    </Sheet>
  );
};