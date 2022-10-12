import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useMemo, useState } from "react";
import { CoreLayout } from "../components/core/core-layout";
import { CoreRenderGrid } from "../components/core/core-render-grid";
import ContentstackService, { ProcessedEntryResponse } from "../lib/services/contentstack-service";

interface Props {
  locale: string
  url: string
  processedResponse: ProcessedEntryResponse
}

const Page: NextPage<Props> = ({ locale, url, processedResponse }) => {
  const contentstackService = useMemo(() => new ContentstackService(), [])

  useEffect(() => {
    const updateData = async () => {
      if (url) {
        const newProcessedResponse = await contentstackService.getPage(url, locale)

        if (newProcessedResponse.bindings) {
          setBindings(newProcessedResponse.bindings)
        }

        if (newProcessedResponse.entry) {
          setEntry(newProcessedResponse.entry)
        }
      }
    }

    contentstackService.OnEntryChange(updateData)
  }, [contentstackService, url, locale])

  const [entry, setEntry] = useState(processedResponse?.entry)
  const [bindings, setBindings] = useState(processedResponse?.bindings)

  if (!entry) {
    return <CoreLayout title="Loading">Loading...</CoreLayout>
  }

  return (<CoreLayout title={entry.title}>

    <CoreRenderGrid layout={entry.layout} modularBlocks={entry.modular_blocks} />

    {/* <pre>
      {JSON.stringify(entry, null, 2)}
    </pre> */}
  </CoreLayout>)
}

export default Page

interface Params extends ParsedUrlQuery {
  url: Array<string>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const currentLocale = context.locale ?? context.defaultLocale ?? 'en-us'
  const params = context.params!
  const url = "/" + params.url.join('/')

  const contentstackService = new ContentstackService()
  const processedResponse = await contentstackService.getPage(url, currentLocale)

  if (processedResponse.errorCode !== undefined) {
    return processedResponse.errorCode === 404
      ? { notFound: true }
      : { redirect: { destination: `/500?error=${processedResponse.errorMessage}`, permanent: false } }
  }

  return {
    props: {
      locale: currentLocale,
      url,
      processedResponse
    },
    revalidate: 1
  }
}