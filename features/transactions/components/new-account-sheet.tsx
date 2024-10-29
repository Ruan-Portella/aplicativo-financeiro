import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { useNewAccount } from '../hooks/use-new-account';
import { AccountForm, FormValues } from './account-form';
import { useCreateAccount } from '../api/use-create-accounts';

export default function NewAccountsSheet() {
  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();

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
          <SheetTitle>New Account</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Create a new account to track your transactions.
        </SheetDescription>
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{name: ''}} />
      </SheetContent>
    </Sheet>
  );
};
