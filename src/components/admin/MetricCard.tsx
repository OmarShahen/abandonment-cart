import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "blue" | "green" | "purple" | "yellow";
}

export default function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  color = "blue" 
}: MetricCardProps) {
  const colorClasses = {
    blue: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    green: {
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    purple: {
      iconBg: "bg-purple-100", 
      iconColor: "text-purple-600"
    },
    yellow: {
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600"
    }
  };

  const classes = colorClasses[color];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center">
        <div className={`${classes.iconBg} rounded-full p-2 mr-3`}>
          <Icon className={`h-6 w-6 ${classes.iconColor}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {value}
          </p>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  );
}