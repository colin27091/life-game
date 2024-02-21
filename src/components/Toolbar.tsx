export type ToolBarItems = ({
  icon: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>)[];

const Toolbar = ({ items }: { items: ToolBarItems }) => {
  return (
    <div className="absolute top-0 right-0 m-4 flex gap-4 p-4 rounded-md bg-gray-100 bg-opacity-90 shadow-md z-10">
      {items.map(({ icon, ...rest }, index) => (
        <button {...rest} key={index}>
          {icon}
        </button>
      ))}
    </div>
  );
}

export default Toolbar;