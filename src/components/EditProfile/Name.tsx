import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditIcon } from 'lucide-react';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '../icons/Badge';
import { BadgeUnchecked } from '../icons/BadgeUnchecked';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@/lib/graphql/update-user.graphql';

const editNameSchema = z.object({
  name: z
    .string()
    .nonempty({
      message: 'Name is required',
    })
    .max(24, 'Character limit is 24')
    .min(2, 'Name must be at least 2 characters long'),
});

type NameData = z.infer<typeof editNameSchema>;

export const Name = () => {
  const { user } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    setError,
    reset,
    watch,
  } = useForm<NameData>({
    resolver: zodResolver(editNameSchema),
    defaultValues: {
      name: user?.displayName || '',
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update(_, { data }) {
      reset();
      setShowEdit(false);
    },
    onError({}) {
      setError('name', {
        message: 'Internal server error, please try again later.',
      });
    },
  });

  const handleSubmitField: SubmitHandler<NameData> = async ({ name }) => {
    try {
      await updateUser({
        variables: { input: { id: user?.sub, displayName: name } },
      });
      user.displayName = name;
    } catch (error) {}
  };

  if (showEdit) {
    return (
      <form onSubmit={handleSubmit(handleSubmitField)} className="w-full">
        <Input
          id="name"
          type="text"
          placeholder="Add your name"
          hasError={!!errors.name}
          {...register('name')}
        />
        <p className="text-start text-xs pl-1 pt-1 text-red-600">
          {errors.name?.message}
        </p>
        <div className="flex justify-end text-xs text-zinc-700">
          {watch('name').length}/24
        </div>
        <div className="flex justify-end gap-x-4 mt-2">
          <Button
            type="submit"
            variant={'outline'}
            size={'sm'}
            onClick={() => {
              reset();
              setShowEdit(false);
            }}
          >
            Cancel
          </Button>
          <Button variant={'black'} size={'sm'} isLoading={isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    );
  }
  return (
    <div className="relative w-full">
      <button
        className="w-full hover:bg-zinc-100 transition-all flex my-2 justify-center items-center text-center"
        onClick={() => setShowEdit(true)}
      >
        <h1
          className={cn(
            'text-3xl font-bold sm:text-4xl bg-name-gradient bg-clip-text text-transparent my-2 text-center',
            user?.displayName ? '' : 'text-zinc-500'
          )}
        >
          {user?.displayName || 'Add yourname'}
        </h1>
        <div className="mx-2">
          {user?.verifiedAccount ? <Badge /> : <BadgeUnchecked />}
        </div>
        <EditIcon className="absolute top-4 right-2 text-zinc-400" size={18} />
      </button>
    </div>
  );
};
