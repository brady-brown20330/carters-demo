import { GridBlock, GridColumn, GridLayout } from "./core-render-grid";
import { CoreRenderGridBlocks } from "./core-render-grid-blocks";

interface Props {
  columnUid: string
  layout: GridLayout
  blocks: GridBlock[]
}

export const CoreRenderGridColumn: React.FC<Props> = ({ columnUid, layout, blocks }) => {

  const column = layout.columns.find(c => c.uid === columnUid);
  if (!column) return <></>;

  const columnBlockOrder = layout.columnBlockOrder[columnUid];
  const columnBlocks = columnBlockOrder.map(blockUid => blocks.find(block => block.uid === blockUid)).filter(block => block !== undefined) as GridBlock[];
  
  const getColumnClasses = (column: GridColumn) => {
    let classes = `flex flex-col gap-4 justify-items-stretch`//`w-full flex flex-col gap-4`

    switch (column.span) {
      case 1:
        classes += " md:col-span-1"
        break
      case 2:
        classes += " md:col-span-2"
        break
      case 3:
        classes += " md:col-span-3"
        break
      case 4:
        classes += " md:col-span-4"
        break
      case 5:
        classes += " md:col-span-5"
        break
      case 6:
        classes += " md:col-span-6"
        break
      case 7:
        classes += " md:col-span-7"
        break
      case 8:
        classes += " md:col-span-8"
        break
      case 9:
        classes += " md:col-span-9"
        break
      case 10:
        classes += " md:col-span-10"
        break
      case 11:
        classes += " md:col-span-11"
        break
      case 12:
        classes += " md:col-span-12"
        break
      case "auto":
        classes += ""
        break;
    }

    return classes
  }

  return (
    <div data-column className={getColumnClasses(column)}>
      <CoreRenderGridBlocks gridBlocks={columnBlocks} />
    </div>
  )
}