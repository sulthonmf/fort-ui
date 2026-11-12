import { createFortIconResponse } from '@/lib/fort-icon';

export const size = {
  width: 96,
  height: 96,
};

export const contentType = 'image/png';

export default function Icon() {
  return createFortIconResponse(size.width);
}

