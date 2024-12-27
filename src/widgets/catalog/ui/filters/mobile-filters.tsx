import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Filters } from './filters';
import { IFilterProps } from '../../model/types';
import { Button } from '@/shared/ui/button';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  filterProps: IFilterProps;
}

export const MobileFilters = ({ isOpen, handleClose, filterProps }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-full h-full flex flex-col bg-white">
        <DialogTitle className="font-bold">Фильтры</DialogTitle>
        <Filters {...filterProps} classname="p-0 flex w-full h-full" />
        <Button variant={'secondary'} onClick={handleClose}>
          Показать результаты
        </Button>
      </DialogContent>
    </Dialog>
  );
};
