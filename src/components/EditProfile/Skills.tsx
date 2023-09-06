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

const editSkillsSchema = z.object({
  skills: z
    .string()
    .nonempty({
      message: 'Skills is required',
    })
    .max(24, 'Character limit is 24')
    .min(2, 'Name must be at least 2 characters long'),
});

type SkillsData = z.infer<typeof editSkillsSchema>;

export const Skills = () => {
  const { user } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<SkillsData>({
    resolver: zodResolver(editSkillsSchema),
    defaultValues: {
      skills: '',
    },
  });

  const handleSubmitField: SubmitHandler<SkillsData> = async ({ skills }) => {
    console.log(skills);
  };

  if (showEdit) {
    return (
      <form onSubmit={handleSubmit(handleSubmitField)} className="w-full">
        <div
          className={cn(
            'rounded-md border border-input py-2 hover:border-[#9ba2b0] focus-within:border-[#222834] hover:focus-within:border-[#222834] transition-colors',
            !!errors.skills ? 'border-red-500' : ''
          )}
        >
          <div className="inline-flex flex-wrap justify-center gap-2">
            {user?.techs.map((tag: string) => (
              <div
                key={tag}
                className="inline-flex items-center h-8 w-auto whitespace-nowrap py-2.5 px-3 bg-white rounded-2xl border lg:rounded-3xl"
              >
                <span className="flex flex-grow text-xs font-sans lg:text-sm">
                  {tag}
                </span>
              </div>
            ))}
          </div>
          <input type="text" className="outline-none ml-2" />
        </div>
        <p className="text-start text-xs pl-1 pt-1 text-red-600">
          {errors.skills?.message}
        </p>
        <div className="flex justify-end text-xs text-zinc-700">
          {watch('skills').length}/24
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
          <Button variant={'black'} size={'sm'}>
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
        {user?.techs.length ? (
          <div className="flex w-full my-2 justify-center items-center text-center">
            <div className="inline-flex flex-wrap justify-center gap-y-2">
              {user.techs.map((tag: string) => (
                <div
                  key={tag}
                  className="inline-flex items-center h-8 w-auto whitespace-nowrap mx-1.5 py-2.5 px-3 bg-white rounded-2xl border lg:rounded-3xl shadow-xl shadow-cyan-100/30"
                >
                  <span className="flex flex-grow text-xs font-sans lg:text-sm">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="flex w-full my-2 justify-center items-center text-center text-zinc-500">
            Add a new skill
          </h1>
        )}

        <EditIcon className="absolute top-4 right-2 text-zinc-400" size={18} />
      </button>
    </div>
  );
};
