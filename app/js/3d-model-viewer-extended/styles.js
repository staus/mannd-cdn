const set = () => {
  const styles = `
    model-viewer > form{
      display: none;
      max-width: 370px;
      background-color: rgba(255,255,255,0.5);
      max-height: 100%;
      overflow-y: auto;
      z-index: 1;
    }
    model-viewer > form:before{
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 70px;
      height: 100%;
    }
    
    model-viewer > form.show{
      display: block;
    }
    
    model-viewer > form *:before{
      font-size: 11px;
      font-family: Verdana, Geneva, sans-serif;
      padding-bottom: 5px;
    }
    
    
    model-viewer > form > fieldset{
      border-width: 1px;
      margin: 0;
    }
    model-viewer > form > fieldset:not(:last-of-type){
      border-bottom-width: 0px;
    }
    model-viewer > form > fieldset:before{
      display: block;
      content: attr(name);
    }
    model-viewer > form > fieldset >*{
    }
    
    model-viewer .event-blocker{
      display: block;
      left: 0;
      top: 0;
      width: 2000px;
      height: 2000px;
      pointer-events: all;
    }
    
    model-viewer:not([block-mouse-drag]) .event-blocker:hover{
      cursor: grab;
    }
    model-viewer:not([block-mouse-drag]) .event-blocker:active{
      cursor: grabbing;
    }
    
    model-viewer > form > fieldset input[type="checkbox"]{
      display: block;
      position: relative;
    }
    model-viewer > form > fieldset input[type="checkbox"]:before{
      content: attr(name);
      white-space: nowrap;
      padding-left: 20px;
      transform: translateY(-4%);
      display: block;
    }
    
    model-viewer > form > fieldset input[type="color"]{
      position: relative;
      height: 20px;
      margin-right: 10px;
    }
    
    model-viewer > form > fieldset input[type="range"]{
      position: relative;
      margin: 0px;
      margin-top: 20px;
      margin-right: 10px;
      transform: translateY(9px);
      margin-bottom: 15px;
    }
    
    model-viewer > form > fieldset input[type="range"]:before{
      content: attr(name);
      white-space: nowrap;
      position: absolute;
      margin-top: -15px;
    }
    
    model-viewer > form > fieldset select{
      position: relative;
      display: block;
      width: 100%;
      text-align: right;
      background-position: right 20px top 1px;
      background-size: contain;
      background-repeat: no-repeat;
      font-size: 11px;
    }
    
    /*
    Using this converter to convert this: https://css-tricks.com/using-svg/#data-urls-for-svg
    <svg width="100" height="20" viewBox="0 0 100 20">
      <text dominant-baseline="middle" text-anchor="end" x="100%" y="50%">Test Text</text>
    </svg>
    */
    model-viewer > form > fieldset select[name="diffuse"]{
      --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3EDiffuse%3C/text%3E%3C/svg%3E");
      background-image: var(--svg);
    }
    model-viewer > form > fieldset select[name="ao"]{
      --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3EAO%3C/text%3E%3C/svg%3E");
      background-image: var(--svg);
    }
    model-viewer > form > fieldset select[name="metal-roughness"]{
      --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3EMetal/Roughness%3C/text%3E%3C/svg%3E");
      background-image: var(--svg);
    }
    model-viewer > form > fieldset select[name="normal"]{
      --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3ENormal%3C/text%3E%3C/svg%3E");
      background-image: var(--svg);
    }
    model-viewer > form > fieldset select[name="emissive"]{
      --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3EEmissive%3C/text%3E%3C/svg%3E");
      background-image: var(--svg);
    }
    model-viewer > form > fieldset select[name="skybox"]{
      --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3ESkybox%3C/text%3E%3C/svg%3E");
      background-image: var(--svg);
    }
    model-viewer > form > fieldset select[name="environment"]{
      --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3EEnvironment%3C/text%3E%3C/svg%3E");
      background-image: var(--svg);
    }
    model-viewer > form > fieldset select[name="camera-orbit"]{
      --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3ECameraOrbit%3C/text%3E%3C/svg%3E");
      background-image: var(--svg);
    }
    model-viewer > form > fieldset select[name="camera-target"]{
      --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='20' viewBox='0 0 150 20'%3E%3Ctext dominant-baseline='middle' text-anchor='end' x='100%25' y='50%25'%3ECameraTarget%3C/text%3E%3C/svg%3E");
      background-image: var(--svg);
    }
  `

  return styles;
}