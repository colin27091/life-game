import clsx from "clsx";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement>((props: React.InputHTMLAttributes<HTMLInputElement>, ref ) => (
  <input {...props} ref={ref} className={clsx("rounded-md border-gray-600 p-1", props.className)} />
))

export default Input