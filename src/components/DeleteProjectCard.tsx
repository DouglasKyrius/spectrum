import { Trash2, AlertTriangle } from 'lucide-react';
import { Dialog } from './ui/Dialog';
import { Button } from './ui/Button';

export const DeleteProjectCard = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="absolute top-2 right-2 flex justify-center items-center rounded-full w-12 h-12 bg-gray-100 transition-all cursor-pointer z-10 hover:bg-gray-200 xl:top-3 xl:right-3 active:scale-90">
          <button className="font-semibold text-xs text-red-500">
            <Trash2 size={18} />
          </button>
        </div>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Header>
          <AlertTriangle size={60} className="m-auto text-red-600" />
          <Dialog.Title>
            Are you sure you want to delete this project?
          </Dialog.Title>
          <Dialog.Description>
            All project data will be permanently deleted. This cannot be undone.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Button type="submit" variant="danger">
            Delete Project
          </Button>
          <Dialog.Close asChild>
            <Button variant="gray">Never mind</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
