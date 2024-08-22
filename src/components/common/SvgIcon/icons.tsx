import React from 'react';

export interface IconProps {
  name: string;
  color?: string;
  size?: 'tiny' | 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'huge' | 'xHuge';
  animation?: any;
  deg?: number;
  className?: string;
}

export const iconSizes = {
  tiny: 8,
  xSmall: 12,
  small: 16,
  medium: 24,
  large: 32,
  xLarge: 48,
  huge: 64,
  xHuge: 96,
};

const ActionIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 3 14" fill="none" className={className}>
      <rect y="0.5" width="3" height="3" rx="1.5" fill="currentColor" />
      <rect y="5.5" width="3" height="3" rx="1.5" fill="currentColor" />
      <rect y="10.5" width="3" height="3" rx="1.5" fill="currentColor" />
    </svg>
  );
};

const AlertIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 12 14" fill="none" className={className}>
      <path
        d="M6 1.375C3.74065 1.375 1.90909 3.20656 1.90909 5.46591V9.14773C1.90909 9.72046 1.5 10.375 1.5 10.375H10.5C10.5 10.375 10.0909 9.72046 10.0909 9.14773V5.46591C10.0909 3.20656 8.25935 1.375 6 1.375Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M3.75 12.625H8.25" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
};

const ALetterIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 18 18" fill="none" className={className}>
      <path
        d="M1.25 13.4816H2.43889L3.41641 11.0407H7.44542L8.42295 13.4816H9.65146L6.13764 4.44141H4.77703L1.25 13.4816ZM3.75987 10.0205L5.42431 5.66829L7.10196 10.0205H3.75987Z"
        fill="currentColor"
      />
      <path
        d="M16.75 12.513H16.4198C16.1159 12.513 15.9706 12.358 15.9706 12.0351V9.19395C15.9706 8.43199 15.7328 7.85084 15.2573 7.43757C14.7817 7.02431 14.1212 6.81768 13.2626 6.81768C12.4436 6.81768 11.7831 6.99848 11.2811 7.36009C10.7791 7.72169 10.4885 8.22536 10.4093 8.87109H11.4925C11.5585 8.53531 11.7435 8.27702 12.0473 8.07038C12.3511 7.86375 12.7342 7.76044 13.2098 7.76044C13.7382 7.76044 14.1477 7.88958 14.4383 8.12204C14.7289 8.36742 14.8874 8.7032 14.8874 9.12937V9.58138H12.9059C12.0209 9.58138 11.3472 9.76219 10.8848 10.1109C10.4225 10.4725 10.1979 10.9762 10.1979 11.6348C10.1979 12.2289 10.4225 12.7067 10.8716 13.0425C11.3208 13.3912 11.9284 13.5591 12.6814 13.5591C13.6589 13.5591 14.4119 13.1974 14.9403 12.4613C14.9403 12.7971 15.0459 13.0554 15.2309 13.2233C15.4158 13.4041 15.7196 13.4816 16.1556 13.4816H16.75V12.513ZM14.8874 10.4725V10.7953C14.8874 11.3636 14.6893 11.8156 14.3194 12.1514C13.9363 12.4871 13.4211 12.655 12.7606 12.655C12.3115 12.655 11.9548 12.5646 11.6906 12.358C11.4264 12.1643 11.2943 11.906 11.2943 11.5702C11.2943 10.847 11.7963 10.4725 12.8003 10.4725H14.8874Z"
        fill="currentColor"
      />
    </svg>
  );
};

const AnalyticsIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 18 18" fill="none" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H4.60465V18H0V0ZM1.25581 1.25581V16.7442H3.34884V1.25581H1.25581Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.69727 3.13867H11.3019V17.9991H6.69727V3.13867ZM7.95308 4.39449V16.7433H10.0461V4.39449H7.95308Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3945 7.32617H17.9992V18.0006H13.3945V7.32617ZM14.6503 8.58199V16.7448H16.7434V8.58199H14.6503Z"
        fill="currentColor"
      />
    </svg>
  );
};

const ArrowLeftIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 18 18" fill="none" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.65434 9.62802L8.76316 13.7368L7.875 14.625L2.25 9L7.875 3.375L8.76316 4.26316L4.65434 8.37198L15.75 8.37198L15.75 9.62802L4.65434 9.62802Z"
        fill="currentColor"
      />
    </svg>
  );
};

const CalendarIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg height={realSize} width={realSize} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className}>
      <path d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z">
      </path>
    </svg>
  );
};

const CheckboxMarkedIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 18 18" fill="none" className={className}>
      <path
        d="M16.275 16.275H1.72503V1.725H16.275V16.275Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M4.5 8.4375L7.59375 11.8125L13.7812 5.0625"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
};

const CheckboxMissedIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 18 18" fill="none" className={className}>
      <path
        d="M16.275 16.275H1.72503V1.725H16.275V16.275Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5 9.67422H4.5V8.32422H13.5V9.67422Z"
        fill="currentColor"
      />
    </svg>
  );
};

const ChevronDownIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 10 6" fill="none" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 1.23494L1.27542 0.5L5 4.03013L8.72458 0.5L9.5 1.23494L5 5.5L0.5 1.23494Z"
        fill="currentColor"
      />
    </svg>
  );
};

const ChevronUpIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 10 6" fill="none" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 4.76506L8.72458 5.5L5 1.96988L1.27542 5.5L0.5 4.76506L5 0.500001L9.5 4.76506Z"
        fill="currentColor"
      />
    </svg>
  );
};

const ClockIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 18 18" fill="none" className={className}>
      <rect x="1.6" y="1.6" width="14.8" height="14.8" rx="7.4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 4V9L13 12" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
};

const CopyIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 18 18" fill="none" className={className}>
      <path
        d="M16.4 16.4H6.60002V6.6H16.4V16.4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 1H12.2V6.1C12.2 6.43137 11.9314 6.7 11.6 6.7C11.2686 6.7 11 6.43137 11 6.1V2.2H2.2V11H6.60001C6.93138 11 7.20001 11.2686 7.20001 11.6C7.20001 11.9314 6.93138 12.2 6.60001 12.2H1V1Z"
        fill="currentColor"
      />
    </svg>
  );
};

const DeleteIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M3.975 5.1H14.025V16.4H3.975V5.1Z" stroke="currentColor" strokeWidth="1.2" />
      <rect x="6.83008" y="7.93945" width="1.2" height="5.625" fill="currentColor" />
      <rect x="9.98047" y="7.93945" width="1.2" height="5.625" fill="currentColor" />
      <rect x="16.875" y="4.5" width="1.35" height="15.75" transform="rotate(90 16.875 4.5)" fill="currentColor" />
      <rect x="12.375" y="1.125" width="1.35" height="6.75" transform="rotate(90 12.375 1.125)" fill="currentColor" />
    </svg>
  );
};

const EditIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M9.45307 1.725H16.275V8.54693L7.67045 17.1515L0.848528 10.3295L9.45307 1.725Z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12.375" cy="5.625" r="0.5625" fill="currentColor" stroke="currentColor" strokeWidth="1.125" />
    </svg>
  );
};

const ExpandIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 16 14" fill="none" className={className}>
      <path d="M0 1L7 1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M0 7L16 7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 13L16 13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
};

const FavoriteIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 18 18" fill="none" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.30401 1.69532C8.52308 1.03385 9.47692 1.03385 9.69599 1.69532L11.2471 6.37899H16.2668C16.9757 6.37899 17.2705 7.26899 16.6969 7.6778L12.636 10.5725L14.1871 15.2561C14.4062 15.9176 13.6345 16.4677 13.061 16.0588L9 13.1642L4.93902 16.0588C4.36549 16.4677 3.59382 15.9176 3.81289 15.2561L5.36404 10.5725L1.30306 7.6778C0.729538 7.26899 1.02429 6.37899 1.73321 6.37899H6.75286L8.30401 1.69532ZM9 3.07887L7.71469 6.95984C7.61672 7.25565 7.33574 7.45594 7.0187 7.45594H2.85934L6.22433 9.8545C6.48082 10.0373 6.58814 10.3614 6.49017 10.6572L5.20486 14.5382L8.56986 12.1396C8.82634 11.9568 9.17366 11.9568 9.43014 12.1396L12.7951 14.5382L11.5098 10.6572C11.4119 10.3614 11.5192 10.0373 11.7757 9.8545L15.1407 7.45594H10.9813C10.6643 7.45594 10.3833 7.25565 10.2853 6.95984L9 3.07887Z"
        fill="currentColor"
      />
    </svg>
  );
};

const HomeIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg height={realSize} width={realSize} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className={className}>
      <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z">
      </path>
    </svg>
  );
};

const LockIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg height={realSize} width={realSize} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className}>
      <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z">
      </path>
    </svg>
  );
};

const MusicIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg height={realSize} width={realSize} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className}>
      <path d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z">
      </path>
    </svg>
  );
};

const PlusIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 18 18" fill="none" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.25 15.75V2.25H9.45V15.75H8.25Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 8.32422L15.75 8.32422L15.75 9.52422L2.25 9.52422L2.25 8.32422Z"
        fill="currentColor"
      />
    </svg>
  );
};

const PhotosIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg height={realSize} width={realSize} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className={className}>
      <path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v208c0 44.112 35.888 80 80 80h336zm96-80V80c0-26.51-21.49-48-48-48H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48h384c26.51 0 48-21.49 48-48zM256 128c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-96 144l55.515-55.515c4.686-4.686 12.284-4.686 16.971 0L272 256l135.515-135.515c4.686-4.686 12.284-4.686 16.971 0L512 208v112H160v-48z">
      </path>
    </svg>
  );
};

const SearchIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg width={realSize} height={realSize} viewBox="0 0 18 18" fill="none" className={className}>
      <path
        d="M12.264 12.2641L16 16M14.1302 8.06514C14.1302 11.4148 11.4147 14.1303 8.06509 14.1303C4.71543 14.1303 2 11.4148 2 8.06514C2 4.71545 4.71543 2 8.06509 2C11.4147 2 14.1302 4.71545 14.1302 8.06514Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
};

const StoreIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg height={realSize} width={realSize} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 616 512" className={className}>
      <path d="M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z">
      </path>
    </svg>
  );
};

const VideoIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg height={realSize} width={realSize} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className={className}>
      <path d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z">
      </path>
    </svg>
  );
};

const UserIcon = (props: IconProps) => {
  const { size = 'medium', className } = props;
  const realSize = iconSizes[size];

  return (
    <svg height={realSize} width={realSize} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className}>
      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
      </path>
    </svg>
  );
};

export {
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
  LockIcon,
  MusicIcon,
  PlusIcon,
  PhotosIcon,
  SearchIcon,
  VideoIcon,
  StoreIcon,
  UserIcon,
}