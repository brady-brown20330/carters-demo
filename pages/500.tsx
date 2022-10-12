import { GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import { CoreLayout } from "../components/core/core-layout"

interface Props {
}

const CustomError: NextPage = () => {
  const router = useRouter()

  return <CoreLayout title='Error'>
    <div className="prose">
      <h1>500 - Server Error</h1>
      <p>{router.query.error}</p>
    </div>
  </CoreLayout>
}


export default CustomError