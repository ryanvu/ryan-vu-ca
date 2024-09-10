import HorizontalScroll from "./HorizontalScroll/HorizontalScroll";

import { japan, nyc, toronto } from "./photo-data";

const Photos = () => {
  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <h1>japan</h1>
      </div>

      <HorizontalScroll direction={true} images={japan} />
      <div className="h-screen flex items-center justify-center">
        <h1>new york</h1>
      </div>

      <HorizontalScroll images={nyc} />

      <div className="h-screen flex items-center justify-center">
        <h1>toronto</h1>
      </div>

      <HorizontalScroll images={toronto} />
    </div>
  )
}

export default Photos;
