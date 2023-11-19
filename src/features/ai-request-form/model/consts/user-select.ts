import { UserSelectOption } from '../types/user-select';

export const UserSelectAmountOptions: UserSelectOption[] = [
  {
    value: '1',
    label: '1 Photo',
  },
  {
    value: '2',
    label: '2 Photos',
  },
  {
    value: '3',
    label: '3 Photos',
  },
  {
    value: '4',
    label: '4 Photos',
  },
  {
    value: '5',
    label: '5 Photos',
  },
];

export const UserSelectResolutionOptions: UserSelectOption[] = [
  {
    label: '256x256',
    value: '256x256',
  },
  {
    label: '512x512',
    value: '512x512',
  },
  {
    label: '1024x1024',
    value: '1024x1024',
  },
];

export const UserSelectModelVersionOptions: UserSelectOption[] = [
  {
    value: 'large',
    label: 'Large',
  },
  {
    value: 'melody',
    label: 'Melody',
  },
  {
    value: 'encode-decode',
    label: 'Encode-Decode',
  },
];

export const UserSelectNormalizationStrategyOptions: UserSelectOption[] = [
  {
    label: 'Peak',
    value: 'peak',
  },
  {
    label: 'Loudness',
    value: 'loudness',
  },
  {
    label: 'Clip',
    value: 'clip',
  },
  {
    label: 'RMS',
    value: 'rms',
  },
];

export const UserSelectOutputFormatOptions: UserSelectOption[] = [
  {
    label: 'WAV',
    value: 'wav',
  },
  {
    label: 'MP3',
    value: 'mp3',
  },
];
