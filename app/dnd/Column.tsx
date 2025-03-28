import React from 'react';

interface ColumnProps {
  column: {
    id: string;
    name: string;
    tasks: { id: string; title: string }[];
  };
  children: React.ReactNode;
}

const Column = ({ column, children }: ColumnProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md w-64">
      <h2 className="font-bold text-lg mb-4">{column.name}</h2>
      {children}
    </div>
  );
};

export default Column;
