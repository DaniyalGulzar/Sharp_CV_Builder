import React from "react";
import Link from "next/link";

interface TableProps {
  columns: Array<{
    header: string;
    accessor: string;
    Cell?: (props: { value: any; row: any }) => JSX.Element;
    renderImage?: (props: { value: any; row: any }) => JSX.Element;
  }>;
  data: any[];
  title?: string;
  viewalllink?: { href: string; text: string };
  isHrVisible?: boolean;
  dropdown?: {
    label: string;
    options: { label: string; href: string }[];
  };
  boxShadow?: boolean;
  height?: boolean;
}

const TableLayout: React.FC<TableProps> = ({
  columns,
  data,
  isHrVisible = true,
  boxShadow = false,
  height = false,
}) => {
  return (
    <div
      className={`bg-white rounded-[22px] p-5 overflow-hidden ${
        boxShadow ? "shadow-[0px_4px_60px_0px_#00000014]" : ""
      } ${height ? "h-[55vh] overflow-auto" : ""}`}
    >
      {isHrVisible && <hr className="my-4 border-gray-300" />}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-[#555370]">
              {columns.map((col, colIndex) => (
                <th
                  key={col.header}
                  className={`${
                    colIndex === 0 ? "pl-6" : ""
                  } p-5 text-left text-lg font-medium text-white uppercase tracking-wider whitespace-nowrap first:rounded-bl-xl first:rounded-tl-xl last:rounded-tr-xl last:rounded-br-xl`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 px-4 bg-white"
                >
                  No Data Available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`hover:bg-gray-100 ${
                    rowIndex % 2 === 0 ? "bg-white" : ""
                  }`}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`border-b border-[#BABABA] py-6 px-4 text-lg font-normal text-[#666666] whitespace-nowrap ${
                        colIndex === 0 ? "pl-6" : ""
                      }`}
                    >
                      {col.renderImage
                        ? col.renderImage({ value: row[col.accessor], row })
                        : col.Cell
                        ? col.Cell({ value: row[col.accessor], row })
                        : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableLayout;
