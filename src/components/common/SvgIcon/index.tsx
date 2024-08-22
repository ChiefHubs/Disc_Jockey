import React, { FC } from 'react';

import {
  ActionIcon,
  AlertIcon,
  ALetterIcon,
  AnalyticsIcon,
  ArrowLeftIcon,
  CalendarIcon,
  CheckboxMarkedIcon,
  CheckboxMissedIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
  ExpandIcon,
  FavoriteIcon,
  HomeIcon,
  MusicIcon,
  LockIcon,
  PlusIcon,
  PhotosIcon,
  SearchIcon,
  StoreIcon,
  VideoIcon,
  UserIcon,
} from './icons';

export interface IconProps {
  name: string;
  color?: string;
  size?: 'tiny' | 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'huge' | 'xHuge';
  animation?: any;
  deg?: number;
  className?: string;
}

const iconsContainer: any = {
  action: ActionIcon,
  alert: AlertIcon,
  'a-letter': ALetterIcon,
  analytics: AnalyticsIcon,
  back: ArrowLeftIcon,
  calendar: CalendarIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-up': ChevronUpIcon,
  'checkbox-marked': CheckboxMarkedIcon,
  'checkbox-missed': CheckboxMissedIcon,
  clock: ClockIcon,
  copy: CopyIcon,
  delete: DeleteIcon,
  edit: EditIcon,
  expand: ExpandIcon,
  favorite: FavoriteIcon,
  home: HomeIcon,
  'most-recent': ClockIcon,
  lock: LockIcon,
  music: MusicIcon,
  plus: PlusIcon,
  photos: PhotosIcon,
  search: SearchIcon,
  video: VideoIcon,
  store: StoreIcon,
  user: UserIcon,
};

export const SvgIcon: FC<IconProps> = (props: IconProps) => {
  const { name, color, size = 'xSmall', animation, deg, className } = props;

  return React.createElement(
    iconsContainer[name],
    { color: !!color ? color : undefined, animation, deg, size, className },
    null,
  );
};