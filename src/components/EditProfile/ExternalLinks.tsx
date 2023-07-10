import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { Edit, PlusIcon } from 'lucide-react';
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineDribbble,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from 'react-icons/ai';
import { PiLinkBold } from 'react-icons/pi';
import { GoTrash } from 'react-icons/go';
import { z } from 'zod';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { UPDATE_USER } from '@/lib/graphql/update-user.graphql';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { Dialog } from '../ui/Dialog';

const editLinksSchema = z.object({
  href: z
    .string()
    .nonempty({
      message: 'URL is required',
    })
    .transform((value) =>
      value.indexOf('://') === -1 ? 'https://' + value : value
    )
    .pipe(z.string().url()),
  socialNetwork: z
    .string()
    .nonempty({
      message: 'Name is required',
    })
    .trim(),
});

type LinksData = z.infer<typeof editLinksSchema>;

function selectSocialIcon(url: string) {
  if (url.includes('github.com')) return <AiFillGithub size={26} />;
  if (url.includes('instagram.com')) return <AiOutlineInstagram size={26} />;
  if (url.includes('linkedin.com')) return <AiFillLinkedin size={26} />;
  if (url.includes('dribbble.com')) return <AiOutlineDribbble size={26} />;
  if (url.includes('twitter.com')) return <AiOutlineTwitter size={26} />;
  return <PiLinkBold size={26} />;
}

export const ExternalLinks = () => {
  const { user } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [showAddLink, setShowAddLink] = useState(false);
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<LinksData>({
    resolver: zodResolver(editLinksSchema),
    defaultValues: {
      href: '',
      socialNetwork: '',
    },
  });

  useEffect(() => {
    if (!showEdit) {
      setTimeout(() => {
        setShowAddLink(false);
      }, 100);
      reset();
    }
  }, [showEdit, reset]);

  const [updateUser] = useMutation(UPDATE_USER, {
    update(_, { data }) {
      setShowAddLink(false);
      reset();
    },
    onError({}) {
      setFetchError('Internal server error, please try again later.');
    },
  });

  const handleChangeField: SubmitHandler<LinksData> = async ({
    href,
    socialNetwork,
  }) => {
    setFetchError('');
    const socialLinks = user?.externalLinks as Array<{}>;
    socialLinks.push({ href, socialNetwork });
    await updateUser({
      variables: { input: { id: user?.sub, externalLinks: socialLinks } },
    });
  };

  const handleDelete = async (idx: number) => {
    const socialLinks = user?.externalLinks as Array<{}>;
    socialLinks.splice(idx, 1);
    await updateUser({
      variables: { input: { id: user?.sub, externalLinks: socialLinks } },
    });
  };

  return (
    <>
      <Dialog.Root open={showEdit} onOpenChange={setShowEdit}>
        <Dialog.Trigger asChild>
          <div className="relative w-full hover:bg-zinc-100 transition-all cursor-pointer">
            <div
              className={cn(
                'flex w-full my-2 justify-center items-center text-center',
                user?.externalLinks.length ? '' : 'text-zinc-500'
              )}
            >
              {user?.externalLinks.length ? (
                <div className="flex gap-x-4">
                  {user.externalLinks.map((externalLink: any) => {
                    return (
                      <TooltipProvider key={externalLink.href}>
                        <Tooltip>
                          <TooltipTrigger>
                            <a
                              href={externalLink.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {selectSocialIcon(externalLink.href)}
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{externalLink.socialNetwork}</p>
                            <p>{externalLink.href}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              ) : (
                <h1>Add your social links</h1>
              )}
            </div>
            <Edit className="absolute top-2 right-2 text-zinc-400" size={18} />
          </div>
        </Dialog.Trigger>
        <Dialog.Content className="sm:max-w-3xl">
          <Dialog.Header>
            <Dialog.Title>Add Your Links</Dialog.Title>
            <div className="flex gap-x-7 m-auto text-zinc-400 pb-4">
              <AiOutlineInstagram size={26} />
              <AiFillGithub size={26} />
              <PiLinkBold size={26} />
              <AiFillLinkedin size={26} />
              <AiOutlineDribbble size={26} />
              <AiOutlineTwitter size={26} />
            </div>
            <Dialog.Description>
              Add any links that showcase your work, recognition, personality
              and more!
            </Dialog.Description>
          </Dialog.Header>
          {showAddLink ? (
            <form
              onSubmit={handleSubmit(handleChangeField)}
              className="grid gap-y-4 w-full max-w-md m-auto"
            >
              {fetchError ? (
                <p className="text-xs pl-1 pt-1 text-red-600">
                  Internal server error, please try again later.
                </p>
              ) : null}
              <div>
                <Input
                  id="url"
                  type="text"
                  label="URL"
                  placeholder=""
                  {...register('href')}
                />
                <p className="text-xs pl-1 pt-1 text-red-600">
                  {errors.href?.message}
                </p>
              </div>
              {}
              <div>
                <Input
                  icon={selectSocialIcon(watch('href'))}
                  id="linkName"
                  type="text"
                  label="Name your link"
                  placeholder=""
                  {...register('socialNetwork')}
                />
                <p className="text-xs pl-1 pt-1 text-red-600">
                  {errors.socialNetwork?.message}
                </p>
              </div>
              <div className="flex flex-col items-center gap-y-4 sm:justify-center md:flex-row-reverse gap-x-4">
                <Button type="submit" variant="black" isLoading={isSubmitting}>
                  Save Link
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset();
                    setShowAddLink(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid justify-center">
                <Button
                  onClick={() => setShowAddLink(true)}
                  variant="outline"
                  className="gap-x-2 text-zinc-800"
                >
                  <PlusIcon className="text-zinc-700" />
                  Add Link
                </Button>
              </div>
              {user?.externalLinks.length ? (
                <div className="grid w-full gap-y-2 max-w-sm mx-auto">
                  <div className="flex text-xs text-zinc-700">
                    {user.externalLinks.length}/6
                  </div>
                  {user.externalLinks.map((externalLink: any, idx: number) => {
                    return (
                      <div
                        key={externalLink.href}
                        className="flex w-full h-14 justify-between items-center rounded-md transition-all px-2 hover:bg-zinc-100"
                      >
                        <div className="flex my-2 gap-x-4">
                          {selectSocialIcon(externalLink.href)}
                          <h1 className="font-semibold">
                            {externalLink.socialNetwork}
                          </h1>
                        </div>
                        <div className="flex gap-x-4">
                          {/* <PiPencilSimpleDuotone
                            className="text-[#4a5264] hover:text-yellow-500 transition-all"
                            size={24}
                          /> */}
                          <button
                            type="button"
                            onClick={() => handleDelete(idx)}
                          >
                            <GoTrash
                              className="text-[#4a5264] hover:text-red-500 transition-all"
                              size={24}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </>
          )}
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
