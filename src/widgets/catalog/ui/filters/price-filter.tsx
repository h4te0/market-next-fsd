import debounce from 'lodash.debounce';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { Input } from '@/shared/ui/input';
import { Title } from '@/shared/ui/title';
import { RangeSlider } from '@/shared/ui/range-slider';

import type { IPrices } from '../../model/types';

interface Props {
  classname?: string;
  prices: IPrices;
  setPrices: ({}: IPrices) => void;
  maxPrice: number;
  minPrice: number;
}

export const PriceFilter = ({ prices, setPrices, maxPrice, minPrice }: Props) => {
  const updatePrices = debounce((pricesLocal: number[]) => {
    setPrices({ min: pricesLocal[0], max: pricesLocal[1] });
  }, 1000);

  return (
    <div className="mb-2">
      <AccordionItem value="price">
        <AccordionTrigger>
          <Title size="xs">Цена ( ₸ )</Title>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center mt-2 mb-6">
            <Input
              placeholder="От"
              type="number"
              min={minPrice}
              max={maxPrice}
              value={prices.min || minPrice}
              onChange={(e) => setPrices({ min: Number(e.target.value), max: prices.max })}
            />
            <p className="font-bold text-xl mx-2">-</p>
            <Input
              placeholder="До"
              type="number"
              min={minPrice}
              max={maxPrice}
              value={prices.max || maxPrice}
              onChange={(e) => setPrices({ min: prices.min, max: Number(e.target.value) })}
            />
          </div>
          <RangeSlider
            step={10}
            minTotal={minPrice}
            maxTotal={maxPrice}
            value={[prices.min || minPrice, prices.max || maxPrice]}
            onValueChange={updatePrices}
          />
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};
