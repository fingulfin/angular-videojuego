import { IsActiveMatchOptions } from '@angular/router';

export type NavigationItem = {
  id: string;
  label: string;
  description?: string;
  route?: string;
  icon?: string;
  badge?: string;
  children?: NavigationItem[];
  disabled?: boolean;
  expanded?: boolean;
  activeOptions?: { exact: boolean } | IsActiveMatchOptions;
};

export const NAVIGATION: NavigationItem[] = [
  {
    id: 'extras',
    label: 'Videjuego',
    description: 'Administracion del videjuego',
    children: [
      {
        id: 'extras/maestros',
        label: 'Maestros',
        description: 'Manage maestros data and configurations',
        route: '/admin/maestros',
        activeOptions: { exact: false },
      },
    ],
  },
];