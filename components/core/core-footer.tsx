import Link from "next/link"

export interface Props {
}

export const CoreFooter: React.FC<Props> = ({ children }) => {
  const LivePreviewIsEnabled = process.env.NEXT_PUBLIC_CS_ENABLE_LIVE_PREVIEW

  return (
    <footer className="bg-lime-900 text-center mt-8 text-sm">
      <div className="text-lime-100 text-center p-3">
        &copy; Contentstack/Chris Jennings
        {LivePreviewIsEnabled && <div className="text-xs">
          <Link href={`https://app.contentstack.com/#!/stack/${process.env.NEXT_PUBLIC_CS_API_KEY}/entries`}>
            <a target="_blank">Access Entries</a>
          </Link><br />
          Environment: {process.env.NEXT_PUBLIC_CS_ENVIRONMENT}<br />
        </div>}
      </div>
    </footer >
  )
}