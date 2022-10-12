import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { CoreLayout } from '../components/core/core-layout'
import { CoreRenderGrid } from '../components/core/core-render-grid'
import ContentstackService, { ProcessedEntryResponse } from '../lib/services/contentstack-service'

interface Props {
  locale: string
  url: string
  processedResponse: ProcessedEntryResponse
}

const Home: NextPage<Props> = ({ locale, url, processedResponse }) => {
  const contentstackService = useMemo(() => new ContentstackService(), [])


  useEffect(() => {
    const updateData = async () => {
      if (url) {
        setStatus("Checking if LP is ready")
        //@ts-ignore
        if (contentstackService.Stack.live_preview?.hash) {
          setStatus("Updating CS Data")
          const newProcessedResponse = await contentstackService.getPage("/", locale, "home")

          if (newProcessedResponse.bindings) {
            setBindings(newProcessedResponse.bindings)
          }

          if (newProcessedResponse.entry) {
            setEntry(newProcessedResponse.entry)
          }
        }

        setStatus("Finished updating CS Data")
      }
    }

    setStatus("configuring")
    contentstackService.OnEntryChange(updateData)
  }, [contentstackService, url, locale])

  const [status, setStatus] = useState("Initial")
  const [entry, setEntry] = useState(processedResponse.entry)
  const [bindings, setBindings] = useState(processedResponse.bindings)

  if (!entry) {
    return <CoreLayout title="Loading">Loading...</CoreLayout>
  }

  return (
    <>
      <Head>
        <title>Contentstack Demo Site</title>
      </Head>

      <CoreLayout title='OAC Demo Home' pageJson={entry}>
        <CoreRenderGrid layout={entry.layout} modularBlocks={entry.modular_blocks}  />
      </CoreLayout>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const currentLocale = context.locale ?? context.defaultLocale ?? 'en-us'

  const contentstackService = new ContentstackService()
  const processedResponse = await contentstackService.getPage("/", currentLocale, "home")

  if (processedResponse.errorMessage) {
    return {
      redirect: {
        permanent: false,
        destination: `/error?message=${processedResponse.errorMessage}`
      }
    }
  }

  if (!processedResponse.entry) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      locale: currentLocale,
      url: "/",
      processedResponse
    },
    revalidate: 1
  }
}