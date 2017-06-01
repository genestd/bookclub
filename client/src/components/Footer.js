import React from 'react'

const Footer = (props) => {
  return(
    <footer className="footer" id="footer">
      <div className="row text-center">
        <div className="small-6 columns footer-div">
          &copy;2017 David Genest
        </div>
        <div className="small-6 columns footer-div pointer" data-open="credits">
          Credits
        </div>
      </div>

      <div className="reveal credits" id="credits" data-reveal>
        <h2>Special Thanks To</h2>

        <ul>
          <li>HTML Framework: <a href="http://foundation.zurb.com/sites/docs/" target="_blank">Foundation 6 for Sites</a>
          </li>
          <li>Book Cover Images and data via Google Books API</li>
          <li>Homepage photo: <a href="https://www.flickr.com/photos/thomasleuthard/9786288611/in/photolist-fUMhDZ-9B6MkA-61JGSn-fB2gV-56uZvF-4GBZhB-8kTvTL-7YRNk7-8uuvkZ-6iUdMZ-pXycxi-de8eo9-9B6MWb-fB2iR-7AoJT7-5sZryx-4gRKMD-bd1iWX-52kW24-aeH1B-fhFWFp-9B3V8x-8uutPc-6d6wX9-7afHmJ-7YRMg3-56z9Y9-7uKbYx-8K7WFj-529VY8-qTwaov-fC8uGu-crxUku-9B3Uci-aeHb5-akFR3u-eDtY-88o6pv-3jZHhx-9B6MdS-3k5fZu-7U1ctS-fhWdAh-5NuNbG-bpnTY5-7AoJNf-9B3UKK-UweLZs-9tba3Y-77YNSL" target="_blank">
            Creative Commons Photo</a> by <a href="https://www.flickr.com/photos/thomasleuthard/" target="_blank">Thomas Leuthard</a> is licensed under <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank">CC BY 2.0</a>
          </li>
          <li>My Books photo: <a href="https://pixabay.com/en/library-books-lexicon-read-learn-585002/" target="_blank">Pixabay Photo</a> by blickpixel is licensed under CC0 Public Domain
          </li>
          <li>Background texture: TransparentTextures Paper 2 made by <a href="http://www.atlemo.com/" target="_blank">Atle Mo</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
