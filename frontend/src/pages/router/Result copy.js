import { Box, Text, Button } from "@chakra-ui/react";

import ResultPageResultData from "../../components/result/ResultPageResultData";

import jsPDF from "jspdf";
import * as canvg from "canvg";

const Result = () => {
  const saveSvgAsPdf = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const svgElements = document.querySelectorAll("div.svgaa > svg");
    const numSvgElements = svgElements.length;
    let numProcessed = 0;

    svgElements.forEach((data, index) => {
      const svgString = new XMLSerializer().serializeToString(data);

      const rect = data.getBoundingClientRect();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = rect.left;
      canvas.height = rect.top;
      canvg.Canvg.from(ctx, svgString, {
        ignoreClear: true,
        offsetX: rect.x,
        offsetY: rect.y,
      });

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(
          imgData,
          "PNG",
          20,
          (index + 1) * 30 + 20,
          data.clientWidth,
          data.clientHeight
        );
        numProcessed++;

        if (numProcessed === numSvgElements) {
          pdf.save("결과.pdf");
        }
      };

      img.src =
        "data:image/svg+xml;base64," +
        btoa(
          unescape(encodeURIComponent(svgString)).replace(
            /%([0-9A-F]{2})/g,
            function (match, p1) {
              return String.fromCharCode("0x" + p1);
            }
          )
        );
    });
  };

  return (
    <Box
      id={"resultPage"}
      className={"resultPageContain"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      paddingX={"22%"}
      // backgroundColor={"black"}
      backgroundColor={"orange.50"}
    >
      {/* 내용 컨테이너 */}
      <Box display={"flex"} flexDirection={"column"} marginTop={"48px"}>
        {/* 이름 */}
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginTop={"10%"}
        >
          <Text fontFamily={"dalserM"} fontSize={"2.5em"}>
            유정훈 님의 결과입니다.
          </Text>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
          >
            <Button onClick={saveSvgAsPdf}>PDF로 저장하기</Button>
          </Box>
        </Box>
        {/* 결과 */}
        <Box
          height={"85%"}
          display={"flex"}
          flexDirection={"column"}
          marginTop={"10%"}
        >
          {/* 키워드 + 설문 */}
          {/* 기업 추천 1,2,3위 */}
          <ResultPageResultData
            title="가치관에 따른 추천 기업 Top3"
            componentName={"RecommendedCorp"}
          ></ResultPageResultData>
          {/* 기업 키워드 */}
          <ResultPageResultData
            title="기업이 주요하게 보는 가치관"
            componentName={"CorpKeyword"}
          ></ResultPageResultData>
          {/* 관련 인재상 키워드 */}
          <ResultPageResultData
            title="내 가치관과 관련있는 인재상 키워드"
            componentName={"IdealTalent"}
          ></ResultPageResultData>
          {/* 설문 */}
          {/* 가치관 별 막대 그래프 */}
          <ResultPageResultData
            title="가치관 별 막대 그래프"
            componentName={"GraphValues"}
          ></ResultPageResultData>
          {/* 나이대 별 가치관 */}
          <ResultPageResultData
            title="나이대 별 가치관"
            componentName={"AgeValues"}
          ></ResultPageResultData>
        </Box>
      </Box>
    </Box>
  );
};

export default Result;
