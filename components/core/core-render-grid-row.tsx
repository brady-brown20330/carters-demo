import { GridBlock, GridColumn, GridLayout, GridRow } from "./core-render-grid";
import { CoreRenderGridColumn } from "./core-render-grid-column";

interface GridRowProps {
  layout: GridLayout
  blocks: GridBlock[]
  rowUid: string
}

export const CoreRenderGridRow: React.FC<GridRowProps> = ({ blocks, layout, rowUid }) => {

  const getRowClasses = (row: GridRow): string => {
    let classes = `grid gap-4 mb-4 `

    switch (row.gridSize) {
      case 1:
        classes += " md:grid-cols-1"
        break
      case 2:
        classes += " md:grid-cols-2"
        break
      case 3:
        classes += " md:grid-cols-3"
        break
      case 4:
        classes += " md:grid-cols-4"
        break
      case 5:
        classes += " md:grid-cols-5"
        break
      case 6:
        classes += " md:grid-cols-6"
        break
      case 7:
        classes += " md:grid-cols-7"
        break
      case 8:
        classes += " md:grid-cols-8"
        break
      case 9:
        classes += " md:grid-cols-9"
        break
      case 10:
        classes += " md:grid-cols-10"
        break
      case 11:
        classes += " md:grid-cols-11"
        break
      case 12:
        classes += " md:grid-cols-12"
        break
      case "auto":
        classes += " md:grid-flow-col auto-cols-fr"
        break;
    }

    return classes
  }

  const row = layout.rows.find(r => r.uid === rowUid)
  if (!row) return <></>

  const columnOrder = layout.rowColumnOrder[rowUid]
  const columns = columnOrder.map(columnUid => layout.columns.find(column => column.uid === columnUid)).filter(column => column !== undefined) as GridColumn[]

  return (
    <div data-row className={getRowClasses(row)}>
      {columns.map((column) => {
        return <CoreRenderGridColumn
          key={column.uid}
          layout={layout}
          columnUid={column.uid}
          blocks={blocks}
        />
      })}
    </div>
  )
}