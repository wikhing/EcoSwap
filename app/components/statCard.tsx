interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  accentColor: string;
  trend?: string;
  isPositive?: boolean;
}


const StatCard: React.FC<StatCardProps> = ({ label, value, subtext, trend, isPositive, accentColor }) => {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-b-4 ${accentColor} border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow`}>
      <h3 className="text-gray-600 font-bold text-sm mb-2">{label}</h3>
      <div className="text-3xl font-extrabold text-gray-900 mb-1">{value}</div>
      {trend && (
        <p className={`text-xs font-medium mb-1 ${isPositive ? 'text-[#008000]' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {trend}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-auto">{subtext}</p>
      <div className={`absolute bottom-0 left-0 w-full h-2 ${accentColor}`}></div>
    </div>
  );
};

export default StatCard;