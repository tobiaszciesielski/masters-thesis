import type { PageProps } from 'gatsby';
import { WindowLocation } from '@reach/router';

declare global {
  type _PageProps<T> = PageProps<object, object, WindowLocation['state'], T>;
}
