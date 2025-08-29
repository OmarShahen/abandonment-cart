import { ReactNode } from "react";

interface Column {
  key: string;
  header: string;
  width?: string;
}

interface AdminTableProps {
  title: string;
  columns: Column[];
  data: Record<string, unknown>[];
  renderRow: (item: Record<string, unknown>, index: number) => ReactNode;
  loading?: boolean;
  emptyMessage?: string;
}

export default function AdminTable({
  title,
  columns,
  data,
  renderRow,
  loading = false,
  emptyMessage = "No data available"
}: AdminTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${column.width || ''}
                  `}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  {renderRow(item, index)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}