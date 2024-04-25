import { PropsWithChildren } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export type Settings = {
  seed: {
    birth: [number, number],
    survive: [number, number]
  },
  shades: boolean
}

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const methods = useForm<Settings>({
    defaultValues: {
      seed: {
        birth: [3, 3],
        survive: [2, 3]
      },
      shades: true
    }
  })


  return <FormProvider {...methods}>
    {children}
  </FormProvider>
}

export const useSettingsContext = () => useFormContext<Settings>()