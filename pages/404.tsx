import { NextPage } from "next"
import { CoreLayout } from "../components/core/core-layout"

const NotFound: NextPage = () => {
  return <CoreLayout title='404'>
    <div className="prose">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  </CoreLayout>
}

export default NotFound