import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  children: ReactNode;
  icon: LucideIcon;
  color?: "blue" | "green" | "yellow" | "purple" | "indigo";
}

export default function InfoCard({ 
  title, 
  children, 
  icon: Icon, 
  color = "blue" 
}: InfoCardProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      iconColor: "text-blue-400",
      titleColor: "text-blue-800",
      contentColor: "text-blue-700"
    },
    green: {
      bg: "bg-green-50",
      iconColor: "text-green-400", 
      titleColor: "text-green-800",
      contentColor: "text-green-700"
    },
    yellow: {
      bg: "bg-yellow-50",
      iconColor: "text-yellow-400",
      titleColor: "text-yellow-800", 
      contentColor: "text-yellow-700"
    },
    purple: {
      bg: "bg-purple-50",
      iconColor: "text-purple-400",
      titleColor: "text-purple-800",
      contentColor: "text-purple-700"
    },
    indigo: {
      bg: "bg-gradient-to-r from-blue-50 to-indigo-50",
      iconColor: "text-blue-400",
      titleColor: "text-blue-800", 
      contentColor: "text-blue-700"
    }
  };

  const classes = colorClasses[color];

  return (
    <div className={`${classes.bg} rounded-lg p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${classes.iconColor}`} />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${classes.titleColor} mb-2`}>
            {title}
          </h3>
          <div className={`text-sm ${classes.contentColor}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}