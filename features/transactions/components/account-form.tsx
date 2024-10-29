import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { insertAccountsSchema } from '@/db/schema';
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
} from '@/components/ui/form';

const formSchema = insertAccountsSchema.pick({
  name: true,
});

export type FormValues = z.infer<typeof formSchema>;

type AccountFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: AccountFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 pt-4'>
        <FormField name='name' control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <FormControl>
              <Input placeholder='e.g Cash, Bank, Credit Card' disabled={disabled} {...field} />
            </FormControl>
          </FormItem>
        )} />
        <Button className='w-full' disabled={disabled}>
          {
            id ? "Save Changes" : "Create Account"
          }
        </Button>
        {
          !!id && (
            <Button type='button' disabled={disabled} onClick={handleDelete} className='w-full' variant='outline'>
              <Trash className='size-4 mr-2' />
              Delete Account
            </Button>
          )
        }
      </form>
    </Form>
  );
}