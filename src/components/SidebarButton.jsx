import { tv } from 'tailwind-variants';

const SidebarButton = ({ children, color }) => {
  const sidebarButton = tv({
    base: 'flex items-center gap-2 rounded-lg px-6 py-3',
    variants: {
      color: {
        unselected: 'text-brand-dark-blue',
        selected: 'bg-brand-primary/10 text-brand-primary',
      },
    },
  });

  return (
    <a href="#" className={sidebarButton({ color })}>
      {children}
    </a>
  );
};

export default SidebarButton;
