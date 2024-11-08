'use client'
import { Input } from "@/components/ui/input";
import { RequiredSymbol } from "../required-symbol";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    required?: boolean
    className?: string
}

export const FormInput: React.FC<Props> = ({className, name, label , required, ...props }) => {
    const {
        register,
        formState: {errors},
        watch, 
        setValue
    } = useFormContext();

    const value = watch(name); // cледит за каждый изменением inputa и возвращает значение
    const errorText = errors[name]?.message as string; // cледит за каждый изменением inputa и возвращает ошибку
    
    const onClickClear = () => {
        setValue(name, '', {shouldValidate: true})
    }

    return (
    
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
            {label} {required ? <RequiredSymbol/> : null}
        </p>
      )}

    <div className="relative">
        <Input required className="h-12 text-md" {...props} {...register(name)}/>

        {Boolean(value) && <ClearButton onClick={onClickClear} /> }
    </div>

      {errorText && required && <ErrorText className="mt-2" text={errorText}/>}
    </div>

    
  );
};
