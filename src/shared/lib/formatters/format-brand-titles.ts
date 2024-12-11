import { capitalizeWord } from '../capitalize-word';

export const formatBrandTitles = (brands: string | undefined) => {
  return brands
    ? brands
        .split(',')
        .map((w) => capitalizeWord(w))
        .join(', ')
    : '';
};
