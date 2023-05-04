import { useState } from "react";
import DataGrid, { EditorProps } from "react-data-grid";
import { Column } from "react-data-grid";
import "react-data-grid/lib/styles.css";

export type Row = {
  id: number;
  name: string;
};

const columns: readonly Column<Row>[] = [
  { key: "id", name: "ID", width: 80, resizable: true, frozen: true },
  {
    key: "name",
    name: "Name",
    width: 200,
    resizable: true,
    frozen: true,
    editor: datetimePicker,
  },
];

function createRows(): Row[] {
  const rows: Row[] = [];
  rows.push({ id: 1, name: "aaaa" }, { id: 2, name: "bbbb" });
  return rows;
}

export default function datetimePicker({ row, onRowChange }: EditorProps<Row>) {
  let datetime = "";
  return (
    <form>
      <input
        autoFocus
        type="datetime-local"
        onChange={(event) => (datetime = event.target.value)}
      />
      <input
        type="submit"
        value="決定"
        onClick={(event) =>onRowChange({ ...row, name: datetime }, true)}
      />
    </form>
  );
}

export const Table = () => {
  const [rows, setRows] = useState(createRows);
  return (
    <div>
      <DataGrid
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
        className="fill-grid"
      />
    </div>
  );
};
