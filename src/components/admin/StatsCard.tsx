import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "blue" | "green" | "red" | "purple" | "yellow";
}

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color = "blue" 
}: StatsCardProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-100", 
      iconColor: "text-blue-600",
      textColor: "text-blue-900",
      titleColor: "text-blue-800"
    },
    green: {
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600", 
      textColor: "text-green-900",
      titleColor: "text-green-800"
    },
    red: {
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      textColor: "text-red-900", 
      titleColor: "text-red-800"
    },
    purple: {
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      textColor: "text-purple-900",
      titleColor: "text-purple-800"
    },
    yellow: {
      bg: "bg-yellow-50", 
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-900",
      titleColor: "text-yellow-800"
    }
  };

  const classes = colorClasses[color];

  return (
    <div className={`${classes.bg} rounded-lg p-4`}>
      <div className="flex items-center gap-3">
        <div className={`${classes.iconBg} rounded-full p-2`}>
          <Icon className={`h-5 w-5 ${classes.iconColor}`} />
        </div>
        <div>
          <p className={`font-medium ${classes.titleColor}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${classes.textColor}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}