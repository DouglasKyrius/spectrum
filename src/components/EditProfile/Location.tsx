import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { EditIcon, MapPin } from 'lucide-react';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { UPDATE_USER } from '@/lib/graphql/update-user.graphql';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';

const editLocationSchema = z.object({
  location: z
    .string()
    .nonempty({
      message: 'Location is required',
    })
    .max(40, 'Character limit is 40'),
});

type LocationData = z.infer<typeof editLocationSchema>;

export const Location = () => {
  const { user } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    setError,
    reset,
    watch,
  } = useForm<LocationData>({
    resolver: zodResolver(editLocationSchema),
    defaultValues: {
      location: user?.location || '',
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update(_, { data }) {
      reset();
      setShowEdit(false);
    },
    onError({}) {
      setError('location', {
        message: 'Internal server error, please try again later.',
      });
    },
  });

  const handleChangeField: SubmitHandler<LocationData> = async ({
    location,
  }) => {
    try {
      await updateUser({
        variables: { input: { id: user?.sub, location } },
      });
      user.location = location;
    } catch (error) {}
  };

  if (showEdit) {
    return (
      <form onSubmit={handleSubmit(handleChangeField)} className="w-full">
        <Input
          id="location"
          type="text"
          placeholder="Location"
          hasError={!!errors.location}
          {...register('location')}
        />
        <p className="text-xs pl-1 pt-1 text-red-600">
          {errors.location?.message}
        </p>
        <div className="flex justify-end text-xs text-zinc-700">
          {watch('location').length}/40
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
            user?.location ? '' : 'text-zinc-500'
          )}
        >
          <div className="inline-flex justify-center items-center gap-x-2">
            <MapPin size={18} />
            <p className="text-base">{user?.location || 'Location'}</p>
          </div>
        </h1>
        <EditIcon className="absolute top-2 right-2 text-zinc-400" size={18} />
      </button>
    </div>
  );
};
