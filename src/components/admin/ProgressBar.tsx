interface ProgressBarProps {
  label: string;
  percentage: number;
  value: string;
  color?: "blue" | "green" | "purple" | "red";
}

export default function ProgressBar({ 
  label, 
  percentage, 
  value, 
  color = "blue" 
}: ProgressBarProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-200",
      fill: "bg-blue-600"
    },
    green: {
      bg: "bg-green-200", 
      fill: "bg-green-600"
    },
    purple: {
      bg: "bg-purple-200",
      fill: "bg-purple-600"
    },
    red: {
      bg: "bg-red-200",
      fill: "bg-red-600"
    }
  };

  const classes = colorClasses[color];

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center">
        <div className={`${classes.bg} rounded-full h-2 w-24 mr-3`}>
          <div 
            className={`${classes.fill} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
          {value}
        </span>
      </div>
    </div>
  );
}