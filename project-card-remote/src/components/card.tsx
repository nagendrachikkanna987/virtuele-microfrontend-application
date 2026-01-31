import { type ReactNode } from 'react';

type Props = {
  color: string;
  children: ReactNode;
};

const Card = ({ color, children }: Props) => {
  return (
    <div className="module-card" style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};

export { Card };
