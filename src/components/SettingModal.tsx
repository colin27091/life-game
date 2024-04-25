import clsx from "clsx";
import useOutsideClick from "../utils/useOutsideClick";
import { useSettingsContext } from "../utils/useSettingsContext";
import { Close } from "./Icons";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingModal = ({ isOpen, onClose }: SettingModalProps) => {
  const ref = useOutsideClick(onClose);
  const { register } = useSettingsContext()

  return (
    <div className={clsx('fixed grid place-content-center inset-0 bg-gray-900 bg-opacity-50 z-10 cursor-default', !isOpen && 'hidden')}>
      <div ref={ref} className="relative bg-white p-2 rounded-md min-w-80">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-md font-bold">Settings</h1>
          <button onClick={onClose}>
            <Close width="1rem" height="1rem" fill="gray" className="cursor-pointer" />
          </button>
        </div>

        <section className="flex flex-col gap-2">
          <h2 className="text-md text-gray-600">Seed</h2>
          <div>
            <p>Birth</p>
            <div className="flex gap-2">
            <input
              {...register("seed.birth.0", {min: 0, max: 8})}
              type="number"
              min={0}
              max={8}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              {...register("seed.birth.1", {min: 0, max: 8})}
              type="number"
              min={0}
              max={8}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            </div>
          </div>
          <div>
            <p>Survive</p>
            <div className="flex gap-2">
            <input
              {...register("seed.survive.0", {min: 0, max: 8})}
              type="number"
              min={0}
              max={8}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              {...register("seed.survive.1", {min: 0, max: 8})}
              type="number"
              min={0}
              max={8}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            </div>
          </div>
          <div>
          <h2 className="text-md text-gray-600">Shades</h2>
          <input
            {...register('shades')}
            type="checkbox"
          />
          </div>
        </section>

      </div>
    </div>
  );
}

export default SettingModal;
