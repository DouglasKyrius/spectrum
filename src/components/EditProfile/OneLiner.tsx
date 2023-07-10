import useAuth from '@/hooks/useAuth';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { useState } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@/lib/graphql/update-user.graphql';

const editTitleSchema = z.object({
  oneLiner: z
    .string()
    .nonempty({
      message: 'One-liner is required',
    })
    .max(50, 'Character limit is 50')
    .min(2, ''),
});

type OneLinerData = z.infer<typeof editTitleSchema>;

export const OneLiner = () => {
  const { user } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    setError,
    reset,
    watch,
    getValues,
  } = useForm<OneLinerData>({
    resolver: zodResolver(editTitleSchema),
    defaultValues: {
      oneLiner: user?.title || '',
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update(_, { data }) {
      user.title = getValues().oneLiner;
      reset();
      setShowEdit(false);
    },
    onError({}) {
      setError('oneLiner', {
        message: 'Internal server error, please try again later.',
      });
    },
  });

  const handleChangeTitle: SubmitHandler<OneLinerData> = async ({
    oneLiner,
  }) => {
    await updateUser({
      variables: { input: { id: user?.sub, title: oneLiner } },
    });
  };

  if (showEdit) {
    return (
      <form onSubmit={handleSubmit(handleChangeTitle)} className="w-full">
        <Input
          id="one-liner"
          type="text"
          placeholder="Add a professional one-liner"
          className="lg:h-16 lg:text-4xl leading-relaxed lg:font-bold xl:text-5xl xl:leading-tight lg:placeholder:font-bold"
          hasError={!!errors.oneLiner}
          {...register('oneLiner')}
        />
        <p className="text-xs pl-1 pt-1 text-red-600">
          {errors.oneLiner?.message}
        </p>
        <div className="flex justify-end text-xs text-zinc-700">
          {watch('oneLiner').length}/50
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
        className="w-full hover:bg-zinc-100 transition-all"
        onClick={() => setShowEdit(true)}
      >
        <h1
          className={cn(
            'text-center text-xl leading-relaxed lg:text-start lg:text-4xl lg:font-bold xl:text-5xl xl:leading-tight',
            user?.title ? '' : 'text-zinc-500'
          )}
        >
          {user?.title || 'Add a professional one-liner'}
        </h1>

        <Edit className="absolute top-2 right-2 text-zinc-400" size={18} />
      </button>
    </div>
  );
};
