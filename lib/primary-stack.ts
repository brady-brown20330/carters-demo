import Contentstack from 'contentstack'
import ContentstackLivePreview from '@contentstack/live-preview-utils'

const LivePreviewIsEnabled = process.env.NEXT_PUBLIC_CS_ENABLE_LIVE_PREVIEW?.toLowerCase() === 'true'

const PrimaryStack = Contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CS_API_KEY || "",
  delivery_token: process.env.NEXT_PUBLIC_CS_DELIVERY_TOKEN || "",
  environment: process.env.NEXT_PUBLIC_CS_ENVIRONMENT || "",
  region: Contentstack.Region.US,
  live_preview: {
    management_token: process.env.NEXT_PUBLIC_CS_LIVE_PREVIEW_TOKEN || "",
    enable: LivePreviewIsEnabled,
    // @ts-ignore
    clientUrlParams: {
      host: "app.contentstack.com",
    },
    host: 'api.contentstack.io',
  }
})

PrimaryStack.setHost('api.contentstack.io')

if (LivePreviewIsEnabled) {
  // @ts-ignore
  ContentstackLivePreview.init(PrimaryStack)
}

export default PrimaryStack
export const onEntryChange = ContentstackLivePreview.onEntryChange
