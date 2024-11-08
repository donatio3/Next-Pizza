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
      token="b4f43e70751799fd39af2be4baf42363095ae7dc"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
