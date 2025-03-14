interface StatCardProps {
  title: string;
  value: number;
  unit?: string;
  className?: string;
}

export default function StatCard({ title, value, unit = '', className = '' }: StatCardProps) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-2xl font-semibold text-gray-900">
        {value.toFixed(1)}{unit}
      </p>
    </div>
  );
} 