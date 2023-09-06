import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditIcon } from 'lucide-react';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@/lib/graphql/update-user.graphql';

const editBioSchema = z.object({
  bio: z
    .string()
    .nonempty({
      message: 'Bio is required',
    })
    .max(400, 'Character limit is 400'),
});

type BioData = z.infer<typeof editBioSchema>;

export const Bio = () => {
  const { user } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    setError,
    reset,
    watch,
  } = useForm<BioData>({
    resolver: zodResolver(editBioSchema),
    defaultValues: {
      bio: user?.bio || '',
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update(_, { data }) {
      reset();
      setShowEdit(false);
    },
    onError({}) {
      setError('bio', {
        message: 'Internal server error, please try again later.',
      });
    },
  });

  const handleChangeField: SubmitHandler<BioData> = async ({ bio }) => {
    try {
      await updateUser({
        variables: { input: { id: user?.sub, bio } },
      });
      user.bio = bio;
    } catch (error) {}
  };

  if (showEdit) {
    return (
      <form onSubmit={handleSubmit(handleChangeField)} className="w-full">
        <Input
          id="bio"
          type="text"
          placeholder="Add a bio to introduce yourself"
          hasError={!!errors.bio}
          {...register('bio')}
        />
        <p className="text-xs pl-1 pt-1 text-red-600">{errors.bio?.message}</p>
        <div className="flex justify-end text-xs text-zinc-700">
          {watch('bio').length}/400
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
        className="w-full text-start hover:bg-zinc-100 transition-all"
        onClick={() => setShowEdit(true)}
      >
        <h1
          className={cn(
            'flex w-full my-2 justify-center items-center text-center',
            user?.bio ? '' : 'text-zinc-500'
          )}
        >
          {user?.bio || 'Add a bio to introduce youself'}
        </h1>
        <EditIcon className="absolute top-2 right-2 text-zinc-400" size={18} />
      </button>
    </div>
  );
};
