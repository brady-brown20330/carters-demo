import { ReactNode } from "react"

export interface Props {
  graphic?: {
    url: string //http://fpoimg.com/1200x630?text=Open Graph Image&bg_color=748BA7&text_color=F8FAFC
    title?: string
    width?: number
    height?: number
  }
  body?: string
  design?: {
    graphicPosition: "left" | "right" | "top" | "background"
    graphicAspectRatio: "auto" | '1/1' | '2/1' | '4/3' | '3/2' | '16/9' | '16/10'
    graphicAspectRatioPortrait: boolean
    contentPosition: "top-left" | "top-center" | "top-right" | "middle-left" | "middle-center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right"
    contentWidth: "auto" | "full" | "3/4" | "2/3" | "1/2" | "1/3" | "1/4"
  }
  CSLP?: {
    graphic: any
    body: any
  }
}

export const CoreCard: React.FC<Props> = ({ children, graphic, body, design = { graphicPosition: "top", contentPosition: "top-left", contentWidth: "auto", graphicAspectRatio: "auto", graphicAspectRatioPortrait: false }, CSLP }) => {


  let cardStyle = `rounded-lg shadow-lg bg-slate-50 overflow-hidden relative`
  let contentPosition = "flex w-full h-full"
  let contentStyle = ""
  let cardPadding = "p-4"
  let imageStyle = "object-cover"
  let textColor = ""

  switch (design.graphicAspectRatio) {
    case "1/1":
      imageStyle += " aspect-1/1"
      break
    case "2/1":
      imageStyle += design.graphicAspectRatioPortrait ? " aspect-1/2" : " aspect-2/1"
      break
    case "4/3":
      imageStyle += design.graphicAspectRatioPortrait ? " aspect-3/4" : " aspect-4/3"
      break
    case "3/2":
      imageStyle += design.graphicAspectRatioPortrait ? " aspect-2/3" : " aspect-3/2"
      break
    case "16/9":
      imageStyle += design.graphicAspectRatioPortrait ? " aspect-9/16" : " aspect-16/9"
      break
    case "16/10":
      imageStyle += design.graphicAspectRatioPortrait ? " aspect-10/16" : " aspect-16/10"
      break
    case "auto":
    default:
      break
  }

  switch (design.contentPosition) {
    case "top-left":
      contentPosition += " items-start justify-start"
      break;
    case "top-center":
      contentPosition += " items-start justify-center"
      break;
    case "top-right":
      contentPosition += " items-start justify-end"
      break;
    case "middle-left":
      contentPosition += " items-center justify-start"
      break;
    case "middle-center":
      contentPosition += " items-center justify-center"
      break;
    case "middle-right":
      contentPosition += " items-center justify-end"
      break;
    case "bottom-left":
      contentPosition += " items-end justify-start"
      break;
    case "bottom-center":
      contentPosition += " items-end justify-center"
      break;
    case "bottom-right":
      contentPosition += " items-end justify-end"
      break;
  }

  switch (design.graphicPosition) {
    case "right": // right image has different order of content and image than left, but uses the same everything else, so no break
      imageStyle += " order-2"
    case "left":
      cardStyle += " flex "
      cardPadding += " w-1/2"
      imageStyle += " w-1/2"
      break
    case "background":
      if (graphic?.url) {
        cardPadding += " absolute top-0 left-0 w-full h-full"
        textColor += " prose-invert"
        imageStyle += " h-full"
        contentStyle += " bg-white p-4 rounded-lg shadow-lg"
      }
      break
    case "top":
      if (graphic?.url) {
        cardPadding += " w-full"
      }
      break
  }

  switch (design.contentWidth) {
    case "full":
      contentStyle += " w-full"
      break
    case "3/4":
      contentStyle += " w-full sm:w-3/4"
      break
    case "2/3":
      contentStyle += " w-full sm:w-2/3"
      break
    case "1/2":
      contentStyle += " w-full sm:w-1/2"
      break
    case "1/3":
      contentStyle += " w-full sm:w-1/3 mt-"
      break
    case "1/4":
      contentStyle += " w-full sm:w-1/4"
      break
    case "auto":
    default:
      contentStyle += " w-auto"
      break
  }

  return (<div className={cardStyle}>
    {graphic ? <img className={imageStyle} src={graphic.url + "?width=1500"} alt={graphic.title} {...CSLP?.graphic} /> : null}
    {(children || body) && <div className={cardPadding}>
      <div className={contentPosition} {...CSLP?.body}>
        <div className={contentStyle}>
          {!!body
            ? <div className="prose" dangerouslySetInnerHTML={{ __html: body }}></div>
            : children
          }
        </div>
      </div>
    </div>}
  </div>)
}

export function CoreCardMapper(componentDetails: any) {
  const graphic = componentDetails.graphic ? {
    url: componentDetails.graphic.url,
    title: componentDetails.graphic.title,
    width: componentDetails.graphic.dimension?.width,
    height: componentDetails.graphic.dimension?.height
  } : undefined
  const design = componentDetails.design ? {
    graphicPosition: componentDetails.design.graphic_position,
    graphicAspectRatio: componentDetails.design.graphic_aspect_ratio,
    graphicAspectRatioPortrait: componentDetails.design.graphic_aspect_ratio_portrait,
    contentPosition: componentDetails.design.content_position,
    contentWidth: componentDetails.design.content_width
  } : undefined

  return <CoreCard
    graphic={graphic}
    design={design}
    body={componentDetails.body}
    CSLP={{
      graphic: { "data-cslp": componentDetails.design.$?.content_position["data-cslp"].replace("design.content_position", "graphic") },
      body: { "data-cslp": componentDetails.design.$?.content_position["data-cslp"].replace("design.content_position", "body") }
    }}
  >
  </CoreCard>
}