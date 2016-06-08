import React from 'react';
import { Img } from 'react-smart-image';

class MyImage extends React.Component {
  render() {
    return (
      <Img src='/my_wanted_image.png' srcFallback='/my_fallback_image.png' />
    )
  }
}
