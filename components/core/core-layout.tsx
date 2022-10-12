import Head from "next/head"
import { CoreFooter } from "./core-footer"
import { CoreMenu } from "./core-menu"

export interface Props {
  title: string
  description?: string
  pageJson?: any
}

export const CoreLayout: React.FC<Props> = ({ title, description, pageJson, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>⛰</text></svg>" />
        {description && <meta name="description" content={description} />}
      </Head>

      <div className="bg-stone-100 min-h-screen flex flex-col justify-between">
        <CoreMenu pageJson={pageJson} />
        
        <div className="container px-2 mx-auto mt-6 flex-grow">
          {children}
        </div>

        <CoreFooter />
      </div>
    </>
  )
}