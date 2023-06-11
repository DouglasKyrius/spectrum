'use client';
import { CreateProjectCard } from '@/components/CreateProjectCard';
import { DeleteProjectCard } from '@/components/DeleteProjectCard';
import { useCollapseSidebar } from '@/contexts/CollapseSidebar.context';
import Image from 'next/image';

export function UserProjectsList() {
  const { collapseClick } = useCollapseSidebar();

  return (
    <div
      className={`lg:m-8 flex-1 lg:min-w-[440px] lg:min-h-[700px] xl:my-0 xl:mr-20 ${
        collapseClick ? '2xl:min-w-[640px]' : 'xl:min-w-[640px]'
      }`}
    >
      <div className="w-full hidden lg:block">
        <h1 className="text-4xl leading-relaxed font-bold xl:text-5xl xl:leading-tight">
          Software Engineer
        </h1>
      </div>
      <div className="flex-1 mt-6 flex justify-center">
        <div className="relative w-full flex flex-wrap justify-center gap-y-5 gap-x-5 mx-4 lg:mx-0 lg:flex">
          <CreateProjectCard />
          {/* CARD */}
          {imagesObj.map((imageUrl) => (
            <div
              key={imageUrl}
              className="relative w-full flex flex-col justify-center border max-w-sm h-auto p-4 rounded-2xl bg-white xl:flex-row xl:max-w-full xl:p-8 xl:gap-x-5"
            >
              <DeleteProjectCard />
              <div className="relative xl:min-w-[240px] xl:min-h-[180px]">
                <Image
                  src={imageUrl}
                  quality={60}
                  className="rounded-lg"
                  alt={'Cover image for teste'}
                  width={352}
                  height={264}
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  blurDataURL={`${imageUrl}?auto=format,compress&q=1&blur=500&w=2`}
                  priority
                />
              </div>
              <div className="flex flex-col w-full my-3 gap-y-2 xl:my-0 xl:gap-y-4">
                <h2 className="text-2xl font-semibold xl:text-4xl xl:font-bold">
                  Teeste
                </h2>
                <p className="text-base">Lorem ipsum dolor.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const imagesObj = [
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_WATERMELON_DARK@2x.92227270.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_GREEN_DARK@2x.e15f7484.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_PURPLE_DARK@2x.77cc71e0.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_SALMON_DARK@2x.00c08da5.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_WHITE_DARK@2x.e68bc3f7.webp',
];
