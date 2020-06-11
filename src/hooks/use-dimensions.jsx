import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

const getDimensions = () => ({
  height: window.innerHeight,
  width: window.innerWidth
})

const useDimensions = () => {
  const [dimensions, setDimensions] = useState(getDimensions())

  useEffect(() => {
    const handleResize = debounce(() => setDimensions(getDimensions()), 100)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return dimensions
}

export default useDimensions
