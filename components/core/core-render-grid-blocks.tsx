import React, { ReactElement } from "react"
import { CoreCardMapper } from "./core-card"
import { GridBlock } from "./core-render-grid"

export type ComponentMapper = (componentDetails: any) => ReactElement<any, any> | null

interface Props {
  gridBlocks: Array<GridBlock>
  componentMappings?: Record<string, ComponentMapper>
}

export const defaultComponentMappings: Record<string, ComponentMapper> = {
  "card": CoreCardMapper
}

export const CoreRenderGridBlocks: React.FC<Props> = ({ gridBlocks, componentMappings = defaultComponentMappings }) => {
  const renderedComponents = gridBlocks.map((gridBlock) => {
    const hasMapping = (!!componentMappings && !!componentMappings[gridBlock.type.toLowerCase()])
    return hasMapping ? componentMappings[gridBlock.type.toLowerCase()](gridBlock.data) : <div>{gridBlock.type} not found.</div>
  })

  return <>
    {renderedComponents.map(
      (item, key) => {
        return item ? React.cloneElement(item, { key }) : null
      }
    )}</>
}