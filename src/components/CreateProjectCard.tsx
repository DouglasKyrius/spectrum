import { Button } from './ui/Button';
import { Dialog } from './ui/Dialog';

export const CreateProjectCard = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center border max-w-sm h-auto p-4 rounded-2xl bg-white xl:flex-row xl:max-w-full xl:px-12 xl:py-8 xl:gap-x-16">
      <div className="max-w-[240px]">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="active:scale-90 w-20 h-20 p-0.5 rounded-full border-2 border-[#e6e8ec] hover:bg-[#f5f6f9] transition-all">
              <span className="flex items-center justify-center text-2xl">
                +
              </span>
            </button>
          </Dialog.Trigger>
          <Dialog.Content className="sm:max-w-[425px]">
            <Dialog.Header>
              <Dialog.Icon
                src="/assets/icon-project-96.png"
                alt="project icon"
                width={72}
                height={72}
              />
              <Dialog.Title>Create a new project</Dialog.Title>
              <Dialog.Description>
                Fill out the form below to create a new project.
              </Dialog.Description>
            </Dialog.Header>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="username" className="text-right">
                  Username
                </label>
                <input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <Dialog.Footer>
              <Button type="submit">Add Project</Button>
              <Dialog.Close asChild>
                <Button variant="gray">Cancel</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </div>
      <div className="flex flex-col w-full my-3 gap-y-2 xl:my-0 xl:gap-y-4 text-center xl:text-left">
        <h1 className="text-xl font-semibold xl:text-2xl xl:font-bold">
          Create a Project
        </h1>
        <p className="text-sm xl:text-base text-slate-600">
          Projects highlight your best skills and experience. ⭐️
        </p>
      </div>
    </div>
  );
};
