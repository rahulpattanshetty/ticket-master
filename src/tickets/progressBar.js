import React from 'react'

function ProgressBar(props) {
  return(
    <div>
      <div className="progress" style={{ height: '20px' }}>
        <div className="progress-bar" role="progressbar" style={{ width: `${props.percentage}%` }} aria-valuemin="0" aria-valuemax="100">{props.percentage > 0 ? "Completed Status":""}</div>
      </div>
    </div>
  )
}
export default ProgressBar