import React from "react"

const RenderErrors = ({ errors }) => {
  if (errors?.length > 0) {
    return (
      <div className="errors-wrapper">
        <ul>
          {errors?.map((error, i) => (
            <li key={`error-${i}`}>{error}</li>
          ))}
        </ul>
      </div>
    )
  } else {
    return <></>
  }
}

export default RenderErrors
