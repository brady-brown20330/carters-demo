import { addEditableTags, Next, Node } from '@contentstack/utils'
import Contentstack, { Stack } from 'contentstack'
import { stringify } from 'querystring'
import PrimaryStack, { onEntryChange } from '../primary-stack'

export interface ProcessedEntryResponse {
  entry: any,
  bindings: Record<string, any>,
  errorCode?: number,
  errorMessage?: string
}
export default class ContentstackService {
  public Stack: Stack
  public OnEntryChange: any

  constructor() {
    this.Stack = PrimaryStack
    this.OnEntryChange = onEntryChange
  }

  public async getPage(url: string, locale: string = "en-us", contentTypeUid: string = "page"): Promise<ProcessedEntryResponse> {
    if (url === "/") {
      contentTypeUid = "home"
    }

    try {
      const response = await this.Stack
        .ContentType(contentTypeUid)
        .Query()
        .equalTo('url', url)
        .language(locale.toLocaleLowerCase())
        .includeFallback()
        .includeEmbeddedItems()
        .toJSON()
        .findOne()

      return this.processEntry(response, contentTypeUid)
    } catch (error: any) {
      switch (error.error_code) {
        case 118: // Invalid content type
          return {
            entry: null,
            bindings: {},
            errorCode: error.error_code,
            errorMessage: error.error_message
          }
        case 141: // Entry doesn't exist
          return {
            entry: null,
            bindings: {},
            errorCode: 404,
            errorMessage: error.error_message
          }
        default:
          throw error
      }
    }
  }

  private processEntry(entry: any, contentType: string): ProcessedEntryResponse {
    let bindings: Record<string, any> = {}
    const paths = this.GetAllJsonRtePaths(entry, contentType)

    const LivePreviewIsEnabled = !!process.env.NEXT_PUBLIC_CS_ENABLE_LIVE_PREVIEW
    if (LivePreviewIsEnabled) {
      addEditableTags(entry, contentType, true, entry.locale)
    }

    Contentstack.Utils.jsonToHTML({
      entry,
      paths,
      renderOption: {
        p: this.handleAlignmentClasses("p"),
        h1: this.handleAlignmentClasses("h1"),
        h2: this.handleAlignmentClasses("h2"),
        h3: this.handleAlignmentClasses("h3"),
        h4: this.handleAlignmentClasses("h4"),
        h5: this.handleAlignmentClasses("h5"),
        h6: this.handleAlignmentClasses("h6"),
        // span: (node: Node, next: Next) => {
        //   return `<span>${next(node.children)}</span>`
        // },
        // a: (node: Node, next: Next) => {
        //   return `<a href="${node.attrs.url}" target="_blank" style="color:#707070; text-decoration:underline;">${next(node.children)}</a>`
        // },
        // bold: (text: string) => {
        //   return `<span style="color:__color__;">${text}</span>`
        // },
        block: {
          // 'service_listing': (item, metadata) => {
          //   bindings[item.uid] = item
          //   return `<ServiceListing serviceListing={${item.uid}}></ServiceListing>`
          // },
          // // to render the default  
          // '$default': (item, metadata) => {
          //   return `<div><p>${item._content_type_uid} not supported yet.</p></div>`
          // }
        },
      }
    })

    return { entry, bindings }
  }

  private handleAlignmentClasses(tag: string) {
    return (node: Node, next: Next) => {
      const alignment = node.attrs.style?.hasOwnProperty("text-align") ? `text-` + node.attrs.style["text-align"] : null
      const empty = `<${tag}${alignment ? ` class="${alignment}"` : ""}></${tag}>`
      const output = `<${tag}${alignment ? ` class="${alignment}"` : ""}>${next(node.children)}</${tag}>`
      return output !== empty ? output.replace(/\n/g, "<br />") : ""
    }
  }

  public GetAllJsonRtePaths(entry: any, contentType: string): Array<string> {
    let paths = new Array<string>()
    return this.CheckProperty(entry, paths, ``)
  }

  private CheckProperty(property: any, paths: Array<string>, propertyPath: string): Array<string> {
    const path = propertyPath
    if (property === null || property === undefined) { return paths }

    const currentPropertyIsArray = Array.isArray(property)
    const currentPropertyIsObject = typeof property === 'object'

    if (currentPropertyIsArray) {
      this.CheckArrayForNestedJsonRtes(property, paths, propertyPath)
    } else if (currentPropertyIsObject) {
      this.CheckObjectForNestedJsonRtes(property, paths, propertyPath)
    }

    return paths
  }

  private IsObjectAJsonRte(object: any): boolean {
    return object !== null
      && object !== undefined
      && object.hasOwnProperty('uid')
      && object.hasOwnProperty('type')
      && object.type === 'doc'
      && object.hasOwnProperty('children')
  }

  private CheckObjectForNestedJsonRtes(object: any, paths: Array<string>, objectPath: string): Array<string> {
    const currentPropertyIsJsonRte = this.IsObjectAJsonRte(object)
    if (currentPropertyIsJsonRte) {
      if (paths.indexOf(objectPath) === -1) {
        paths.push(objectPath)
      }
    }

    Object.keys(object).map(childProperty => {
      const childPropertyPath = objectPath ? `${objectPath}.${childProperty}` : childProperty
      this.CheckProperty(object[childProperty], paths, childPropertyPath)
    })

    return paths
  }

  private CheckArrayForNestedJsonRtes(array: any, paths: Array<string>, arrayPath: string): Array<string> {
    array.map((item: any) => {
      this.CheckProperty(item, paths, `${arrayPath}`)
    })

    return paths
  }
}
