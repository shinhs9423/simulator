import { useEffect, useRef, useState } from 'react';
function TabView(props) {

  const canvas = useRef(null);
  const [ctx, setCtx] = useState(undefined);
  const [imageRatio, setImageRatio] = useState(undefined);

  useEffect(() => {
    if (canvas.current) {

      setCtx(ctx);    
    }
  });

  useEffect(() => {

    const ctx = canvas.current.getContext('2d');
    const img = new Image();
    img.src = "img/" + props.tabList[props.typeMode].src + ".jpg";

    img.onload = (e) => {

      ctx.globalCompositeOperation = "source-over";

      // 캔버스 크기 조절
      const canvasMaxwidth = document.body.clientWidth;
      const canvasMaxHeight = 400;

      const width = img.width > img.height ? canvasMaxwidth : (img.width * canvasMaxHeight) / img.height;
      const height = img.width > img.height ? (img.height * canvasMaxwidth) / img.width : canvasMaxHeight;

      // 캔버스 크기 조절

      canvas.current.width =  width;
      canvas.current.height = height;
      ctx.drawImage(img, 0, 0, canvas.current.width, canvas.current.height);


      //캔버스에 그린 이미지를 다시 data-uri 형태로 변환
      const dataURI = canvas.current.toDataURL("image/jpeg");


      //썸네일 이미지 보여주기
      document.querySelector(`#preview`).src = dataURI;

      // 이미지 비율
      setImageRatio(img.width/canvas.current.width);
    }

  }, [props.typeMode]);

  function inputChange(e) {

    const selectedObject =  props.tabList[props.typeMode];
    console.log(selectedObject);
    const inputIndex = e.target.classList.value.split("_")[1];

    const ctx = canvas.current.getContext('2d');
    const fileList = e.target.files;

    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);

    reader.onload = (e) => {
      const tempImage = new Image();
      tempImage.src = e.target.result;


      let dataURI;

      tempImage.onload = function (e) {
        
        switch (selectedObject.drawing) {
          case "drawImage":
            const canvasX = selectedObject.points[inputIndex].x/imageRatio;
            const canvasY = selectedObject.points[inputIndex].y/imageRatio;
            const canvasWidth = selectedObject.points[inputIndex].width/imageRatio;
            const canvasHeight = selectedObject.points[inputIndex].height/imageRatio;
            ctx.drawImage(tempImage, canvasX, canvasY, canvasWidth, canvasHeight);
            
            break;
          case "fill":
            const points = selectedObject.points[inputIndex].point;
            
            ctx.beginPath();
            ctx.moveTo(points[0][0]/imageRatio, points[0][1]/imageRatio);
            for (let i = 1; i < points.length; i++) {
              ctx.lineTo(points[i][0]/imageRatio, points[i][1]/imageRatio);
            }
            ctx.closePath();
            const pattern = ctx.createPattern(tempImage, "repeat");
            ctx.fillStyle = pattern;
            ctx.fill();

            break;
        }
        //캔버스에 그린 이미지를 다시 data-uri 형태로 변환
        dataURI = canvas.current.toDataURL("image/jpeg");
          //썸네일 이미지 보여주기
          document.querySelector(`#preview`).src = dataURI;
  
          //썸네일 이미지를 다운로드할 수 있도록 링크 설정
          document.querySelector('.download').href = dataURI;
      }
    }
  }

  let inputs = [];

  for (let i = 0; i < props.tabList[props.typeMode].points.length; i++) {
    inputs.push(
      <input className={props.tabList[props.typeMode].id + '_' + i} key={i} type="file" accept='image/*' onChange={inputChange}
      ></input>
    )
  }

  return (
    <div>
      <p>{props.typeMode}화면</p>
      <form>
        {inputs}
      </form>
      <a className="download" download="thumbnail.jpg" target="_blank" >
        <canvas id={props.typeMode} ref={canvas} style={{display:"none"}}></canvas>
        <img id="preview" src="../src/bus_0.jpg" alt="로컬에 있는 이미지가 보여지는 영역" />
      </a>

    </div>
  )
}

export default TabView;