import './App.css';
import {Box, FormControl, FormHelperText, Input, InputAdornment, Typography} from "@mui/material";
import {Column} from "./components/layout";
import {useState} from "react";
import styled from "@emotion/styled";
import {calculateFeedingAmount, getFeedingCount} from "./model/calc";

const bgColor = "linear-gradient(120deg,#c0deff 8.18%,#ada9f3 90.92%)"
const boxShadow = "inset -8px 8px 16px 0 rgba(202,219,252,.6),35px 35px 68px 0 rgba(196,216,253,.5),inset 0 11px 28px 0 hsla(0,0%,100%,.5)"
const cardBgColor = "rgba(239,246,254,.1)"

const MainCard = styled(Column)`
  max-width: 100%;
  width: 100%;

  @media (min-width: 350px) {
    width: 300px;
  }
`;

const darkBlue = "#00008B"
const dodgerBlue = "#1E90FF"

function App() {
  const [weeks, setWeeks] = useState("")
  const [weight, setWeight] = useState("")

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
    <Column padding={5} sx={{
      background: bgColor,
      width: "100vw",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      boxSizing: "border-box",
      padding: 6
    }}>
      <Typography variant="h5" color={dodgerBlue} fontWeight="bold">분유량 계산기</Typography>
      <Box height={20}/>

      <MainCard
        sx={{
          background: cardBgColor,
          boxShadow: boxShadow,
          borderRadius: "28px",
          padding: 5
        }}>

        <FormControl variant="standard" sx={{m: 1, mt: 3, width: "100%", margin: 0, marginTop: 0}}>
          <Input
            autoComplete="off"
            endAdornment={<InputAdornment position="end"><span>주</span></InputAdornment>}
            onChange={handleWeeksChange}
          />
          <FormHelperText id="standard-weight-helper-text">생후 주수</FormHelperText>
        </FormControl>

        <FormControl variant="standard" sx={{m: 1, mt: 3, width: "100%", margin: 0, marginTop: 0}}>
          <Input
            autoComplete="off"
            endAdornment={<InputAdornment position="end"><span>kg</span></InputAdornment>}
            onChange={handleWeightChange}
          />
          <FormHelperText id="standard-weight-helper-text">몸무게</FormHelperText>
        </FormControl>

        <Box height={40}></Box>

        <Box sx={{width: "100%"}}>
          {
            weeks && weight ? (
              <>
                <Typography>생후 {weeks}주 체중 {weight}kg 아기의 적정 수유량</Typography>
                <Typography>총 수유량: {calculateFeedingAmount(weeks, weight)}</Typography>
                <Typography>수유 횟수: {getFeedingCount(weeks).toString()}</Typography>
              </>
            ) : (
              <Typography variant="body1" align="center" color={darkBlue}>
                아기의 생후 주수와 몸무게를 입력하면<br/>
                적정 분유량을 계산합니다.
              </Typography>
            )
          }
        </Box>

      </MainCard>
      <Box height="5px"/>
      <Typography variant="body2" color={dodgerBlue}>출처: 보건복지부</Typography>
    </Column>
  )
    ;
}

export default App;
