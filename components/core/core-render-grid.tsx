import { CoreRenderGridRow } from "./core-render-grid-row"

export interface GridLayout {
  rows: GridRow[]
  columns: GridColumn[]
  rowColumnOrder: {
    [rowUid: string]: string[]
  }
  columnBlockOrder: {
    [columnUid: string]: string[]
  }
}

export interface GridRow {
  uid: string
  gridSize: number | string
}

export interface GridColumn {
  uid: string
  span: number | string
}

export interface GridBlock {
  uid: string,
  type: string,
  data: any
}

interface Props {
  layout?: GridLayout
  modularBlocks?: any[]
}

export const CoreRenderGrid: React.FC<Props> = ({ layout, modularBlocks }) => {
  if (layout === undefined || modularBlocks === undefined) {
    return <>No grid to render</>
  }

  const blocks = modularBlocks
    .map((modularBlock: any): GridBlock | undefined => {
      const type = Object.keys(modularBlock)[0]
      if (type) {
        return {
          uid: modularBlock[type]._metadata?.uid,
          type,
          data: modularBlock[type]
        }
      }
    })
    .filter((block: GridBlock | undefined) => block !== undefined) as GridBlock[]

  return <>
    {layout.rows.map((row) => {
      return <CoreRenderGridRow key={row.uid} rowUid={row.uid} layout={layout} blocks={blocks} />
    })}
  </>
}