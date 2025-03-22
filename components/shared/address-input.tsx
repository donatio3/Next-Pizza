'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="1277fe6279b8c873aedaa85541c3ff67360018f8"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
