import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบลงทะเบียนคนไข้นอก</h1>
        <h4>Requirements</h4>
        <p>
        ระบบลงทะเบียนคนไข้นอก 
        เป็นระบบที่อำนวยความสะดวกให้แก่พนักงานเวชระเบียนในการบันทึกข้อมูลประจำตัวของคนไข้ที่มาใช้บริการในโรงพยาบาลเป็นครั้งแรก 
        และยังไม่เคยมีการบันทึกประวัติของคนไข้ที่โรงพยาบาลนี้มาก่อน โดยจะมีการบันทึกข้อมูลที่จำเป็นต้องจัดเก็บ 
        คือ คำนำหน้าชื่อ ชื่อ นามสกุล เพศ   เลขประจำตัวประชาชน อายุ วันเกิด กรุ๊ปเลือด โรคประจำตัว เบอร์โทรศัพท์มือถือ อีเมล ที่อยู่ จังหวัด 
        ชื่อผู้ติดต่อในกรณีฉุกเฉิน เบอร์โทรศัพท์ของผู้ติดต่อในกรณีฉุกเฉิน วันเวลาที่ลงทะเบียนคนไข้ และมีการบันทึกชื่อพนักงานเวชระเบียนที่รับลงทะเบียนคนไข้ 
        เพื่อที่จะได้นำข้อมูลประวัติคนไข้ไปใช้ในแผนกอื่นๆที่เกี่ยวข้องต่อไป
        </p>
      </Container>
    </div>
  );
}
export default Home;
