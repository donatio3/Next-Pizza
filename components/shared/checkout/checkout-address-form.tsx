'use client'
import React from 'react';
import { WhiteBlock } from '../white-block';

import { FormTextarea } from '../form-components';
import { AdressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface Props {
  className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({className}) => {  
    const {control} = useFormContext();
    
  return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <Controller // Следит и рендерит input при каждом изменении в inpute 
                control={control}
                name='address' // конкретное поле 
                render={({field, fieldState}) => <>
                    <AdressInput onChange={field.onChange}/>
                    {fieldState.error && <ErrorText text={fieldState.error.message as string}/>}
                    </>}/>
                <FormTextarea 
                    rows={5} 
                    className="text-base"
                    placeholder="Комментарии к заказу"
                    name="comment" />
            </div>
        </WhiteBlock>
  );
};
