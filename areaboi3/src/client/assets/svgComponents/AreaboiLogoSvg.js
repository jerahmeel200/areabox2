import React from 'react';

function AreaboiLogoSvg({ width, height, fill }) {
  return (
    <svg
      width={width || '30'}
      height={height || '39'}
      viewBox="0 0 30 39"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect width="30" height="38.8235" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <use xlink:href="#image0" transform="scale(0.0147059 0.0113636)" />
        </pattern>
        <image
          id="image0"
          width="68"
          height="88"
          xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABYCAYAAABMB1FSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEYxQjVDMjlDRTU3MTFFM0I0RDJGQjM3NzE4QThGRDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEYxQjVDMkFDRTU3MTFFM0I0RDJGQjM3NzE4QThGRDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RjFCNUMyN0NFNTcxMUUzQjREMkZCMzc3MThBOEZEMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RjFCNUMyOENFNTcxMUUzQjREMkZCMzc3MThBOEZEMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvtqe0EAAAd2SURBVHja7JxbbBRV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"
        />
      </defs>
    </svg>
  );
}

export default AreaboiLogoSvg;
