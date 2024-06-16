import './App.css';
import {Box, Divider, Fab, Link, Tooltip, Typography} from "@mui/material";
import {Column, Row} from "./view/components/layout";
import {useState} from "react";
import styled from "@emotion/styled";
import {Colors} from "./view/colors";
import {UserInput} from "./view/components/UserInput";
import {getFeedingAmount, getFeedingCount, getLink, monthsFrom} from "./model/calc";

const bgColor = "linear-gradient(120deg,#c0deff 8.18%,#ada9f3 90.92%)"
const boxShadow = "inset -8px 8px 16px 0 rgba(202,219,252,.6),35px 35px 68px 0 rgba(196,216,253,.5),inset 0 11px 28px 0 hsla(0,0%,100%,.5)"
const cardBgColor = "rgba(239,246,254,.2)"

require("./base/date")

const ControlPanel = styled(Column)`
    //max-width: 100%;
    width: 100%;
    background: ${cardBgColor};
        //box-shadow: ${boxShadow};
    elevation: above;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 32px;

    @media (min-width: 400px) {
        width: 400px;
    }
`;

function App() {
  const [weeks, setWeeks] = useState("")
  const [weight, setWeight] = useState("")
  const month = monthsFrom(weeks)

  const feedingAmount = getFeedingAmount(month, weight)
  const feedingCount = getFeedingCount(month)
  const today = new Date()

  const x1 = today.minus(weeks * 7).minus(7).toISOString().split("T")[0]
  const x2 = today.minus(weeks * 7).plus(7).toISOString().split("T")[0]
  const weeksDesc = weeks ? ` (${Math.round(monthsFrom(weeks) * 10) / 10}개월, ${x1} ~ ${x2} 출생)` : ""

  const handleWeeksChange = (e) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      setWeeks(parsedValue.toString());
    } else {
      setWeeks('');
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      setWeight(parsedValue.toString());
    } else {
      setWeight('');
    }
  };

  return (
    // Root
    <Column sx={{
      background: bgColor,
      width: "100vw",
      height: "100vh",
      alignItems: "center",
      boxSizing: "border-box",
      paddingX: 1,
      paddingY: 4
    }}>

      <Fab>
        <Tooltip title="support: jowookjae@gmail.com" arrow>
          <Box
            component="img"
            sx={{width: "100%"}}
            src={`${process.env.PUBLIC_URL}/logo192.png`}
          />
        </Tooltip>
      </Fab>

      <Box height={16}/>

      <Typography variant="h5" align="center" color={Colors.dodgerBlue} fontWeight="bold">분유량 계산기</Typography>

      <Box height={16}></Box>

      <ControlPanel>
        <UserInput
          name={"생후 주수" + weeksDesc}
          suffix="주"
          handleChange={handleWeeksChange}
          error={isNaN(parseFloat(weeks)) || weeks > 52.1}
        />
        <UserInput
          name="몸무게"
          suffix="kg"
          handleChange={handleWeightChange}
          error={isNaN(parseFloat(weight))}
        />
      </ControlPanel>

      <Box height={24}/>

      {
        weeks && weight && feedingAmount !== 0 ?
          <>
            <ControlPanel sx={{gap: 1}}>
              <Row justifyContent="space-between">
                <Typography>1일 수유량</Typography>
                <Typography>{`${feedingAmount}ml`}</Typography>
              </Row>
              <Row justifyContent="space-between">
                <Typography>1일 수유 횟수</Typography>
                <Typography>{`${feedingCount}회`}</Typography>
              </Row>
              <Divider/>
              <Row justifyContent="space-between">
                <Typography>회당 수유량</Typography>
              </Row>
              {
                feedingCount.items.map((value, index) => {
                  return <Row justifyContent="space-between">
                    <Typography>하루 {value}번</Typography>
                    <Typography>한번에 {Math.round(feedingAmount / value)}ml</Typography>
                  </Row>
                })
              }
            </ControlPanel>

            <Box height={24}/>

            <Link color={Colors.darkBlue} href={getLink(month)} target="_blank" rel="noopener noreferrer">출처: 보건복지부</Link>
          </>
          :
          <Typography variant="body1" align="center" color={Colors.darkBlue}>
            아기의 생후 주수와 몸무게를 입력하면<br/>
            적정 분유량을 계산합니다.

            <br/><br/>
            본 서비스는 <Link color={Colors.darkBlue} href={getLink(month)} target="_blank" rel="noopener noreferrer"
                         style={{fontWeight: 'bold'}}>보건복지부 가이드라인</Link>을 따릅니다.
          </Typography>
      }
    </Column>
  )
    ;
}

export default App;
